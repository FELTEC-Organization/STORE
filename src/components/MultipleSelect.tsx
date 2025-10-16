"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { PlusCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MultipleSelectProps<T> {
  value?: string | string[];
  onChange?: (val: string | string[]) => void;
  placeholder?: string;
  single?: boolean;
  multiple?: boolean;
  fetchItems: () => Promise<T[]>;
  createItem: (name: string) => Promise<T>;
  labelKey: keyof T;
  valueKey: keyof T;
}

export function MultipleSelect<T extends Record<string, any>>({
  value,
  onChange,
  placeholder = "Selecione ou crie...",
  single = false,
  multiple = false,
  fetchItems,
  createItem,
  labelKey,
  valueKey,
}: MultipleSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState("");
  const fetched = useRef(false);

  // 1. Carrega os itens automaticamente na montagem (não apenas quando abre)
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchItems().then(setItems).catch(console.error);
  }, [fetchItems]);

  const handleCreate = async () => {
    if (!inputValue) return;
    if (
      items.some(
        (i) => String(i[labelKey]).toLowerCase() === inputValue.toLowerCase(),
      )
    ) {
      setOpen(false);
      setInputValue("");
      return;
    }
    try {
      const newItem = await createItem(inputValue);
      setItems((prev) => [...prev, newItem]);
      const newVal = String(newItem[valueKey]);
      if (single) onChange?.(newVal);
      if (multiple)
        onChange?.([...(Array.isArray(value) ? value : []), newVal]);
      setInputValue("");
      setOpen(false);
    } catch (err) {
      console.error(err);
      setOpen(false);
    }
  };

  const handleSelect = (val: string) => {
    if (single) {
      onChange?.(val);
      setOpen(false);
    } else if (multiple) {
      const arr = Array.isArray(value) ? [...value] : [];
      const exists = arr.includes(val);
      onChange?.(exists ? arr.filter((v) => v !== val) : [...arr, val]);
    }
  };

  // 2. Atualiza labels quando os itens ou valores mudam
  const displayValue = (() => {
    if (!items.length) return placeholder;
    if (single) {
      if (!value) return placeholder;
      const found = items.find((i) => String(i[valueKey]) === String(value));
      return found ? String(found[labelKey]) : placeholder;
    } else {
      const vals = Array.isArray(value) ? value : [];
      const labels = items
        .filter((i) => vals.includes(String(i[valueKey])))
        .map((i) => String(i[labelKey]));
      return labels.length ? labels.join(", ") : placeholder;
    }
  })();

  // 3. Quando o valor muda externamente, tenta sincronizar novamente
  useEffect(() => {
    if (!fetched.current) return;
    if (Array.isArray(value) && multiple) setItems((prev) => [...prev]);
  }, [value, multiple]);

  return (
    <div className="relative w-full">
      {/* Botão "x" no lado direito do input */}
      {multiple && Array.isArray(value) && value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange?.([])}
          className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
          aria-label="Limpar seleção"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "!font-normal w-full flex justify-between items-center text-left rounded-md border bg-muted px-3 py-2 text-sm shadow-sm hover:bg-muted/70 transition",
              multiple && Array.isArray(value) && value.length > 0 && "pr-8", // espaço pro X
            )}
          >
            <span className="truncate">{displayValue}</span>
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-md border shadow-lg z-50 bg-background">
          <Command>
            <CommandInput
              value={inputValue}
              onValueChange={setInputValue}
              placeholder="Buscar..."
            />
            <CommandList>
              <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
              <CommandGroup>
                {items
                  .filter((item) =>
                    String(item[labelKey])
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()),
                  )
                  .map((item) => {
                    const key = String(item[valueKey]);
                    const label = String(item[labelKey]);
                    const selected =
                      multiple && Array.isArray(value)
                        ? value.includes(key)
                        : value === key;

                    return (
                      <CommandItem
                        key={key}
                        value={key}
                        onSelect={() => handleSelect(key)}
                        className={cn(
                          "flex justify-between items-center",
                          selected && "bg-muted",
                        )}
                      >
                        <span>{label}</span>

                        {/* Botão X para excluir item do banco */}
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              const confirmed = confirm(
                                `Excluir "${label}" permanentemente?`,
                              );
                              if (!confirmed) return;

                              // Detecta automaticamente se está na aba de tags ou categorias
                              const isTag =
                                window.location.href.includes("tags");
                              const endpoint = isTag
                                ? "ProductLabels"
                                : "Categories";

                              const token = JSON.parse(
                                localStorage.getItem("@NPG-auth-user-data") ||
                                  "{}",
                              )?.token;

                              const response = await fetch(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}/${key}`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                  },
                                },
                              );

                              if (!response.ok) {
                                const msg = await response.text();
                                console.error("Erro ao excluir:", msg);
                                alert("Erro ao excluir item do banco.");
                                return;
                              }

                              // Atualiza a lista local removendo o item
                              setItems((prev) =>
                                prev.filter((i) => String(i[valueKey]) !== key),
                              );

                              // Remove do input se estiver selecionado
                              if (multiple && Array.isArray(value)) {
                                onChange?.(value.filter((v) => v !== key));
                              } else if (single && value === key) {
                                onChange?.("");
                              }

                              alert(`"${label}" foi excluído com sucesso!`);
                            } catch (err) {
                              console.error(err);
                              alert("Erro ao excluir item.");
                            }
                          }}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          ×
                        </button>
                      </CommandItem>
                    );
                  })}
              </CommandGroup>

              {inputValue &&
                !items.some(
                  (i) =>
                    String(i[labelKey]).toLowerCase() ===
                    inputValue.toLowerCase(),
                ) && (
                  <CommandItem
                    onSelect={handleCreate}
                    className="text-primary"
                    value={inputValue}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Criar {inputValue}
                  </CommandItem>
                )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
