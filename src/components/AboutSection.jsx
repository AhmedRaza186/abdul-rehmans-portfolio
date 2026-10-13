import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AboutSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
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
        '.about-intro-col',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      ).fromTo(
        '.about-record-group',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: 'power2.out',
        },
        '-=0.3'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="about-section" aria-label="About Abdul Rahman Baig">
      <div className="about-container">
        <div className="about-layout">
          {/* Left Column: Focused Editorial Introduction */}
          <div className="about-intro-col">
            <p className="about-eyebrow">
              <span className="about-eyebrow-dot" aria-hidden="true" />
              <span>ABOUT ABDUL RAHMAN</span>
            </p>

            <h2 className="about-heading">
              <span>The person</span>
              <span className="about-heading-accent">behind the work.</span>
            </h2>

            <div className="about-narrative">
              <p className="about-lead-text">
                I work across social media management, Meta ads, customer support and business workflows.
                My focus is keeping everyday work organised, with clear communication and practical support.
              </p>
            </div>
          </div>

          {/* Right Column: Compact Experience & Education */}
          <div className="about-experience-col">
            {/* Experience Section */}
            <div className="about-record-group">
              <div className="about-group-header">
                <h3 className="about-group-title">EXPERIENCE</h3>
                <span className="about-group-line" aria-hidden="true" />
              </div>

              <div className="about-items-stack">
                {/* IDM Pakistan */}
                <article className="about-item">
                  <div className="about-item-meta">
                    <span className="about-item-date">Nov 2024 — Present</span>
                  </div>
                  <h4 className="about-item-role">Operations & Customer Support</h4>
                  <p className="about-item-org">IDM Pakistan</p>
                  <p className="about-item-desc">
                    Managing customer inquiries across calls, email and messaging with organised coordination and prompt follow-through.
                  </p>
                </article>

                {/* Social Media & Meta Ads */}
                <article className="about-item">
                  <div className="about-item-meta">
                    <span className="about-item-date">1 Year Experience</span>
                  </div>
                  <h4 className="about-item-role">Social Media & Meta Ads</h4>
                  <p className="about-item-org">Independent Practice · E-Commerce Brands & Creators</p>
                  <p className="about-item-desc">
                    Planning content schedules, maintaining publishing consistency, and managing coordinated Meta ad campaigns with clear tracking.
                  </p>
                </article>
              </div>
            </div>

            {/* Education Section */}
            <div className="about-record-group about-education-group">
              <div className="about-group-header">
                <h3 className="about-group-title">EDUCATION</h3>
                <span className="about-group-line" aria-hidden="true" />
              </div>

              <div className="about-items-stack">
                <article className="about-item">
                  <div className="about-item-meta">
                    <span className="about-item-date">In progress</span>
                  </div>
                  <h4 className="about-item-role">Bachelor of Business Administration (BBA)</h4>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
