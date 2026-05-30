import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section id="kontak" className="px-6 md:px-12 py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
      <h2 className="font-syne text-[clamp(40px,5vw,72px)] font-extrabold tracking-[-2.5px] leading-[1.0] max-w-xl">
        Siap Mulai<br />
        Proyek{' '}
        <em className="not-italic bg-dark text-accent px-3 rounded-xl">Anda?</em>
      </h2>
      <div className="flex flex-col gap-5 items-start">
        <p className="text-[15px] text-gray-karsa-muted font-light leading-relaxed max-w-xs">
          Konsultasi gratis bersama tim kami. Ceritakan ide Anda, kami yang wujudkan.
        </p>
        <a
          href="https://wa.me/6282272118779?text=Halo%"
  target="_blank"
  rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-dark text-accent px-8 py-4 rounded-karsa-pill text-base font-medium hover:-translate-y-1 transition-transform duration-200"
        >
          Hubungi Kami Sekarang
          <ArrowRight size={16} strokeWidth={2.5} />
        </a>
        <p className="text-xs text-gray-karsa-muted">
          atau email ke <strong className="text-dark">ariefhuda434@gmail.com</strong>
        </p>
      </div>
    </section>
  )
}
