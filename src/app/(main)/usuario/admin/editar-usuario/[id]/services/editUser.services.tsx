export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

// region GET USER by ID
/**
 * GET /api/Users/:id - busca um usuário específico
 */
export async function getUserById(id: number): Promise<User> {
  const userData = localStorage.getItem("@NPG-auth-user-data")
  if (!userData) throw new Error("Usuário não autenticado")

  const token = JSON.parse(userData).token

  const res = await fetch(
    `https://portfolio-produtos-feltec.onrender.com/api/Users/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error(`Erro ao buscar usuário com id ${id}`)
  }

  const json = await res.json()
  return {
    id: json.id,
    name: json.name,
    email: json.email,
    role: json.role,
  }
}

// region PUT USER
/**
 * PUT /api/Users/:id - atualiza um usuário
 */
export async function updateUser(
  id: number,
  data: { name: string; email: string; password?: string; role: string }
): Promise<void> {
  const userData = localStorage.getItem("@NPG-auth-user-data")
  if (!userData) throw new Error("Usuário não autenticado")

  const token = JSON.parse(userData).token

  const res = await fetch(
    `https://portfolio-produtos-feltec.onrender.com/api/Users/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )

  // PUT /Users/:id retorna 204 no sucesso
  if (!res.ok && res.status !== 204) {
    const errorText = await res.text()
    throw new Error(errorText || `Erro ao atualizar usuário com id ${id}`)
  }
}
