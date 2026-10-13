import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServiceStrip from './components/ServiceStrip'
import ServicesSection from './components/ServicesSection'
import AboutSection from './components/AboutSection'
import CertificatesSection from './components/CertificatesSection'
import ContactSection from './components/ContactSection'
import ClosingCTA from './components/ClosingCTA'
import Footer from './components/Footer'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ServiceStrip />
        <ServicesSection />
        <AboutSection />
        <CertificatesSection />
        <ContactSection />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
