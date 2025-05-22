import { AdminDashboardActivity } from "@/components/admin/admin-dashboard/admin-dashboard-activity"
import { AdminDashboardAlerts } from "@/components/admin/admin-dashboard/admin-dashboard-alerts"
import { AdminDashboardCharts } from "@/components/admin/admin-dashboard/admin-dashboard-charts"
import { AdminDashboardDoctors } from "@/components/admin/admin-dashboard/admin-dashboard-doctors"
import { AdminDashboardStats } from "@/components/admin/admin-dashboard/admin-dashboard-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tổng quan hệ thống</h1>
        <Tabs defaultValue="today" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Hôm nay</TabsTrigger>
            <TabsTrigger value="week">Tuần này</TabsTrigger>
            <TabsTrigger value="month">Tháng này</TabsTrigger>
            <TabsTrigger value="year">Năm nay</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <AdminDashboardStats />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Thống kê đặt lịch</CardTitle>
            <CardDescription>Số lượng lịch hẹn theo thời gian</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminDashboardCharts />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cảnh báo hệ thống</CardTitle>
            <CardDescription>Các vấn đề cần xử lý</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminDashboardAlerts />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>Các hoạt động mới nhất trên hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminDashboardActivity />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bác sĩ nổi bật</CardTitle>
            <CardDescription>Bác sĩ có nhiều lịch hẹn nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminDashboardDoctors />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
