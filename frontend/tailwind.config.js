/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'garuda-gold': '#E8A33D',
        'garuda-blue': '#1B4D6B',
        'garuda-green': '#4CAF7D',
        'garuda-red': '#E25822',
      },
      borderRadius: {
        card: '20px',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'flash-correct': {
          '0%': { opacity: '0' },
          '25%': { opacity: '0.5' },
          '100%': { opacity: '0' },
        },
        'flash-wrong': {
          '0%': { opacity: '0' },
          '25%': { opacity: '0.4' },
          '100%': { opacity: '0' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-72px) scale(1.15)', opacity: '0' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '15%': { transform: 'translateX(-7px)' },
          '30%': { transform: 'translateX(7px)' },
          '45%': { transform: 'translateX(-5px)' },
          '60%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-3px)' },
          '90%': { transform: 'translateX(3px)' },
        },
        'pop-correct': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        'strike-ring': {
          '0%': { transform: 'scale(0.6)', opacity: '1' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'boss-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'boss-hit': {
          '0%':   { transform: 'translateX(0)   scale(1)' },
          '15%':  { transform: 'translateX(-10px) scale(0.85)' },
          '30%':  { transform: 'translateX(12px)  scale(0.9)' },
          '50%':  { transform: 'translateX(-7px)  scale(0.95)' },
          '70%':  { transform: 'translateX(7px)   scale(0.97)' },
          '100%': { transform: 'translateX(0)   scale(1)' },
        },
        'boss-strike': {
          '0%':   { transform: 'translateX(0)    scale(1)    rotate(0deg)' },
          '12%':  { transform: 'translateX(-16px) scale(0.75) rotate(-6deg)' },
          '28%':  { transform: 'translateX(18px)  scale(0.82) rotate(5deg)' },
          '45%':  { transform: 'translateX(-10px) scale(0.9)  rotate(-3deg)' },
          '65%':  { transform: 'translateX(10px)  scale(0.95) rotate(2deg)' },
          '82%':  { transform: 'translateX(-4px)  scale(0.98) rotate(-1deg)' },
          '100%': { transform: 'translateX(0)    scale(1)    rotate(0deg)' },
        },
        'boss-flash': {
          '0%':   { opacity: '0' },
          '30%':  { opacity: '0.85' },
          '100%': { opacity: '0' },
        },
        'boss-damage': {
          '0%, 100%': { opacity: '1' },
          '40%':  { opacity: '0.3' },
        },
        'combo-enter': {
          '0%':   { transform: 'scale(0.4) translateY(8px)', opacity: '0' },
          '65%':  { transform: 'scale(1.25) translateY(-2px)', opacity: '1' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'combo-pulse-1': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        'combo-pulse-2': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.07)' },
        },
        'combo-pulse-3': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.11)' },
        },
        'combo-break': {
          '0%':   { transform: 'scale(1)',   opacity: '1' },
          '25%':  { transform: 'scale(1.3)', opacity: '0.9' },
          '55%':  { transform: 'scale(0.7)', opacity: '0.5' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        'flame-flicker': {
          '0%, 100%': { transform: 'translateY(0px) scaleY(1)' },
          '33%': { transform: 'translateY(-2px) scaleY(1.12)' },
          '66%': { transform: 'translateY(1px) scaleY(0.93)' },
        },
        'flame-flicker-alt': {
          '0%, 100%': { transform: 'translateY(0px) scaleY(1)' },
          '40%': { transform: 'translateY(2px) scaleY(0.9)' },
          '75%': { transform: 'translateY(-2px) scaleY(1.15)' },
        },
        'xp-shine': {
          '0%':   { transform: 'translateX(-100%) skewX(-15deg)', opacity: '0' },
          '30%':  { opacity: '1' },
          '100%': { transform: 'translateX(250%) skewX(-15deg)', opacity: '0' },
        },
        'xp-levelup': {
          '0%':   { transform: 'scale(1)',    opacity: '1' },
          '40%':  { transform: 'scale(1.06)', opacity: '1' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
        'xp-float': {
          '0%':   { transform: 'translateY(0px)',   opacity: '1' },
          '100%': { transform: 'translateY(-32px)', opacity: '0' },
        },
        'xp-reset-flash': {
          '0%':   { opacity: '0' },
          '30%':  { opacity: '0.9' },
          '100%': { opacity: '0' },
        },
        'mascot-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        'cloud-float': {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(18px)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.85)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.35s ease-out',
        'flash-correct': 'flash-correct 0.55s ease-out forwards',
        'flash-wrong': 'flash-wrong 0.55s ease-out forwards',
        'float-up': 'float-up 0.75s ease-out forwards',
        'shake': 'shake 0.45s ease-in-out',
        'pop-correct': 'pop-correct 0.3s ease-out',
        'strike-ring': 'strike-ring 0.6s ease-out forwards',
        'boss-float': 'boss-float 2.4s ease-in-out infinite',
        'boss-hit': 'boss-hit 0.45s ease-out',
        'boss-strike': 'boss-strike 0.65s ease-out',
        'boss-flash': 'boss-flash 0.3s ease-out forwards',
        'boss-damage': 'boss-damage 0.4s ease-out',
        'combo-enter': 'combo-enter 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'combo-pulse-1': 'combo-pulse-1 2s ease-in-out infinite',
        'combo-pulse-2': 'combo-pulse-2 1.2s ease-in-out infinite',
        'combo-pulse-3': 'combo-pulse-3 0.65s ease-in-out infinite',
        'combo-break': 'combo-break 0.45s ease-out forwards',
        'flame-flicker': 'flame-flicker 0.55s ease-in-out infinite',
        'flame-flicker-alt': 'flame-flicker-alt 0.7s ease-in-out infinite',
        'xp-shine': 'xp-shine 0.7s ease-in-out forwards',
        'xp-levelup': 'xp-levelup 0.5s ease-in-out',
        'xp-float': 'xp-float 0.9s ease-out forwards',
        'xp-reset-flash': 'xp-reset-flash 0.4s ease-out forwards',
        'mascot-float': 'mascot-float 3s ease-in-out infinite',
        'cloud-float': 'cloud-float 7s ease-in-out infinite',
        'twinkle': 'twinkle 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
