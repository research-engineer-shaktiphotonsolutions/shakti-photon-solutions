import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const root = process.cwd()
const envPath = path.join(root, '.env')

if (!fs.existsSync(envPath)) {
  console.error('Missing .env file in project root.')
  process.exit(1)
}

const envText = fs.readFileSync(envPath, 'utf8')
const env = {}

for (const rawLine of envText.split(/\r?\n/)) {
  const line = rawLine.trim()
  if (!line || line.startsWith('#')) continue

  const equalIndex = line.indexOf('=')
  if (equalIndex < 0) continue

  const key = line.slice(0, equalIndex).trim()
  const value = line.slice(equalIndex + 1).trim()
  env[key] = value
}

const url = env.VITE_SUPABASE_URL
const anonKey = env.VITE_SUPABASE_ANON_KEY
const bucket = env.VITE_SUPABASE_MEDIA_BUCKET || 'site-media'

if (!url || !anonKey) {
  console.error('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is empty in .env.')
  process.exit(1)
}

const supabase = createClient(url, anonKey)

async function run() {
  const health = {
    urlConfigured: true,
    anonKeyConfigured: true,
    mediaBucket: bucket,
    mediaAssetsTableReadable: false,
    mediaAssetsCount: 0,
    bucketReadable: false,
  }

  const tableQuery = await supabase
    .from('media_assets')
    .select('id', { count: 'exact', head: true })

  if (tableQuery.error) {
    console.error('media_assets query failed:', tableQuery.error.message)
    process.exit(1)
  }

  health.mediaAssetsTableReadable = true
  health.mediaAssetsCount = tableQuery.count ?? 0

  const listResult = await supabase.storage.from(bucket).list('', { limit: 1 })

  if (listResult.error) {
    console.error('storage list failed:', listResult.error.message)
    process.exit(1)
  }

  health.bucketReadable = true

  console.log('Supabase verification passed.')
  console.log(JSON.stringify(health, null, 2))
}

run().catch((error) => {
  console.error('Unexpected verification error:', error?.message || error)
  process.exit(1)
})
