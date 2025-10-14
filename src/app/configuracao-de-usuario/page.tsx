"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionPhotos from "./components/UploadPhotos";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfiguracaoDeUsuario() {
  // Estados do usuário
  const [username, setUsername] = useState("Feltec Solutions");
  const [email, setEmail] = useState("feltec@admin.com");
  const [password, setPassword] = useState("senha123");
  const [showPassword, setShowPassword] = useState(false);

  // Estado da foto em base64
  const [photo, setPhoto] = useState<string | null>(null);

  // Função de salvar (simulação)
  const handleSave = () => {
    console.log({ username, email, password, photo });
    alert("Alterações salvas!");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-muted py-10">
      {/* Upload de Foto */}
      <div className="flex flex-col items-center mb-6">
        <SectionPhotos photo={photo} setPhoto={setPhoto} />
      </div>

      {/* Card Principal */}
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Gerenciar Perfil</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Nome */}
          <div className="grid gap-1.5">
            <Label htmlFor="username">Nome de Usuário</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome"
            />
          </div>

          {/* E-mail */}
          <div className="grid gap-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
            />
          </div>

          {/* Senha */}
          <div className="grid gap-1.5">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button variant="sunset" className="w-full" onClick={handleSave}>
            Salvar Alterações
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
