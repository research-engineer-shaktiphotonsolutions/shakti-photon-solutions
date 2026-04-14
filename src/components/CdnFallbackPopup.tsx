type CdnFallbackPopupProps = {
  visible: boolean
  count: number
  onDismiss: () => void
}

export function CdnFallbackPopup({ visible, count, onDismiss }: CdnFallbackPopupProps) {
  if (!visible) return null

  return (
    <div className="cdn-popup" role="status" aria-live="polite">
      <div className="cdn-popup-icon">{'\u2601'}</div>
      <div className="cdn-popup-body">
        <p className="cdn-popup-title">Using local images</p>
        <p className="cdn-popup-sub">
          {count} image{count !== 1 ? 's' : ''} loaded from local storage
          {'\u2014'} CDN unavailable
        </p>
      </div>
      <button
        className="cdn-popup-close"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        {'\u2715'}
      </button>
    </div>
  )
}
