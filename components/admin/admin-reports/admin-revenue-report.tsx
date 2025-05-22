"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart } from "@/components/ui/chart"

// Dữ liệu mẫu cho biểu đồ doanh thu
const revenueData = [
  { name: "T1", Doanh_thu: 12500000 },
  { name: "T2", Doanh_thu: 18000000 },
  { name: "T3", Doanh_thu: 15800000 },
  { name: "T4", Doanh_thu: 21000000 },
  { name: "T5", Doanh_thu: 19500000 },
  { name: "T6", Doanh_thu: 23000000 },
  { name: "T7", Doanh_thu: 25500000 },
  { name: "T8", Doanh_thu: 24000000 },
  { name: "T9", Doanh_thu: 27500000 },
  { name: "T10", Doanh_thu: 29000000 },
  { name: "T11", Doanh_thu: 31500000 },
  { name: "T12", Doanh_thu: 35000000 },
]

// Dữ liệu mẫu cho doanh thu theo chuyên khoa
const specialtyRevenueData = [
  { name: "Nội khoa", Doanh_thu: 85000000 },
  { name: "Nhi khoa", Doanh_thu: 65000000 },
  { name: "Da liễu", Doanh_thu: 45000000 },
  { name: "Thần kinh", Doanh_thu: 35000000 },
  { name: "Tai mũi họng", Doanh_thu: 55000000 },
  { name: "Mắt", Doanh_thu: 40000000 },
  { name: "Tim mạch", Doanh_thu: 75000000 },
]

// Dữ liệu mẫu cho doanh thu theo phương thức thanh toán
const paymentMethodData = [
  { name: "VNPAY", Doanh_thu: 150000000 },
  { name: "MoMo", Doanh_thu: 120000000 },
  { name: "Thẻ tín dụng", Doanh_thu: 80000000 },
  { name: "Tiền mặt", Doanh_thu: 50000000 },
]

export function AdminRevenueReport() {
  // Format tiền VND
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tổng doanh thu</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(282300000)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+12.5%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Doanh thu tháng này</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(35000000)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+8.2%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Doanh thu trung bình/ngày</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(1166667)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+5.1%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tỷ lệ tăng trưởng</CardDescription>
            <CardTitle className="text-2xl">+10.8%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+2.3%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Doanh thu theo thời gian</CardTitle>
              <CardDescription>Biểu đồ doanh thu theo tháng</CardDescription>
            </div>
            <Select defaultValue="year">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="year">Năm 2023</SelectItem>
                <SelectItem value="quarter">Quý 4/2023</SelectItem>
                <SelectItem value="month">Tháng 12/2023</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <LineChart
              data={revenueData}
              categories={["Doanh_thu"]}
              index="name"
              colors={["#0ea5e9"]}
              valueFormatter={(value: number) => formatCurrency(value)}
              className="h-[300px]"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Doanh thu theo chuyên khoa</CardTitle>
            <CardDescription>Top chuyên khoa có doanh thu cao nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={specialtyRevenueData}
              categories={["Doanh_thu"]}
              index="name"
              colors={["#10b981"]}
              valueFormatter={(value: number) => formatCurrency(value)}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doanh thu theo phương thức thanh toán</CardTitle>
          <CardDescription>Phân bố doanh thu theo các phương thức thanh toán</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            data={paymentMethodData}
            categories={["Doanh_thu"]}
            index="name"
            colors={["#8b5cf6"]}
            valueFormatter={(value: number) => formatCurrency(value)}
            className="h-[300px]"
          />
        </CardContent>
      </Card>
    </div>
  )
}
