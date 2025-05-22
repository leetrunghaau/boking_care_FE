"use client"

import { useState } from "react"
import { format, addDays } from "date-fns"
import { vi } from "date-fns/locale"
import { Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface DoctorScheduleProps {
  doctorId: string
}

export default function DoctorSchedule({ doctorId }: DoctorScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Tạo danh sách 7 ngày từ hôm nay
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))

  // Tạo danh sách các khung giờ có sẵn (mẫu)
  const availableTimes = [
    { time: "08:00", available: true },
    { time: "08:30", available: true },
    { time: "09:00", available: true },
    { time: "09:30", available: false },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: false },
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: true },
    { time: "15:30", available: false },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
  ]

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-teal-600" />
          <h3 className="font-medium">Chọn ngày</h3>
        </div>

        <div className="flex overflow-x-auto pb-2 -mx-1">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
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
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-teal-600" />
          <h3 className="font-medium">Chọn giờ</h3>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {availableTimes.map((slot, index) => (
            <button
              key={index}
              disabled={!slot.available}
              onClick={() => setSelectedTime(slot.time)}
              className={cn(
                "py-2 px-1 text-sm rounded-md border transition-colors",
                !slot.available && "opacity-50 cursor-not-allowed bg-slate-50",
                selectedTime === slot.time
                  ? "bg-teal-50 border-teal-200 text-teal-700"
                  : slot.available
                    ? "hover:bg-slate-50"
                    : "",
              )}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
