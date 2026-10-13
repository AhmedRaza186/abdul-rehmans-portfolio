import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'
import './Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleBtnRef = useRef(null)
  const { theme, toggleTheme } = useTheme()

  // Close menu on Escape key press and return focus to toggle button
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        toggleBtnRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Close menu on window resize above mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <header id="top" className="navbar-header" role="banner">
      <div className="navbar-container">
        <a href="/" className="navbar-wordmark" aria-label="Abdul Rahman Baig - Homepage">
          Abdul Rahman Baig<span className="navbar-dot" aria-hidden="true">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav navbar-desktop-nav" aria-label="Primary navigation">
          <ul className="navbar-nav-list">
            <li>
              <a href="#services" className="navbar-link">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="navbar-link">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="navbar-link">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Header Actions (Theme Toggle, Desktop CTA, Mobile Hamburger) */}
        <div className="navbar-actions">
          {/* Accessible Theme Toggle (Single instance visible on desktop & mobile) */}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? (
              <svg className="theme-toggle-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg className="theme-toggle-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <a
            href="https://wa.me/923253487919"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-navbar navbar-desktop-cta"
            aria-label="Let’s talk on WhatsApp"
          >
            Let’s talk
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            ref={toggleBtnRef}
            type="button"
            className={`navbar-toggle ${isOpen ? 'is-open' : ''}`}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="navbar-toggle-bar navbar-toggle-bar-1" aria-hidden="true" />
            <span className="navbar-toggle-bar navbar-toggle-bar-2" aria-hidden="true" />
            <span className="navbar-toggle-bar navbar-toggle-bar-3" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-nav-drawer"
        className={`navbar-mobile-drawer ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
        {...(!isOpen ? { inert: '' } : {})}
      >
        <div className="navbar-mobile-backdrop" onClick={() => setIsOpen(false)} aria-hidden="true" />
        <div className="navbar-mobile-panel">
          <nav className="navbar-mobile-nav" aria-label="Mobile navigation">
            <ul className="navbar-mobile-list">
              <li>
                <a
                  href="#services"
                  className="navbar-mobile-link"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={handleLinkClick}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="navbar-mobile-link"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={handleLinkClick}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="navbar-mobile-link"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={handleLinkClick}
                >
                  Contact
                </a>
              </li>
            </ul>

            <div className="navbar-mobile-action">
              <a
                href="https://wa.me/923253487919"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary navbar-mobile-btn"
                tabIndex={isOpen ? 0 : -1}
                onClick={handleLinkClick}
                aria-label="Let’s talk on WhatsApp"
              >
                Let’s talk
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
