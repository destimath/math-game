function pickIndonesianVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices()
  return voices.find((v) => v.lang.toLowerCase().startsWith('id')) ?? voices[0]
}

export function speakText(text: string) {
  if (!('speechSynthesis' in window)) return

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'id-ID'
  utterance.pitch = 1.35
  utterance.rate = 0.95
  utterance.voice = pickIndonesianVoice() ?? null

  window.speechSynthesis.speak(utterance)
}

export function cancelSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
}
