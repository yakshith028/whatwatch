export default function Select({ label, value, onChange, options, disabled }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-500">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className="w-full appearance-none rounded-xl px-4 py-3 text-sm font-medium text-slate-100
                     cursor-pointer outline-none transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed pr-9"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'rgba(139,92,246,0.6)';
            e.target.style.background = 'rgba(139,92,246,0.08)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
            e.target.style.background = 'rgba(255,255,255,0.06)';
          }}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} style={{ background: '#1a1f2e' }}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  );
}
