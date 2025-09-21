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
export const postLogin = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Credenciais inválidas");
  }

  return res.json();
};
