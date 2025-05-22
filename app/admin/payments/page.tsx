import { Metadata } from "next"
import { Download, Filter, Search } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminPaymentStats } from "@/components/admin/admin-payments/admin-payment-stats"
import { AdminPaymentList } from "@/components/admin/admin-payments/admin-payment-list"
import { AdminPaymentMethods } from "@/components/admin/admin-payments/admin-payment-methods"

export const metadata: Metadata = {
  title: "Quản lý Thanh toán & Hóa đơn",
  description: "Quản lý thanh toán và hóa đơn trong hệ thống",
}

export default function AdminPaymentsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Thanh toán & Hóa đơn</h1>
          <p className="text-muted-foreground">
            Quản lý thanh toán và hóa đơn trong hệ thống
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

      <AdminPaymentStats />

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm theo mã giao dịch, tên bệnh nhân..."
            className="pl-8"
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="pending">Chờ thanh toán</TabsTrigger>
          <TabsTrigger value="completed">Thành công</TabsTrigger>
          <TabsTrigger value="failed">Thất bại</TabsTrigger>
          <TabsTrigger value="refunded">Hoàn tiền</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <AdminPaymentList />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <AdminPaymentList status="pending" />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <AdminPaymentList status="completed" />
        </TabsContent>
        <TabsContent value="failed" className="mt-4">
          <AdminPaymentList status="failed" />
        </TabsContent>
        <TabsContent value="refunded" className="mt-4">
          <AdminPaymentList status="refunded" />
        </TabsContent>
      </Tabs>

      <AdminPaymentMethods />
    </div>
  )
}
