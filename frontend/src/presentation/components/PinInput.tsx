import { ClipboardEvent, KeyboardEvent, useRef } from 'react'

interface PinInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  masked?: boolean
  error?: boolean
}

export function PinInput({ value, onChange, length = 6, masked = true, error = false }: PinInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const digits = Array.from({ length }, (_, i) => value[i] ?? '')

  function setDigit(index: number, digit: string) {
    const next = digits.slice()
    next[index] = digit
    onChange(next.join('').replace(/\s+/g, ''))
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, '').slice(-1)
    setDigit(index, digit)
    if (digit && index < length - 1) inputsRef.current[index + 1]?.focus()
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    onChange(pasted)
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div className="flex justify-center gap-2" onPaste={handlePaste}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el }}
          type={masked ? 'password' : 'text'}
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={`h-12 w-10 rounded-2xl border-2 bg-white text-center text-xl font-extrabold text-garuda-blue outline-none transition-colors focus:border-garuda-gold focus:ring-2 focus:ring-garuda-gold/30 ${
            error ? 'border-garuda-red' : 'border-garuda-blue/20'
          }`}
        />
      ))}
    </div>
  )
}
