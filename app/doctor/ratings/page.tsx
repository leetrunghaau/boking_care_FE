"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DoctorRatingOverview } from "@/components/doctor/doctor-ratings/doctor-rating-overview"
import { DoctorRatingList } from "@/components/doctor/doctor-ratings/doctor-rating-list"
import { DoctorRatingChart } from "@/components/doctor/doctor-ratings/doctor-rating-chart"
import { Search, Filter, Download } from "lucide-react"
import { DoctorHeader } from "@/components/doctor/doctor-schedule/doctor-header"

export default function DoctorRatingsPage() {
  const [timeRange, setTimeRange] = useState<"all" | "month" | "year">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [responseFilter, setResponseFilter] = useState("all")

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

  // Dữ liệu mẫu cho đánh giá
  const ratingData = {
    average: 4.7,
    total: 120,
    distribution: [
      { stars: 5, count: 90 },
      { stars: 4, count: 20 },
      { stars: 3, count: 7 },
      { stars: 2, count: 2 },
      { stars: 1, count: 1 },
    ],
    responseRate: 95, // Tỷ lệ phản hồi (%)
    trends: {
      all: [4.5, 4.6, 4.7, 4.7, 4.8, 4.7],
      month: [4.6, 4.7, 4.8, 4.7, 4.9, 4.8],
      year: [4.3, 4.4, 4.5, 4.6, 4.7, 4.7],
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

      {/* Tiêu đề trang */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Đánh giá & Phản hồi</h1>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-1" />
          <span>Xuất báo cáo</span>
        </Button>
      </div>

      {/* Tổng quan đánh giá */}
      <DoctorRatingOverview ratingData={ratingData} />

      {/* Tabs chọn khoảng thời gian */}
      <Tabs defaultValue="all" onValueChange={(value) => setTimeRange(value as "all" | "month" | "year")}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="all">Tất cả thời gian</TabsTrigger>
          <TabsTrigger value="month">30 ngày qua</TabsTrigger>
          <TabsTrigger value="year">12 tháng qua</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <DoctorRatingChart data={ratingData.trends.all} />
        </TabsContent>

        <TabsContent value="month" className="mt-6">
          <DoctorRatingChart data={ratingData.trends.month} />
        </TabsContent>

        <TabsContent value="year" className="mt-6">
          <DoctorRatingChart data={ratingData.trends.year} />
        </TabsContent>
      </Tabs>

      {/* Bộ lọc đánh giá */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm đánh giá..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Số sao" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả đánh giá</SelectItem>
              <SelectItem value="5">5 sao</SelectItem>
              <SelectItem value="4">4 sao</SelectItem>
              <SelectItem value="3">3 sao</SelectItem>
              <SelectItem value="2">2 sao</SelectItem>
              <SelectItem value="1">1 sao</SelectItem>
            </SelectContent>
          </Select>

          <Select value={responseFilter} onValueChange={setResponseFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Trạng thái" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="responded">Đã phản hồi</SelectItem>
              <SelectItem value="not_responded">Chưa phản hồi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Danh sách đánh giá */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đánh giá</CardTitle>
          <CardDescription>Đánh giá từ bệnh nhân và phản hồi của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <DoctorRatingList
            searchQuery={searchQuery}
            ratingFilter={ratingFilter}
            responseFilter={responseFilter}
            timeRange={timeRange}
          />
        </CardContent>
      </Card>
    </div>
  )
}
