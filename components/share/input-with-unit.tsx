"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputWithUnitProps {
  id?: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  className?: string;
  unit: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputWithUnit({
  id,
  placeholder,
  value,
  readOnly,
  className,
  unit,
  label,
  onChange,
}: InputWithUnitProps) {
  return (
    <div className="space-y-1">
      <div className="relative">
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          className={cn("pt-4", className)}
          onChange={onChange}
        />
        <span className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-xs text-slate-500">
          {label}
        </span>
        <span className="absolute top-0 right-3 -translate-y-1/2 bg-white px-1 text-xs text-slate-400 font-medium">
          {unit}
        </span>
      </div>
    </div>
  );
}
