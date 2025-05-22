"use client"

import { useState } from "react"
import { format, addDays, startOfDay, addHours, isBefore, isAfter } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon, Clock } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"

// Generate available time slots
const generateTimeSlots = (date: Date) => {
  const today = startOfDay(new Date())
  const isToday = startOfDay(date).getTime() === today.getTime()
  const currentHour = new Date().getHours()
  
  // Start from 8:00 AM to 5:00 PM with 30-minute intervals
  const slots = []
  for (let hour = 8; hour <= 17; hour++) {
    for (let minute of [0, 30]) {
      // Skip past times if it's today
      if (isToday && (hour < currentHour || (hour === currentHour && minute <= new Date().getMinutes()))) {
        continue
      }
      
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      
      // Randomly mark some slots as unavailable
      const available = Math.random() > 0.3
      
      slots.push({ time, available })
    }
  }
  
  return slots
}

interface SelectDateTimeProps {
  selectedDate: Date | null
  selectedTime: string | null
  doctor: any
  onSelect: (dateTime: { date: Date, time: string }) => void
}

export function SelectDateTime({ selectedDate, selectedTime, doctor, onSelect }: SelectDateTimeProps) {
  const [date, setDate] = useState<Date | null>(selectedDate || new Date())
  const [timeSlots, setTimeSlots] = useState(() => date ? generateTimeSlots(date) : [])
  
  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate)
    if (newDate) {
      setTimeSlots(generateTimeSlots(newDate))
    }
  }
  
  const handleTimeSelect = (time: string) => {
    if (date) {
      onSelect({ date, time })
    }
  }
  
  // Generate next 14 days for quick selection
  const nextDays = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i))
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Chọn ngày và giờ khám</h2>
      
      {doctor && (
        <div className="bg-teal-50 p-3 rounded-md">
          <p className="text-teal-800">
            Bạn đang đặt lịch khám với bác sĩ: <strong>{doctor.name}</strong>
          </p>
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-medium mb-3">Chọn ngày khám</h3>
          
          <div className="flex overflow-x-auto pb-2 space-x-2 mb-4">
            {nextDays.map((day, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "flex-shrink-0 h-auto py-2",
                  date && day.toDateString() === date.toDateString()
                    ? "bg-teal-100 border-teal-600 text-teal-800"
                    : ""
                )}
                onClick={() => handleDateChange(day)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-xs">
                    {format(day, "EEE", { locale: vi })}
                  </span>
                  <span className="text-lg font-semibold">
                    {format(day, "dd")}
                  </span>
                  <span className="text-xs">
                    {format(day, "MM/yyyy")}
                  </span>
                </div>
              </Button>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: vi }) : "Chọn ngày khác"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date || undefined}
                  onSelect={handleDateChange}
                  disabled={(date) => isBefore(date, startOfDay(new Date())) || isAfter(date, addDays(new Date(), 60))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div>
          <h3 className="text-base font-medium mb-3">Chọn giờ khám</h3>
          
          {date ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {timeSlots.map((slot, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    "h-auto py-2",
                    !slot.available && "opacity-50 cursor-not-allowed",
                    selectedTime === slot.time && "bg-teal-100 border-teal-600 text-teal-800"
                  )}
                  disabled={!slot.available}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                >
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{slot.time}</span>
                  </div>
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              Vui lòng chọn ngày khám trước
            </p>
          )}
          
          {timeSlots.length === 0 && date && (
            <p className="text-center text-gray-500 py-4">
              Không có khung giờ khám nào khả dụng cho ngày này
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
