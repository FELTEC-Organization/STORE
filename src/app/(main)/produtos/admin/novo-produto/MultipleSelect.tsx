"use client";

import { useState, useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/components/ui/command";
import { PlusCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultipleSelectProps<T> {
  control: any;
  name: string;
  fetchItems: () => Promise<T[]>;
  createItem: (name: string) => Promise<T>;
  labelKey: keyof T;
  valueKey: keyof T;
  placeholder?: string;
  single?: boolean;   // 🔹 adiciona single
  multiple?: boolean; // 🔹 adiciona multiple
}

export function MultipleSelect<T extends Record<string, any>>({
  control,
  name,
  fetchItems,
  createItem,
  labelKey,
  valueKey,
  placeholder = "Select or create...",
  single = false,
  multiple = false,
}: MultipleSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState("");
  const fetched = useRef(false);

  useEffect(() => {
    if (!open || fetched.current) return;
    fetched.current = true;
    fetchItems().then(setItems).catch(console.error);
  }, [open, fetchItems]);

  const handleCreate = async () => {
    try {
      const newItem = await createItem(inputValue);
      setItems([...items, newItem]);
      setInputValue("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const valueArray = Array.isArray(field.value)
          ? field.value
          : field.value
          ? [field.value]
          : [];

        const handleSelect = (val: string) => {
          if (single) {
            field.onChange(val);
          } else if (multiple) {
            const newValues = valueArray.includes(val)
              ? valueArray.filter((v) => v !== val)
              : [...valueArray, val];
            field.onChange(newValues);
          }
          setOpen(false);
        };

        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between px-3 py-2 text-sm flex items-center"
              >
                {valueArray.length > 0
                  ? valueArray.join(", ")
                  : placeholder}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-md border shadow-lg z-50">
              <Command>
                <CommandInput
                  placeholder="Search..."
                  value={inputValue}
                  onValueChange={setInputValue}
                />
                <CommandList>
                  <CommandEmpty>No items found.</CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        key={item[valueKey]}
                        value={item[labelKey]}
                        onSelect={() => handleSelect(item[labelKey] as string)}
                      >
                        {item[labelKey]}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {inputValue &&
                    !items.some(
                      (i) =>
                        i[labelKey].toLowerCase() ===
                        inputValue.toLowerCase()
                    ) && (
                      <CommandItem
                        value={inputValue}
                        onSelect={handleCreate}
                        className="text-primary"
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
      }}
    />
  );
}
