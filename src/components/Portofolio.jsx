import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../lib/axios'

const LABEL_MAP = { uiux:'UI/UX Design', web:'Web Development', mobile:'Mobile App', system:'System Analysis', chatbot:'Chatbot', automation:'n8n Automation', design:'Design' }

const SIZE_MAP = [
  'md:col-span-2 md:row-span-3',
  'md:col-span-2 md:row-span-2',
  'md:col-span-1 md:row-span-3',
  'md:col-span-1 md:row-span-2',
  'md:col-span-2 md:row-span-2',
  'md:col-span-2 md:row-span-1',
]

export default function Portofolio() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects')
      .then(r => {
        const data = r.data?.data ?? r.data ?? []
        const mapped = data.slice(0, 6).map((p, i) => ({
          ...p,
          label: LABEL_MAP[p.category] ?? p.category,
          sub:   `${p.client_name ?? ''}${p.duration_weeks ? ` · ${p.duration_weeks} minggu` : ''}`,
          size:  SIZE_MAP[i] ?? 'md:col-span-1 md:row-span-1',
        }))
        setProjects(mapped)
      })
      .catch(() => {})
  }, [])

  return (
    <section id="portofolio" className="px-6 md:px-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-14">
        <h2 className="font-syne text-[clamp(36px,4vw,56px)] font-extrabold tracking-[-1.5px] leading-[1.05] max-w-md">
          Karya yang
          <br />
          Kami <span className="text-stroke-sm">Banggakan</span>
        </h2>
        <p className="max-w-sm text-[15px] text-gray-karsa-muted font-light leading-relaxed pt-2">
          Beberapa proyek pilihan yang menunjukkan kemampuan dan gaya kami dalam membangun produk digital.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[100px]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.id ?? i}
            className={`${p.size} rounded-karsa relative overflow-hidden cursor-pointer group`}
            style={{ background: p.bg_color }}
            variants={{
              hidden: { y: 40, scale: 0.95, opacity: 0 },
              visible: {
                y: 0, scale: 1, opacity: 1,
                transition: { type: "spring", stiffness: 300, damping: 25, delay: i * 0.05 },
              },
            }}
            whileHover={{ scale: 0.98 }}
          >
            {p.image_url && (
              <img src={p.image_url} alt={p.title}
                className="absolute inset-0 w-full h-full object-cover" />
            )}

            {p.is_featured && (
              <span className="absolute top-3 left-3 z-10 text-[9px] font-bold tracking-widest uppercase bg-accent text-dark px-2 py-1 rounded-karsa-pill">
                Featured
              </span>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-5"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <span className="relative text-[10px] font-semibold tracking-widest uppercase bg-white/15 text-white/90 px-2.5 py-1 rounded-karsa-pill border border-white/15 mb-2 w-fit backdrop-blur-sm">
                {p.label}
              </span>
              <h3 className="relative font-syne text-lg font-extrabold text-white tracking-tight leading-snug">{p.title}</h3>
              <p className="relative text-[11px] text-white/55 mt-0.5 font-light">{p.sub}</p>
            </motion.div>

            <Link to="/portofolio" className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              →
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 flex justify-end">
        <Link to="/portofolio" className="inline-flex items-center gap-2 text-sm text-gray-karsa-muted border-b border-gray-karsa-2 pb-0.5 hover:text-dark hover:border-dark transition-colors">
          Lihat semua portofolio →
        </Link>
      </div>
    </section>
  )
}
