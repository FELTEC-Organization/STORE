export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type CreatedUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

/**
 * Função que cria um usuário via POST /api/Users
 * Usa o token salvo no localStorage para autenticação
 * @param data Dados do usuário a ser criado
 */
export async function createUser(data: CreateUserPayload): Promise<CreatedUser> {
  // Pegar token do localStorage
  const userData = localStorage.getItem("@NPG-auth-user-data");
  if (!userData) throw new Error("Usuário não autenticado");

  const parsedUser = JSON.parse(userData);
  const token = parsedUser.token;

  const res = await fetch("https://portfolio-produtos-feltec.onrender.com/api/Users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar usuário");
  }

  const json = await res.json();

  // Retornar os dados do usuário criado
  return {
    id: json.id,
    name: json.name,
    email: json.email,
    role: json.role,
  };
}
