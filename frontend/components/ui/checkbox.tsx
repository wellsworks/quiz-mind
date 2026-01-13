"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { Label } from "./label"

import { cn } from "@/lib/utils"
import { CheckIcon, MinusIcon } from "lucide-react"
import { CommandItem } from "./command"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CheckboxTreeProps = {
  parent: string;
  items: { 
    id: number,
    label: string,
    disabled?: boolean,
  }[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
};


function Checkbox({
  className,
  isParent = false,
  checked,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  isParent?: boolean
}) {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-[4px] border shadow-xs transition-shadow group-has-disabled/field:opacity-50 focus-visible:ring-[3px] aria-invalid:ring-[3px] peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked === true && "bg-primary text-primary-foreground border-primary",
        checked === "indeterminate" && "bg-background text-primary border-primary",
        checked === false && "bg-background border-input",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        {isParent && checked === "indeterminate" && (
          <MinusIcon className="size-2.5" />
        )}
        
        {checked === true && (
          <CheckIcon className="size-3.5" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

function CheckboxTree({
  parent,
  items,
  selectedIds,
  onChange,
}: CheckboxTreeProps ) {
  const enabledIds = items
  .filter(item => !item.disabled)
  .map(item => item.id)

  const checked: CheckboxPrimitive.CheckedState = 
    selectedIds.length === 0
      ? false
      : selectedIds.length === items.length
      ? true
      : "indeterminate"
  
  function handleParentChange(_: CheckboxPrimitive.CheckedState) {
    if (selectedIds.length > 0) {
      onChange([])
    } else {
      onChange(enabledIds)
    }
  }

  function toggleChild(id: number, value: boolean) {
    if (value) {
      onChange([...selectedIds, id])
    } else {
      onChange(selectedIds.filter(x => x !== id))
    }
  }


  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <CommandItem>
          <Checkbox 
            id={parent} 
            name={parent}
            isParent
            checked={checked} 
            onCheckedChange={handleParentChange} 
          />
          <Label 
            htmlFor={parent}
          >
            {parent}
          </Label>
        </CommandItem>
      </div>
      <div className="flex flex-col">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-2">
            <CommandItem>
              <Checkbox
                id={item.label}
                name={item.label}
                checked={selectedIds.includes(item.id)}
                disabled={item.disabled}
                aria-disabled={item.disabled}
                onCheckedChange={checked =>
                  toggleChild(item.id, Boolean(checked))
                }
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label 
                    className={cn(
                    item.disabled && "text-muted-foreground cursor-not-allowed"
                    )}
                    htmlFor={item.label}
                  >
                    {item.label}
                  </Label>
                </TooltipTrigger>

                {item.disabled && (
                  <TooltipContent>
                    <p>No flashcards yet. Generate flashcards to study this note.</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </CommandItem>
          </div>
        ))}
      </div>
    </div>
  )
}

export { 
  Checkbox,
  CheckboxTree
}
