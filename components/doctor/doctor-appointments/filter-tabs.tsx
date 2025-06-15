"use client";

import { cn } from "@/lib/utils";
import { types } from "@/app/doctor/appointments/page";

interface FilterTabsProps {
  currentType: any;
  onTypeChange: (value: any) => void;
}

export function FilterTabs({ currentType, onTypeChange }: FilterTabsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {Object.entries(types).map(([value, { label, icon: Icon, color }]) => {
        const isActive = currentType === value;
        return (
          <div
            key={value}
            onClick={() => onTypeChange({ currType: value })}
            className={cn(
              "p-4 rounded-lg text-center shadow duration-100 hover:cursor-pointer hover:translate-y-1",
              isActive ? `bg-${color}-50` : "bg-gray-50"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center mx-auto mb-2",
                isActive ? `text-${color}-600` : "text-gray-600"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
