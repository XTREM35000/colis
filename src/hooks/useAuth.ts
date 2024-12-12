import { useAuthStore } from '../store/authStore';
import { Role } from '../types/auth';

export const useAuth = () => {
  const { user, isAuthenticated, loading, login, logout } = useAuthStore();

  const hasRole = (roles: Role | Role[]) => {
    if (!user) return false;
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    return user.role === roles;
  };

  const isAdmin = () => {
    return hasRole(['superadmin', 'admin']);
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasRole,
    isAdmin,
  };
};