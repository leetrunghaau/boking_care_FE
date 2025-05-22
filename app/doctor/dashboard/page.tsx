"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DoctorDashboardStats } from "@/components/doctor/doctor-dashboard/doctor-dashboard-stats"
import { DoctorAppointmentList } from "@/components/doctor/doctor-dashboard/doctor-appointment-list"
import { DoctorActivityChart } from "@/components/doctor/doctor-dashboard/doctor-activity-chart"
import { DoctorRatingSummary } from "@/components/doctor/doctor-dashboard/doctor-rating-summary"
import { DoctorNotifications } from "@/components/doctor/doctor-dashboard/doctor-notifications"
import { DoctorTasks } from "@/components/doctor/doctor-dashboard/doctor-tasks"
import { Calendar, ChevronLeft, ChevronRight, Download } from "lucide-react"
import { DoctorHeader } from "@/components/doctor/doctor-schedule/doctor-header"

export default function DoctorDashboardPage() {
  const [dateRange, setDateRange] = useState<"today" | "week" | "month">("today")

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
  }

  // Thống kê theo ngày/tuần/tháng
  const statsData = {
    today: {
      appointments: 8,
      completed: 5,
      upcoming: 3,
      cancelled: 0,
      revenue: 2500000,
    },
    week: {
      appointments: 42,
      completed: 35,
      upcoming: 7,
      cancelled: 2,
      revenue: 15000000,
    },
    month: {
      appointments: 120,
      completed: 105,
      upcoming: 15,
      cancelled: 8,
      revenue: 45000000,
    },
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header với thông tin bác sĩ và thống kê */}
      <DoctorHeader
        doctorId={doctorInfo.doctorId}
        doctorName={doctorInfo.doctorName}
        specialty={doctorInfo.specialty}
        stats={doctorInfo.stats}
      />

      {/* Bộ chọn khoảng thời gian */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Bảng điều khiển</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Trước</span>
          </Button>
          <Button variant="outline" size="icon" className="px-3">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <span>Sau</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            <span>Xuất báo cáo</span>
          </Button>
        </div>
      </div>

      {/* Tabs chọn khoảng thời gian */}
      <Tabs defaultValue="today" onValueChange={(value) => setDateRange(value as "today" | "week" | "month")}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="today">Hôm nay</TabsTrigger>
          <TabsTrigger value="week">Tuần này</TabsTrigger>
          <TabsTrigger value="month">Tháng này</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6">
          <DoctorDashboardStats stats={statsData.today} />
        </TabsContent>

        <TabsContent value="week" className="mt-6">
          <DoctorDashboardStats stats={statsData.week} />
        </TabsContent>

        <TabsContent value="month" className="mt-6">
          <DoctorDashboardStats stats={statsData.month} />
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
              <CardDescription>Biểu đồ hoạt động khám bệnh theo thời gian</CardDescription>
            </CardHeader>
            <CardContent>
              <DoctorActivityChart dateRange={dateRange} />
            </CardContent>
          </Card>

          {/* Danh sách lịch hẹn sắp tới */}
          <Card>
            <CardHeader>
              <CardTitle>Lịch hẹn sắp tới</CardTitle>
              <CardDescription>Danh sách lịch hẹn sắp tới của bạn</CardDescription>
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

          {/* Nhiệm vụ */}
          <Card>
            <CardHeader>
              <CardTitle>Nhiệm vụ</CardTitle>
              <CardDescription>Danh sách nhiệm vụ cần hoàn thành</CardDescription>
            </CardHeader>
            <CardContent>
              <DoctorTasks />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
