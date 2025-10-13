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
  placeholder = "Select or create...",
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

  // 🔹 1. Carrega os itens automaticamente na montagem (não apenas quando abre)
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

  // 🔹 2. Atualiza labels quando os itens ou valores mudam
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

  // 🔹 3. Quando o valor muda externamente, tenta sincronizar novamente
  useEffect(() => {
    if (!fetched.current) return;
    if (Array.isArray(value) && multiple) setItems((prev) => [...prev]);
  }, [value, multiple]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between px-3 py-2 text-sm flex items-center",
          )}
        >
          {displayValue}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-md border shadow-lg z-50">
        <Command>
          <CommandInput
            value={inputValue}
            onValueChange={setInputValue}
            placeholder="Search..."
          />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => {
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
                    className={cn(selected && "bg-muted")}
                  >
                    {label}
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
                  Create "{inputValue}"
                </CommandItem>
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
