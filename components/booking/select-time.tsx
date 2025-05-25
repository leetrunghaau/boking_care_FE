"use client"

import { useEffect, useState } from "react"
import { format, addDays, isSameDay } from "date-fns"
import { vi } from "date-fns/locale"
import { Calendar, CalendarIcon, Clock, MapPin, User } from "lucide-react"
import { cn } from "@/lib/utils"
import http from "@/helper/axios"
import { getTimeFormat } from "@/helper/time"
import { CardLoading } from "@/components/ui/loading"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Doctor, DoctorTime, Specialty } from "./type"



interface Pops {
  doctor: Doctor | null
  specialty: Specialty | null
  selectedDate: Date | null
  selectedTime: number | null
  timeChange: (time: number | null) => void
  dateChange: (date: Date | null) => void
}
export default function SelectTime({ doctor, timeChange, dateChange, specialty, selectedDate, selectedTime }: Pops) {
  const [availableTimes, setAvailableTimes] = useState<DoctorTime[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(true)



  //đổi list time khi nhấn chọn ngày
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<DoctorTime[]>(`/booking/doctor/${doctor?.id}/schedule/${selectedDate}`)
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

  const dateCard = () => {
    const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))
    return (
      <Card>
        <CardHeader>
          <div className="flex  items-center gap-2">
            <Calendar className="h-6 w-6 text-teal-600" />
            <h2 className="text-xl font-semibold">Chọn ngày khám</h2>
          </div>
        </CardHeader>

        <CardContent className="flex justify-center">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => {
                dateChange(date)
                timeChange(null)
              }}
              className={cn(
                "flex flex-col items-center min-w-[4.5rem] mx-1 p-2 rounded-md border transition-colors",
                selectedDate && isSameDay(selectedDate, date)

                  ? "bg-teal-50 border-teal-200 text-teal-700"
                  : "hover:bg-slate-50",
              )}
            >
              <span className="text-xs font-medium">{format(date, "EEE", { locale: vi })}</span>
              <span className="text-lg font-bold">{format(date, "dd", { locale: vi })}</span>
              <span className="text-xs">{format(date, "MM", { locale: vi })}</span>
            </button>
          ))}
        </CardContent>
      </Card>
    )
  }

  const timeCard = () => {
    return (

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-6 w-6 text-teal-600" />
            <h2 className="text-xl font-semibold">Chọn ngày khám</h2>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? <CardLoading /> :
            <div className="grid grid-cols-4 gap-2">
              {availableTimes.length != 0 ? availableTimes.map((slot, index) => (
                <button
                  key={index}
                  disabled={!slot.available}
                  onClick={() => timeChange(slot.time)}
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
        </CardContent>


      </Card>
    )
  }

  const doctorCard = () => {
    return (
      <Card>
        < CardHeader >
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6 text-teal-600" />
            Thông tin bác sĩ
          </CardTitle>
        </ CardHeader>
        <CardContent>

          {
            doctor ?
              <>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={doctor.img} alt={doctor.name} />
                    <AvatarFallback>T</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-teal-600 font-medium">{specialty?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-teal-600" />
                  <span className="text-sm">{doctor.hospital.address} {doctor.room ?? ` - ${doctor.room}`}</span>
                </div>
              </>
              :
              <CardLoading />
          }

        </CardContent>

      </Card >

    )
  }
  const summary = () => {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Thông tin đặt lịch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {selectedDate && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-teal-600" />
              <span className="text-sm">{format(selectedDate, "eeee, dd 'tháng' M, yyyy", { locale: vi })}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-teal-600" />
            <span className="text-sm">{selectedTime ? getTimeFormat(selectedTime) : "Chưa chọn giờ"}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <div className="flex flex-col">
        {doctorCard()}
        {summary()}

      </div>
      <div className="space-y-4 col-span-2">
        {dateCard()}
        {timeCard()}
      </div>
    </div>

  )
}
