  const LINKS = {
    Layanan: ['UI/UX Design', 'Web Development', 'Micro Site', 'Presentasi'],
    Perusahaan: ['Tentang Kami', 'Portofolio', 'Blog', 'Karir'],
    Kontak: ['ariefhuda434@gmail.com', '+62 822-7211-8779', 'Medan, Sumatera Utara'],
  }

  const SOCIALS = [
    { link: 'https://www.instagram.com/ariefhuda_',label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
    { link:'https://www.linkedin.com/in/muhammad-arief-huda-1a011b38b/', label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  ]

  export default function Footer() {
    return (
      <footer className="bg-dark px-6 md:px-12 pt-16 pb-10">
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-12 border-b border-white/8">
          {/* Brand */}
          <div>
            <p className="font-syne text-[28px] font-extrabold text-accent mb-3">Karsa.</p>
            <p className="text-sm text-white/35 font-light leading-relaxed max-w-[220px]">
              Platform jasa digital terpercaya untuk bisnis yang ingin tumbuh bersama teknologi.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30 mb-4">{group}</p>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="/#layanan" className="text-sm text-white/50 font-light hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8">
          <p className="text-xs text-white/25 font-light">© 2026 Karsa. Semua hak dilindungi.</p>
          <div className="flex gap-4">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.link} aria-label={s.label}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-accent hover:text-accent transition-all duration-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    )
  }
