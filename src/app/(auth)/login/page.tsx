"use client";

import { Button } from "@/components/ui/button";
import { useContext, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/auth.ctx";
import { localstorageService } from "@/services/localstorage.service";
import AuthLayout from "@/app/(auth)/login/components/authLayout";
import AuthInput from "@/app/(auth)/login/components/authInput";
import PasswordInput from "@/app/(auth)/login/components/passwordInput";
import ErrorAlert from "@/app/(auth)/login/components/errorAlert";
import { ArrowRight } from "lucide-react";
import { postLogin } from "@/app/(auth)/login/services/postLogin.service";
import type { AuthResponseCore } from "@/app/(auth)/login/types/contract";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type TLoginSchema,
} from "@/app/(auth)/login/schemas/loginSchema";
import { loginSchema } from "@/app/(auth)/login/schemas/loginSchema";

export default function LoginPage() {
  const { handleSetUser } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLoginBlocked, setIsLoginBlocked] = useState(false);
  const [errorKeyId, setErrorKeyId] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const ERROR_DURATION = isLoginBlocked ? 120000 : 4000;
  const MAX_ATTEMPTS = 5;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const handleLogin = async (data: TLoginSchema) => {
    setLoading(true);
    setShowError(false);
    try {
      const response = await postLogin(data);

      const userData: AuthResponseCore = {
        userId: Number(response.userId),
        name: String(response.name),
        email: response.email,
        token: response.token,
        refreshToken: response.refreshToken,
        version: response.version,
        created: response.created,
        expiration: response.expiration,
        durationInSeconds: response.durationInSeconds,
      };

      // 🔥 Salva antes do redirect
      localstorageService.saveUserIsLogged(userData);
      console.log("✅ Dados salvos no localStorage:", userData);

      // Atualiza contexto
      handleSetUser(userData);

      router.push("/");
    } catch (error) {
      console.error("❌ Erro no login:", error);
      setLoading(false);
      setLoginAttempts((prev) => {
        const next = prev + 1;
        if (next >= MAX_ATTEMPTS) {
          setIsLoginBlocked(true);
          setErrorMessage("Many Attempts");
          setShowError(true);
        } else {
          setErrorMessage("invalidCredentialsTitle");
          setShowError(true);
        }
        return next;
      });
    }
  };

  return (
    <AuthLayout>
      {loading ? (
        <div className="flex flex-col gap-6">
          <div className="mt-24">
            <h2 className="text-nc-base-800 dark:text-nc-base-200 font-semibold text-lg">
              Welcome!
            </h2>
            <h1 className="text-nc-base-600 dark:text-nc-base-400 font-bold text-2xl">
              Login
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-nc-base-600 dark:text-nc-base-400 font-medium text-xl">
              Enter data
            </h2>
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="loader" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6 text-foreground">
            <div className="my-24 text-left">
              <h2 className="text-sunset font-semibold text-6xl">
                Bem-vindo de volta!
              </h2>
              <h1 className="text-nc-base-600 dark:text-nc-base-400 font-bold ">
                Acesse sua conta para continuar suas compras ou gerenciar seu
                perfil na Lorem Store.
              </h1>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-nc-base-600 dark:text-nc-base-400 font-medium text-xl">
                Insira seus dados
              </h2>
              <AuthInput
                id="email"
                label="Email"
                placeholder="Digite seu email"
                register={register("email")}
                error={errors.email?.message}
              />
              <PasswordInput
                label="Senha"
                register={register("password")}
                error={errors.password?.message}
              />
            </div>

            <ErrorAlert
              visible={showError}
              keyId={errorKeyId}
              message={errorMessage ?? undefined}
              isBlocked={isLoginBlocked}
              durationBlocked={120000}
              duration={4000}
              onClose={() => setShowError(false)}
            />
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              onClick={handleSubmit(handleLogin)}
              variant="sunset"
              className="w-full"
              disabled={!isValid}
            >
              Entrar <ArrowRight />
            </Button>

            <div className="flex items-center justify-center m-4">ou</div>

            <Button
              onClick={() => router.push("/password-renewal")}
              variant="adventure"
              className="w-full"
            >
              Esqueceu sua senha?
            </Button>
          </div>
        </>
      )}
    </AuthLayout>
  );
}


