export type Role = 'superadmin' | 'admin' | 'client' | 'financier' | 'operateur' | 'guest';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}