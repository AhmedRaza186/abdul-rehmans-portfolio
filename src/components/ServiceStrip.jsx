import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ServiceStrip.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  'SOCIAL MEDIA MANAGEMENT',
  'META ADS',
  'N8N AUTOMATION',
  'CUSTOMER SUPPORT',
]

export default function ServiceStrip() {
  const sectionRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="service-strip" className="service-strip-section" aria-label="Services Overview">
      <div
        className="service-marquee-wrapper"
        tabIndex={0}
        role="region"
        aria-label="Core services marquee. Press tab to focus and pause."
      >
        <div className={`service-marquee-content ${isPaused ? 'is-paused' : ''}`}>
          {/* Primary accessible list */}
          <ul className="service-strip-list">
            {services.map((item, index) => (
              <li key={index} className="service-strip-item">
                <span className="service-text">{item}</span>
                <span className="service-mark" aria-hidden="true">✦</span>
              </li>
            ))}
          </ul>

          {/* Visual loop duplicate for seamless continuous animation */}
          <ul className="service-strip-list" aria-hidden="true">
            {services.map((item, index) => (
              <li key={`dup-${index}`} className="service-strip-item">
                <span className="service-text">{item}</span>
                <span className="service-mark" aria-hidden="true">✦</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Accessible Pause/Resume Control */}
      <button
        type="button"
        className="service-marquee-toggle"
        aria-label={isPaused ? 'Resume service marquee' : 'Pause service marquee'}
        aria-pressed={isPaused}
        onClick={() => setIsPaused((prev) => !prev)}
      >
        {isPaused ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M3 1.8v8.4c0 .6.7 1 1.2.6l6.8-4.2c.5-.3.5-1.1 0-1.4L4.2 1.2c-.5-.4-1.2 0-1.2.6z" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <rect x="2" y="1.5" width="2.5" height="9" rx="0.8" />
            <rect x="7.5" y="1.5" width="2.5" height="9" rx="0.8" />
          </svg>
        )}
      </button>
    </section>
  )
}
