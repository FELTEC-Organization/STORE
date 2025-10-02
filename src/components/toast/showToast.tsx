import toast from "react-hot-toast";
import { X, CircleCheck, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import type { ToastTypes } from "./types";

export function showToast({ type, title, description, footer }: ToastTypes) {
	const activeToasts = new Set<string>();
	const id = `${type}-${title}-${description}`;

	// Se já existe um id, não mostra alerta de novo
	if (activeToasts.has(id)) return;
	activeToasts.add(id);
	
	toast.custom(
    (t) => (
      <div
        className={`transform transition-all duration-300 ${
          t.visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <CustomToast
          id={t.id}
          type={type}
          title={title}
          description={description}
          footer={footer}
        />
      </div>
    ),
    {
      id,
      duration: 5000,
    }
  );

  return id;
}

function CustomToast({
  id,
  type,
  title,
  description,
  footer,
}: ToastTypes & { id: string }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let dismissed = false;

    const interval = setInterval(() => {
      if (dismissed) return;
      setProgress((prev) => Math.max(0, prev - 2));
    }, 100);

    const timeout = setTimeout(() => {
      toast.dismiss(id);
    }, 5000);

    return () => {
      dismissed = true;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [id]);

  return (
    <div
      className={`overflow-hidden relative flex max-w-lg items-start gap-4 rounded-lg border px-4 py-5 shadow-lg ${
        type === "success"
          ? "bg-green-100 border-green-300 dark:bg-gray-800 dark:border-gray-700"
          : "bg-red-100 border-red-300 dark:bg-gray-800 dark:border-gray-700"
      }`}
    >
      {type === "success" ? (
        <CircleCheck className="text-green-600 place-self-center" size={24} />
      ) : (
        <CircleX className="text-red-600 place-self-center" size={24} />
      )}

      <div className="flex-1">
        <p className="font-semibold text-sm leading-5 text-gray-900 dark:text-gray-200">
          {title}
        </p>
        {description && (
          <p className="text-sm text-gray-700 dark:text-gray-400">{description}</p>
        )}
        {footer && <div>{footer}</div>}
      </div>

      <button
        onClick={() => toast.dismiss(id)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        type="button"
      >
        <X size={20} />
      </button>

      <div
        className="absolute bottom-0 left-0 h-1 transition-all duration-100"
        style={{
          width: `${progress}%`,
          backgroundColor: type === "success" ? "#16a34a" : "#ef4444", // verde/erro padrão
        }}
      />
    </div>
  );
}