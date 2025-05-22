"use client";

// React core and hooks
import { useState } from "react";

// UI components - Tabs
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Doctor schedule components
import { DoctorHeader } from "@/components/doctor/doctor-schedule/doctor-header";
import { DailySchedule } from "@/components/doctor/doctor-schedule/daily-schedule";
import { WeeklySchedule } from "@/components/doctor/doctor-schedule/weekly-schedule";
import { ScheduleSettings } from "@/components/doctor/doctor-schedule/schedule-settings";

export default function DoctorSchedulePage() {
  //State
  const [activeTab, setActiveTab] = useState<string>("daily");

  const doctorId = "doctor-123";
  const doctorName = "BS. Nguyễn Văn A";
  const specialty = "Nội khoa tổng quát";
  const today = new Date();
  const appointmentStats = {
    total: 15,
    booked: 3,
    available: 12,
    completed: 2,
  };

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
      <Tabs
        defaultValue="daily"
        className="w-full"
        onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="daily">Theo ngày</TabsTrigger>
          <TabsTrigger value="weekly">Theo tuần</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6 mt-4">
          <DailySchedule initialDate={today} />
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6 mt-4">
          <WeeklySchedule />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-4">
          <ScheduleSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
