import { defineStore } from 'pinia'

interface User {
  id: string
  phone: string
  role: 'admin' | 'client' | 'visitor'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false
  }),
  
  actions: {
    setUser(user: User | null) {
      this.user = user
      this.isAuthenticated = !!user
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
    }
  }
})