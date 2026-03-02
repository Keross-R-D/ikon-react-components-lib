import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/ui/popover";
import { Button } from "../../shadcn/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../shadcn/ui/command";
import type { ComboBoxInputProps } from "./type";
import { cn } from "../../shadcn/lib/utils";

export function ComboboxInput({
  placeholder,
  items,
  disabled,
  onSelect,
  defaultValue
}: ComboBoxInputProps) {
  const [value, setValue] = useState(defaultValue ?? '');
  return (
    <Popover>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between", !value && "text-muted-foreground", "bg-secondary")}
          disabled={disabled === true || (typeof disabled === 'function' && disabled())}
        >
          {value
            ? items.find((item) => item.value === value)?.label || value
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  value={item.value}
                  key={item.value}
                  disabled={
                    item.disabled === true ||
                    (typeof item.disabled === 'function' && item.disabled(item))
                  }
                  onSelect={(currentValue) => {
                    const matched =
                      items.find(
                        (i) => i.value.toLowerCase() === currentValue.toLowerCase()
                      )?.value ?? currentValue;
                    setValue(matched);
                    onSelect?.(matched);
                  }}
                >
                  {item?.label || item.value}
                  <Check
                    className={cn(
                      "ml-auto",
                      item.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
