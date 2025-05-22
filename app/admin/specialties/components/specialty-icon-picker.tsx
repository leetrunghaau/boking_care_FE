"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import * as LucideIcons from "lucide-react"

const medicalIcons = [
  { value: "brain", label: "Não", icon: LucideIcons.Brain },
  { value: "heart", label: "Tim", icon: LucideIcons.Heart },
  { value: "lungs", label: "Phổi", icon: LucideIcons.Lungs },
  { value: "eye", label: "Mắt", icon: LucideIcons.Eye },
  { value: "ear", label: "Tai", icon: LucideIcons.Ear },
  { value: "tooth", label: "Răng", icon: LucideIcons.Tooth },
  { value: "baby", label: "Trẻ em", icon: LucideIcons.Baby },
  { value: "bone", label: "Xương", icon: LucideIcons.Bone },
  { value: "stethoscope", label: "Ống nghe", icon: LucideIcons.Stethoscope },
  { value: "pill", label: "Thuốc", icon: LucideIcons.Pill },
  { value: "syringe", label: "Tiêm", icon: LucideIcons.Syringe },
  { value: "microscope", label: "Kính hiển vi", icon: LucideIcons.Microscope },
]

interface SpecialtyIconPickerProps {
  value: string
  onChange: (value: string) => void
}

export function SpecialtyIconPicker({ value, onChange }: SpecialtyIconPickerProps) {
  const [open, setOpen] = useState(false)

  const selectedIcon = medicalIcons.find((icon) => icon.value === value)
  const IconComponent = selectedIcon?.icon || LucideIcons.HelpCircle

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <div className="flex items-center gap-2">
            <IconComponent className="h-4 w-4" />
            <span>{selectedIcon?.label || "Chọn biểu tượng"}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Tìm biểu tượng..." />
          <CommandList>
            <CommandEmpty>Không tìm thấy biểu tượng.</CommandEmpty>
            <CommandGroup>
              {medicalIcons.map((icon) => {
                const Icon = icon.icon
                return (
                  <CommandItem
                    key={icon.value}
                    value={icon.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue)
                      setOpen(false)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{icon.label}</span>
                    </div>
                    <Check className={cn("ml-auto h-4 w-4", value === icon.value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
