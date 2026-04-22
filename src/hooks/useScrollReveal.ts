import { useEffect } from 'react'

export function useScrollReveal(pathname: string): void {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

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

    const observedNodes = new WeakSet<Element>()

    const registerRevealTarget = (node: Element) => {
      if (!(node instanceof HTMLElement) || observedNodes.has(node)) return
      node.classList.remove('is-visible')
      observer.observe(node)
      observedNodes.add(node)
    }

    const scanRevealTargets = (root: ParentNode = document) => {
      if (root instanceof HTMLElement && root.matches('.reveal-on-scroll')) {
        registerRevealTarget(root)
      }

      root.querySelectorAll?.('.reveal-on-scroll').forEach((node) => {
        registerRevealTarget(node)
      })
    }

    scanRevealTargets()

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            scanRevealTargets(node)
          }
        })
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [pathname])
}
