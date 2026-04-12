import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const csvPath = path.join(root, 'public', 'assets', 'images', 'supabase-assets.csv')
const outputPath = path.join(root, 'supabase', 'seed-media.sql')

const MIME_BY_EXT = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  avif: 'image/avif',
  gif: 'image/gif',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  m4v: 'video/x-m4v',
}

function parseCsvLine(line) {
  const values = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]

    if (char === '"') {
      const next = line[i + 1]
      if (inQuotes && next === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (char === ',' && !inQuotes) {
      values.push(current)
      current = ''
      continue
    }

    current += char
  }

  values.push(current)
  return values
}

function sqlQuote(value) {
  if (value == null) return 'null'
  return `'${String(value).replaceAll("'", "''")}'`
}

function normalizeName(fileName) {
  return fileName.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim()
}

function resolveKindAndMime(fileName) {
  const ext = fileName.split('.').pop()?.toLowerCase() ?? ''
  const kind = ext === 'gif' ? 'gif' : ['mp4', 'webm', 'mov', 'm4v'].includes(ext) ? 'video' : 'image'
  const mime = MIME_BY_EXT[ext] ?? null
  return { ext, kind, mime }
}

const csv = fs.readFileSync(csvPath, 'utf8')
const lines = csv.split(/\r?\n/).filter((line) => line.trim().length > 0)
if (lines.length < 2) {
  throw new Error('supabase-assets.csv is empty or missing data rows')
}

const headers = parseCsvLine(lines[0])
  .map((header) => header.replace(/^\uFEFF/, '').trim().toLowerCase())
const idx = {
  section: headers.indexOf('section'),
  fileName: headers.indexOf('filename'),
  localPath: headers.indexOf('localpath'),
  sourceUrl: headers.indexOf('sourceurl'),
}

for (const [key, index] of Object.entries(idx)) {
  if (index < 0) {
    throw new Error(`Missing required column: ${key}`)
  }
}

const seen = new Set()
const insertRows = []

for (const line of lines.slice(1)) {
  const row = parseCsvLine(line)
  const section = (row[idx.section] ?? '').trim().toLowerCase()
  const fileName = (row[idx.fileName] ?? '').trim()
  const localPath = (row[idx.localPath] ?? '').trim()
  const sourceUrl = (row[idx.sourceUrl] ?? '').trim()

  if (!section || !fileName || !localPath) continue

  const dedupeKey = `${section}:${localPath}`
  if (seen.has(dedupeKey)) continue
  seen.add(dedupeKey)

  const { kind, mime } = resolveKindAndMime(fileName)
  const storagePath = localPath.replace(/^\/assets\/images\//, '')
  const assetName = normalizeName(fileName)

  insertRows.push(`(
    ${sqlQuote(section)},
    'general',
    ${sqlQuote(assetName)},
    ${sqlQuote(kind)}::public.media_asset_kind,
    'site-media',
    ${sqlQuote(storagePath)},
    ${sqlQuote(mime)},
    ${sqlQuote(assetName)},
    null,
    0,
    ${sqlQuote(sourceUrl || null)},
    '{}'::jsonb,
    true
  )`)
}

const sql = `-- Auto-generated from public/assets/images/supabase-assets.csv\n-- Run after supabase/schema.sql and supabase/storage-policies.sql\n\nbegin;\n\ninsert into public.media_assets (\n  page_slug,\n  subsection_slug,\n  asset_name,\n  kind,\n  storage_bucket,\n  storage_path,\n  mime_type,\n  alt_text,\n  caption,\n  sort_order,\n  source_url,\n  metadata,\n  is_active\n)\nvalues\n${insertRows.join(',\n')}\non conflict (page_slug, subsection_slug, asset_name) do update set\n  kind = excluded.kind,\n  storage_bucket = excluded.storage_bucket,\n  storage_path = excluded.storage_path,\n  mime_type = excluded.mime_type,\n  alt_text = excluded.alt_text,\n  caption = excluded.caption,\n  sort_order = excluded.sort_order,\n  source_url = excluded.source_url,\n  metadata = excluded.metadata,\n  is_active = excluded.is_active,\n  updated_at = now();\n\ncommit;\n`

fs.writeFileSync(outputPath, sql)
console.log(`Generated ${outputPath} with ${insertRows.length} rows.`)
