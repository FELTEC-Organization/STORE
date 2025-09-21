import { NextResponse } from "next/server";

// Aqui você poderia conectar com banco de dados ou serviço externo
// Para simplificação, vou usar dados mockados
const mockUser = {
  email: "admin@test.com",
  password: "12345",
  userId: 1,
  name: "Administrador",
};

// Função utilitária para gerar token mockado (em produção use JWT)
function generateToken(userId: number) {
  return `token-${userId}-${Date.now()}`;
}

export async function POST(request: Request) {
  try {
    // Pega os dados enviados pelo cliente
    const { email, password } = await request.json();

    // Validações simples
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Checa credenciais
    if (email === mockUser.email && password === mockUser.password) {
      const token = generateToken(mockUser.userId);

      return NextResponse.json(
        {
          userId: mockUser.userId,
          email: mockUser.email,
          name: mockUser.name,
          token,
          refreshToken: `${token}-refresh`,
          version: "1.0.0",
          created: new Date().toISOString(),
          expiration: new Date(Date.now() + 3600 * 1000).toISOString(), // expira em 1h
          durationInSeconds: 3600,
        },
        { status: 200 }
      );
    }

    // Caso seja inválido
    return NextResponse.json(
      { message: "Credenciais inválidas" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
