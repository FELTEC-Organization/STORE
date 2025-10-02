import { apiRequest } from "./api";

export type Category = { id: number; name: string };

export async function getCategories(): Promise<Category[]> {
  return apiRequest("Categories/public", { method: "GET" }); 
}

export async function postCategory(name: string): Promise<Category> {
  return apiRequest("Categories", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}
