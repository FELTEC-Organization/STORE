// src/services/api.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://portfolio-produtos-feltec.onrender.com/api/Products";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const userData = localStorage.getItem("@NPG-auth-user-data");
  const token = userData ? JSON.parse(userData).token : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Erro ao comunicar com a API");
  }

  return res.json();
}
