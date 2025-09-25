interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  userId: number;
  email: string;
  name: string;
  token: string;
  refreshToken: string;
  version: string;
  created: string;
  expiration: string;
  durationInSeconds: number;
}

// Função que consome o endpoint /api/login
export async function postLogin(data: { email: string; password: string }) {
  const res = await fetch("https://portfolio-produtos-feltec.onrender.com/api/Users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Credenciais inválidas");
  }

  return res.json();
};
