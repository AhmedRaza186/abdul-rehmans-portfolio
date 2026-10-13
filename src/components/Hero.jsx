import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)
  const portraitFrameRef = useRef(null)
  const isTiltActiveRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      isTiltActiveRef.current = false
      return
    }

    const mm = gsap.matchMedia()

    // Desktop timeline: min-width: 861px
    mm.add('(min-width: 861px)', () => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
        onComplete: () => {
          isTiltActiveRef.current = true
        },
      })

      // 1. Eyebrow fades upward
      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.05 }
      )
        // 2. Headline lines reveal separately upward inside overflow masks
        .fromTo(
          '.hero-headline-line',
          { opacity: 0, y: '100%' },
          { opacity: 1, y: '0%', duration: 0.65, stagger: 0.1 },
          '-=0.25'
        )
        // 3. Intro bio, CTAs, location with short stagger
        .fromTo(
          '.hero-bio',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.35'
        )
        .fromTo(
          '.hero-actions',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.35'
        )
        .fromTo(
          '.hero-location',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.3'
        )
        // 4. Portrait: reveal backdrop first, then person rising from 45px below
        .fromTo(
          '.hero-breakout-backdrop',
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' },
          0.35
        )
        .fromTo(
          '.hero-breakout-img',
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.55
        )
    }, heroRef)

    // Mobile timeline: max-width: 860px
    mm.add('(max-width: 860px)', () => {
      isTiltActiveRef.current = false

      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      // Subtle background fade first on separate motion wrapper, then text and CTA reveals
      tl.fromTo(
        '.hero-mobile-bg-motion',
        { opacity: 0 },
        { opacity: 1, duration: 0.75, ease: 'power2.out' }
      )
        .fromTo(
          '.hero-eyebrow',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.1
        )
        .fromTo(
          '.hero-headline-line',
          { opacity: 0, y: '100%' },
          { opacity: 1, y: '0%', duration: 0.6, stagger: 0.1 },
          0.25
        )
        .fromTo(
          '.hero-bio',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.3'
        )
        .fromTo(
          '.hero-actions',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.3'
        )
        .fromTo(
          '.hero-location',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35 },
          '-=0.25'
        )
    }, heroRef)

    return () => mm.revert()
  }, [])

  // Subtle perspective interaction on desktop (max 2-3 degrees tilt), active only after entrance
  const handlePointerMove = (e) => {
    if (typeof window === 'undefined') return
    if (window.innerWidth <= 860) return
    if (!isTiltActiveRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const frame = portraitFrameRef.current
    if (!frame) return

    const rect = frame.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    const tiltX = (-y * 4.5).toFixed(2)
    const tiltY = (x * 4.5).toFixed(2)

    frame.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
  }

  const handlePointerLeave = () => {
    const frame = portraitFrameRef.current
    if (!frame) return
    frame.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <section ref={heroRef} className="hero-section" aria-label="Introduction">
      {/* Mobile Decorative Background Portrait */}
      <div className="hero-mobile-bg" aria-hidden="true">
        <div className="hero-mobile-bg-motion">
          <img
            src="/images/abdul-rahman-cutout-trimmed.png"
            alt=""
            className="hero-mobile-bg-img"
            loading="eager"
          />
          <div className="hero-mobile-bg-overlay" />
        </div>
      </div>

      <div className="hero-container">
        {/* Editorial Text Column */}
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            <span>SOCIAL MEDIA · META ADS · AI AUTOMATION</span>
          </p>

          <h1 className="hero-headline">
            <span className="hero-headline-mask">
              <span className="hero-headline-line hero-headline-lead">More presence.</span>
            </span>
            <span className="hero-headline-mask">
              <span className="hero-headline-line">
                <span className="hero-headline-accent">Less busywork.</span>
              </span>
            </span>
          </h1>

          <p className="hero-bio">
            I’m Abdul Rahman Baig. I help e-commerce brands and creators manage social
            media, run Meta ads and automate everyday workflows with n8n.
          </p>

          <div className="hero-actions">
            <a
              href="https://wa.me/923253487919"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              aria-label="Let’s talk on WhatsApp"
            >
              Let’s talk
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>

            <a
              href="mailto:baigabdulrahman29@gmail.com"
              className="btn btn-secondary"
              aria-label="Email Abdul Rahman Baig"
            >
              Email me
            </a>
          </div>

          <p className="hero-location">BASED IN KARACHI, PAKISTAN</p>
        </div>

        {/* Breakout Portrait Column with Separate Transform Ownership */}
        <div className="hero-portrait-wrapper">
          {/* Tilt container: receives pointer tilt only */}
          <div
            ref={portraitFrameRef}
            className="hero-portrait-frame"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            {/* Entrance wrapper: receives entrance reveal */}
            <div className="hero-portrait-entrance">
              {/* Olive/Orange Spotlight Backdrop */}
              <div className="hero-breakout-backdrop" aria-hidden="true" />

              {/* Clipping container: clips bottom while allowing upper silhouette to overflow */}
              <div className="hero-breakout-clipper">
                <img
                  src="/images/abdul-rahman-cutout-trimmed.png"
                  alt="Portrait of Abdul Rahman Baig"
                  className="hero-breakout-img"
                  width="1023"
                  height="1057"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
