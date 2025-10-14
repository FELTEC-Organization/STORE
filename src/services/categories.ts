import { apiRequest } from "./api";

export type Category = { id: number; name: string };

export async function getCategories(): Promise<Category[]> {
  return apiRequest("Categories/public", { method: "GET" }); 
}

export async function postCategory(name: string): Promise<Category> {
  const userData = localStorage.getItem("@NPG-auth-user-data");
  if (!userData) throw new Error("Usuário não autenticado");

  const token = JSON.parse(userData).token;

  return apiRequest("Categories", {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ name }),
  });
}
