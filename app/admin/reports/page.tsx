import { Metadata } from "next"
import { Download, Filter } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminRevenueReport } from "@/components/admin/admin-reports/admin-revenue-report"
import { AdminAppointmentReport } from "@/components/admin/admin-reports/admin-appointment-report"
import { AdminUserReport } from "@/components/admin/admin-reports/admin-user-report"
import { AdminDoctorReport } from "@/components/admin/admin-reports/admin-doctor-report"

export const metadata: Metadata = {
  title: "Thống kê & Báo cáo",
  description: "Thống kê và báo cáo nâng cao",
}

export default function AdminReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Thống kê & Báo cáo</h1>
          <p className="text-muted-foreground">
            Xem thống kê và báo cáo chi tiết về hoạt động của hệ thống
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Lọc
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="appointments">Lịch hẹn</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
          <TabsTrigger value="doctors">Bác sĩ</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="mt-4">
          <AdminRevenueReport />
        </TabsContent>
        <TabsContent value="appointments" className="mt-4">
          <AdminAppointmentReport />
        </TabsContent>
        <TabsContent value="users" className="mt-4">
          <AdminUserReport />
        </TabsContent>
        <TabsContent value="doctors" className="mt-4">
          <AdminDoctorReport />
        </TabsContent>
      </Tabs>
    </div>
  )
}
