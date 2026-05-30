import { useEffect, useRef } from 'react'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  const titleRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(32px)'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })
  }, [])

  return (
    <section className="min-h-screen pt-36 pb-20 px-6 md:px-12 flex flex-col relative overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }}
      />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-dark text-accent text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-karsa-pill w-fit mb-9 opacity-0 animate-fadeUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse_dot" />
        Platform Jasa Digital
      </div>

      {/* Title */}
      <h1
        ref={titleRef}
        className="font-syne text-[clamp(52px,7.5vw,100px)] font-extrabold leading-[1.0] tracking-[-3px] max-w-4xl mb-8"
      >
        Wujudkan<br />
        Ide Digital<br />
        <span className="text-stroke">Bersama Kami</span>
      </h1>

      {/* Sub row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mt-auto">
        <p className="max-w-md text-[17px] leading-[1.75] text-gray-karsa-muted font-light opacity-0 animate-fadeUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          Kami hadir untuk mengubah visi bisnis Anda menjadi produk digital yang fungsional, indah, dan berdampak — dari UI/UX hingga pengembangan penuh.
        </p>

        <div className="flex items-center gap-4 flex-shrink-0 opacity-0 animate-fadeUp" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <a
            href="#layanan"
            className="inline-flex items-center gap-2.5 bg-dark text-accent px-7 py-4 rounded-karsa-pill text-[15px] font-medium hover:-translate-y-0.5 transition-transform duration-200"
          >
            Lihat Layanan
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <a
            href="#portofolio"
            className="inline-flex items-center gap-2 text-dark text-[15px] border-b border-dark pb-0.5 hover:opacity-60 transition-opacity"
          >
            Lihat Portofolio
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-10 bottom-10 hidden lg:flex flex-col items-center gap-2 text-[10px] tracking-widest uppercase text-gray-karsa-muted">
        <div className="w-px h-14 bg-gradient-to-b from-dark to-transparent animate-scrollLine" />
        <span>Scroll</span>
      </div>

      {/* Decorative circle */}
      <div className="absolute -right-40 top-20 w-[500px] h-[500px] rounded-full border border-dark/5 pointer-events-none hidden lg:block" />
      <div className="absolute -right-20 top-40 w-[300px] h-[300px] rounded-full border border-dark/5 pointer-events-none hidden lg:block" />
    </section>
  )
}
