import { useEffect, useState } from 'react'
import {
  fileToDataUrl,
  getDefaultHomeMediaConfig,
  getHomeMediaSlotValue,
  normalizeHomeMediaConfig,
  setHomeMediaSlotValue,
  type HomeImageSlotKey,
  type HomeMediaConfig,
} from '../lib/homeMedia'
import { DEFAULT_MARKETING_TICKER_TEXT, normalizeTickerText } from '../lib/marketingTicker'
import { HomePage } from './HomePage'

type AdminPageProps = {
  tickerText: string
  onSaveTickerText: (value: string) => void
  homeMedia: HomeMediaConfig
  onSaveHomeMedia: (config: HomeMediaConfig) => void
}

export function AdminPage({
  tickerText,
  onSaveTickerText,
  homeMedia,
  onSaveHomeMedia,
}: AdminPageProps) {
  const [draftTickerText, setDraftTickerText] = useState(tickerText)
  const [draftHomeMedia, setDraftHomeMedia] = useState(homeMedia)
  const [tickerStatus, setTickerStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [homeMediaStatus, setHomeMediaStatus] = useState<'idle' | 'saved' | 'upload-error'>('idle')
  const [homeMediaError, setHomeMediaError] = useState('')
  const defaultHomeMedia = getDefaultHomeMediaConfig()

  useEffect(() => {
    setDraftTickerText(tickerText)
  }, [tickerText])

  useEffect(() => {
    setDraftHomeMedia(homeMedia)
  }, [homeMedia])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = normalizeTickerText(draftTickerText)

    if (!normalized) {
      setTickerStatus('error')
      return
    }

    onSaveTickerText(normalized)
    setDraftTickerText(normalized)
    setTickerStatus('saved')
  }

  function handleReset() {
    onSaveTickerText(DEFAULT_MARKETING_TICKER_TEXT)
    setDraftTickerText(DEFAULT_MARKETING_TICKER_TEXT)
    setTickerStatus('saved')
  }

  function handleSaveHomeMedia() {
    const normalized = normalizeHomeMediaConfig(draftHomeMedia)
    setDraftHomeMedia(normalized)
    onSaveHomeMedia(normalized)
    setHomeMediaStatus('saved')
    setHomeMediaError('')
  }

  function handleResetHomeMedia() {
    setDraftHomeMedia(defaultHomeMedia)
    onSaveHomeMedia(defaultHomeMedia)
    setHomeMediaStatus('saved')
    setHomeMediaError('')
  }

  async function handleUploadImage(slotKey: HomeImageSlotKey, file: File) {
    try {
      const dataUrl = await fileToDataUrl(file)
      setDraftHomeMedia((current) => setHomeMediaSlotValue(current, slotKey, dataUrl))
      setHomeMediaStatus('idle')
      setHomeMediaError('')
    } catch (error) {
      setHomeMediaStatus('upload-error')
      setHomeMediaError(error instanceof Error ? error.message : 'Could not upload image.')
    }
  }

  function renderInlineImageEditor(slotKey: HomeImageSlotKey, label: string) {
    return (
      <div className="inline-image-editor">
        <p className="inline-image-editor-title">{label}</p>

        <div className="inline-image-editor-actions">
          <label className="admin-upload-label">
            Upload image
            <input
              type="file"
              accept="image/*"
              onChange={async (event) => {
                const selectedFile = event.target.files?.[0]
                event.currentTarget.value = ''
                if (!selectedFile) return
                await handleUploadImage(slotKey, selectedFile)
              }}
            />
          </label>

          <button
            type="button"
            className="secondary"
            onClick={() => {
              setDraftHomeMedia((current) => setHomeMediaSlotValue(current, slotKey, ''))
              setHomeMediaStatus('idle')
              setHomeMediaError('')
            }}
          >
            Delete image
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() => {
              setDraftHomeMedia((current) =>
                setHomeMediaSlotValue(current, slotKey, getHomeMediaSlotValue(defaultHomeMedia, slotKey)),
              )
              setHomeMediaStatus('idle')
              setHomeMediaError('')
            }}
          >
            Reset slot
          </button>
        </div>

        <input
          className="admin-media-input"
          type="text"
          value={getHomeMediaSlotValue(draftHomeMedia, slotKey)}
          onChange={(event) => {
            setDraftHomeMedia((current) => setHomeMediaSlotValue(current, slotKey, event.target.value))
            setHomeMediaStatus('idle')
            setHomeMediaError('')
          }}
          placeholder="Paste image path, public URL, or data URL"
        />
      </div>
    )
  }

  return (
    <>
      <section className="content-shell admin-page">
        <h1>Admin - Home Page Editor</h1>
        <p>
          This admin view includes a home-page replica and controls to upload, delete, or modify
          home page images.
        </p>

        <section className="admin-block">
          <h2>Marketing Highlight Bar</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label htmlFor="marketingTickerText">Highlight text</label>
            <textarea
              id="marketingTickerText"
              name="marketingTickerText"
              rows={4}
              maxLength={260}
              value={draftTickerText}
              onChange={(event) => {
                setDraftTickerText(event.target.value)
                setTickerStatus('idle')
              }}
              placeholder="Enter the marketing highlights for the moving strip"
            ></textarea>

            <div className="admin-form-actions">
              <button type="submit">Save text</button>
              <button type="button" className="secondary" onClick={handleReset}>
                Reset default
              </button>
            </div>

            {tickerStatus === 'saved' && <p className="admin-status success">Saved successfully.</p>}
            {tickerStatus === 'error' && <p className="admin-status error">Please enter a non-empty text.</p>}
          </form>
        </section>

        <section className="admin-block">
          <h2>Home Page Images</h2>
          <p>
            Edit each image directly in the preview below. Each image now has its own uploader and
            controls right above it.
          </p>

          <div className="admin-form-actions">
            <button type="button" onClick={handleSaveHomeMedia}>Save home images</button>
            <button type="button" className="secondary" onClick={handleResetHomeMedia}>
              Reset all defaults
            </button>
          </div>

          {homeMediaStatus === 'saved' && <p className="admin-status success">Home page images updated.</p>}
          {homeMediaStatus === 'upload-error' && <p className="admin-status error">{homeMediaError}</p>}
        </section>
      </section>

      <HomePage
        homeMedia={draftHomeMedia}
        disableRevealAnimations
        imageEditors={{
          missionVisual: renderInlineImageEditor('missionVisual', 'Mission visual image'),
          eventShowcase: renderInlineImageEditor('eventShowcase', 'Event showcase image'),
          customerGallery: [
            renderInlineImageEditor('customerGallery-0', 'Customer gallery image 1'),
            renderInlineImageEditor('customerGallery-1', 'Customer gallery image 2'),
            renderInlineImageEditor('customerGallery-2', 'Customer gallery image 3'),
          ],
        }}
      />
    </>
  )
}
