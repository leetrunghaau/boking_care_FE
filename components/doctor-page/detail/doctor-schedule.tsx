"use client"

import { useEffect, useState } from "react"
import { format, addDays } from "date-fns"
import { vi } from "date-fns/locale"
import { Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import http from "@/helper/axios"
import { getTimeFormat } from "@/helper/time"
import { CardLoading } from "@/components/ui/loading"

interface Time {
  time: number,
  available: boolean
}

interface Pops {
  slug: string
}

export default function DoctorSchedule({ slug }: Pops) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<number | null>(null)
  const [availableTimes, setAvailableTimes] = useState<Time[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<Time[]>(`/doctor-site/doctor/${slug}/schedule/${selectedDate}`)
        setAvailableTimes(res);
        console.log("fetch Hospital", res)
      } catch (err) {
        console.error("Failed to fetch Hospital:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDate])


  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))
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

        {isLoading ? <CardLoading /> :
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.length != 0 ? availableTimes.map((slot, index) => (
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
                {getTimeFormat(slot.time)}
              </button>
            )) :
              <>
                <p className="col-span-3">Bác sĩ không có lịch làm việc trong hôm nay</p>
              </>

            }
          </div>
        }
      </div>
    </div>
  )
}
