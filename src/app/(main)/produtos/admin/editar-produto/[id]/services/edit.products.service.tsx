export type Label = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string | null;
  price?: number;
  stock?: number;
  categoryId: number;
  labelId?: Label[];
  tags?: string[];
};

// GET /Products/:id
export async function getProductById(id: number): Promise<Product> {
  const userData = localStorage.getItem("@NPG-auth-user-data");
  if (!userData) throw new Error("Usuário não autenticado");

  const token = JSON.parse(userData).token;

  const res = await fetch(
    `https://portfolio-produtos-feltec.onrender.com/api/Products/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error(`Erro ao buscar produto com id ${id}`);

  const json = await res.json();
  return json;
}

// PUT /Products/:id
export async function updateProduct(
  id: number,
  data: Partial<Product>,
): Promise<void> {
  const userData = localStorage.getItem("@NPG-auth-user-data");
  if (!userData) throw new Error("Usuário não autenticado");

  const token = JSON.parse(userData).token;

  const res = await fetch(
    `https://portfolio-produtos-feltec.onrender.com/api/Products/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok && res.status !== 204) {
    const errorText = await res.text();
    throw new Error(errorText || `Erro ao atualizar produto com id ${id}`);
  }
}
