"use client"

import { useState } from "react"
import { BarChart, LineChart } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AdminDashboardCharts() {
  const [chartType, setChartType] = useState("appointments")

  // Dữ liệu mẫu cho biểu đồ lịch hẹn
  const appointmentData = [
    { name: "T2", "Đã hoàn thành": 120, "Đã hủy": 15 },
    { name: "T3", "Đã hoàn thành": 150, "Đã hủy": 20 },
    { name: "T4", "Đã hoàn thành": 180, "Đã hủy": 18 },
    { name: "T5", "Đã hoàn thành": 145, "Đã hủy": 12 },
    { name: "T6", "Đã hoàn thành": 190, "Đã hủy": 25 },
    { name: "T7", "Đã hoàn thành": 210, "Đã hủy": 30 },
    { name: "CN", "Đã hoàn thành": 95, "Đã hủy": 10 },
  ]

  // Dữ liệu mẫu cho biểu đồ chuyên khoa
  const specialtyData = [
    { name: "Tim mạch", "Lượt khám": 320 },
    { name: "Nhi khoa", "Lượt khám": 280 },
    { name: "Da liễu", "Lượt khám": 250 },
    { name: "Thần kinh", "Lượt khám": 210 },
    { name: "Nội tiết", "Lượt khám": 190 },
    { name: "Mắt", "Lượt khám": 180 },
    { name: "Tai mũi họng", "Lượt khám": 170 },
  ]

  // Dữ liệu mẫu cho biểu đồ doanh thu
  const revenueData = [
    { name: "T1", "Doanh thu": 85 },
    { name: "T2", "Doanh thu": 92 },
    { name: "T3", "Doanh thu": 105 },
    { name: "T4", "Doanh thu": 110 },
    { name: "T5", "Doanh thu": 98 },
    { name: "T6", "Doanh thu": 120 },
    { name: "T7", "Doanh thu": 125 },
    { name: "T8", "Doanh thu": 130 },
    { name: "T9", "Doanh thu": 140 },
    { name: "T10", "Doanh thu": 135 },
    { name: "T11", "Doanh thu": 150 },
    { name: "T12", "Doanh thu": 180 },
  ]

  return (
    <div className="space-y-4">
      <Tabs defaultValue="appointments" onValueChange={setChartType}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appointments">Lịch hẹn</TabsTrigger>
          <TabsTrigger value="specialties">Chuyên khoa</TabsTrigger>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments" className="h-[300px]">
          <BarChart
            data={appointmentData}
            index="name"
            categories={["Đã hoàn thành", "Đã hủy"]}
            colors={["#0ea5e9", "#f43f5e"]}
            valueFormatter={(value) => `${value} lịch`}
            yAxisWidth={40}
          />
        </TabsContent>
        <TabsContent value="specialties" className="h-[300px]">
          <BarChart
            data={specialtyData}
            index="name"
            categories={["Lượt khám"]}
            colors={["#8b5cf6"]}
            valueFormatter={(value) => `${value} lượt`}
            yAxisWidth={40}
          />
        </TabsContent>
        <TabsContent value="revenue" className="h-[300px]">
          <LineChart
            data={revenueData}
            index="name"
            categories={["Doanh thu"]}
            colors={["#10b981"]}
            valueFormatter={(value) => `${value} triệu`}
            yAxisWidth={40}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
