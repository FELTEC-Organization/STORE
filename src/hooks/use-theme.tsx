"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "elegance-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false); // para garantir que rodou no client

  // Carrega o tema do localStorage e aplica ao html
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    const initial = storedTheme || defaultTheme;
    setTheme(initial);

    applyTheme(initial);

    setMounted(true);
  }, [defaultTheme, storageKey]);

  // Função para aplicar classes no html
  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (t === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(t);
    }
  };

  // Atualiza tema e salva no localStorage
  const handleSetTheme = (newTheme: Theme) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Espera montar para renderizar o contexto
  if (!mounted) return null;

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
