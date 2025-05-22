"use client"

import { format, addDays } from "date-fns"
import { vi } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface DateSelectorProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export function DateSelector({ selectedDate, onDateSelect }: DateSelectorProps) {
  // Tạo mảng 7 ngày từ ngày hiện tại
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Calendar className="h-4 w-4 text-teal-600" />
          Chọn ngày
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex overflow-x-auto pb-2 -mx-1">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => onDateSelect(date)}
              className={cn(
                "flex flex-col items-center min-w-[4.5rem] mx-1 p-2 rounded-md border transition-colors",
                selectedDate.toDateString() === date.toDateString()
                  ? "bg-teal-50 border-teal-200 text-teal-700"
                  : "hover:bg-slate-50",
              )}
            >
              <span className="text-xs font-medium">{format(date, "EEE", { locale: vi })}</span>
              <span className="text-lg font-bold">{format(date, "dd", { locale: vi })}</span>
              <span className="text-xs">{format(date, "MM", { locale: vi })}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
