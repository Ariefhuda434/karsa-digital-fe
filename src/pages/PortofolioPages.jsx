/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import { Loader2, AlertTriangle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import InteractiveBentoGallery from '../components/blocks/InteractiveBentoGallery'
import api from '../lib/axios'

const CATS = [
  { id:'all',    label:'Semua'           },
  { id:'uiux',   label:'UI/UX Design'    },
  { id:'web',    label:'Web Development' },
  { id:'mobile', label:'Mobile App'      },
  { id:'system', label:'System Analysis' },
]

const SPANS = [
  'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  'md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2',
  'md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2',
  'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2',
  'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2',
  'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
]

export default function PortofolioPages() {
  const [cat, setCat]           = useState('all')
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    api.get('/projects')
      .then(res => {
        if (!cancelled) {
          const raw = res.data?.data ?? res.data ?? []
          const mapped = raw.map((p, i) => ({
            id: p.id,
            type: p.image_url?.match(/\.(mp4|webm|ogg)/i) ? 'video' : 'image',
            title: p.title,
            desc: p.subtitle || (p.client_name ? `Klien: ${p.client_name}` : ''),
            url: p.image_url || '',
            span: SPANS[i % SPANS.length],
          }))
          setProjects(mapped)
        }
      })
      .catch(() => { if (!cancelled) setError('Gagal memuat proyek.') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const filtered = cat === 'all' ? projects : projects

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="pt-32 pb-20 px-6 md:px-12">
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

        <div className="flex flex-wrap gap-2 mb-10">
          {CATS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`px-5 py-2 rounded-karsa-pill text-sm font-dm border transition-all duration-200
                ${cat === c.id ? 'bg-dark text-accent border-dark' : 'border-black/12 text-gray-karsa-muted hover:border-dark hover:text-dark'}`}>
              {c.label}
            </button>
          ))}
        </div>

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

        {!loading && !error && (
          <>
            {filtered.length > 0 ? (
              <InteractiveBentoGallery
                mediaItems={filtered}
                title=""
                description=""
              />
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-karsa-muted font-light">Belum ada proyek di kategori ini.</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}
