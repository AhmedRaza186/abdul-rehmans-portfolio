import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // In reduced motion, ensure ScrollTrigger still updates on native scroll
      ScrollTrigger.refresh()
      return
    }

    // Preserve browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto'
    }

    // Initialize Lenis for restrained smooth scrolling
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.0,
      infinite: false,
    })

    // Connect Lenis to ScrollTrigger via one shared GSAP ticker
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Intercept in-page anchor links for smooth scrolling with sticky-header offset
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return

      const href = link.getAttribute('href')
      if (!href) return

      if (href === '#' || href === '#top') {
        e.preventDefault()
        lenis.scrollTo(0, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
        history.pushState(null, '', window.location.pathname)
        return
      }

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        const header = document.querySelector('.navbar-header')
        const headerOffset = header ? -Math.round(header.getBoundingClientRect().height) : -60
        lenis.scrollTo(target, {
          offset: headerOffset, // Matches actual sticky navbar height dynamically on both desktop and mobile
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
        history.pushState(null, '', href)
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Handle initial URL hash on mount
    if (window.location.hash) {
      const initialTarget = document.querySelector(window.location.hash)
      if (initialTarget) {
        setTimeout(() => {
          const header = document.querySelector('.navbar-header')
          const headerOffset = header ? -Math.round(header.getBoundingClientRect().height) : -60
          lenis.scrollTo(initialTarget, { offset: headerOffset, immediate: true })
        }, 120)
      }
    }

    // Refresh ScrollTrigger when fonts and images finish loading
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }

    const handleWindowLoad = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', handleWindowLoad)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('load', handleWindowLoad)
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])
}
