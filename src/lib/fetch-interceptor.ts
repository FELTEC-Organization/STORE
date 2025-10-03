import { localstorageService } from "@/services/localstorage.service"
import { showToast } from "@/components/toast/showToast"

if (typeof window !== "undefined") {
  const originalFetch = window.fetch

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      const response = await originalFetch(input, init)

      // Se a sessão expirou (401)
      if (response.status === 401) {
        localstorageService.removeDataUserIsLogged()

        showToast({
          type: "error",
          title: "Sessão expirada, tente fazer login novamente",
          description: "Erro 401 - Não autorizado",
        })

        // Opcional: redirecionar
        window.location.href = "/login"
      }

      return response
    } catch (err) {
      console.error("Erro global no fetch:", err)
      throw err
    }
  }
}
