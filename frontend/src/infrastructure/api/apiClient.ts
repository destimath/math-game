import axios from 'axios'

export const apiClient = axios.create({
  baseURL: '',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem('legenda-garuda:session')
  if (raw) {
    try {
      const session = JSON.parse(raw) as { accessToken?: string }
      if (session.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`
      }
    } catch {
      // session corrupt, biarkan request tanpa auth
    }
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message: string =
      error.response?.data?.error?.message ?? error.message ?? 'Terjadi kesalahan jaringan'
    return Promise.reject(new Error(message))
  },
)
