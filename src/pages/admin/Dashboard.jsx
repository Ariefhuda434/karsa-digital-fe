/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from 'react'
import { LayoutDashboard, ShoppingBag, FolderOpen, Star, LogOut, Menu, X,
  TrendingUp, CheckCircle, AlertCircle, Plus, Pencil, Trash2, Eye,
  RefreshCw, Loader2, AlertTriangle, Upload, ImageOff } from 'lucide-react'
import api from '../../lib/axios'

const STATUS_CONFIG = {
  pending:     { label:'Menunggu Review', bg:'bg-yellow-100', text:'text-yellow-700' },
  in_review:   { label:'Sedang Direview', bg:'bg-blue-100',   text:'text-blue-700'   },
  accepted:    { label:'Diterima',        bg:'bg-green-100',  text:'text-green-700'  },
  in_progress: { label:'Dikerjakan',      bg:'bg-purple-100', text:'text-purple-700' },
  done:        { label:'Selesai',         bg:'bg-gray-100',   text:'text-gray-600'   },
  cancelled:   { label:'Dibatalkan',      bg:'bg-red-100',    text:'text-red-600'    },
}

const CAT_LABEL = { uiux:'UI/UX Design', web:'Web Dev', mobile:'Mobile App', system:'System Analysis', chatbot:'Chatbot', automation:'n8n Automation', design:'Design' }

function StatusBadge({ status }) {
  const c = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  return (
    <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-karsa-pill ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div className={`rounded-karsa-md p-6 ${accent ? 'bg-dark text-white' : 'bg-white border border-black/6'}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${accent ? 'bg-white/10' : 'bg-gray-karsa-1'}`}>
        <Icon size={16} className={accent ? 'text-accent' : 'text-gray-karsa-muted'} />
      </div>
      <p className={`font-syne text-3xl font-extrabold tracking-tight mb-1 ${accent ? 'text-accent' : 'text-dark'}`}>{value}</p>
      <p className={`text-sm font-medium ${accent ? 'text-white' : 'text-dark'}`}>{label}</p>
      {sub && <p className={`text-xs mt-0.5 ${accent ? 'text-white/40' : 'text-gray-karsa-muted'}`}>{sub}</p>}
    </div>
  )
}

function LoadingState({ text = 'Memuat data...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Loader2 size={24} className="animate-spin text-gray-karsa-muted" />
      <p className="text-sm text-gray-karsa-muted font-light">{text}</p>
    </div>
  )
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
        <AlertTriangle size={20} className="text-red-500" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-dark mb-1">Gagal memuat data</p>
        <p className="text-xs text-gray-karsa-muted font-light">{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-karsa-pill border border-black/12 text-sm text-gray-karsa-muted hover:border-dark hover:text-dark transition-colors">
          <RefreshCw size={13} /> Coba Lagi
        </button>
      )}
    </div>
  )
}

function Sidebar({ active, setActive, open, setOpen }) {
  const items = [
    { id:'overview',  icon:LayoutDashboard, label:'Overview'  },
    { id:'orders',    icon:ShoppingBag,     label:'Orders'    },
    { id:'projects',  icon:FolderOpen,      label:'Proyek'    },
    { id:'feedbacks', icon:Star,            label:'Feedback'  },
  ]
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-dark z-30 flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="px-6 py-6 border-b border-white/8">
          <a href="/" className="font-syne text-xl font-extrabold text-accent">Karsa<span className="text-white">.</span></a>
          <p className="text-[11px] text-white/30 mt-1 font-light">Admin Dashboard</p>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {items.map(it => {
            const Icon = it.icon
            return (
              <button key={it.id} onClick={() => { setActive(it.id); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-karsa-md text-sm font-medium transition-all text-left
                  ${active === it.id ? 'bg-accent text-dark font-semibold' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                <Icon size={16} />
                {it.label}
              </button>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/8">
          <button onClick={() => { localStorage.removeItem('karsa_token'); window.location.href = '/admin/login' }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-karsa-md text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </aside>
    </>
  )
}

function Overview({ orders, loading, error, onRetry }) {
  if (loading) return <LoadingState text="Memuat overview..." />
  if (error)   return <ErrorState message={error} onRetry={onRetry} />

  const stats = {
    total_orders:       orders.length,
    pending_orders:     orders.filter(o => o.status === 'pending').length,
    in_progress_orders: orders.filter(o => o.status === 'in_progress').length,
    done_orders:        orders.filter(o => o.status === 'done').length,
  }

  const recent = [...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4)

  return (
    <div>
      <h2 className="font-syne text-2xl font-extrabold tracking-tight mb-6">Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={ShoppingBag}  label="Total Order"      value={stats.total_orders}       sub="semua waktu"  accent />
        <StatCard icon={AlertCircle}  label="Menunggu Review"  value={stats.pending_orders}     sub="perlu aksi" />
        <StatCard icon={TrendingUp}   label="Sedang Jalan"     value={stats.in_progress_orders} sub="proyek aktif" />
        <StatCard icon={CheckCircle}  label="Selesai"          value={stats.done_orders}        sub="keseluruhan" />
      </div>
      <div className="bg-white border border-black/6 rounded-karsa overflow-hidden">
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
          <h3 className="font-syne text-base font-bold">Order Terbaru</h3>
          <span className="text-xs text-gray-karsa-muted">{recent.length} order</span>
        </div>
        <div className="divide-y divide-black/4">
          {recent.length === 0 && <p className="text-center py-8 text-sm text-gray-karsa-muted font-light">Belum ada order.</p>}
          {recent.map(o => (
            <div key={o.id} className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-sm text-dark truncate">{o.project_name}</p>
                <p className="text-xs text-gray-karsa-muted mt-0.5">{o.client_name} · {CAT_LABEL[o.service_type] || o.service_type}</p>
              </div>
              <StatusBadge status={o.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Orders({ orders, setOrders, loading, error, onRetry }) {
  const [detail, setDetail] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [updatingId, setUpdatingId] = useState(null)

  const filtered = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus)

  const updateStatus = async (id, status) => {
    setUpdatingId(id)
    try {
      await api.patch(`/admin/orders/${id}/status`, { status })
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
      if (detail?.id === id) setDetail(d => ({ ...d, status }))
    } catch (err) {
      alert('Gagal mengubah status: ' + (err.response?.data?.message || err.message))
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) return <LoadingState text="Memuat orders..." />
  if (error)   return <ErrorState message={error} onRetry={onRetry} />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-syne text-2xl font-extrabold tracking-tight">Orders</h2>
        <span className="text-sm text-gray-karsa-muted">{filtered.length} order</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {['all','pending','in_review','accepted','in_progress','done','cancelled'].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3.5 py-1.5 rounded-karsa-pill text-xs font-medium border transition-all
              ${filterStatus === s ? 'bg-dark text-accent border-dark' : 'border-black/12 text-gray-karsa-muted hover:border-dark hover:text-dark'}`}>
            {s === 'all' ? 'Semua' : STATUS_CONFIG[s]?.label}
          </button>
        ))}
      </div>
      <div className="bg-white border border-black/6 rounded-karsa overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-gray-karsa-1">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-karsa-muted uppercase tracking-wider">Klien</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-karsa-muted uppercase tracking-wider hidden md:table-cell">Layanan</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-karsa-muted uppercase tracking-wider hidden lg:table-cell">Budget</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-karsa-muted uppercase tracking-wider">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/4">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-gray-karsa-1/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-dark">{o.client_name}</p>
                    <p className="text-xs text-gray-karsa-muted">{o.project_name}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs px-2.5 py-1 rounded-karsa-pill bg-gray-karsa-1 text-gray-karsa-muted">
                      {CAT_LABEL[o.service_type] || o.service_type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-karsa-muted hidden lg:table-cell">{o.budget_range || '—'}</td>
                  <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                  <td className="px-5 py-4">
                    <button onClick={() => setDetail(o)}
                      className="w-8 h-8 rounded-full hover:bg-gray-karsa-1 flex items-center justify-center transition-colors">
                      <Eye size={14} className="text-gray-karsa-muted" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-gray-karsa-muted text-sm font-light">Tidak ada order.</div>}
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetail(null)} />
          <div className="relative bg-cream w-full max-w-md h-full overflow-y-auto z-10 shadow-2xl p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="font-syne text-lg font-extrabold">Detail Order #{detail.id}</h3>
              <button onClick={() => setDetail(null)} className="w-8 h-8 rounded-full bg-gray-karsa-1 flex items-center justify-center hover:bg-gray-karsa-2 transition-colors">
                <X size={14} />
              </button>
            </div>
            <div className="bg-white border border-black/6 rounded-karsa-md p-5 flex flex-col gap-3 text-sm">
              {[
                ['Nama Klien', detail.client_name],
                ['Email',      detail.client_email],
                ['WhatsApp',   detail.client_phone || '—'],
                ['Perusahaan', detail.company || '—'],
                ['Layanan',    CAT_LABEL[detail.service_type] || detail.service_type],
                ['Budget',     detail.budget_range || '—'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <span className="text-gray-karsa-muted font-light min-w-[100px]">{k}</span>
                  <span className="text-dark font-medium text-right">{v}</span>
                </div>
              ))}
            </div>
            {detail.description && (
              <div className="bg-gray-karsa-1 rounded-karsa-md p-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-karsa-muted mb-2">Deskripsi Proyek</p>
                <p className="text-sm text-dark font-light leading-relaxed">{detail.description}</p>
              </div>
            )}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-karsa-muted mb-3">Ubah Status</p>
              {updatingId === detail.id ? (
                <div className="flex items-center gap-2 text-sm text-gray-karsa-muted py-2">
                  <Loader2 size={14} className="animate-spin" /> Menyimpan...
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                    <button key={key} onClick={() => updateStatus(detail.id, key)}
                      className={`px-3 py-2.5 rounded-karsa-md text-xs font-semibold border transition-all
                        ${detail.status === key ? 'bg-dark text-accent border-dark' : `${cfg.bg} ${cfg.text} border-transparent hover:border-current`}`}>
                      {cfg.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Image Upload Component ───────────────────────────────────────────────────
function ImageUpload({ currentUrl, onFileChange }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(currentUrl || null)

  const handleFile = (file) => {
    if (!file) return
    setPreview(URL.createObjectURL(file))
    onFileChange(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">
        Gambar Cover
      </label>
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="relative border-2 border-dashed border-black/10 rounded-karsa-md overflow-hidden cursor-pointer hover:border-dark/40 transition-colors group"
        style={{ height: 160 }}
      >
        {preview ? (
          <>
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-xs font-medium">Ganti Gambar</p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-karsa-1 flex items-center justify-center">
              <Upload size={16} className="text-gray-karsa-muted" />
            </div>
            <p className="text-xs text-gray-karsa-muted text-center">
              Klik atau drag & drop<br />
              <span className="text-[11px]">JPG, PNG, WebP — maks 2MB</span>
            </p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpg,image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={e => handleFile(e.target.files[0])}
        />
      </div>
    </div>
  )
}

// ─── Projects Manager ─────────────────────────────────────────────────────────
const EMPTY_PROJECT = {
  title: '', subtitle: '', category: 'web', description: '',
  client_name: '', duration_weeks: '', bg_color: '#1A1F3A',
  tech_stack: '', is_featured: false,
}

const BG_OPTIONS = ['#1A1F3A','#1A3A20','#2E1A12','#1A3A30','#221A2E','#2E3220','#22272E','#1E2A14']

function Projects({ projects, setProjects, loading, error, onRetry }) {
  const [form, setForm]     = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [delId, setDelId]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const openForm = (p = null) => {
    setImageFile(null)
    setForm(p ? {
      ...p,
      tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : (p.tech_stack || ''),
    } : { ...EMPTY_PROJECT })
  }

  const save = async () => {
    if (!form.title || !form.category) return
    setSaving(true)
    try {
      // Pakai FormData karena ada file upload
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'id' || k === 'image_url' || k === 'image_path') return
        if (v === null || v === undefined) return
        fd.append(k, typeof v === 'boolean' ? (v ? '1' : '0') : v)
      })
      if (imageFile) fd.append('image', imageFile)

      if (form.id) {
        fd.append('_method', 'PUT') // Laravel method spoofing
        const res = await api.post(`admin/projects/${form.id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        setProjects(prev => prev.map(p => p.id === form.id ? res.data : p))
      } else {
        const res = await api.post('/admin/projects', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        setProjects(prev => [...prev, res.data])
      }
      setForm(null)
    } catch (err) {
      alert('Gagal menyimpan: ' + (err.response?.data?.message || err.message))
    } finally {
      setSaving(false)
    }
  }

  const del = async (id) => {
    setDeleting(true)
    try {
      await api.delete(`/admin/projects/${id}`)
      setProjects(prev => prev.filter(p => p.id !== id))
      setDelId(null)
    } catch (err) {
      alert('Gagal menghapus: ' + (err.response?.data?.message || err.message))
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <LoadingState text="Memuat proyek..." />
  if (error)   return <ErrorState message={error} onRetry={onRetry} />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-syne text-2xl font-extrabold tracking-tight">Proyek</h2>
        <button onClick={() => openForm()}
          className="inline-flex items-center gap-2 bg-dark text-accent px-4 py-2.5 rounded-karsa-pill text-sm font-semibold hover:-translate-y-0.5 transition-transform">
          <Plus size={15} /> Tambah Proyek
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {projects.map(p => (
          <div key={p.id} className="bg-white border border-black/6 rounded-karsa-md px-5 py-4 flex items-center gap-4">
            {/* Thumbnail — gambar atau warna */}
            <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden">
              {p.image_url ? (
                <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: p.bg_color }}>
                  <ImageOff size={14} className="text-white/40" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-syne font-bold text-dark text-sm truncate">{p.title}</p>
              <p className="text-xs text-gray-karsa-muted mt-0.5">
                {CAT_LABEL[p.category]} {p.is_featured && '· ⭐ Featured'}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => openForm(p)}
                className="w-8 h-8 rounded-full bg-gray-karsa-1 hover:bg-gray-karsa-2 flex items-center justify-center transition-colors">
                <Pencil size={13} className="text-gray-karsa-muted" />
              </button>
              <button onClick={() => setDelId(p.id)}
                className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors">
                <Trash2 size={13} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-16 text-gray-karsa-muted text-sm">Belum ada proyek. Tambah yang pertama!</div>
        )}
      </div>

      {/* Form Modal */}
      {form !== null && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setForm(null)} />
          <div className="relative bg-cream w-full sm:max-w-lg rounded-t-karsa sm:rounded-karsa max-h-[90vh] overflow-y-auto z-10 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-syne text-lg font-extrabold">{form.id ? 'Edit Proyek' : 'Tambah Proyek Baru'}</h3>
              <button onClick={() => setForm(null)} className="w-8 h-8 rounded-full bg-gray-karsa-1 flex items-center justify-center">
                <X size={14} />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-sm">
              {/* Upload gambar */}
              <ImageUpload
                currentUrl={form.image_url || null}
                onFileChange={setImageFile}
              />

              <div>
                <label className="block text-xs font-semibold text-dark mb-1.5 uppercase tracking-wider">Judul *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="cth. DanaKita — Super App Keuangan"
                  className="w-full border border-black/10 rounded-karsa-md px-4 py-3 text-sm outline-none focus:border-dark transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark mb-1.5 uppercase tracking-wider">Subtitle</label>
                <input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                  placeholder="cth. Fintech · Mobile App"
                  className="w-full border border-black/10 rounded-karsa-md px-4 py-3 text-sm outline-none focus:border-dark transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-dark mb-1.5 uppercase tracking-wider">Kategori *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full border border-black/10 rounded-karsa-md px-4 py-3 text-sm outline-none focus:border-dark bg-white">
                    {Object.entries(CAT_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark mb-1.5 uppercase tracking-wider">Durasi (minggu)</label>
                  <input type="number" value={form.duration_weeks} onChange={e => setForm(f => ({ ...f, duration_weeks: e.target.value }))}
                    placeholder="8"
                    className="w-full border border-black/10 rounded-karsa-md px-4 py-3 text-sm outline-none focus:border-dark transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark mb-1.5 uppercase tracking-wider">Nama Klien</label>
                <input value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))}
                  placeholder="cth. DanaKita"
                  className="w-full border border-black/10 rounded-karsa-md px-4 py-3 text-sm outline-none focus:border-dark transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark mb-1.5 uppercase tracking-wider">Deskripsi</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3} placeholder="Jelaskan proyek ini..."
                  className="w-full border border-black/10 rounded-karsa-md px-4 py-3 text-sm outline-none focus:border-dark resize-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark mb-1.5 uppercase tracking-wider">
                  Tech Stack <span className="text-gray-karsa-muted normal-case font-light">(pisah koma)</span>
                </label>
                <input value={form.tech_stack} onChange={e => setForm(f => ({ ...f, tech_stack: e.target.value }))}
                  placeholder="React, Laravel, PostgreSQL"
                  className="w-full border border-black/10 rounded-karsa-md px-4 py-3 text-sm outline-none focus:border-dark transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">Warna Card (fallback)</label>
                <div className="flex gap-2 flex-wrap">
                  {BG_OPTIONS.map(c => (
                    <button key={c} onClick={() => setForm(f => ({ ...f, bg_color: c }))}
                      className={`w-8 h-8 rounded-lg transition-all ${form.bg_color === c ? 'ring-2 ring-dark ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div onClick={() => setForm(f => ({ ...f, is_featured: !f.is_featured }))}
                  className={`w-10 h-6 rounded-full transition-colors relative ${form.is_featured ? 'bg-dark' : 'bg-gray-karsa-2'}`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.is_featured ? 'left-5' : 'left-1'}`} />
                </div>
                <span className="text-sm text-dark">Tandai sebagai Featured</span>
              </label>
            </div>

            <div className="flex gap-3 mt-7">
              <button onClick={() => setForm(null)}
                className="flex-1 py-3 rounded-karsa-pill border border-black/12 text-sm text-gray-karsa-muted hover:border-dark hover:text-dark transition-colors">
                Batal
              </button>
              <button onClick={save} disabled={saving}
                className="flex-1 py-3 rounded-karsa-pill bg-dark text-accent text-sm font-semibold font-syne hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {form.id ? 'Simpan' : 'Tambah'}
              </button>
            </div>
          </div>
        </div>
      )}

      {delId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDelId(null)} />
          <div className="relative bg-cream rounded-karsa-md p-8 max-w-sm w-full z-10 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="font-syne text-lg font-bold mb-2">Hapus Proyek?</h3>
            <p className="text-sm text-gray-karsa-muted font-light mb-6">Tindakan ini tidak bisa dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)} className="flex-1 py-2.5 rounded-karsa-pill border border-black/12 text-sm">Batal</button>
              <button onClick={() => del(delId)} disabled={deleting}
                className="flex-1 py-2.5 rounded-karsa-pill bg-red-500 text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                {deleting && <Loader2 size={13} className="animate-spin" />} Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Feedbacks({ feedbacks, setFeedbacks, loading, error, onRetry }) {
  const [togglingId, setTogglingId] = useState(null)

  if (loading) return <LoadingState text="Memuat feedback..." />
  if (error)   return <ErrorState message={error} onRetry={onRetry} />

  const toggleFeatured = async (fb) => {
    setTogglingId(fb.id)
    try {
      const res = await api.patch(`/admin/feedbacks/${fb.id}`, { is_featured: !fb.is_featured })
      setFeedbacks(prev => prev.map(f => f.id === fb.id ? res.data : f))
    } catch (err) {
      alert('Gagal mengubah status: ' + (err.response?.data?.message || err.message))
    } finally {
      setTogglingId(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-syne text-2xl font-extrabold tracking-tight">Feedback Klien</h2>
        <span className="text-sm text-gray-karsa-muted">{feedbacks.length} feedback</span>
      </div>
      {feedbacks.length === 0 ? (
        <div className="bg-white border border-black/6 rounded-karsa p-8 text-center text-gray-karsa-muted text-sm font-light">
          Belum ada feedback dari klien.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {feedbacks.map(f => (
            <div key={f.id} className="bg-white border border-black/6 rounded-karsa-md p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-syne font-bold text-dark text-sm">{f.name}</p>
                  {f.company && <p className="text-xs text-gray-karsa-muted mt-0.5">{f.company}</p>}
                </div>
                <div className="flex items-center gap-3">
                  {f.rating && (
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13}
                          className={i < f.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-karsa-2'} />
                      ))}
                    </div>
                  )}
                  <button onClick={() => toggleFeatured(f)} disabled={togglingId === f.id}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-karsa-pill text-xs font-semibold border transition-all ${
                      f.is_featured
                        ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                    }`}>
                    {togglingId === f.id ? <Loader2 size={11} className="animate-spin" /> : null}
                    {f.is_featured ? 'Published' : 'Draft'}
                  </button>
                </div>
              </div>
              {f.content && <p className="text-sm text-gray-karsa-muted font-light leading-relaxed">"{f.content}"</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {

   
  const [active, setActive]     = useState('overview')
  const [sideOpen, setSideOpen] = useState(false)

  const [orders,    setOrders]    = useState([])
  const [projects,  setProjects]  = useState([])
  const [feedbacks, setFeedbacks] = useState([])

  const [loadingOrders,    setLoadingOrders]    = useState(true)
  const [loadingProjects,  setLoadingProjects]  = useState(true)
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true)

  const [errorOrders,    setErrorOrders]    = useState(null)
  const [errorProjects,  setErrorProjects]  = useState(null)
  const [errorFeedbacks, setErrorFeedbacks] = useState(null)

  const [retryOrders,    setRetryOrders]    = useState(0)
  const [retryProjects,  setRetryProjects]  = useState(0)
  const [retryFeedbacks, setRetryFeedbacks] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoadingOrders(true); setErrorOrders(null)
    api.get('/admin/orders')
      .then(res => { if (!cancelled) setOrders(res.data?.data ?? res.data) })
      .catch(err => { if (!cancelled) setErrorOrders(err.response?.data?.message || 'Tidak bisa terhubung ke server.') })
      .finally(() => { if (!cancelled) setLoadingOrders(false) })
    return () => { cancelled = true }
  }, [retryOrders])

  useEffect(() => {
    let cancelled = false
    setLoadingProjects(true); setErrorProjects(null)
    api.get('/projects')
      .then(res => { if (!cancelled) setProjects(res.data?.data ?? res.data) })
      .catch(err => { if (!cancelled) setErrorProjects(err.response?.data?.message || 'Tidak bisa terhubung ke server.') })
      .finally(() => { if (!cancelled) setLoadingProjects(false) })
    return () => { cancelled = true }
  }, [retryProjects])

  useEffect(() => {
    let cancelled = false
    setLoadingFeedbacks(true); setErrorFeedbacks(null)
    api.get('/admin/feedbacks')
      .then(res => { if (!cancelled) setFeedbacks(res.data?.data ?? res.data) })
      .catch(err => { if (!cancelled) setErrorFeedbacks(err.response?.data?.message || 'Tidak bisa terhubung ke server.') })
      .finally(() => { if (!cancelled) setLoadingFeedbacks(false) })
    return () => { cancelled = true }
  }, [retryFeedbacks])
  
  const params = new URLSearchParams(window.location.search)
  if (params.get('pw') !== 'arief2006') {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <p className="font-syne text-2xl font-bold text-accent mb-2">403</p>
          <p className="text-white/50 text-sm">Akses ditolak.</p>
        </div>
      </div>
    )
  }
  const PAGES = {
    overview:  <Overview  orders={orders} loading={loadingOrders} error={errorOrders} onRetry={() => setRetryOrders(n => n+1)} />,
    orders:    <Orders    orders={orders} setOrders={setOrders} loading={loadingOrders} error={errorOrders} onRetry={() => setRetryOrders(n => n+1)} />,
    projects:  <Projects  projects={projects} setProjects={setProjects} loading={loadingProjects} error={errorProjects} onRetry={() => setRetryProjects(n => n+1)} />,
    feedbacks: <Feedbacks feedbacks={feedbacks} setFeedbacks={setFeedbacks} loading={loadingFeedbacks} error={errorFeedbacks} onRetry={() => setRetryFeedbacks(n => n+1)} />,
  }

  return (
    <div className="min-h-screen bg-gray-karsa-1 font-dm flex">
      <Sidebar active={active} setActive={setActive} open={sideOpen} setOpen={setSideOpen} />
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 bg-gray-karsa-1/90 backdrop-blur-sm border-b border-black/6 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSideOpen(true)} className="lg:hidden w-9 h-9 rounded-full bg-white border border-black/6 flex items-center justify-center">
            <Menu size={16} />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <div className="w-8 h-8 rounded-full bg-dark flex items-center justify-center font-syne text-xs font-bold text-accent">A</div>
            <span className="text-sm font-medium text-dark hidden sm:block">Arief Huda</span>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8 max-w-5xl w-full mx-auto">
          {PAGES[active]}
        </main>
      </div>
    </div>
  )
}