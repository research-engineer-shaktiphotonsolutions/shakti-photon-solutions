import { FormEvent, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { askGeminiAssistant, type AssistantHistoryMessage } from '../lib/geminiAssistant'

type ChatRole = 'assistant' | 'user'

type ChatMessage = {
  id: string
  role: ChatRole
  content: string
}

type GeminiAssistantWidgetProps = {
  enabled?: boolean
}

const WHATSAPP_NUMBER = '917382025117'
const WHATSAPP_MESSAGE = 'Hi Shakti Photon Solutions, I have a query regarding your products and solutions.'
const EMAIL_ADDRESS = 'info@shaktiphotonsolutions.com'
const EMAIL_SUBJECT = 'Project requirement from website visitor'
const EMAIL_BODY = 'Hello Shakti Photon Solutions, I want to discuss my project requirement.'

const quickSuggestions = [
  'Which electrolyzer options do you provide?',
  'What fuel cell systems are best for my use case?',
  'Can you explain your EPC solutions briefly?',
  'I need help choosing the right setup',
]

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function toHistory(messages: ChatMessage[]): AssistantHistoryMessage[] {
  return messages
    .filter((message) => message.role === 'assistant' || message.role === 'user')
    .slice(-8)
    .map((message) => ({ role: message.role, content: message.content }))
}

export function GeminiAssistantWidget({ enabled = true }: GeminiAssistantWidgetProps) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [input, setInput] = useState('')
  const [showContactPanel, setShowContactPanel] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: makeId(),
      role: 'assistant',
      content:
        'Hello, I am your Shakti Photon assistant. Ask me about electrolyzers, fuel cells, EPC solutions, or project fit.',
    },
  ])
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const whatsappLink = useMemo(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    [],
  )
  const emailLink = useMemo(
    () =>
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ADDRESS)}&su=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`,
    [],
  )

  const pushMessage = (role: ChatRole, content: string) => {
    setMessages((current) => [...current, { id: makeId(), role, content }])

    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    })
  }

  const askAssistant = async (rawText: string) => {
    const message = rawText.trim()
    if (!message || isThinking) return

    const nextHistory = toHistory([
      ...messages,
      {
        id: makeId(),
        role: 'user',
        content: message,
      },
    ])

    pushMessage('user', message)
    setInput('')
    setIsThinking(true)

    try {
      const result = await askGeminiAssistant({
        message,
        pathname: location.pathname,
        history: nextHistory,
      })

      pushMessage('assistant', result.reply)
    } catch {
      pushMessage(
        'assistant',
        'I could not connect right now. You can still reach us directly from the Contact actions in this chat window.',
      )
    } finally {
      setIsThinking(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void askAssistant(input)
  }

  if (!enabled) return null

  return (
    <div className="gemini-widget" aria-live="polite">
      {isOpen && (
        <section className="gemini-panel" aria-label="AI chat assistant">
          <header className="gemini-panel-header">
            <div>
              <h3 className="gemini-headline">Shakti's AI Assistant</h3>
            </div>
            <button
              type="button"
              className="gemini-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI assistant"
            >
              x
            </button>
          </header>

          {messages.length <= 1 && (
            <div className="gemini-suggestions" aria-label="Quick suggestions">
              {quickSuggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => void askAssistant(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="gemini-messages" ref={scrollRef}>
            {messages.map((message) => (
              <article key={message.id} className={`gemini-msg ${message.role === 'user' ? 'user' : 'assistant'}`}>
                {message.content}
              </article>
            ))}
            {isThinking && <p className="gemini-thinking">Thinking...</p>}
          </div>

          <div className="gemini-contact-strip">
            <button type="button" onClick={() => setShowContactPanel((current) => !current)}>
              Contact Us
            </button>
          </div>

          {showContactPanel && (
            <section className="gemini-contact-panel" aria-label="Contact options">
              <p>Talk with our team directly.</p>
              <div>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="chat-contact-whatsapp">
                  WhatsApp
                </a>
                <a href={emailLink} target="_blank" rel="noreferrer">
                  Email
                </a>
                <a href="/contact-us">Contact Page</a>
              </div>
            </section>
          )}

          <form className="gemini-input-row" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about products, use cases, pricing, or support"
              aria-label="Type your question"
            />
            <button type="submit" disabled={!input.trim() || isThinking}>
              Send
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="gemini-launcher"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Open AI assistant"
      >
        <span className="gemini-orb" aria-hidden="true"></span>
        Ask AI
      </button>
    </div>
  )
}