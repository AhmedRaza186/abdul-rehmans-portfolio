import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ServicesSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function ServicesSection() {
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
        '.services-intro-col',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      ).fromTo(
        '.service-panel',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.3'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="services-section" aria-label="Services Detailed">
      <div className="services-container">
        <div className="services-layout">
          {/* Left Column: Sticky Introduction */}
          <div className="services-intro-col">
            <p className="services-eyebrow">
              <span className="services-eyebrow-dot" aria-hidden="true" />
              <span>WHAT I CAN HELP WITH</span>
            </p>

            <h2 className="services-heading">
              <span>Less on your plate.</span>
              <span className="services-heading-accent">More room to focus.</span>
            </h2>

            <p className="services-intro">
              Social media, Meta ads, n8n automation and customer support for e-commerce
              brands and creators.
            </p>

            <a
              href="https://wa.me/923253487919"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary services-cta-btn"
              aria-label="Let’s talk about your business on WhatsApp"
            >
              Let’s talk about your business
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          {/* Right Column: Vertically Stacked Service Panels */}
          <div className="services-panels-col">
            {/* Panel 01: Social Media Management */}
            <article className="service-panel">
              <div className="service-panel-content">
                <div className="service-panel-meta">
                  <span className="service-panel-num" aria-hidden="true">01</span>
                </div>
                <h3 className="service-panel-title">Social Media Management</h3>
                <p className="service-panel-desc">
                  Organised planning, scheduling and community management to keep your channels active and consistent.
                </p>
                <p className="service-panel-scope">
                  Content planning · Scheduling · Community management
                </p>
              </div>

              {/* Editorial Content Calendar Illustration */}
              <div className="service-illustration-wrap" aria-hidden="true">
                <svg className="service-illus-svg" viewBox="0 0 120 96" fill="none">
                  {/* Calendar base card */}
                  <rect x="15" y="14" width="90" height="68" rx="3" stroke="#243322" strokeWidth="1.5" strokeOpacity="0.48" fill="#FAF8F3" />
                  {/* Header bar */}
                  <path d="M15 26 H105" stroke="#243322" strokeWidth="1.5" strokeOpacity="0.4" />
                  <rect x="25" y="19" width="16" height="3" rx="1.5" fill="#243322" fillOpacity="0.5" />
                  {/* Calendar Grid Lines */}
                  <line x1="45" y1="26" x2="45" y2="82" stroke="#243322" strokeWidth="1" strokeOpacity="0.22" />
                  <line x1="75" y1="26" x2="75" y2="82" stroke="#243322" strokeWidth="1" strokeOpacity="0.22" />
                  <line x1="15" y1="54" x2="105" y2="54" stroke="#243322" strokeWidth="1" strokeOpacity="0.22" />
                  {/* Editorial planner dots/dashes */}
                  <rect x="24" y="36" width="12" height="2" rx="1" fill="#243322" fillOpacity="0.45" />
                  <rect x="54" y="36" width="12" height="2" rx="1" fill="#243322" fillOpacity="0.45" />
                  <rect x="84" y="64" width="12" height="2" rx="1" fill="#243322" fillOpacity="0.45" />
                  {/* Active day highlighted cell (animates on hover) */}
                  <g className="illus-cal-active">
                    <rect x="51" y="60" width="18" height="14" rx="2" fill="#D86635" />
                    <circle cx="60" cy="67" r="2.5" fill="#F5F2EA" />
                  </g>
                </svg>
              </div>
            </article>

            {/* Panel 02: Meta Ads */}
            <article className="service-panel service-panel-light-alt">
              <div className="service-panel-content">
                <div className="service-panel-meta">
                  <span className="service-panel-num" aria-hidden="true">02</span>
                </div>
                <h3 className="service-panel-title">Meta Ads</h3>
                <p className="service-panel-desc">
                  Campaign management for e-commerce brands and creators, with organised coordination and clear next steps.
                </p>
                <p className="service-panel-scope">
                  Meta campaigns · Campaign coordination
                </p>
              </div>

              {/* Creative & Audience Circles Illustration */}
              <div className="service-illustration-wrap" aria-hidden="true">
                <svg className="service-illus-svg" viewBox="0 0 120 96" fill="none">
                  {/* Creative frame */}
                  <rect x="20" y="20" width="46" height="56" rx="3" stroke="#243322" strokeWidth="1.5" strokeOpacity="0.48" fill="#FAF8F3" />
                  <rect x="28" y="28" width="30" height="20" rx="1.5" fill="#243322" fillOpacity="0.12" />
                  <line x1="28" y1="56" x2="48" y2="56" stroke="#243322" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="28" y1="63" x2="40" y2="63" stroke="#243322" strokeWidth="1.5" strokeOpacity="0.38" />
                  {/* Intersecting audience circles */}
                  <circle cx="78" cy="48" r="24" stroke="#243322" strokeWidth="1.2" strokeOpacity="0.42" strokeDasharray="3 3" />
                  <g className="illus-audience-ring">
                    <circle cx="78" cy="48" r="14" stroke="#D86635" strokeWidth="1.8" fill="#D86635" fillOpacity="0.14" />
                    <circle cx="78" cy="48" r="3.5" fill="#D86635" />
                  </g>
                </svg>
              </div>
            </article>

            {/* Panel 03: AI Automation (Deep-Olive Highlight Panel) */}
            <article className="service-panel service-panel-olive">
              <div className="service-panel-content">
                <div className="service-panel-meta">
                  <span className="service-panel-num" aria-hidden="true">03</span>
                </div>
                <h3 className="service-panel-title">AI Automation</h3>
                <p className="service-panel-desc">
                  Connect everyday business workflows with n8n to reduce repetitive manual tasks.
                </p>
                <p className="service-panel-scope">
                  n8n · Workflow automation
                </p>
              </div>

              {/* Connected Workflow Nodes Illustration */}
              <div className="service-illustration-wrap" aria-hidden="true">
                <svg className="service-illus-svg" viewBox="0 0 120 96" fill="none">
                  {/* Curved connecting workflow line */}
                  <path d="M24 48 C42 48 42 32 60 32 C78 32 78 62 96 62" stroke="#F5F2EA" strokeWidth="2" strokeOpacity="0.55" strokeDasharray="4 3" />
                  {/* Start Node */}
                  <circle cx="24" cy="48" r="8" fill="#1C271A" stroke="#F5F2EA" strokeWidth="1.5" strokeOpacity="0.75" />
                  <circle cx="24" cy="48" r="2.5" fill="#F5F2EA" />
                  {/* Logic / Processing Node (n8n node - animates on hover) */}
                  <g className="illus-node-pulse">
                    <rect x="52" y="24" width="16" height="16" rx="3" fill="#D86635" />
                    <circle cx="60" cy="32" r="3" fill="#F5F2EA" />
                  </g>
                  {/* Execution Node */}
                  <circle cx="96" cy="62" r="8" fill="#1C271A" stroke="#F5F2EA" strokeWidth="1.5" strokeOpacity="0.75" />
                  <path d="M94 62 L98 62 M96 60 L96 64" stroke="#F5F2EA" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </article>

            {/* Panel 04: Customer Support */}
            <article className="service-panel">
              <div className="service-panel-content">
                <div className="service-panel-meta">
                  <span className="service-panel-num" aria-hidden="true">04</span>
                </div>
                <h3 className="service-panel-title">Customer Support</h3>
                <p className="service-panel-desc">
                  Support across calls, email and messaging to resolve customer queries and maintain prompt follow-through.
                </p>
                <p className="service-panel-scope">
                  Customer enquiries · Issue resolution · Follow-ups
                </p>
              </div>

              {/* Conversation Bubbles & Human Handoff Illustration */}
              <div className="service-illustration-wrap" aria-hidden="true">
                <svg className="service-illus-svg" viewBox="0 0 120 96" fill="none">
                  {/* Inbound user message bubble */}
                  <rect x="18" y="22" width="56" height="28" rx="4" fill="#FAF8F3" stroke="#243322" strokeWidth="1.5" strokeOpacity="0.45" />
                  <line x1="28" y1="32" x2="54" y2="32" stroke="#243322" strokeWidth="1.5" strokeOpacity="0.48" strokeLinecap="round" />
                  <line x1="28" y1="40" x2="44" y2="40" stroke="#243322" strokeWidth="1.5" strokeOpacity="0.38" strokeLinecap="round" />
                  {/* Outbound response bubble with handoff mark (animates on hover) */}
                  <g className="illus-bubble-reply">
                    <rect x="46" y="44" width="56" height="30" rx="4" fill="#243322" />
                    <line x1="56" y1="54" x2="82" y2="54" stroke="#F5F2EA" strokeWidth="1.5" strokeOpacity="0.9" strokeLinecap="round" />
                    {/* Human resolution / checkmark */}
                    <circle cx="88" cy="62" r="5" fill="#D86635" />
                    <path d="M86.5 62 L87.5 63 L89.5 61" stroke="#F5F2EA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
