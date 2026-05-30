import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/axios'

// Fallback jika API belum ready
const FALLBACK = [
  { id:1, title:'DanaKita — Fintech App',        label:'UI/UX Design',    sub:'Mobile · 500K Pengguna',     bg_color:'#1A1F3A', size:'md:col-span-7 md:row-span-2' },
  { id:2, title:'Pasar Lokal — E-Commerce',      label:'Web Development', sub:'UMKM · Laravel + Vue.js',    bg_color:'#1A3A30', size:'md:col-span-5' },
  { id:3, title:'RumahSehat — Klinik Dashboard', label:'System Analysis', sub:'Enterprise · Dokumentasi',   bg_color:'#2E3220', size:'md:col-span-5' },
]

const SIZE_MAP = [
  'md:col-span-7 md:row-span-2',
  'md:col-span-5',
  'md:col-span-5',
]

export default function Portofolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    api.get('/projects?featured=1&limit=3')
      .then(r => {
        const data = r.data?.data ?? []
        const mapped = data.slice(0, 3).map((p, i) => ({
          ...p,
          label: { uiux:'UI/UX Design', web:'Web Development', mobile:'Mobile App', system:'System Analysis' }[p.category] ?? p.category,
          sub:   `${p.client_name ?? ''}${p.duration_weeks ? ` · ${p.duration_weeks} minggu` : ''}`,
          size:  SIZE_MAP[i] ?? 'md:col-span-4',
        }))
        setProjects(mapped.length ? mapped : FALLBACK)
      })
      .catch(() => setProjects(FALLBACK))
      .finally(() => setLoading(false))
  }, [])

  const list = loading ? FALLBACK : projects

  return (
    <section id="portofolio" className="px-6 md:px-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-14">
        <h2 className="font-syne text-[clamp(36px,4vw,56px)] font-extrabold tracking-[-1.5px] leading-[1.05] max-w-md">
          Karya yang<br />
          Kami <span className="text-stroke-sm">Banggakan</span>
        </h2>
        <p className="max-w-sm text-[15px] text-gray-karsa-muted font-light leading-relaxed pt-2">
          Beberapa proyek pilihan yang menunjukkan kemampuan dan gaya kami dalam membangun produk digital.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[180px]">
        {list.map((p, i) => (
          <div key={p.id ?? i}
            className={`${p.size} rounded-karsa relative overflow-hidden flex flex-col justify-end p-7 cursor-pointer group`}
            style={{ background: p.bg_color }}>
  {p.image_url && (
    <img src={p.image_url} alt={p.title}
      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
  )}
            {/* Featured badge */}
            {p.is_featured && (
              <span className="absolute top-4 left-4 z-10 text-[9px] font-bold tracking-widest uppercase bg-accent text-dark px-2.5 py-1 rounded-karsa-pill">
                Featured
              </span>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            <div className="relative z-10">
              <span className="inline-block text-[10px] font-semibold tracking-widest uppercase bg-white/15 text-white/90 px-3 py-1 rounded-karsa-pill mb-2.5 border border-white/15 backdrop-blur-sm">
                {p.label}
              </span>
              <h3 className="font-syne text-xl font-extrabold text-white tracking-tight leading-snug">{p.title}</h3>
              <p className="text-[12px] text-white/55 mt-1 font-light">{p.sub}</p>
            </div>

            <Link to="/portofolio" className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
              →
            </Link>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-end">
        <Link to="/portofolio" className="inline-flex items-center gap-2 text-sm text-gray-karsa-muted border-b border-gray-karsa-2 pb-0.5 hover:text-dark hover:border-dark transition-colors">
          Lihat semua portofolio →
        </Link>
      </div>
    </section>
  )
}
