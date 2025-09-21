import type { AuthResponseCore } from '@/app/(auth)/login/types/contract'

class LocalstorageService {
    // Nomeia a key do localStorage
    private nameAuth = '@NPG-auth-user-data'

    // region Save user token
    /**
     * Armazena os dados de autenticação do usuário.
     * @param data - Objeto contendo as informações de autenticação.
     */
    saveUserIsLogged(data: AuthResponseCore) {
        localStorage.setItem(`${this.nameAuth}`, JSON.stringify(data))
    }
    
    /**
     * Recupera os dados de autenticação do usuário.
     * @returns O objeto de autenticação ou null se não existir ou estiver inválido.
     */
    loadDataUserIsLogged(): null | AuthResponseCore {
        const userValues = localStorage.getItem(this.nameAuth)

        // Se não existir ou for 'undefined', retorna null
        if (!userValues || userValues === 'undefined') return null

        try {
            // Tenta fazer o parse do JSON e retornar os dados
            return JSON.parse(userValues)
        } catch (error) {
            // Caso ocorra erro no parse, loga e retorna null
            console.error('Erro ao parsear usuário do localStorage:', error)
            return null
        }
    }
    
    /**
     * Remove os dados de autenticação do usuário.
     */
    removeDataUserIsLogged() {
        localStorage.removeItem(`${this.nameAuth}`)
    }
    // endregion

    // region Step Register
    /**
     * Armazena dados relacionados a uma etapa específica do cadastro.
     * @param step - Nome ou identificador da etapa.
     * @param data - Dados a serem armazenados.
     */
    saveRegisterStepData(step: string, data: any) {
        localStorage.setItem(`@NPG-register-step-${step}`, JSON.stringify(data))
    }
    
    /**
     * Recupera dados relacionados a uma etapa específica do cadastro.
     * @param step - Nome ou identificador da etapa.
     * @returns Os dados armazenados ou null se não existirem.
     */
    loadRegisterStepData<T = any>(step: string): T | null {
        const value = localStorage.getItem(`@NPG-register-step-${step}`)
        if (!value) return null
        return JSON.parse(value) as T
    }
    
    /**
     * Remove dados relacionados a uma etapa específica do cadastro.
     * @param step - Identificador da etapa.
     */
    removeRegisterStepData(step: string) {
        localStorage.removeItem(`@NPG-register-step-${step}`)
    }
    // endregion
}

export function getAuthToken(): string {
  const raw = localStorage.getItem("@NPG-auth-user-data");
  if (!raw) throw new Error("Token de autenticação não encontrado.");

  const data = JSON.parse(raw);
  const token = data?.token;
  if (!token) throw new Error("Token inválido.");

  return token;
}

export function getNameUser(): string {
    const raw = localStorage.getItem("@NPG-auth-user-data");
    if (!raw) throw new Error("Nome de usuarío não encontrado.");

    const data = JSON.parse(raw);
    const name = data?.name;
    return name
}

export const localstorageService = new LocalstorageService()
