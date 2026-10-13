import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ContactSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
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
        '.contact-intro-col',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      ).fromTo(
        '.contact-row',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.3'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="contact-section" aria-label="Contact Abdul Rahman Baig">
      <div className="contact-container">
        <div className="contact-layout">
          {/* Left Column: Heading and Context */}
          <div className="contact-intro-col">
            <p className="contact-eyebrow">
              <span className="contact-eyebrow-dot" aria-hidden="true" />
              <span>CONTACT</span>
            </p>

            <h2 className="contact-heading">
              <span>Let’s get</span>
              <span className="contact-heading-accent">in touch.</span>
            </h2>

            <p className="contact-intro-text">
              Share what you need help with and a little about your business.
            </p>
          </div>

          {/* Right Column: Contact Rows with Fine Dividers */}
          <div className="contact-rows-col">
            {/* Email Row */}
            <div className="contact-row">
              <span className="contact-row-label">EMAIL</span>
              <a
                href="mailto:baigabdulrahman29@gmail.com"
                className="contact-row-link"
                aria-label="Send email to baigabdulrahman29@gmail.com"
              >
                <span className="contact-row-value">baigabdulrahman29@gmail.com</span>
                <span className="contact-row-arrow" aria-hidden="true">↗</span>
              </a>
            </div>

            {/* WhatsApp Row */}
            <div className="contact-row">
              <span className="contact-row-label">WHATSAPP</span>
              <a
                href="https://wa.me/923253487919"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row-link"
                aria-label="Message +92 325 3487919 on WhatsApp (opens in new tab)"
              >
                <span className="contact-row-value">+92 325 3487919</span>
                <span className="contact-row-arrow" aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Location Row (Plain text, not a link) */}
            <div className="contact-row contact-row-static-wrap">
              <span className="contact-row-label">LOCATION</span>
              <div className="contact-row-static">
                <span className="contact-row-value">Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
