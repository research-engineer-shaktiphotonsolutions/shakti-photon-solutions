import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

type HistoryMessage = {
  role: 'user' | 'assistant'
  content: string
}

type GeminiRequestBody = {
  message?: string
  pathname?: string
  history?: HistoryMessage[]
}

const COMPANY_CONTEXT = `
You are Shakti Photon Solutions AI assistant for website visitors.

Company focus:
- Hydrogen and carbon EPC solutions
- PEM, AEM, and alkaline electrolyzer systems
- Fuel cell systems and designs
- Research and development work stations

Locations and contact:
- IIT Madras Research Park, Chennai, Tamilnadu, India 600113
- JC Bose Block, SRM AP, Guntur, Andhra Pradesh, India 522502
- Industrial Phase-7, Mohali, Punjab, India 160055
- Phone: +91 7382025117
- Email: info@shaktiphotonsolutions.com

Behavior rules:
- Keep responses SHORT and CONCISE — 2-3 sentences max unless technical detail is specifically requested.
- Be warm but brief. No long paragraphs.
- If user asks product-fit questions, ask ONE key clarifying question (capacity, use case, or timeline).
- If user asks for pricing, briefly suggest sharing specs for an estimate.
- If unsure, say you will connect the customer to the team.
- Never invent certifications, customer contracts, or unavailable specs.
- Offer a short contact follow-up only when relevant, not every message.

LEAD CAPTURE (CRITICAL):
- If the user shares contact details (email, phone, name, organization) or expresses interest in a product, you MUST include a JSON block at the END of your response in this exact format:
<!--LEAD_DATA:{"name":"...","email":"...","phone":"...","organization":"...","requirement":"..."}-->
- Fill only the fields you know. Use empty string for unknown fields.
- This block will be stripped before showing the response to the user.
- Acknowledge their details briefly: "Noted! Our team will reach out shortly."
`

function jsonResponse(status: number, payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json',
    },
  })
}

function extractLeadData(text: string): { cleanReply: string; leadData: Record<string, string> | null } {
  const leadMatch = text.match(/<!--LEAD_DATA:(.*?)-->/)
  if (!leadMatch) return { cleanReply: text, leadData: null }

  const cleanReply = text.replace(/<!--LEAD_DATA:.*?-->/g, '').trim()
  try {
    const leadData = JSON.parse(leadMatch[1])
    return { cleanReply, leadData }
  } catch {
    return { cleanReply, leadData: null }
  }
}

async function saveLeadToDatabase(leadData: Record<string, string>, pathname: string, chatSummary: string) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !supabaseKey) return

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { error } = await supabase.from('leads').insert({
    name: leadData.name || null,
    email: leadData.email || null,
    phone: leadData.phone || null,
    organization: leadData.organization || null,
    requirement: leadData.requirement || null,
    source_page: pathname,
    chat_summary: chatSummary,
  })

  if (error) {
    console.error('Failed to save lead:', error.message)
  }
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS })
  }

  if (request.method !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' })
  }

  const apiKey = Deno.env.get('GEMINI_API')
  if (!apiKey) {
    return jsonResponse(500, { error: 'Missing GEMINI_API secret in Supabase Edge Function environment.' })
  }

  let body: GeminiRequestBody

  try {
    body = await request.json()
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON payload.' })
  }

  const message = body.message?.trim() || ''
  if (!message) {
    return jsonResponse(400, { error: 'Message is required.' })
  }

  const pathname = body.pathname || '/'
  const history = Array.isArray(body.history)
    ? body.history
      .filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
      .slice(-8)
    : []

  const historyText = history
    .map((item) => `${item.role.toUpperCase()}: ${item.content}`)
    .join('\n')

  const prompt = `
${COMPANY_CONTEXT}

Current page: ${pathname}
Conversation history:
${historyText || 'No previous messages.'}

Customer question:
${message}

Respond in plain text with short paragraphs. Do not use markdown tables. Keep it concise.
  `.trim()

  const geminiResponse = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          topP: 0.9,
          maxOutputTokens: 2048,
        },
      }),
    },
  )

  if (!geminiResponse.ok) {
    const details = await geminiResponse.text()
    return jsonResponse(502, { error: 'Gemini request failed.', details })
  }

  const geminiData = await geminiResponse.json()
  const rawReply = geminiData?.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part?.text || '')
    .join('')
    .trim()

  if (!rawReply) {
    return jsonResponse(502, { error: 'No response text from Gemini.' })
  }

  // Extract and save lead data if present
  const { cleanReply, leadData } = extractLeadData(rawReply)

  if (leadData) {
    const chatSummary = history.map(h => `${h.role}: ${h.content}`).join('\n') + `\nuser: ${message}`
    await saveLeadToDatabase(leadData, pathname, chatSummary)
  }

  return jsonResponse(200, { reply: cleanReply })
})
