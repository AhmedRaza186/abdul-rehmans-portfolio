import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CertificatesSection.css'

gsap.registerPlugin(ScrollTrigger)

const certificates = [
  {
    id: 'google-cybersecurity',
    title: 'Google Cybersecurity',
    issuer: 'Google',
    date: 'Aug 23, 2024',
    credentialNote: 'Professional Certificate · 8 Courses',
    previewSrc: '/certificates/CERTIFICATE_LANDING_PAGE~7AYJPAVIQZ7C.jpeg',
    fileSrc: '/certificates/CERTIFICATE_LANDING_PAGE~7AYJPAVIQZ7C.jpeg',
    alt: 'Google Cybersecurity Professional Certificate awarded to Abdul Rahman Baig on August 23, 2024',
  },
  {
    id: 'one-million-prompters',
    title: 'One Million Prompters',
    issuer: 'Dubai Future Foundation & Dubai Centre for AI',
    date: null,
    credentialNote: 'Prompt Engineering for AI Systems',
    previewSrc: '/certificates/abdul-rahman-baig-certificate-thumb.jpg',
    fileSrc: '/certificates/abdul-rahman-baig-certificate.pdf',
    alt: 'Certificate of Completion for the One Million Prompters initiative in prompt engineering awarded to Abdul Rahman Baig by Dubai Future Foundation and Dubai Centre for Artificial Intelligence',
  },
]

export default function CertificatesSection() {
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
        '.certs-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      ).fromTo(
        '.cert-card',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
        },
        '-=0.3'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="certificates" ref={sectionRef} className="certs-section" aria-label="Certificates">
      <div className="certs-container">
        {/* Editorial Section Header */}
        <header className="certs-header">
          <p className="certs-eyebrow">
            <span className="certs-eyebrow-dot" aria-hidden="true" />
            <span>CERTIFICATES</span>
          </p>

          <h2 className="certs-heading">
            <span>Learning</span>
            <span className="certs-heading-accent">behind the work.</span>
          </h2>
        </header>

        {/* Side-by-Side Certificate Previews */}
        <div className="certs-grid">
          {certificates.map((cert) => (
            <article key={cert.id} className="cert-card">
              <a
                href={cert.fileSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-preview-link"
                aria-label={`Open ${cert.title} certificate in new tab`}
              >
                <div className="cert-preview-frame">
                  <img
                    src={cert.previewSrc}
                    alt={cert.alt}
                    loading="lazy"
                    className="cert-preview-img"
                  />
                </div>
              </a>

              <div className="cert-meta">
                <div className="cert-meta-info">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">
                    <span>{cert.issuer}</span>
                    {cert.date && (
                      <>
                        <span className="cert-meta-separator" aria-hidden="true">·</span>
                        <span className="cert-date">{cert.date}</span>
                      </>
                    )}
                  </p>
                  <p className="cert-note">{cert.credentialNote}</p>
                </div>

                <a
                  href={cert.fileSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-view-action"
                  aria-label={`View full ${cert.title} certificate in a new tab`}
                >
                  View certificate
                  <span className="cert-view-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
