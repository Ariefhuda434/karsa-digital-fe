import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-cream overflow-hidden pt-28">
      {/* Corner decorative frames */}
      <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-dark/10 z-10" />
      <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 border-t-2 border-r-2 border-dark/10 z-10" />
      <div className="absolute left-0 w-12 h-12 md:w-16 md:h-16 border-b-2 border-l-2 border-dark/10 z-10" style={{ bottom: '12vh' }} />
      <div className="absolute right-0 w-12 h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-dark/10 z-10" style={{ bottom: '12vh' }} />

      {/* Background grain */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }}
      />

      <div className="relative z-10 flex min-h-[calc(100vh-7rem)] items-center">
        <div className="container mx-auto px-6 md:px-12 lg:ml-[8%]">
          <div className="max-w-2xl">
            {/* Decorative header line */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-px bg-dark/40" />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-karsa-muted font-dm">
                Platform Jasa Digital
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-syne text-[clamp(48px,7vw,88px)] font-extrabold leading-[1.0] tracking-[-3px] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Wujudkan
              <br />
              Ide Digital
              <br />
              <span className="text-stroke">Bersama Kami</span>
            </motion.h1>

            {/* Decorative dots */}
            <motion.div
              className="flex gap-1 mb-6 opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 bg-dark rounded-full" />
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-[17px] leading-[1.75] text-gray-karsa-muted font-light max-w-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Kami hadir untuk mengubah visi bisnis Anda menjadi produk digital yang fungsional, indah, dan berdampak — dari UI/UX hingga pengembangan penuh.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <a
                href="/#layanan"
                className="relative inline-flex items-center gap-2.5 bg-dark text-accent px-7 py-4 rounded-karsa-pill text-[15px] font-medium hover:-translate-y-0.5 transition-transform duration-200 group"
              >
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                Lihat Layanan
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>

              <a
                href="/#portofolio"
                className="inline-flex items-center gap-2 text-dark text-[15px] border border-dark/30 px-7 py-4 rounded-karsa-pill hover:bg-dark hover:text-accent transition-all duration-200"
              >
                Lihat Portofolio
                <ArrowRight size={14} />
              </a>
            </motion.div>

            {/* Bottom decorative line */}
            <motion.div
              className="hidden md:flex items-center gap-3 mt-12 opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-dark text-[9px] font-mono tracking-wider">∞</span>
              <div className="flex-1 h-px bg-dark/30" />
              <span className="text-dark text-[9px] font-mono tracking-wider">KARSA DIGITAL</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <motion.div
        className="absolute left-0 right-0 z-10 border-t border-dark/10 bg-cream/80 backdrop-blur-sm"
        style={{ bottom: '5vh' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="container mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6 text-[9px] font-mono text-gray-karsa-muted">
            <span className="hidden md:inline">SYSTEM.ACTIVE</span>
            <span className="md:hidden">SYS.ACT</span>
            <div className="hidden md:flex gap-1">
              {[6, 10, 5, 14, 8, 12, 7, 9].map((h, i) => (
                <div key={i} className="w-1 bg-dark/20" style={{ height: `${h}px` }} />
              ))}
            </div>
            <span>V1.0.0</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4 text-[9px] font-mono text-gray-karsa-muted">
            <span className="hidden md:inline">◐ RENDERING</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-dark/40 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-dark/30 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-dark/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="hidden md:inline">FRAME: ∞</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute right-8 bottom-[15vh] hidden lg:flex flex-col items-center gap-2 text-[10px] tracking-widest uppercase text-gray-karsa-muted">
        <div className="w-px h-14 bg-gradient-to-b from-dark to-transparent animate-scrollLine" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
