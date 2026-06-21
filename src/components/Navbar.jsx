import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToSection = (sectionId) => {
    setMenuOpen(false)
    setPosition((pv) => ({ ...pv, opacity: 0 }))
    navigate('/', { replace: true })
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const links = [
    { label: 'Layanan', id: 'layanan' },
    { label: 'Proses', id: 'proses' },
    { label: 'Portofolio', id: 'portofolio' },
    { label: 'Klien', id: 'testimoni' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-300 ${
      scrolled ? 'bg-cream/90 backdrop-blur-md border-b border-black/5 shadow-sm' : 'bg-transparent'
    }`}>
      <Link to="/" className="font-syne text-xl font-extrabold tracking-tight text-dark flex items-center gap-1">
        Karsa
        <span className="bg-dark text-accent px-2 py-0.5 rounded-md text-sm">.</span>
      </Link>

      <ul
        className="hidden md:flex relative mx-auto w-fit items-center gap-1"
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      >
        {links.map((l) => (
          <NavTab key={l.id} label={l.label} onClick={() => goToSection(l.id)} setPosition={setPosition} />
        ))}
        <Cursor position={position} />
      </ul>

      <Link
        to="/pesan"
        className="hidden md:inline-flex items-center gap-2 bg-dark text-accent text-sm font-medium px-5 py-2.5 rounded-karsa-pill hover:bg-mid transition-colors duration-200"
      >
        Mulai Proyek →
      </Link>

      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-cream border-b border-black/8 px-6 py-6 flex flex-col gap-4 md:hidden">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => goToSection(l.id)}
              className="text-base text-dark font-medium py-1 text-left"
            >
              {l.label}
            </button>
          ))}
          <Link
            to="/pesan"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center bg-dark text-accent text-sm font-medium px-5 py-3 rounded-karsa-pill mt-2"
          >
            Mulai Proyek →
          </Link>
        </div>
      )}
    </nav>
  )
}

function NavTab({ label, onClick, setPosition }) {
  const ref = useRef(null)
  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft })
      }}
      className="relative z-10 block cursor-pointer px-4 py-2 text-sm text-gray-karsa-muted hover:text-dark transition-colors duration-200 font-dm"
    >
      {label}
    </li>
  )
}

function Cursor({ position }) {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-8 rounded-full bg-dark/10"
    />
  )
}
