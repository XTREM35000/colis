import type { Role } from '~/types/auth';

export const useAuth = () => {
  const auth = useAuthStore();

  const hasRole = (roles: Role | Role[]) => {
    if (!auth.user) return false;
    if (Array.isArray(roles)) {
      return roles.includes(auth.user.role);
    }
    return auth.user.role === roles;
  };

  const isAdmin = () => {
    return hasRole(['superadmin', 'admin']);
  };

  return {
    user: computed(() => auth.user),
    isAuthenticated: computed(() => auth.isAuthenticated),
    loading: computed(() => auth.loading),
    login: auth.login,
    logout: auth.logout,
    hasRole,
    isAdmin,
  };
};