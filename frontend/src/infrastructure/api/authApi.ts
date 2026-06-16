import { AuthSession } from '../../domain/entities/Auth'
import { apiClient } from './apiClient'

interface TokenResponse {
  accessToken: string
  role: 'student' | 'teacher'
  displayName: string
  classCode: string | null
}

function toSession(d: TokenResponse): AuthSession {
  return {
    role: d.role,
    displayName: d.displayName,
    classCode: d.classCode ?? undefined,
    accessToken: d.accessToken,
  }
}

export const authApi = {
  async login(email: string, pin: string): Promise<AuthSession> {
    const { data } = await apiClient.post<{ data: TokenResponse }>('/api/auth/login', { email, pin })
    return toSession(data.data)
  },

  async register(name: string, email: string, pin: string): Promise<AuthSession> {
    const { data } = await apiClient.post<{ data: TokenResponse }>('/api/auth/register', { name, email, pin })
    return toSession(data.data)
  },
}
