import { useEffect, useRef } from 'react'
import { bgMusicPlayer } from '../../infrastructure/audio/bgMusicPlayer'
import { useSettingsStore } from '../../store/settingsStore'

export function useBackgroundMusic() {
  const musicEnabled = useSettingsStore((s) => s.musicEnabled)
  const musicEnabledRef = useRef(musicEnabled)
  const hasStarted = useRef(false)

  // Sinkronkan ref supaya handler event tidak stale
  useEffect(() => {
    musicEnabledRef.current = musicEnabled
  }, [musicEnabled])

  // Start audio setelah interaksi pertama user (wajib untuk kebijakan autoplay browser)
  useEffect(() => {
    async function handleFirstInteraction() {
      if (hasStarted.current) return
      hasStarted.current = true

      // Hapus listener setelah interaksi pertama
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)

      if (musicEnabledRef.current) {
        await bgMusicPlayer.start()
      }
    }

    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [])

  // Pause / resume saat setting berubah
  useEffect(() => {
    if (!hasStarted.current) return
    if (musicEnabled) {
      bgMusicPlayer.resume()
    } else {
      bgMusicPlayer.pause()
    }
  }, [musicEnabled])
}
