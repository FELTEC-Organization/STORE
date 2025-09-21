import type { ReactNode } from "react"

// region Types Login
// Define a estrtutura base de resposta do auth
export interface AuthResponseCore {
  userId: number;
  email: string;
  name: string;
  token: string;
  refreshToken: string;
  version: string;
  created: string;
  expiration: string;
  durationInSeconds: number;
}

// Define o formato do contexto de autenticação
export interface AuthContextTypes extends AuthResponseCore {
    handleSetUser(props: AuthResponseCore): void 
    handleExitUser(): void
}

// Define as props do provider de autenticação
// Todas as renderizações (pages) serão envolvidas pelo AuthProvider
export interface AuthProviderProps {
    children: ReactNode // Elementos filhos que serão renderizados
}
// endregion