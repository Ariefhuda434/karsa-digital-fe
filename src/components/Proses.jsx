import { Search, Pencil, Settings, Rocket } from 'lucide-react'

const STEPS = [
  {
    num: '01', icon: Search,
    title: 'Diskusi & Riset',
    desc: 'Kami mendengarkan kebutuhan Anda, memahami target pengguna, dan menganalisis kompetitor untuk landasan yang kuat.',
  },
  {
    num: '02', icon: Pencil,
    title: 'Desain & Wireframe',
    desc: 'Kami merancang alur, wireframe, dan prototype interaktif sebelum masuk ke tahap pengembangan.',
  },
  {
    num: '03', icon: Settings,
    title: 'Pengembangan',
    desc: 'Tim kami membangun solusi dengan teknologi modern, code yang bersih, dan testing di setiap sprint.',
  },
  {
    num: '04', icon: Rocket,
    title: 'Lansir & Dukungan',
    desc: 'Setelah peluncuran, kami tetap standby untuk performa optimal dan pengembangan lanjutan.',
  },
]

export default function Proses() {
  return (
    <section id="proses" className="px-6 md:px-12 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16">
        <h2 className="font-syne text-[clamp(36px,4vw,56px)] font-extrabold tracking-[-1.5px] leading-[1.05] max-w-md">
          Cara Kami<br />
          Bekerja <span className="text-stroke-sm">Untuk Anda</span>
        </h2>
        <p className="max-w-xs text-[15px] text-gray-karsa-muted font-light leading-relaxed pt-2">
          Proses kami transparan, kolaboratif, dan terstruktur — sehingga Anda selalu tahu apa yang sedang terjadi.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border border-black/8 rounded-karsa overflow-hidden">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
            <div
              key={i}
              className="p-8 md:p-7 border-r border-black/8 last:border-r-0 hover:bg-white transition-colors duration-200 group"
            >
              <p className="font-syne text-[10px] font-semibold tracking-widest uppercase text-gray-karsa-muted mb-10">{step.num}</p>
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-karsa-1 group-hover:bg-accent transition-colors duration-300 mb-5">
                <Icon size={18} strokeWidth={1.8} className="text-dark" />
              </div>
              <h4 className="font-syne text-[17px] font-bold tracking-tight mb-3">{step.title}</h4>
              <p className="text-[13px] text-gray-karsa-muted font-light leading-relaxed">{step.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
