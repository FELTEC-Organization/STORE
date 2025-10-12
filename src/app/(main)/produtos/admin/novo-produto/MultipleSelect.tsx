"use client";

import React, { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
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

  useEffect(() => {
    if (!open || fetched.current) return;
    fetched.current = true;
    fetchItems()
      .then((res) => setItems(res))
      .catch((err) => {
        console.error("Erro ao buscar opções:", err);
      });
  }, [open, fetchItems]);

  const handleCreate = async () => {
    if (!inputValue) return;

    const alreadyExists = items.some(
      (item) => String(item[labelKey]).toLowerCase() === inputValue.toLowerCase()
    );

    if (alreadyExists) {
      // já existe — apenas fecha e não cria
      setOpen(false);
      setInputValue("");
      return;
    }

    try {
      const newItem = await createItem(inputValue);
      setItems((prev) => [...prev, newItem]);

      const newVal = String(newItem[valueKey]);

      if (single) {
        onChange?.(newVal);
      } else if (multiple) {
        const current = Array.isArray(value) ? value.map(String) : [];
        onChange?.([...current, newVal]);
      }

      setInputValue("");
      setOpen(false);
    } catch (err: any) {
      // trate conflito/409 se necessário
      console.error("Erro ao criar item:", err);
      setOpen(false);
    }
  };

  const handleSelect = (val: string) => {
    if (single) {
      onChange?.(val);
    } else if (multiple) {
      const current = Array.isArray(value) ? value.map(String) : [];
      const exists = current.includes(val);
      const updated = exists ? current.filter((v) => v !== val) : [...current, val];
      onChange?.(updated);
    }
    setOpen(false);
  };

  const displayValue = (() => {
    try {
      if (single) {
        if (value == null) return placeholder;
        const found = items.find((i) => String(i[valueKey]) === String(value));
        return found ? String(found[labelKey]) : placeholder;
      } else {
        const vals = Array.isArray(value) ? value.map(String) : [];
        const labels = items
          .filter((i) => vals.includes(String(i[valueKey])))
          .map((i) => String(i[labelKey]));
        return labels.length ? labels.join(", ") : placeholder;
      }
    } catch {
      return placeholder;
    }
  })();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-between px-3 py-2 text-sm flex items-center")}
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
                return (
                  <CommandItem
                    key={key}
                    value={key}
                    onSelect={(val) => handleSelect(String(val))}
                  >
                    {label}
                  </CommandItem>
                );
              })}
            </CommandGroup>

            {inputValue &&
              !items.some(
                (i) => String(i[labelKey]).toLowerCase() === inputValue.toLowerCase()
              ) && (
                <CommandItem
                  onSelect={() => handleCreate()}
                  className="text-primary"
                  value={inputValue}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create {inputValue}
                </CommandItem>
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

