"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Copy, Save, Clock3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

interface TimeSlot {
  time: string
  available: boolean
  booked: boolean
  patient?: string
}

interface TimeSlotsProps {
  selectedDate: Date
  timeSlots: TimeSlot[]
  selectedTime: string | null
  onTimeSelect: (time: string) => void
  onSaveSchedule: () => void
  stats: {
    available: number
    booked: number
  }
}

export function TimeSlots({
  selectedDate,
  timeSlots,
  selectedTime,
  onTimeSelect,
  onSaveSchedule,
  stats,
}: TimeSlotsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-teal-600" />
            Lịch làm việc - {format(selectedDate, "dd/MM/yyyy", { locale: vi })}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-1" />
              Sao chép
            </Button>
            <Button variant="default" size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={onSaveSchedule}>
              <Save className="h-4 w-4 mr-1" />
              Lưu lịch
            </Button>
          </div>
        </div>
        <CardDescription>Nhấp vào ô giờ để bật/tắt trạng thái khả dụng</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              disabled={slot.booked}
              onClick={() => !slot.booked && onTimeSelect(slot.time)}
              className={cn(
                "relative py-3 px-2 text-sm rounded-md border transition-colors",
                slot.booked && "cursor-not-allowed",
                !slot.available && !slot.booked && "bg-slate-50 border-slate-200 text-slate-400",
                slot.booked
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : selectedTime === slot.time
                    ? "bg-teal-50 border-teal-200 text-teal-700"
                    : slot.available && !slot.booked
                      ? "hover:bg-teal-50 hover:border-teal-200"
                      : "",
              )}
            >
              <div className="flex items-center justify-center gap-1">
                <Clock3
                  className={cn(
                    "h-3.5 w-3.5",
                    slot.booked ? "text-blue-600" : slot.available ? "text-teal-600" : "text-slate-400",
                  )}
                />
                {slot.time}
              </div>

              {slot.booked && slot.patient && (
                <div className="mt-1 text-xs font-medium text-blue-700 border-t border-blue-200 pt-1">
                  {slot.patient}
                </div>
              )}

              {slot.booked && <Badge className="absolute -top-2 -right-2 bg-blue-500">Đã đặt</Badge>}
            </button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-slate-500 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-teal-500"></div>
          <span>Khả dụng: {stats.available}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Đã đặt: {stats.booked}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-300"></div>
          <span>Không khả dụng</span>
        </div>
      </CardFooter>
    </Card>
  )
}
