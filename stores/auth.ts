import { defineStore } from 'pinia';
import type { User, LoginCredentials } from '~/types/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userRole: (state) => state.user?.role,
  },

  actions: {
    async login(credentials: LoginCredentials) {
      this.loading = true;
      try {
        // Simulation d'une requête API
        const { data } = await useFetch('/api/auth/login', {
          method: 'POST',
          body: credentials,
        });
        this.user = data.value as User;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      navigateTo('/login');
    },
  },
});