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
- Keep responses concise, practical, and business-friendly.
- If user asks product-fit questions, request capacity, use case, and timeline.
- If user asks for pricing, suggest sharing specs for a tailored estimate.
- If unsure, say you will connect the customer to the team.
- Never invent certifications, customer contracts, or unavailable specs.
- Always offer a short contact follow-up option at the end.
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

Respond in plain text with short paragraphs. Do not use markdown tables.
  `.trim()

  const geminiResponse = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
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
  const reply = geminiData?.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part?.text || '')
    .join('')
    .trim()

  if (!reply) {
    return jsonResponse(502, { error: 'No response text from Gemini.' })
  }

  return jsonResponse(200, { reply })
})
