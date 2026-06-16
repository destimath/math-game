export type UserRole = 'student' | 'teacher'

export interface AuthSession {
  role: UserRole
  displayName: string
  classCode?: string
  accessToken?: string
}
