import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient'

export type AssistantHistoryMessage = {
  role: 'user' | 'assistant'
  content: string
}

type AskGeminiAssistantInput = {
  message: string
  pathname: string
  history: AssistantHistoryMessage[]
}

type AskGeminiAssistantResult = {
  reply: string
}

export async function askGeminiAssistant({
  message,
  pathname,
  history,
}: AskGeminiAssistantInput): Promise<AskGeminiAssistantResult> {
  if (!isSupabaseConfigured()) {
    return {
      reply: 'AI assistant is not configured yet. Please use Contact Us and our team will help right away.',
    }
  }

  const supabase = getSupabaseClient()

  const { data, error } = await supabase.functions.invoke('gemini-assistant', {
    body: {
      message,
      pathname,
      history,
    },
  })

  if (error) {
    throw new Error(error.message || 'Unable to reach AI assistant right now.')
  }

  const reply = typeof data?.reply === 'string' ? data.reply.trim() : ''

  if (!reply) {
    throw new Error('AI assistant returned an empty response.')
  }

  return { reply }
}