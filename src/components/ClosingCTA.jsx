import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ClosingCTA.css'

gsap.registerPlugin(ScrollTrigger)

export default function ClosingCTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      tl.fromTo(
        '.closing-cta-heading',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }
      )
        .fromTo(
          '.closing-cta-text',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.closing-cta-btn',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.35'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="closing-cta-section" aria-label="Closing Call to Action">
      <div className="closing-cta-container">
        <div className="closing-cta-layout">
          {/* Left Column: Oversized Heading */}
          <div className="closing-cta-head-col">
            <h2 className="closing-cta-heading">
              <span className="closing-cta-lead">More room</span>
              <span className="closing-cta-accent">for what matters.</span>
            </h2>
          </div>

          {/* Right Column: Supporting Copy & Prominent Warm-Ivory Action */}
          <div className="closing-cta-action-wrap">
            <p className="closing-cta-text">
              Let’s discuss your content, campaigns or everyday workflows.
            </p>

            <a
              href="https://wa.me/923253487919"
              target="_blank"
              rel="noopener noreferrer"
              className="closing-cta-btn"
              aria-label="Let’s talk on WhatsApp (opens in new tab)"
            >
              <span className="closing-cta-btn-text">Let’s talk</span>
              <span className="closing-cta-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
