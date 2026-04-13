import { normalizeTickerText } from '../../lib/marketingTicker'

type MarketingTickerProps = {
  text: string
}

export function MarketingTicker({ text }: MarketingTickerProps) {
  const tickerText = normalizeTickerText(text)
  if (!tickerText) return null

  const marqueeText = `${tickerText} | `
  return (
    <section className="marketing-ticker" aria-label="Company highlights">
      <div className="marketing-ticker-viewport">
        <div className="marketing-ticker-track">
          <span>{marqueeText}</span>
          <span aria-hidden="true">{marqueeText}</span>
        </div>
      </div>
    </section>
  )
}
