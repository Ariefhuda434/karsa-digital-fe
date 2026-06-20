import { useState } from 'react'
import {
  Monitor, Globe, Bot, Workflow, Palette,
  ArrowRight, ArrowLeft, Check, Loader2,
  User, Mail, Phone, FileText, DollarSign, ChevronDown
} from 'lucide-react'
import api from '../lib/axios'


const SERVICES = [
  {
    id: 'uiux', icon: Monitor, label: 'UI/UX Design',
    desc: 'Dari wireframe kasar hingga prototype hi-fi — kami rancang pengalaman pengguna yang intuitif, estetik, dan siap handoff ke developer.',
    tags: ['Wireframing', 'Prototyping', 'Design System', 'User Research', 'Figma'],
    color: 'bg-[#1A1F3A]',
    price: 'Mulai Rp 50.000',
  },
  {
    id: 'web', icon: Globe, label: 'Website',
    desc: 'Landing page, company profile, portal bisnis, toko online — dibangun modern, cepat, SEO-friendly, dan mudah dikelola.',
    tags: ['Landing Page', 'Company Profile', 'Portal Bisnis', 'Toko Online', 'CMS', 'React', 'Laravel'],
    color: 'bg-[#1A3A20]',
    price: 'Mulai Rp 200.000',
  },
  {
    id: 'chatbot', icon: Bot, label: 'Chatbot',
    desc: 'Bot WhatsApp, Telegram, atau AI chatbot untuk customer service, lead generation, dan otomatisasi chat — siap integrasi dengan sistem kamu.',
    tags: ['WhatsApp Bot', 'Telegram Bot', 'AI Chatbot', 'Integrasi API', 'Customer Service'],
    color: 'bg-[#2E1A12]',
    price: 'Mulai Rp 50.000',
  },
  {
    id: 'automation', icon: Workflow, label: 'n8n Automation',
    desc: 'Otomatisasi workflow dengan n8n — hubungkan aplikasi, kirim notifikasi otomatis, scraping data, dan integrasi API tanpa coding rumit.',
    tags: ['Workflow Otomatis', 'Integrasi API', 'Scraping Data', 'Notifikasi', 'n8n'],
    color: 'bg-[#221A2E]',
    price: 'Mulai Rp 100.000',
  },
  {
    id: 'design', icon: Palette, label: 'Design (Canva & Figma)',
    desc: 'Desain komik Canva, tugas kuliah, infografis, dan materi visual lainnya — cepat, menarik, dan sesuai kebutuhan.',
    tags: ['Desain Komik', 'Tugas Kuliah', 'Infografis', 'Presentasi Kreatif', 'Canva', 'Figma'],
    color: 'bg-[#1A3A30]',
    price: 'Mulai Rp 30.000',
  },
]

const BUDGETS = [
  'Rp 50.000 – 200.000',
  'Rp 200.000 – 500.000',
  'Rp 500.000 – 1.000.000',
  '> Rp 1.000.000',
  'Diskusikan dulu',
]
const STEPS = ['Pilih Layanan', 'Detail Proyek', 'Data Kontak', 'Konfirmasi']

// ─── Helper ─────────────────────────────────────────────────────────────────
function StepDot({ num, label, active, done }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-syne transition-all duration-300
        ${done ? 'bg-accent text-dark' : active ? 'bg-dark text-accent ring-2 ring-dark ring-offset-2 ring-offset-cream' : 'bg-gray-karsa-1 text-gray-karsa-muted'}`}>
        {done ? <Check size={16} strokeWidth={2.5} /> : num}
      </div>
      <span className={`text-[11px] font-medium tracking-wide hidden sm:block transition-colors ${active || done ? 'text-dark' : 'text-gray-karsa-muted'}`}>
        {label}
      </span>
    </div>
  )
}

function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm font-semibold text-dark font-syne mb-2">
      {children}{required && <span className="text-red-400 ml-1">*</span>}
    </label>
  )
}

function Input({ icon: Icon, error, ...props }) {
  return (
    <div>
      <div className={`flex items-center gap-3 border rounded-karsa-md px-4 py-3.5 bg-white transition-all
        ${error ? 'border-red-400 ring-1 ring-red-400' : 'border-black/10 focus-within:border-dark focus-within:ring-1 focus-within:ring-dark'}`}>
        {Icon && <Icon size={16} className="text-gray-karsa-muted flex-shrink-0" />}
        <input
          {...props}
          className="flex-1 text-[15px] text-dark font-dm font-light outline-none bg-transparent placeholder:text-gray-karsa-muted"
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  )
}

function Textarea({ error, ...props }) {
  return (
    <div>
      <div className={`border rounded-karsa-md px-4 py-3.5 bg-white transition-all
        ${error ? 'border-red-400 ring-1 ring-red-400' : 'border-black/10 focus-within:border-dark focus-within:ring-1 focus-within:ring-dark'}`}>
        <textarea
          {...props}
          className="w-full text-[15px] text-dark font-dm font-light outline-none bg-transparent placeholder:text-gray-karsa-muted resize-none"
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  )
}

// ─── STEP 1: Pilih Layanan ───────────────────────────────────────────────────
function Step1({ data, onChange }) {
  return (
    <div>
      <h2 className="font-syne text-2xl md:text-3xl font-extrabold tracking-tight mb-2">Layanan apa yang kamu butuhkan?</h2>
      <p className="text-gray-karsa-muted font-light text-[15px] mb-8">Pilih satu layanan untuk memulai.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SERVICES.map(svc => {
          const Icon = svc.icon
          const selected = data.service === svc.id
          return (
            <button
              key={svc.id}
              onClick={() => onChange('service', svc.id)}
              className={`text-left rounded-karsa p-7 border-2 transition-all duration-200 relative overflow-hidden group
                ${selected ? 'border-dark bg-dark' : 'border-black/8 bg-white hover:border-dark/30 hover:shadow-sm'}`}
            >
              <div className={`absolute inset-0 ${svc.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors
                  ${selected ? 'bg-white/10' : 'bg-gray-karsa-1'}`}>
                  <Icon size={18} strokeWidth={1.8} className={selected ? 'text-accent' : 'text-dark'} />
                </div>
                <h3 className={`font-syne text-[17px] font-bold mb-1.5 ${selected ? 'text-white' : 'text-dark'}`}>
                  {svc.label}
                </h3>
                <p className={`text-[13px] font-light leading-relaxed mb-4 ${selected ? 'text-white/55' : 'text-gray-karsa-muted'}`}>
                  {svc.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {svc.tags.map(t => (
                    <span key={t} className={`text-[10px] px-2.5 py-1 rounded-karsa-pill font-medium tracking-wide
                      ${selected ? 'bg-white/10 text-white/60' : 'bg-gray-karsa-1 text-gray-karsa-muted'}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {selected && (
                <div className="absolute top-5 right-5 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <Check size={12} strokeWidth={3} className="text-dark" />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── STEP 2: Detail Proyek ───────────────────────────────────────────────────
function Step2({ data, onChange, errors }) {
  return (
    <div>
      <h2 className="font-syne text-2xl md:text-3xl font-extrabold tracking-tight mb-2">Ceritakan proyekmu</h2>
      <p className="text-gray-karsa-muted font-light text-[15px] mb-8">Semakin detail, semakin akurat estimasi kami.</p>
      <div className="flex flex-col gap-6">
        <div>
          <FieldLabel required>Nama Proyek</FieldLabel>
          <Input
            icon={FileText}
            placeholder="cth. Redesign App Keuangan"
            value={data.projectName}
            onChange={e => onChange('projectName', e.target.value)}
            error={errors.projectName}
          />
        </div>
        <div>
          <FieldLabel required>Deskripsi Singkat</FieldLabel>
          <Textarea
            placeholder="Jelaskan kebutuhan, tujuan, dan target pengguna proyek ini..."
            value={data.description}
            onChange={e => onChange('description', e.target.value)}
            rows={4}
            error={errors.description}
          />
        </div>
        <div>
          <FieldLabel required>Estimasi Anggaran</FieldLabel>
          <div className={`relative border rounded-karsa-md bg-white transition-all
            ${errors.budget ? 'border-red-400' : 'border-black/10 focus-within:border-dark focus-within:ring-1 focus-within:ring-dark'}`}>
            <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-karsa-muted pointer-events-none" />
            <select
              value={data.budget}
              onChange={e => onChange('budget', e.target.value)}
              className="w-full pl-10 pr-10 py-3.5 text-[15px] font-dm font-light text-dark outline-none bg-transparent appearance-none cursor-pointer"
            >
              <option value="">Pilih range anggaran...</option>
              {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-karsa-muted pointer-events-none" />
          </div>
          {errors.budget && <p className="text-xs text-red-500 mt-1.5">{errors.budget}</p>}
        </div>
        <div>
          <FieldLabel>Target Waktu (opsional)</FieldLabel>
          <Input
            placeholder="cth. 2 bulan, atau sebelum Agustus 2026"
            value={data.timeline}
            onChange={e => onChange('timeline', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

// ─── STEP 3: Data Kontak ─────────────────────────────────────────────────────
function Step3({ data, onChange, errors }) {
  return (
    <div>
      <h2 className="font-syne text-2xl md:text-3xl font-extrabold tracking-tight mb-2">Data dirimu</h2>
      <p className="text-gray-karsa-muted font-light text-[15px] mb-8">Kami akan menghubungimu dalam 1×24 jam kerja.</p>
      <div className="flex flex-col gap-6">
        <div>
          <FieldLabel required>Nama Lengkap</FieldLabel>
          <Input
            icon={User}
            placeholder="Nama kamu"
            value={data.name}
            onChange={e => onChange('name', e.target.value)}
            error={errors.name}
          />
        </div>
        <div>
          <FieldLabel required>Email</FieldLabel>
          <Input
            icon={Mail}
            type="email"
            placeholder="kamu@email.com"
            value={data.email}
            onChange={e => onChange('email', e.target.value)}
            error={errors.email}
          />
        </div>
        <div>
          <FieldLabel>Nomor WhatsApp (opsional)</FieldLabel>
          <Input
            icon={Phone}
            type="tel"
            placeholder="+62 812-xxxx-xxxx"
            value={data.phone}
            onChange={e => onChange('phone', e.target.value)}
          />
        </div>
        <div>
          <FieldLabel>Nama Perusahaan / Brand (opsional)</FieldLabel>
          <Input
            placeholder="Nama bisnis atau startup kamu"
            value={data.company}
            onChange={e => onChange('company', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

// ─── STEP 4: Konfirmasi ──────────────────────────────────────────────────────
function Step4({ data }) {
  const svc = SERVICES.find(s => s.id === data.service)
  const Icon = svc?.icon

  const rows = [
    { label: 'Layanan', value: svc?.label },
    { label: 'Nama Proyek', value: data.projectName },
    { label: 'Anggaran', value: data.budget },
    { label: 'Target Waktu', value: data.timeline || '—' },
    { label: 'Nama', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'WhatsApp', value: data.phone || '—' },
    { label: 'Perusahaan', value: data.company || '—' },
  ]

  return (
    <div>
      <h2 className="font-syne text-2xl md:text-3xl font-extrabold tracking-tight mb-2">Cek sebelum kirim</h2>
      <p className="text-gray-karsa-muted font-light text-[15px] mb-8">Pastikan semua data sudah benar.</p>

      {/* Service highlight */}
      {svc && (
        <div className="bg-dark rounded-karsa-md p-5 flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Icon size={18} strokeWidth={1.8} className="text-accent" />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30 mb-0.5">Layanan Dipilih</p>
            <p className="font-syne text-base font-bold text-white">{svc.label}</p>
          </div>
        </div>
      )}

      {/* Detail rows */}
      <div className="bg-white border border-black/6 rounded-karsa-md overflow-hidden">
        {rows.slice(1).map((row, i) => (
          <div key={i} className={`flex items-start gap-4 px-5 py-3.5 ${i < rows.length - 2 ? 'border-b border-black/5' : ''}`}>
            <span className="text-[12px] text-gray-karsa-muted font-medium min-w-[100px] pt-0.5">{row.label}</span>
            <span className="text-sm text-dark font-light">{row.value}</span>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="mt-4 bg-gray-karsa-1 rounded-karsa-md p-5">
        <p className="text-[12px] text-gray-karsa-muted font-medium mb-1.5">Deskripsi Proyek</p>
        <p className="text-sm text-dark font-light leading-relaxed">{data.description}</p>
      </div>

      <p className="text-xs text-gray-karsa-muted mt-5 leading-relaxed">
        Dengan mengirim form ini, kamu setuju untuk dihubungi oleh tim Karsa terkait proyekmu.
        Kami tidak akan membagikan datamu ke pihak ketiga.
      </p>
    </div>
  )
}

// ─── SUCCESS ─────────────────────────────────────────────────────────────────
function SuccessView({ data, onReset }) {
  return (
    <div className="text-center py-10">
      <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
        <Check size={36} strokeWidth={2.5} className="text-dark" />
      </div>
      <h2 className="font-syne text-3xl font-extrabold tracking-tight mb-3">Permintaan Terkirim!</h2>
      <p className="text-gray-karsa-muted font-light text-[15px] leading-relaxed mb-2 max-w-sm mx-auto">
        Hei <strong className="text-dark font-semibold">{data.name}</strong>, kami sudah menerima permintaanmu.
      </p>
      <p className="text-gray-karsa-muted font-light text-[14px] mb-8 max-w-sm mx-auto">
        Tim Karsa akan menghubungimu melalui <strong className="text-dark">{data.email}</strong> dalam 1×24 jam kerja.
      </p>
      <div className="bg-gray-karsa-1 rounded-karsa-md p-5 max-w-xs mx-auto mb-8 text-left">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-karsa-muted mb-3">Ringkasan</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-karsa-muted font-light">Layanan</span>
            <span className="text-dark font-medium">{SERVICES.find(s => s.id === data.service)?.label}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-karsa-muted font-light">Proyek</span>
            <span className="text-dark font-medium">{data.projectName}</span>
          </div>
        </div>
      </div>
      <button
        onClick={onReset}
        className="text-sm text-gray-karsa-muted hover:text-dark border-b border-gray-karsa-2 hover:border-dark transition-colors pb-0.5"
      >
        Kirim permintaan lain
      </button>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const INIT = {
  service: '', projectName: '', description: '',
  budget: '', timeline: '', name: '', email: '',
  phone: '', company: '',
}

export default function MulaiProyek() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(INIT)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const onChange = (field, value) => {
    setData(d => ({ ...d, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (step === 0 && !data.service) e.service = 'Pilih layanan dulu'
    if (step === 1) {
      if (!data.projectName.trim()) e.projectName = 'Nama proyek wajib diisi'
      if (!data.description.trim()) e.description = 'Deskripsi wajib diisi'
      if (!data.budget) e.budget = 'Pilih range anggaran'
    }
    if (step === 2) {
      if (!data.name.trim()) e.name = 'Nama wajib diisi'
      if (!data.email.trim()) e.email = 'Email wajib diisi'
      else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = 'Format email tidak valid'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validate()) return
    if (step === 0 && !data.service) { setErrors({ service: true }); return }
    setStep(s => s + 1)
  }

  const submit = async () => {
    setLoading(true)
    try {
      await api.post('/orders', {
      service_type: data.service,
      project_name: data.projectName,
      description:  data.description,
      budget_range: data.budget,
      timeline:     data.timeline,
      client_name:  data.name,
      client_email: data.email,
      client_phone: data.phone,
      company:      data.company,
    })
    setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert('Gagal mengirim. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setData(INIT); setStep(0); setSubmitted(false); setErrors({}) }

  const canNext = step === 0 ? !!data.service : true

  return (
    <div className="min-h-screen bg-cream font-dm">
      {/* ── Navbar mini ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between bg-cream/90 backdrop-blur-md border-b border-black/5">
        <a href="/" className="font-syne text-xl font-extrabold tracking-tight text-dark flex items-center gap-1">
          Karsa<span className="bg-dark text-accent px-2 py-0.5 rounded-md text-sm">.</span>
        </a>
        <span className="text-sm text-gray-karsa-muted font-light hidden sm:block">Mulai Proyek</span>
        <a href="/" className="text-sm text-gray-karsa-muted hover:text-dark transition-colors">← Kembali</a>
      </nav>

      <div className="pt-28 pb-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">

          {!submitted ? (
            <>
              {/* ── Progress stepper ── */}
              <div className="flex items-center mb-12">
                {STEPS.map((label, i) => (
                  <div key={i} className="flex items-center flex-1 last:flex-none">
                    <StepDot num={i + 1} label={label} active={step === i} done={step > i} />
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-px mx-1 transition-colors duration-500 ${step > i ? 'bg-dark' : 'bg-black/10'}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* ── Card ── */}
              <div className="bg-white border border-black/6 rounded-karsa p-7 md:p-10 shadow-sm">
                {step === 0 && <Step1 data={data} onChange={onChange} />}
                {step === 1 && <Step2 data={data} onChange={onChange} errors={errors} />}
                {step === 2 && <Step3 data={data} onChange={onChange} errors={errors} />}
                {step === 3 && <Step4 data={data} />}

                {/* ── Service not selected error ── */}
                {step === 0 && errors.service && (
                  <p className="text-sm text-red-500 mt-4">Pilih salah satu layanan untuk melanjutkan.</p>
                )}

                {/* ── Navigation buttons ── */}
                <div className={`flex items-center mt-10 ${step > 0 ? 'justify-between' : 'justify-end'}`}>
                  {step > 0 && (
                    <button
                      onClick={() => setStep(s => s - 1)}
                      className="inline-flex items-center gap-2 text-sm text-gray-karsa-muted hover:text-dark transition-colors"
                    >
                      <ArrowLeft size={15} /> Kembali
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      onClick={next}
                      disabled={!canNext}
                      className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-karsa-pill text-sm font-semibold font-syne transition-all duration-200
                        ${canNext ? 'bg-dark text-accent hover:-translate-y-0.5 hover:shadow-md' : 'bg-gray-karsa-1 text-gray-karsa-muted cursor-not-allowed'}`}
                    >
                      Lanjut <ArrowRight size={15} strokeWidth={2.5} />
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      disabled={loading}
                      className="inline-flex items-center gap-2.5 bg-accent text-dark px-8 py-3.5 rounded-karsa-pill text-sm font-bold font-syne hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
                    >
                      {loading ? (
                        <><Loader2 size={15} className="animate-spin" /> Mengirim...</>
                      ) : (
                        <>Kirim Permintaan <ArrowRight size={15} strokeWidth={2.5} /></>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* ── Step info ── */}
              <p className="text-center text-xs text-gray-karsa-muted mt-5">
                Langkah {step + 1} dari {STEPS.length} — {STEPS[step]}
              </p>
            </>
          ) : (
            <div className="bg-white border border-black/6 rounded-karsa p-7 md:p-10 shadow-sm">
              <SuccessView data={data} onReset={reset} />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
