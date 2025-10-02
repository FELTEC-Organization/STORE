export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type PaginatedUsers = {
  items: User[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

/**
 * Função que consome o endpoint GET /api/Users
 * @param token Token JWT para autenticação
 * @param page Página atual
 * @param pageSize Quantidade de itens por página
 */
export async function getUsers(
  page = 1,
  pageSize = 20
): Promise<PaginatedUsers> {
  const userData = localStorage.getItem("@NPG-auth-user-data")
  if (!userData) throw new Error("Usuário não autenticado");

  const parsedUser = JSON.parse(userData);
  const token = parsedUser.token;
  const res = await fetch(
    `https://portfolio-produtos-feltec.onrender.com/api/Users?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar usuários");
  }

  const json = await res.json();

  // Mapear a resposta da API para PaginatedUsers
  return {
    items: json.items.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })),
    currentPage: json.page,
    pageSize: json.pageSize,
    totalItems: json.total,
    totalPages: Math.ceil(json.total / json.pageSize),
    hasPreviousPage: json.page > 1,
    hasNextPage: json.page * json.pageSize < json.total,
  };
}

export async function deleteUser(id: string) {
  // Pegar token do localStorage
  const userData = localStorage.getItem("@NPG-auth-user-data");
  if (!userData) throw new Error("Usuário não autenticado");

  const parsedUser = JSON.parse(userData);
  const token = parsedUser.token;

  const res = await fetch(`https://portfolio-produtos-feltec.onrender.com/api/Users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    return { success: false, errors: errorText };
  }

  return { success: true };
}
