"use client"

import { useState } from "react"
import { DateSelector } from "./date-selector"
import { ScheduleInfo } from "./schedule-info"
import { TimeSlots } from "./time-slots"

interface TimeSlot {
  time: string
  available: boolean
  booked: boolean
  patient?: string
}

interface DailyScheduleProps {
  initialDate?: Date
  initialTimeSlots?: TimeSlot[]
}

export function DailySchedule({ initialDate = new Date(), initialTimeSlots }: DailyScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [price, setPrice] = useState<string>("300000")
  const [duration, setDuration] = useState<string>("30")
  const [breakTime, setBreakTime] = useState<boolean>(true)
  const [notes, setNotes] = useState<string>("")

  // Danh sách giờ làm việc mặc định nếu không có dữ liệu ban đầu
  const defaultTimeSlots: TimeSlot[] = [
    { time: "08:00", available: true, booked: false },
    { time: "08:30", available: true, booked: true, patient: "Nguyễn Văn X" },
    { time: "09:00", available: true, booked: false },
    { time: "09:30", available: false, booked: false },
    { time: "10:00", available: true, booked: false },
    { time: "10:30", available: true, booked: true, patient: "Trần Thị Y" },
    { time: "11:00", available: false, booked: false },
    { time: "11:30", available: false, booked: false },
    { time: "13:30", available: true, booked: false },
    { time: "14:00", available: true, booked: false },
    { time: "14:30", available: true, booked: true, patient: "Lê Văn Z" },
    { time: "15:00", available: true, booked: false },
    { time: "15:30", available: false, booked: false },
    { time: "16:00", available: true, booked: false },
    { time: "16:30", available: true, booked: false },
    { time: "17:00", available: true, booked: false },
  ]

  const timeSlots = initialTimeSlots || defaultTimeSlots

  // Thống kê lịch hẹn
  const stats = {
    available: timeSlots.filter((slot) => slot.available && !slot.booked).length,
    booked: timeSlots.filter((slot) => slot.booked).length,
  }

  // Xử lý lưu lịch làm việc
  const handleSaveSchedule = () => {
    alert("Đã lưu lịch làm việc thành công!")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-6">
        <DateSelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        <ScheduleInfo
          price={price}
          duration={duration}
          breakTime={breakTime}
          notes={notes}
          onPriceChange={setPrice}
          onDurationChange={setDuration}
          onBreakTimeChange={setBreakTime}
          onNotesChange={setNotes}
        />
      </div>

      <div className="md:col-span-2">
        <TimeSlots
          selectedDate={selectedDate}
          timeSlots={timeSlots}
          selectedTime={selectedTime}
          onTimeSelect={setSelectedTime}
          onSaveSchedule={handleSaveSchedule}
          stats={stats}
        />
      </div>
    </div>
  )
}
