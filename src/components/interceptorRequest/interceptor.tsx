"use client"

import { useEffect } from "react"
import { localstorageService } from "@/services/localstorage.service"
import { showToast } from "../toast/showToast"

export function ClientInterceptor() {
  useEffect(() => {
    const originalFetch = window.fetch

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await originalFetch(input, init)

      const url = typeof input === "string" ? input : input.toString()

      if (url.includes("/Users/login")) {
        return response
      }

      if (response.status === 401) {
        localstorageService.removeDataUserIsLogged()

        showToast({
          type: "error",
          title: "Sessão expirada, tente fazer login novamente",
          description: "Erro 401 - Não autorizado",
        })

        window.location.href = "/login"
      }

      return response
    }
  }, [])

  return null
}
