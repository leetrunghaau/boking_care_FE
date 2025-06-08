"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DailySchedule } from "@/components/doctor/doctor-schedule/daily-schedule";
import { ScheduleSettings } from "@/components/doctor/doctor-schedule/schedule-settings";

export default function DoctorSchedulePage() {
  const [activeTab, setActiveTab] = useState<string>("daily");

  return (
    <div className="space-y-6 mt-5 mx-auto w-11/12">
      
      {/* Tabs cho các chế độ xem lịch */}
      <Tabs
        defaultValue="daily"
        className="w-full"
        onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="daily">Theo ngày</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6 mt-4">
          <DailySchedule />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-4">
          <ScheduleSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
