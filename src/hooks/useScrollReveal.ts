import { useEffect } from 'react'

export function useScrollReveal(pathname: string): void {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal-on-scroll'),
    )

    if (revealTargets.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -6% 0px',
      },
    )

    revealTargets.forEach((node) => {
      node.classList.remove('is-visible')
      observer.observe(node)
    })

    return () => {
      observer.disconnect()
    }
  }, [pathname])
}
