import { apiRequest } from "./api";

export type Label = { id: number; name: string };

export async function getLabels(): Promise<Label[]> {
  return apiRequest("ProductLabels", { method: "GET" }); 
}

export async function postLabel(name: string): Promise<Label> {
  return apiRequest("ProductLabels", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}
