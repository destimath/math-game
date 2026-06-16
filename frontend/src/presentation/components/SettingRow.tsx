interface SettingRowProps {
  label: string
  description?: string
  value: boolean
  onChange: (value: boolean) => void
}

export function SettingRow({ label, description, value, onChange }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="font-bold text-garuda-blue">{label}</div>
        {description && <div className="text-xs text-garuda-blue/60">{description}</div>}
      </div>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          value ? 'bg-garuda-green' : 'bg-garuda-blue/20'
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
            value ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}
