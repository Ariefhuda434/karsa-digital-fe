const STATS = [
  { num: '120+', label: 'Proyek selesai\ndengan sukses' },
  { num: '95%', label: 'Tingkat kepuasan\nklien kami' },
  { num: '4yr', label: 'Pengalaman di industri\ndigital Indonesia' },
  { num: '40+', label: 'Klien aktif dari\nberbagai industri' },
]

export default function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8 bg-dark">
      {STATS.map((s, i) => (
        <div key={i} className="px-8 md:px-10 py-12">
          <p className="font-syne text-[52px] font-extrabold text-accent tracking-[-3px] leading-none mb-2">{s.num}</p>
          <p className="text-sm text-white/40 font-light leading-relaxed whitespace-pre-line">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
