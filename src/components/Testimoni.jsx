import { useState, useEffect } from 'react'
import { Loader2, AlertTriangle, Send, CheckCircle, X, MessageSquare } from 'lucide-react'
import api from '../lib/axios'

const AVATAR_COLORS = ['#C8FF00','#80B8FF','#FFB380','#FF80B8','#80FFB8','#B880FF','#FF80A0','#80D0FF']

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?'
}

function Stars({ count = 0, interactive, onChange }) {
  const arr = Array.from({ length: 5 })
  return (
    <div className={`flex gap-0.5 ${interactive ? 'cursor-pointer' : ''}`}>
      {arr.map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < count ? '#C8FF00' : 'rgba(255,255,255,0.12)'}
          onClick={() => interactive && onChange?.(i + 1)}
          className={interactive ? 'hover:scale-110 transition-transform' : ''}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function FeedbackModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', role: '', company: '', content: '', rating: 5 })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.content.trim()) return
    setSubmitting(true)
    try {
      await api.post('/feedbacks', {
        name: form.name.trim(),
        role: form.role.trim() || null,
        company: form.company.trim() || null,
        content: form.content.trim(),
        rating: form.rating,
        avatar_initials: getInitials(form.name),
        avatar_color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      })
      setSubmitted(true)
      setTimeout(() => { setSubmitted(false); onClose(); setForm({ name: '', role: '', company: '', content: '', rating: 5 }) }, 2000)
    } catch (err) {
      alert('Gagal mengirim: ' + (err.response?.data?.message || err.message))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-dark border border-white/10 w-full sm:max-w-md rounded-t-karsa sm:rounded-karsa p-8 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-syne text-lg font-extrabold text-white">Bagikan Pengalamanmu</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white">
            <X size={15} />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle size={32} className="text-accent mx-auto mb-3" />
            <p className="text-white font-semibold text-sm">Terima kasih atas feedbacknya!</p>
            <p className="text-white/40 text-xs mt-1">Testimoni kamu akan tampil setelah direview.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Nama lengkap *" required
              className="w-full bg-white/5 border border-white/10 rounded-karsa-md px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50 transition-colors" />
            <div className="grid grid-cols-2 gap-3">
              <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                placeholder="Jabatan (opsional)"
                className="w-full bg-white/5 border border-white/10 rounded-karsa-md px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50 transition-colors" />
              <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                placeholder="Perusahaan (opsional)"
                className="w-full bg-white/5 border border-white/10 rounded-karsa-md px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50 transition-colors" />
            </div>
            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="Ceritakan pengalamanmu... *" required rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-karsa-md px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50 transition-colors resize-none" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/30 font-light">Rating</span>
              <Stars count={form.rating} interactive onChange={v => setForm(f => ({ ...f, rating: v }))} />
            </div>
            <button type="submit" disabled={submitting || !form.name.trim() || !form.content.trim()}
              className="inline-flex items-center justify-center gap-2 bg-accent text-dark px-6 py-3 rounded-karsa-pill text-sm font-semibold font-syne hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              {submitting ? 'Mengirim...' : 'Kirim Feedback'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function Testimoni() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    let cancelled = false
    api.get('/feedbacks')
      .then(res => { if (!cancelled) setFeedbacks(res.data?.data ?? res.data) })
      .catch(() => { if (!cancelled) setError('Gagal memuat testimoni') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return (
    <section id="testimoni" className="bg-dark px-6 md:px-12 py-24">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-14">
        <div>
          <h2 className="font-syne text-[clamp(36px,4vw,56px)] font-extrabold tracking-[-1.5px] leading-[1.05] text-white max-w-md">
            Apa Kata<br />
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.35)', color: 'transparent' }}>Klien Kami</span>
          </h2>
        </div>
        <div className="flex flex-col items-end gap-4">
          <p className="max-w-xs text-[15px] text-white/40 font-light leading-relaxed pt-2">
            Kepercayaan klien adalah aset terbesar kami. Inilah yang mereka rasakan bekerja bersama Karsa.
          </p>
          <button onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-accent text-dark px-5 py-2.5 rounded-karsa-pill text-sm font-semibold font-syne hover:-translate-y-0.5 transition-transform">
            <MessageSquare size={15} />
            Kirim Feedback
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 size={24} className="animate-spin text-white/20" />
          <p className="text-sm text-white/30 font-light">Memuat testimoni...</p>
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <AlertTriangle size={20} className="text-white/30" />
          </div>
          <p className="text-sm text-white/40 font-light">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {feedbacks.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-white/30 text-sm font-light">Belum ada testimoni tampil. Jadilah yang pertama!</p>
            </div>
          )}
          {feedbacks.map(f => (
            <div key={f.id} className="bg-white/4 border border-white/8 rounded-karsa-md p-8 hover:bg-white/6 transition-colors duration-200">
              <Stars count={f.rating} />
              <p className="text-[15px] text-white/65 leading-[1.8] font-light italic mb-6">"{f.content}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-syne text-sm font-extrabold flex-shrink-0"
                  style={{ background: f.avatar_color || AVATAR_COLORS[0], color: '#1A1A18' }}
                >
                  {f.avatar_initials || getInitials(f.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white font-syne">{f.name}</p>
                  <p className="text-xs text-white/35 font-light mt-0.5">{f.role}{f.role && f.company ? ', ' : ''}{f.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <FeedbackModal open={showModal} onClose={() => setShowModal(false)} />
    </section>
  )
}
