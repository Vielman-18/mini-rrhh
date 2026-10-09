// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginCredentials } from "../types";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../utils/errorHandler";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Datos de usuarios demo
const DEMO_USERS: Record<string, User> = {
  "admin@empresa.com": {
    id: 1,
    name: "Roberto Silva",
    email: "admin@empresa.com",
    role: "admin",
    token: "mock-token-admin-xyz",
  },
  "rrhh@empresa.com": {
    id: 2,
    name: "Carlos Martínez",
    email: "rrhh@empresa.com",
    role: "hr",
    token: "mock-token-hr-xyz",
  },
  "empleado@empresa.com": {
    id: 3,
    name: "Ana García",
    email: "empleado@empresa.com",
    role: "employee",
    token: "mock-token-employee-xyz",
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          // Simular latencia de red
          await new Promise((resolve) => setTimeout(resolve, 800));

          const demoUser = DEMO_USERS[credentials.email];
          if (demoUser && credentials.password === "123456") {
            set({
              user: demoUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            toast.success(`Bienvenido, ${demoUser.name}`);
          } else {
            // Simulamos la estructura de error con el código para que extractErrorMessage lo traduzca
            throw { response: { data: { error: { code: 'INVALID_CREDENTIALS' } } } };
          }
        } catch (err: unknown) {
          const errorMessage = extractErrorMessage(err);
          set({ error: errorMessage, isLoading: false });
        }
      },

      logout: () => {
        toast.success("Sesión cerrada correctamente.");
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);