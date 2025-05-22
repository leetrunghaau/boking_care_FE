"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart } from "@/components/ui/chart"

// Dữ liệu mẫu cho biểu đồ bác sĩ theo chuyên khoa
const doctorsBySpecialtyData = [
  { name: "Nội khoa", Số_lượng: 24 },
  { name: "Nhi khoa", Số_lượng: 18 },
  { name: "Da liễu", Số_lượng: 12 },
  { name: "Thần kinh", Số_lượng: 8 },
  { name: "Tai mũi họng", Số_lượng: 15 },
  { name: "Mắt", Số_lượng: 10 },
  { name: "Tim mạch", Số_lượng: 14 },
]

// Dữ liệu mẫu cho đánh giá trung bình
const ratingData = [
  { name: "T1", Đánh_giá: 4.2 },
  { name: "T2", Đánh_giá: 4.3 },
  { name: "T3", Đánh_giá: 4.3 },
  { name: "T4", Đánh_giá: 4.4 },
  { name: "T5", Đánh_giá: 4.5 },
  { name: "T6", Đánh_giá: 4.5 },
  { name: "T7", Đánh_giá: 4.6 },
  { name: "T8", Đánh_giá: 4.6 },
  { name: "T9", Đánh_giá: 4.7 },
  { name: "T10", Đánh_giá: 4.7 },
  { name: "T11", Đánh_giá: 4.8 },
  { name: "T12", Đánh_giá: 4.8 },
]

// Dữ liệu mẫu cho lịch hẹn trung bình
const appointmentsPerDoctorData = [
  { name: "Nội khoa", Lịch_hẹn: 85 },
  { name: "Nhi khoa", Lịch_hẹn: 92 },
  { name: "Da liễu", Lịch_hẹn: 78 },
  { name: "Thần kinh", Lịch_hẹn: 65 },
  { name: "Tai mũi họng", Lịch_hẹn: 88 },
  { name: "Mắt", Lịch_hẹn: 72 },
  { name: "Tim mạch", Lịch_hẹn: 95 },
]

export function AdminDoctorReport() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tổng số bác sĩ</CardDescription>
            <CardTitle className="text-2xl">101</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+5 bác sĩ</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Đánh giá trung bình</CardDescription>
            <CardTitle className="text-2xl">4.8/5</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+0.1</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Lịch hẹn trung bình/bác sĩ</CardDescription>
            <CardTitle className="text-2xl">82</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+3.5%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Bác sĩ mới tháng này</CardDescription>
            <CardTitle className="text-2xl">5</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+2</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Bác sĩ theo chuyên khoa</CardTitle>
              <CardDescription>Phân bố bác sĩ theo từng chuyên khoa</CardDescription>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="inactive">Tạm ngưng</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <BarChart
              data={doctorsBySpecialtyData}
              categories={["Số_lượng"]}
              index="name"
              colors={["#0ea5e9"]}
              valueFormatter={(value: number) => `${value} bác sĩ`}
              className="h-[300px]"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Đánh giá trung bình</CardTitle>
            <CardDescription>Đánh giá trung bình của bác sĩ theo tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={ratingData}
              categories={["Đánh_giá"]}
              index="name"
              colors={["#10b981"]}
              valueFormatter={(value: number) => `${value}/5`}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lịch hẹn trung bình theo chuyên khoa</CardTitle>
          <CardDescription>Số lượng lịch hẹn trung bình mỗi bác sĩ theo chuyên khoa</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={appointmentsPerDoctorData}
            categories={["Lịch_hẹn"]}
            index="name"
            colors={["#8b5cf6"]}
            valueFormatter={(value: number) => `${value} lịch hẹn`}
            className="h-[300px]"
          />
        </CardContent>
      </Card>
    </div>
  )
}
