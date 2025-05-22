"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart } from "@/components/ui/chart"

// Dữ liệu mẫu cho biểu đồ lịch hẹn
const appointmentData = [
  { name: "T1", Đã_hoàn_thành: 120, Đã_hủy: 15 },
  { name: "T2", Đã_hoàn_thành: 150, Đã_hủy: 20 },
  { name: "T3", Đã_hoàn_thành: 180, Đã_hủy: 25 },
  { name: "T4", Đã_hoàn_thành: 220, Đã_hủy: 30 },
  { name: "T5", Đã_hoàn_thành: 200, Đã_hủy: 22 },
  { name: "T6", Đã_hoàn_thành: 250, Đã_hủy: 28 },
  { name: "T7", Đã_hoàn_thành: 280, Đã_hủy: 32 },
  { name: "T8", Đã_hoàn_thành: 260, Đã_hủy: 30 },
  { name: "T9", Đã_hoàn_thành: 300, Đã_hủy: 35 },
  { name: "T10", Đã_hoàn_thành: 320, Đã_hủy: 38 },
  { name: "T11", Đã_hoàn_thành: 350, Đã_hủy: 40 },
  { name: "T12", Đã_hoàn_thành: 380, Đã_hủy: 45 },
]

// Dữ liệu mẫu cho tỷ lệ hoàn thành theo chuyên khoa
const completionRateData = [
  { name: "Nội khoa", Tỷ_lệ: 92 },
  { name: "Nhi khoa", Tỷ_lệ: 88 },
  { name: "Da liễu", Tỷ_lệ: 95 },
  { name: "Thần kinh", Tỷ_lệ: 90 },
  { name: "Tai mũi họng", Tỷ_lệ: 93 },
  { name: "Mắt", Tỷ_lệ: 91 },
  { name: "Tim mạch", Tỷ_lệ: 89 },
]

// Dữ liệu mẫu cho thời gian chờ trung bình
const waitTimeData = [
  { name: "T1", Thời_gian: 25 },
  { name: "T2", Thời_gian: 28 },
  { name: "T3", Thời_gian: 24 },
  { name: "T4", Thời_gian: 22 },
  { name: "T5", Thời_gian: 20 },
  { name: "T6", Thời_gian: 18 },
  { name: "T7", Thời_gian: 15 },
  { name: "T8", Thời_gian: 16 },
  { name: "T9", Thời_gian: 14 },
  { name: "T10", Thời_gian: 12 },
  { name: "T11", Thời_gian: 10 },
  { name: "T12", Thời_gian: 8 },
]

export function AdminAppointmentReport() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tổng số lịch hẹn</CardDescription>
            <CardTitle className="text-2xl">3,450</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+8.2%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tỷ lệ hoàn thành</CardDescription>
            <CardTitle className="text-2xl">89.5%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+2.1%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tỷ lệ hủy</CardDescription>
            <CardTitle className="text-2xl">10.5%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">-1.3%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Thời gian chờ trung bình</CardDescription>
            <CardTitle className="text-2xl">8 phút</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">-20%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Lịch hẹn theo thời gian</CardTitle>
              <CardDescription>Số lượng lịch hẹn đã hoàn thành và đã hủy</CardDescription>
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
            <BarChart
              data={appointmentData}
              categories={["Đã_hoàn_thành", "Đã_hủy"]}
              index="name"
              colors={["#0ea5e9", "#f43f5e"]}
              valueFormatter={(value: number) => `${value} lịch hẹn`}
              className="h-[300px]"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Tỷ lệ hoàn thành theo chuyên khoa</CardTitle>
            <CardDescription>Phần trăm lịch hẹn hoàn thành theo chuyên khoa</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={completionRateData}
              categories={["Tỷ_lệ"]}
              index="name"
              colors={["#10b981"]}
              valueFormatter={(value: number) => `${value}%`}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thời gian chờ trung bình</CardTitle>
          <CardDescription>Thời gian chờ trung bình (phút) theo tháng</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            data={waitTimeData}
            categories={["Thời_gian"]}
            index="name"
            colors={["#8b5cf6"]}
            valueFormatter={(value: number) => `${value} phút`}
            className="h-[300px]"
          />
        </CardContent>
      </Card>
    </div>
  )
}
