import { XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ErrorAlertProps {
  visible: boolean; // Define se o alerta está visível
  keyId: number; // ID único para forçar re-render do progresso
  message?: string;
  durationBlocked?: number;
  duration?: number;
  isBlocked?: boolean;
  onClose?: () => void;
}

//  region Toast Alert
//  Componente de alerta de erro com barra de progresso animada
export default function ErrorAlert({
  visible,
  message,
  keyId,
  durationBlocked = 120000,
  duration = 4000,
  isBlocked = false,
  onClose,
}: ErrorAlertProps) {
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Formata os segundos restantes em MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (!visible) {
      // Limpa timers quando não visível
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCountdownSeconds(null);
      return;
    }

    if (isBlocked) {
      // Se bloqueado, começa o countdown
      setCountdownSeconds(durationBlocked / 1000);

      intervalRef.current = setInterval(() => {
        setCountdownSeconds((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            // Tempo esgotou
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (onClose) onClose();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Se não bloqueado, mostra só a mensagem por tempo curto
      timeoutRef.current = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
    }

    // region Clear Interval
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [visible, isBlocked, durationBlocked, duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`flex flex-col gap-1 bg-nc-stt-red-200 dark:bg-nc-stt-red-950 p-6 rounded-md shadow-sm relative
        transition-opacity duration-300 ease-in-out opacity-100 visible`}
      style={{ minHeight: "96px" }}
    >
      <div className="flex gap-2 items-center">
        <XCircle size={24} className="text-nc-stt-red-600" />
        <div>
          <strong className="block text-sm font-semibold">
            {message || ("invalidCredentialsTitle")}
          </strong>
          <span className="text-sm font-normal">
            {countdownSeconds !== null
              ? `${("Try again")} ${formatTime(countdownSeconds)}`
              : ("invalidCredentialsMessage")}
          </span>
        </div>
      </div>

      {/* Barra de progresso animada */}
      <div
        key={keyId}
        className="absolute bottom-0 left-0 h-1 bg-nc-stt-red-600 rounded-b-md animate-progress"
        style={{
          animationDuration: `${
            isBlocked ? durationBlocked : duration
          }ms`,
        }}
      />
    </div>
  );
}
