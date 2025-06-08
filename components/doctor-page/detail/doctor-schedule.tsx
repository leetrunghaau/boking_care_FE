"use client"

import { useEffect, useState } from "react"
import { format, addDays } from "date-fns"
import { vi } from "date-fns/locale"
import { Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import http from "@/helper/axios"
import { getTimeFormat } from "@/helper/time"
import { CardLoading } from "@/components/ui/loading"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { formatCurrencyVND } from "@/helper/customNumView"
import { useBookingStore } from "@/store/booking"


interface Pops {
  slug: string,
}

export default function DoctorSchedule({ slug }: Pops) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableTimes, setAvailableTimes] = useState<any[]>([])
  const [info, setInfo] = useState<any | null>(null)


  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(false);
      try {
        const rs = await http.get(`/doctor-site/doctor/${slug}/schedule/info`)
        setInfo(rs)
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }

    }
    loadData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<any[]>(`/doctor-site/doctor/${slug}/schedule/${format(selectedDate, 'yyyy-MM-dd')}`)
        setAvailableTimes(res);
        console.log("fetch Hospital", res)
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedDate])


  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))
  return (
    <Card >
      <CardContent className="p-6">
        <h2 className="text-lg font-bold mb-4">Đặt lịch khám</h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Giá khám:</span>
            <span className="font-medium">{info?.price ?? "Không có thông tin"} </span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Thời gian:</span>
            <span className="font-medium">{info?.duration ?? "Không có thông tin"}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Địa điểm:</span>
            <span className="font-medium">{info?.address ?? "Không có thông tin"}</span>
          </div>
        </div>

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
                    onClick={() => setSelectedTime(slot.start)}
                    className={cn(
                      "py-2 px-1 text-sm rounded-md border transition-colors",
                      !slot.available && "opacity-50 cursor-not-allowed bg-slate-50",
                      selectedTime === slot.start
                        ? "bg-teal-50 border-teal-200 text-teal-700"
                        : slot.available
                          ? "hover:bg-slate-50"
                          : "",
                    )}
                  >
                    {slot.start}
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

        <div className="mt-6">
          <Button className="w-full bg-teal-600 hover:bg-teal-700"
            disabled={!(selectedDate && selectedTime)}
            onClick={() => {
              const queryParams = new URLSearchParams();
              queryParams.set("curStep", "3");
             queryParams.set("date", format(selectedDate, "yyyy-MM-dd"));
              if (selectedTime) {
                queryParams.set("time", selectedTime.toString());
              }
              queryParams.set("doctorId", info.id.toString());
              const queryString = queryParams.toString();
              router.push(`/dat-lich-kham${queryString ? `?${queryString}` : ""}`);
            }}
          >Đặt lịch khám</Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Miễn phí đặt lịch, không mất phí khi hủy trước 24 giờ
          </p>
        </div>
      </CardContent>
    </Card>

  )
}
