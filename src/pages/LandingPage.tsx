import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import BookingSection from '@/components/BookingSection'
import PreFooterBanner from '@/components/PreFooterBanner'
import Footer from '@/components/Footer'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <BookingSection />
      <PreFooterBanner />
      <Footer />
    </>
  )
}