// listProduct.services.ts
const API_URL = "https://portfolio-produtos-feltec.onrender.com";

export async function deleteProduct(id: string) {
  try {
    // Pega token do usuário
    const userData = localStorage.getItem("@NPG-auth-user-data");
    if (!userData) throw new Error("Usuário não autenticado");

    const { token } = JSON.parse(userData);

    const response = await fetch(`${API_URL}/api/Products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return { success: false, errors: text || "Erro ao deletar produto" };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, errors: err.message };
  }
}
