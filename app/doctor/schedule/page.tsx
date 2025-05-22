

// app/doctor-schedule/page.tsx (hoặc pages/doctor-schedule.tsx nếu dùng pages router)
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DoctorHeader } from "@/components/doctor/doctor-schedule/doctor-header"
import { DailySchedule } from "@/components/doctor/doctor-schedule/daily-schedule"
import { WeeklySchedule } from "@/components/doctor/doctor-schedule/weekly-schedule"
import { ScheduleSettings } from "@/components/doctor/doctor-schedule/schedule-settings"

export default function DoctorSchedulePage() {
  const [activeTab, setActiveTab] = useState<string>("daily")

  // Giả lập ID bác sĩ từ session hoặc tạm hardcode
  const doctorId = "doctor-123"
  const doctorName = "BS. Nguyễn Văn A"
  const specialty = "Nội khoa tổng quát"

  const appointmentStats = {
    total: 15,
    booked: 3,
    available: 12,
    completed: 2,
  }

  return (
    <div className="space-y-6 mt-5 mx-auto w-11/12">
      {/* Header với thông tin bác sĩ và thống kê */}
      <DoctorHeader
        doctorId={doctorId}
        doctorName={doctorName}
        specialty={specialty}
        stats={appointmentStats}
      />

      {/* Tabs cho các chế độ xem lịch */}
      <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="daily">Theo ngày</TabsTrigger>
          <TabsTrigger value="weekly">Theo tuần</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6 mt-4">
          <DailySchedule />
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6 mt-4">
          <WeeklySchedule />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-4">
          <ScheduleSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
