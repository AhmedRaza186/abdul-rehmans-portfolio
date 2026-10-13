import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-section" role="contentinfo">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-identity">
            <a href="#top" className="footer-name-link" aria-label="Abdul Rahman Baig - Back to top">
              <span className="footer-name">Abdul Rahman Baig</span>
              <span className="footer-dot" aria-hidden="true">.</span>
            </a>
            <span className="footer-separator" aria-hidden="true">·</span>
            <span className="footer-copyright">© {currentYear}</span>
          </p>

          <a href="#top" className="footer-back-to-top" aria-label="Back to top of page">
            Back to top
            <span className="footer-arrow" aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
