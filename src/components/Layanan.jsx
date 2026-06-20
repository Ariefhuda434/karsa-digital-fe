import { useState } from 'react'
import { Monitor, Globe, Bot, Workflow, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'

const CATEGORIES = [
  { id: 'all',        label: 'Semua Layanan'   },
  { id: 'uiux',       label: 'UI/UX Design'    },
  { id: 'web',        label: 'Website'         },
  { id: 'chatbot',    label: 'Chatbot'         },
  { id: 'automation', label: 'n8n Automation'  },
  { id: 'design',     label: 'Design'          },
]

const SERVICES = [
  {
    id: 1, cat: 'uiux', variant: 'dark',
    num: '01', icon: Monitor,
    title: 'UI/UX Design',
    desc: 'Dari wireframe kasar hingga prototype hi-fi yang bisa diklik — kami rancang pengalaman pengguna yang intuitif, estetik, dan siap handoff ke developer.',
    tags: ['Wireframing', 'Prototyping', 'Design System', 'User Research', 'Figma'],
  },
  {
    id: 2, cat: 'web', variant: 'light',
    num: '02', icon: Globe,
    title: 'Website',
    desc: 'Landing page, company profile, portal bisnis, toko online — dibangun modern, cepat, SEO-friendly, dan mudah dikelola.',
    tags: ['Landing Page', 'Company Profile', 'Portal Bisnis', 'Toko Online', 'CMS', 'React', 'Laravel'],
  },
  {
    id: 3, cat: 'chatbot', variant: 'accent',
    num: '03', icon: Bot,
    title: 'Chatbot',
    desc: 'Bot WhatsApp, Telegram, atau AI chatbot untuk customer service, lead generation, dan otomatisasi chat — siap integrasi dengan sistem kamu.',
    tags: ['WhatsApp Bot', 'Telegram Bot', 'AI Chatbot', 'Integrasi API', 'Customer Service'],
  },
  {
    id: 4, cat: 'automation', variant: 'light',
    num: '04', icon: Workflow,
    title: 'n8n Automation',
    desc: 'Otomatisasi workflow dengan n8n — hubungkan aplikasi, kirim notifikasi otomatis, scraping data, dan integrasi API tanpa coding rumit.',
    tags: ['Workflow Otomatis', 'Integrasi API', 'Scraping Data', 'Notifikasi', 'n8n'],
  },
  {
    id: 5, cat: 'design', variant: 'dark',
    num: '05', icon: Palette,
    title: 'Design (Canva & Figma)',
    desc: 'Desain komik Canva, tugas kuliah, infografis, presentasi kreatif, dan materi visual lainnya — cepat, menarik, dan sesuai kebutuhan.',
    tags: ['Desain Komik', 'Tugas Kuliah', 'Infografis', 'Presentasi Kreatif', 'Canva', 'Figma'],
  },
]

function ServiceCard({ svc }) {
  const Icon     = svc.icon
  const isDark   = svc.variant === 'dark'
  const isAccent = svc.variant === 'accent'

  const bg         = isDark ? 'bg-dark' : isAccent ? 'bg-accent' : 'bg-white'
  const border     = isDark || isAccent ? '' : 'border border-black/6'
  const numColor   = isDark ? 'text-white/25'  : isAccent ? 'text-dark/35'  : 'text-gray-karsa-3'
  const iconBg     = isDark ? 'bg-white/8'     : isAccent ? 'bg-dark/10'    : 'bg-gray-karsa-1'
  const iconColor  = isDark ? '#C8FF00'        : '#1A1A18'
  const titleColor = isDark ? 'text-white'     : 'text-dark'
  const descColor  = isDark ? 'text-white/45'  : isAccent ? 'text-dark/55'  : 'text-gray-karsa-muted'
  const tagBg      = isDark ? 'bg-white/8 text-white/45' : isAccent ? 'bg-dark/10 text-dark/55' : 'bg-gray-karsa-1 text-gray-karsa-muted'
  const arrowColor = isDark ? 'text-accent'    : 'text-dark'
  const arrowBg    = isDark ? 'bg-accent text-dark' : isAccent ? 'bg-dark text-accent' : 'bg-dark text-white'

  return (
    <div className={`${bg} ${border} rounded-karsa p-9 flex flex-col group hover:-translate-y-1 transition-transform duration-300`}>
      <p className={`font-syne text-[11px] font-semibold tracking-widest uppercase mb-16 ${numColor}`}>
        {svc.num} — {svc.title}
      </p>
      <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-5`}>
        <Icon size={22} color={iconColor} strokeWidth={1.8} />
      </div>
      <h3 className={`font-syne text-2xl font-bold tracking-tight leading-snug mb-3 ${titleColor}`}>{svc.title}</h3>
      <p className={`text-sm leading-relaxed font-light mb-6 flex-1 ${descColor}`}>{svc.desc}</p>
      <div className="flex flex-wrap gap-2 mb-7">
        {svc.tags.map(t => (
          <span key={t} className={`text-xs px-3 py-1.5 rounded-karsa-pill ${tagBg}`}>{t}</span>
        ))}
      </div>
      <Link to="/pesan" className={`inline-flex items-center gap-2.5 mt-auto text-sm font-medium group-hover:gap-4 transition-all ${arrowColor}`}>
        Mulai Proyek
        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${arrowBg}`}>→</span>
      </Link>
    </div>
  )
}

export default function Layanan() {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? SERVICES : SERVICES.filter(s => s.cat === active)

  return (
    <section id="layanan" className="py-0">
      <div className="px-6 md:px-12 pt-20 pb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-karsa-muted mb-8">Kategori Layanan</p>
        <div className="inline-flex flex-wrap items-center bg-[#E8E5DE] rounded-karsa-pill p-1.5 gap-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-6 py-2.5 rounded-karsa-pill text-[14px] font-dm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                active === cat.id
                  ? 'bg-white text-dark shadow-sm font-medium'
                  : 'text-gray-karsa-muted hover:text-dark'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(svc => <ServiceCard key={svc.id} svc={svc} />)}
        </div>
      </div>
    </section>
  )
}
