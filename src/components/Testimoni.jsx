const TESTIMONIALS = [
  {
    stars: 5,
    text: 'Karsa benar-benar memahami visi kami. Desain yang mereka buat jauh melampaui ekspektasi — pengguna kami langsung jatuh cinta.',
    name: 'Rizky Aditya', role: 'CEO, Startup Teknologi',
    initials: 'RA', color: '#C8FF00', textColor: '#1A1A18',
  },
  {
    stars: 5,
    text: 'Proses komunikasinya sangat transparan. Kami selalu tahu perkembangan proyek dan hasilnya delivered tepat waktu.',
    name: 'Sari Setiawati', role: 'Product Manager, UMKM Digital',
    initials: 'SS', color: '#80B8FF', textColor: '#1A1A18',
  },
  {
    stars: 5,
    text: 'Aplikasi mobile yang mereka bangun sudah diunduh lebih dari 50.000 kali dalam 3 bulan pertama. Kualitas kodenya sangat rapi.',
    name: 'Budi Hartono', role: 'Founder, Agri-Tech Startup',
    initials: 'BH', color: '#FFB380', textColor: '#1A1A18',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C8FF00">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimoni() {
  return (
    <section id="testimoni" className="bg-dark px-6 md:px-12 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-14">
        <h2 className="font-syne text-[clamp(36px,4vw,56px)] font-extrabold tracking-[-1.5px] leading-[1.05] text-white max-w-md">
          Apa Kata<br />
          <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.35)', color: 'transparent' }}>Klien Kami</span>
        </h2>
        <p className="max-w-xs text-[15px] text-white/40 font-light leading-relaxed pt-2">
          Kepercayaan klien adalah aset terbesar kami. Inilah yang mereka rasakan bekerja bersama Karsa.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-white/4 border border-white/8 rounded-karsa-md p-8 hover:bg-white/6 transition-colors duration-200">
            <Stars count={t.stars} />
            <p className="text-[15px] text-white/65 leading-[1.8] font-light italic mb-6">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-syne text-sm font-extrabold flex-shrink-0"
                style={{ background: t.color, color: t.textColor }}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-white font-syne">{t.name}</p>
                <p className="text-xs text-white/35 font-light mt-0.5">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
