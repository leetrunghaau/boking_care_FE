"use client"

import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"
import { vi } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ChevronLeft, ChevronRight, Copy, Save } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function WeeklySchedule() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }))

  // Tạo mảng ngày trong tuần hiện tại
  const weekDates = eachDayOfInterval({
    start: currentWeekStart,
    end: endOfWeek(currentWeekStart, { weekStartsOn: 1 }),
  })

  // Chuyển đến tuần trước
  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7))
  }

  // Chuyển đến tuần sau
  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7))
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-teal-600" />
            Lịch làm việc theo tuần
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-2">
              {format(weekDates[0], "dd/MM", { locale: vi })} - {format(weekDates[6], "dd/MM/yyyy", { locale: vi })}
            </span>
            <Button variant="outline" size="icon" onClick={goToNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-slate-50 w-20">Giờ</th>
                {weekDates.map((date, index) => (
                  <th key={index} className="border p-2 bg-slate-50">
                    <div className="text-center">
                      <div className="font-medium">{format(date, "EEE", { locale: vi })}</div>
                      <div className="text-lg font-bold">{format(date, "dd", { locale: vi })}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((time, timeIndex) => (
                <tr key={timeIndex}>
                  <td className="border p-2 font-medium text-center">{time}</td>
                  {weekDates.map((date, dateIndex) => {
                    // Giả lập dữ liệu lịch làm việc
                    const isAvailable = (timeIndex + dateIndex) % 3 !== 0
                    const isBooked = isAvailable && (timeIndex + dateIndex) % 5 === 0

                    return (
                      <td
                        key={dateIndex}
                        className={cn(
                          "border p-1 text-center text-sm",
                          !isAvailable && "bg-slate-50",
                          isBooked && "bg-blue-50",
                        )}
                      >
                        {isAvailable ? (
                          <div className={cn("p-1 rounded", isBooked ? "text-blue-700" : "text-teal-700")}>
                            {isBooked ? (
                              <div>
                                <Badge className="bg-blue-500 mb-1">Đã đặt</Badge>
                                <div className="text-xs">Bệnh nhân {dateIndex + 1}</div>
                              </div>
                            ) : (
                              "Trống"
                            )}
                          </div>
                        ) : (
                          <div className="text-slate-400">-</div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" size="sm">
          <Copy className="h-4 w-4 mr-1" />
          Sao chép từ tuần trước
        </Button>
        <Button variant="default" size="sm" className="bg-teal-600 hover:bg-teal-700">
          <Save className="h-4 w-4 mr-1" />
          Lưu lịch tuần
        </Button>
      </CardFooter>
    </Card>
  )
}
