"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart } from "@/components/ui/chart"

// Dữ liệu mẫu cho biểu đồ người dùng mới
const newUserData = [
  { name: "T1", Người_dùng: 45 },
  { name: "T2", Người_dùng: 52 },
  { name: "T3", Người_dùng: 49 },
  { name: "T4", Người_dùng: 62 },
  { name: "T5", Người_dùng: 58 },
  { name: "T6", Người_dùng: 75 },
  { name: "T7", Người_dùng: 80 },
  { name: "T8", Người_dùng: 85 },
  { name: "T9", Người_dùng: 92 },
  { name: "T10", Người_dùng: 98 },
  { name: "T11", Người_dùng: 110 },
  { name: "T12", Người_dùng: 120 },
]

// Dữ liệu mẫu cho phân bố độ tuổi
const ageDistributionData = [
  { name: "18-24", Số_lượng: 180 },
  { name: "25-34", Số_lượng: 350 },
  { name: "35-44", Số_lượng: 420 },
  { name: "45-54", Số_lượng: 280 },
  { name: "55-64", Số_lượng: 190 },
  { name: "65+", Số_lượng: 150 },
]

// Dữ liệu mẫu cho phân bố địa lý
const geoDistributionData = [
  { name: "Hà Nội", Số_lượng: 420 },
  { name: "TP.HCM", Số_lượng: 580 },
  { name: "Đà Nẵng", Số_lượng: 180 },
  { name: "Hải Phòng", Số_lượng: 120 },
  { name: "Cần Thơ", Số_lượng: 90 },
  { name: "Khác", Số_lượng: 280 },
]

export function AdminUserReport() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tổng số người dùng</CardDescription>
            <CardTitle className="text-2xl">1,670</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+7.2%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Người dùng mới tháng này</CardDescription>
            <CardTitle className="text-2xl">120</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+9.1%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tỷ lệ giữ chân</CardDescription>
            <CardTitle className="text-2xl">85.3%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+1.5%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Lịch hẹn trung bình/người dùng</CardDescription>
            <CardTitle className="text-2xl">2.1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+0.3</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Người dùng mới theo thời gian</CardTitle>
              <CardDescription>Số lượng người dùng đăng ký mới theo tháng</CardDescription>
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
              data={newUserData}
              categories={["Người_dùng"]}
              index="name"
              colors={["#0ea5e9"]}
              valueFormatter={(value: number) => `${value} người dùng`}
              className="h-[300px]"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Phân bố độ tuổi</CardTitle>
            <CardDescription>Phân bố người dùng theo nhóm tuổi</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={ageDistributionData}
              categories={["Số_lượng"]}
              index="name"
              colors={["#10b981"]}
              valueFormatter={(value: number) => `${value} người dùng`}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Phân bố địa lý</CardTitle>
          <CardDescription>Phân bố người dùng theo khu vực địa lý</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={geoDistributionData}
            categories={["Số_lượng"]}
            index="name"
            colors={["#8b5cf6"]}
            valueFormatter={(value: number) => `${value} người dùng`}
            className="h-[300px]"
          />
        </CardContent>
      </Card>
    </div>
  )
}
