"use client";
// React core and hooks
import { useState } from "react";

// UI components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Doctor dashboard components
import { DoctorDashboardStats } from "@/components/doctor/doctor-dashboard/doctor-dashboard-stats";
import { DoctorAppointmentList } from "@/components/doctor/doctor-dashboard/doctor-appointment-list";
import { DoctorActivityChart } from "@/components/doctor/doctor-dashboard/doctor-activity-chart";
import { DoctorRatingSummary } from "@/components/doctor/doctor-dashboard/doctor-rating-summary";
import { DoctorNotifications } from "@/components/doctor/doctor-dashboard/doctor-notifications";
import { DoctorTasks } from "@/components/doctor/doctor-dashboard/doctor-tasks";

// Doctor schedule components
import { DoctorHeader } from "@/components/doctor/doctor-header";

// Icons
import { Calendar, ChevronLeft, ChevronRight, Download } from "lucide-react";

export default function DoctorDashboardPage() {
  //State


  // Thông tin bác sĩ
  const doctorInfo = {
    doctorId: "D-123456",
    doctorName: "BS. Nguyễn Văn A",
    specialty: "Nội khoa tổng quát",
    stats: {
      total: 120,
      booked: 15,
      completed: 105,
    },
  };

  return (
    <div className="container mx-auto py-6 space-y-6 w-11/12">
      {/* Header với thông tin bác sĩ và thống kê */}


      {/* Bộ chọn khoảng thời gian */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Bảng điều khiển
        </h1>
        
      </div>

      {/* Tabs chọn khoảng thời gian */}
      <Tabs
        defaultValue="today"
        onValueChange={(value) =>
          setDateRange(value as "today" | "week" | "month")
        }>
        {/* <TabsList className="grid grid-cols-1 w-max">
          <TabsTrigger value="today">Hôm nay</TabsTrigger>
          <TabsTrigger value="week">Tuần này</TabsTrigger>
          <TabsTrigger value="month">Tháng này</TabsTrigger>
        </TabsList> */}

        <TabsContent value="today" className="mt-6">
          <DoctorDashboardStats stats={{
            appointments: 8,
            completed: 5,
            upcoming: 3,
            cancelled: 0,
            revenue: 2500000,
          }} />
        </TabsContent>
      </Tabs>

      {/* Nội dung chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột bên trái - Biểu đồ hoạt động và Đánh giá */}
        <div className="lg:col-span-2 space-y-6">
          {/* Biểu đồ hoạt động */}
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động</CardTitle>
              <CardDescription>
                Biểu đồ hoạt động khám bệnh theo thời gian
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DoctorActivityChart />
            </CardContent>
          </Card>

          {/* Danh sách lịch hẹn sắp tới */}
          <Card>
            <CardHeader>
              <CardTitle>Lịch hẹn sắp tới</CardTitle>
              <CardDescription>
                Danh sách lịch hẹn sắp tới của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DoctorAppointmentList />
            </CardContent>
          </Card>
        </div>

        {/* Cột bên phải - Thông báo, Nhiệm vụ và Đánh giá */}
        <div className="space-y-6">
          {/* Tóm tắt đánh giá */}
          <Card>
            <CardHeader>
              <CardTitle>Đánh giá</CardTitle>
              <CardDescription>Tóm tắt đánh giá từ bệnh nhân</CardDescription>
            </CardHeader>
            <CardContent>
              <DoctorRatingSummary />
            </CardContent>
          </Card>

          {/* Thông báo */}
          <Card>
            <CardHeader>
              <CardTitle>Thông báo</CardTitle>
              <CardDescription>Thông báo và cập nhật mới nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <DoctorNotifications />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
