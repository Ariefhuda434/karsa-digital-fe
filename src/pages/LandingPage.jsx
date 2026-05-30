// src/pages/LandingPage.jsx
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Layanan from '../components/Layanan'
import Stats from '../components/Stats'
import Proses from '../components/Proses'
import Portofolio from '../components/Portofolio'
import Testimoni from '../components/Testimoni'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <Layanan />
      <Stats />
      <Proses />
      <Portofolio />
      <Testimoni />
      <CTA />
      <Footer />
    </main>
  )
}