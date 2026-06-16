import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-garuda-green hover:bg-green-500',
  secondary: 'bg-garuda-gold hover:bg-amber-400',
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-2xl px-6 py-3 font-bold text-white shadow-[0_4px_0_rgba(0,0,0,0.25)] transition-transform active:translate-y-1 active:scale-95 active:shadow-none ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
