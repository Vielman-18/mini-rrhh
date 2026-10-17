// src/components/RoleGuard.tsx
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

type Role = 'admin' | 'hr' | 'employee';

// Devuelve true si el usuario actual tiene alguno de los roles indicados
export function useHasRole(roles: Role[]): boolean {
  const user = useAuthStore((state) => state.user);
  return !!user && roles.includes(user.role as Role);
}

interface RoleGuardProps {
  roles: Role[];
  children: ReactNode;
}

// Protege una ruta según el rol; si no tiene permiso, redirige al inicio
function RoleGuard({ roles, children }: RoleGuardProps) {
  const allowed = useHasRole(roles);
  return allowed ? <>{children}</> : <Navigate to="/" replace />;
}

export default RoleGuard;