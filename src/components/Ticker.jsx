const ITEMS = [
  'UI/UX Design', 'Web Development', 'Mobile App',
  'System Analysis', 'Branding Digital', 'Konsultasi Teknis',
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="bg-dark py-4 overflow-hidden whitespace-nowrap select-none">
      <div className="inline-flex animate-ticker">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-syne text-[13px] font-semibold tracking-widest text-white/35 px-8">
              {item}
            </span>
            <span className="text-accent text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
