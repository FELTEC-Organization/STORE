import type { ReactNode } from "react"

// region Types Login
// Define a estrtutura base de resposta do auth
export interface AuthResponseCore {
  userId: number;
  email: string;
  name: string;
  token: string;
  refreshToken?: string;
}

// Define o formato do contexto de autenticação
export interface AuthContextTypes {
    user: AuthResponseCore | null;
    handleSetUser(user: AuthResponseCore): void 
    handleExitUser(): void
}

// Define as props do provider de autenticação
// Todas as renderizações (pages) serão envolvidas pelo AuthProvider
export interface AuthProviderProps {
    children: ReactNode // Elementos filhos que serão renderizados
}
// endregion