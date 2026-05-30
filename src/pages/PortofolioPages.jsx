import { useState, useEffect } from 'react'
import { ArrowRight, X, ExternalLink, Loader2, AlertTriangle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../lib/axios'

const CATS = [
  { id:'all',    label:'Semua'           },
  { id:'uiux',   label:'UI/UX Design'    },
  { id:'web',    label:'Web Development' },
  { id:'mobile', label:'Mobile App'      },
  { id:'system', label:'System Analysis' },
]

function Modal({ project, onClose }) {
  if (!project) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cream w-full sm:max-w-2xl rounded-t-karsa sm:rounded-karsa max-h-[90vh] overflow-y-auto z-10">
        <div className="h-48 rounded-t-karsa flex items-end p-8 relative overflow-hidden"
          style={{ background: project.bg_color || '#1A1F3A' }}>
              {project.image_url && (
    <img src={project.image_url} alt={project.title}
      className="absolute inset-0 w-full h-full object-cover" />
  )}
  
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="relative z-10">
            <span className="text-[10px] font-semibold tracking-widest uppercase bg-white/15 text-white/90 px-3 py-1 rounded-karsa-pill border border-white/15 mb-3 inline-block">
              {CATS.find(c => c.id === project.category)?.label}
            </span>
            <h2 className="font-syne text-2xl font-extrabold text-white tracking-tight leading-tight">{project.title}</h2>
          </div>
          <button onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-8">
          {project.result_stats?.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-8">
              {project.result_stats.map((s, i) => (
                <div key={i} className="bg-white border border-black/6 rounded-karsa-md p-4 text-center">
                  <p className="font-syne text-2xl font-extrabold text-dark tracking-tight">{s.num}</p>
                  <p className="text-[11px] text-gray-karsa-muted mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            {project.client_name && (
              <div className="text-gray-karsa-muted">
                <span className="font-medium text-dark">Klien:</span> {project.client_name}
              </div>
            )}
            {project.duration_weeks && (
              <div className="text-gray-karsa-muted">
                <span className="font-medium text-dark">Durasi:</span> {project.duration_weeks} minggu
              </div>
            )}
          </div>

          {project.description && (
            <p className="text-[15px] text-gray-karsa-muted font-light leading-relaxed mb-6">{project.description}</p>
          )}

          {project.tech_stack?.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-karsa-muted mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map(t => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-karsa-pill bg-dark text-accent font-medium">{t}</span>
                ))}
              </div>
            </div>
          )}

          <a href="/pesan"
            className="mt-8 inline-flex items-center gap-2.5 bg-dark text-accent px-6 py-3.5 rounded-karsa-pill text-sm font-semibold font-syne hover:-translate-y-0.5 transition-transform">
            Buat Proyek Serupa <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function PortofolioPages() {
  const [cat, setCat]           = useState('all')
  const [selected, setSelected] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    api.get('/projects')
      .then(res => { if (!cancelled) setProjects(res.data?.data ?? res.data) })
      .catch(() => { if (!cancelled) setError('Gagal memuat proyek.') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const filtered = cat === 'all' ? projects : projects.filter(p => p.category === cat)

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="pt-32 pb-20 px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-black/8 pb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-karsa-muted mb-4">Karya Pilihan</p>
            <h1 className="font-syne text-[clamp(40px,5vw,72px)] font-extrabold tracking-[-2px] leading-[1.0]">
              Portofolio<br /><span className="text-stroke">Kami</span>
            </h1>
          </div>
          <p className="max-w-sm text-[15px] text-gray-karsa-muted font-light leading-relaxed">
            Setiap proyek adalah cerita yang berbeda. Dari startup tahap awal hingga enterprise.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`px-5 py-2 rounded-karsa-pill text-sm font-dm border transition-all duration-200
                ${cat === c.id ? 'bg-dark text-accent border-dark' : 'border-black/12 text-gray-karsa-muted hover:border-dark hover:text-dark'}`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* States */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 size={24} className="animate-spin text-gray-karsa-muted" />
            <p className="text-sm text-gray-karsa-muted font-light">Memuat proyek...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-400" />
            </div>
            <p className="text-sm text-gray-karsa-muted">{error}</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(p => (
                <div key={p.id} onClick={() => setSelected(p)}
                  className="group rounded-karsa overflow-hidden cursor-pointer relative min-h-[260px] flex flex-col justify-end hover:scale-[0.98] transition-transform duration-300"
                  style={{ background: p.bg_color || '#1A1F3A' }}>
                      {p.image_url && (
    <img src={p.image_url} alt={p.title}
      className="absolute inset-0 w-full h-full object-cover" />
  )}
                  {p.is_featured && (
                    <span className="absolute top-4 left-4 text-[9px] font-bold tracking-widest uppercase bg-accent text-dark px-2.5 py-1 rounded-karsa-pill z-10">
                      Featured
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={13} />
                  </div>
                  <div className="relative z-10 p-6">
                    <span className="text-[10px] font-semibold tracking-widest uppercase bg-white/15 text-white/80 px-2.5 py-1 rounded-karsa-pill border border-white/15 mb-3 inline-block">
                      {CATS.find(c => c.id === p.category)?.label}
                    </span>
                    <h3 className="font-syne text-lg font-extrabold text-white tracking-tight leading-snug">{p.title}</h3>
                    {p.subtitle && <p className="text-xs text-white/50 mt-1 font-light">{p.subtitle}</p>}
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-karsa-muted font-light">Belum ada proyek di kategori ini.</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
      <Modal project={selected} onClose={() => setSelected(null)} />
    </div>
  )
}