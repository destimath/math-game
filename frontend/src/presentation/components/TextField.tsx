import { InputHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function TextField({ label, error, className = '', ...props }: TextFieldProps) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-bold text-garuda-blue">{label}</span>
      <input
        className={`w-full rounded-2xl border-2 bg-white px-4 py-3 text-garuda-blue focus:outline-none ${
          error ? 'border-garuda-red' : 'border-garuda-blue/20 focus:border-garuda-gold'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs font-bold text-garuda-red">{error}</span>}
    </label>
  )
}
