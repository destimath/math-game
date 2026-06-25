import { useEffect, useRef, useState } from 'react'
import { cancelSpeech, speakText } from '../../infrastructure/audio/ttsNarrator'
import { useSettingsStore } from '../../store/settingsStore'
import { Button } from './Button'

interface Slide {
  icon: string
  title: string
  text: string
  voice: string
}

const SLIDES: Slide[] = [
  {
    icon: '🗺️',
    title: 'Peta Nusantara',
    text: 'Ini peta petualanganmu! Tiap pulau punya tantangan angka seru. Ketuk pulau yang aktif untuk mulai berlayar.',
    voice: '/sounds/onboarding/slide-1.mp3',
  },
  {
    icon: '⚔️',
    title: 'Battle Angka',
    text: 'Jawab soal matematika untuk menyerang musuh! Jawab benar = musuh kena serang. Jawab salah = semangatmu berkurang.',
    voice: '/sounds/onboarding/slide-2.mp3',
  },
  {
    icon: '🔥',
    title: 'Combo Beruntun',
    text: 'Jawab benar berturut-turut bikin combo makin besar — serangan & XP yang kamu dapat juga makin banyak!',
    voice: '/sounds/onboarding/slide-3.mp3',
  },
  {
    icon: '🪶',
    title: 'Keping Garuda & XP',
    text: 'Kumpulkan Keping Garuda dan XP dari tiap battle buat naik level dan dapat hadiah keren!',
    voice: '/sounds/onboarding/slide-4.mp3',
  },
]

interface OnboardingModalProps {
  onFinish: () => void
}

export function OnboardingModal({ onFinish }: OnboardingModalProps) {
  const [step, setStep] = useState(0)
  const [voiceMuted, setVoiceMuted] = useState(false)
  const sfxEnabled = useSettingsStore((s) => s.sfxEnabled)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isLast = step === SLIDES.length - 1
  const slide = SLIDES[step]

  useEffect(() => {
    audioRef.current?.pause()
    cancelSpeech()
    if (!sfxEnabled || voiceMuted) return

    const audio = new Audio(slide.voice)
    audio.volume = 0.9
    audioRef.current = audio

    let spoken = false
    const speakFallback = () => {
      if (spoken) return
      spoken = true
      speakText(slide.text)
    }
    audio.addEventListener('error', speakFallback)
    audio.play().catch(speakFallback)

    return () => {
      audio.pause()
      cancelSpeech()
    }
  }, [step, sfxEnabled, voiceMuted]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm space-y-5 rounded-card bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-garuda-blue/40">
            {step + 1} / {SLIDES.length}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setVoiceMuted((v) => !v)}
              className="text-sm text-garuda-blue/40 hover:text-garuda-blue"
              aria-label={voiceMuted ? 'Nyalakan suara narasi' : 'Matikan suara narasi'}
            >
              {voiceMuted ? '🔇' : '🔊'}
            </button>
            <button onClick={onFinish} className="text-xs font-bold text-garuda-blue/40 hover:text-garuda-blue">
              Lewati ✕
            </button>
          </div>
        </div>

        <div className="space-y-3 text-center">
          <div className="animate-mascot-float mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-garuda-gold/10 text-5xl">
            {slide.icon}
          </div>
          <h2 className="text-lg font-extrabold text-garuda-blue">{slide.title}</h2>
          <p className="text-sm text-garuda-blue/70">{slide.text}</p>
        </div>

        <div className="flex justify-center gap-1.5">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step ? 'w-6 bg-garuda-gold' : 'w-2 bg-garuda-blue/15'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          {step > 0 && (
            <Button variant="secondary" className="flex-1" onClick={() => setStep((s) => s - 1)}>
              ← Kembali
            </Button>
          )}
          <Button
            className="flex-1"
            onClick={() => (isLast ? onFinish() : setStep((s) => s + 1))}
          >
            {isLast ? '🚀 Ayo Main!' : 'Lanjut →'}
          </Button>
        </div>
      </div>
    </div>
  )
}
