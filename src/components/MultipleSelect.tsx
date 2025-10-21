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

export interface MultipleSelectProps<T, V extends string | number> {
  value?: V | V[];
  onChange?: (val: V | V[]) => void;
  placeholder?: string;
  single?: boolean;
  multiple?: boolean;
  fetchItems: () => Promise<T[]>;
  createItem: (name: string) => Promise<T>;
  labelKey: keyof T;
  valueKey: keyof T;
  endpointType?: "ProductLabels" | "Categories";
  onItemDeleted?: (deletedId: V) => void;
}

export function MultipleSelect<
  T extends Record<string, any>,
  V extends string | number,
>({
  value,
  onChange,
  placeholder = "Selecione ou crie...",
  single = false,
  multiple = false,
  fetchItems,
  createItem,
  labelKey,
  valueKey,
  endpointType,
  onItemDeleted,
}: MultipleSelectProps<T, V>) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState("");
  const fetched = useRef(false);

  // Carrega itens uma vez
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
      const newVal = newItem[valueKey] as V;
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

  const handleSelect = (val: V) => {
    if (single) {
      onChange?.(val);
      setOpen(false);
    } else if (multiple) {
      const arr = Array.isArray(value) ? [...value] : [];
      const exists = arr.includes(val);
      onChange?.(exists ? arr.filter((v) => v !== val) : [...arr, val]);
    }
  };

  const handleClear = () => {
    if (multiple) onChange?.([]);
    else if (single) onChange?.(null as any);
  };

  // Memoiza displayValue para atualizar automaticamente
  const displayValue = React.useMemo(() => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return placeholder;
    }

    if (!items || items.length === 0) {
      return Array.isArray(value) ? value.join(", ") : String(value);
    }

    if (single) {
      const found = items.find((i) => String(i[valueKey]) === String(value));
      return found ? String(found[labelKey]) : placeholder;
    }

    const vals = Array.isArray(value) ? value : [value];
    const labels = vals
      .map(
        (v) =>
          items.find((i) => String(i[valueKey]) === String(v))?.[labelKey] ??
          "",
      )
      .filter(Boolean)
      .map(String);

    return labels.length ? labels.join(", ") : placeholder;
  }, [items, value, single, placeholder, valueKey, labelKey]);

  return (
    <div className="relative w-full">
      {/* Botão limpar */}
      {((multiple && Array.isArray(value) && value.length > 0) ||
        (single && value)) && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
          aria-label="Limpar seleção"
        >
          ×
        </button>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "!font-normal w-full flex justify-between items-center text-left rounded-md border bg-muted px-3 py-2 text-sm shadow-sm hover:bg-muted/70 transition",
              multiple && Array.isArray(value) && value.length > 0 && "pr-8",
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
                    const key = item[valueKey] as V;
                    const label = String(item[labelKey]);
                    const selected =
                      multiple && Array.isArray(value)
                        ? value.map(String).includes(String(key))
                        : String(value) === String(key);

                    return (
                      <CommandItem
                        key={String(key)}
                        value={String(key)}
                        onSelect={() => handleSelect(key)}
                        className={cn(
                          "flex justify-between items-center",
                          selected && "bg-muted",
                        )}
                      >
                        <span className="flex-1">{label}</span>

                        {/* botão excluir */}
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            const confirmed = confirm(
                              `Excluir "${label}" permanentemente?`,
                            );
                            if (!confirmed) return;

                            try {
                              const endpoint =
                                endpointType ||
                                (window.location.href.includes("tags")
                                  ? "ProductLabels"
                                  : "Categories");

                              const token = JSON.parse(
                                localStorage.getItem("@NPG-auth-user-data") ||
                                  "{}",
                              )?.token;

                              const API_URL =
                                "https://portfolio-produtos-feltec.onrender.com";
                              const res = await fetch(
                                `${API_URL}/api/${endpoint}/${key}`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                  },
                                },
                              );

                              if (!res.ok) {
                                const msg = await res.text();
                                console.error(
                                  "Erro ao excluir:",
                                  res.status,
                                  msg,
                                );
                                alert(`Erro ${res.status}: ${msg}`);
                                return;
                              }

                              // 🔹 Remove o item da lista local
                              setItems((prev) =>
                                prev.filter((i) => i[valueKey] !== key),
                              );

                              // 🔹 Limpa valores relacionados
                              setInputValue(""); // limpa o campo
                              if (multiple && Array.isArray(value)) {
                                const newVal = value.filter(
                                  (v) => String(v) !== String(key),
                                );
                                onChange?.(newVal);
                              } else if (single && value === key) {
                                onChange?.(null as any);
                              }

                              // 🔹 Força atualização visual (evita exibir IDs)
                              setTimeout(() => {
                                fetchItems()
                                  .then(setItems)
                                  .catch(console.error);
                              }, 200);

                              // 🔹 Notifica o componente pai (para atualizar produtos)
                              onItemDeleted?.(key);

                              alert(`"${label}" excluído com sucesso!`);
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
