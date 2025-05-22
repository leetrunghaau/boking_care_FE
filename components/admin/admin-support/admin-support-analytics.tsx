"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { Ticket } from "@/types/support"

interface AdminSupportAnalyticsProps {
  tickets: Ticket[]
  team: any[]
}

export function AdminSupportAnalytics({ tickets, team }: AdminSupportAnalyticsProps) {
  const [timeRange, setTimeRange] = useState("month")

  // Dữ liệu cho biểu đồ số lượng yêu cầu theo ngày
  const ticketsByDay = [
    { name: "T2", total: 12 },
    { name: "T3", total: 18 },
    { name: "T4", total: 15 },
    { name: "T5", total: 22 },
    { name: "T6", total: 20 },
    { name: "T7", total: 8 },
    { name: "CN", total: 5 },
  ]

  // Dữ liệu cho biểu đồ phân loại yêu cầu
  const ticketsByCategory = [
    { name: "Lỗi", value: 45, color: "#ef4444" },
    { name: "Câu hỏi", value: 30, color: "#3b82f6" },
    { name: "Tính năng", value: 25, color: "#22c55e" },
  ]

  // Dữ liệu cho biểu đồ thời gian giải quyết
  const resolutionTime = [
    { name: "< 1 giờ", total: 15 },
    { name: "1-4 giờ", total: 25 },
    { name: "4-24 giờ", total: 35 },
    { name: "1-3 ngày", total: 20 },
    { name: "> 3 ngày", total: 5 },
  ]

  // Dữ liệu cho biểu đồ hiệu suất đội ngũ
  const teamPerformance = team.map((member) => ({
    name: member.name.split(" ").pop(),
    resolved: member.resolvedTickets,
    active: member.activeTickets,
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Thống kê & Báo cáo</h2>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">7 ngày qua</SelectItem>
              <SelectItem value="month">30 ngày qua</SelectItem>
              <SelectItem value="quarter">Quý này</SelectItem>
              <SelectItem value="year">Năm nay</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="categories">Phân loại</TabsTrigger>
          <TabsTrigger value="resolution">Thời gian xử lý</TabsTrigger>
          <TabsTrigger value="team">Hiệu suất đội ngũ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Số lượng yêu cầu theo ngày</CardTitle>
              <CardDescription>Thống kê số lượng yêu cầu hỗ trợ theo ngày trong tuần</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="grid grid-cols-7 gap-2 w-full">
                  {ticketsByDay.map((day) => (
                    <div key={day.name} className="flex flex-col items-center">
                      <div
                        className="bg-teal-500 w-full rounded-t-md"
                        style={{ height: `${day.total * 8}px`, maxHeight: "200px" }}
                      ></div>
                      <div className="text-sm font-medium mt-2">{day.name}</div>
                      <div className="text-xs text-slate-500">{day.total}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Phân loại yêu cầu</CardTitle>
              <CardDescription>Thống kê số lượng yêu cầu theo từng loại</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="grid grid-cols-3 gap-8 w-full max-w-md">
                  {ticketsByCategory.map((category) => (
                    <div key={category.name} className="flex flex-col items-center">
                      <div className="relative w-24 h-24 mb-4">
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: category.color, opacity: 0.2 }}
                        ></div>
                        <div
                          className="absolute inset-[15%] rounded-full flex items-center justify-center text-lg font-bold"
                          style={{ backgroundColor: category.color, color: "white" }}
                        >
                          {category.value}%
                        </div>
                      </div>
                      <div className="text-sm font-medium">{category.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolution" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Thời gian giải quyết</CardTitle>
              <CardDescription>Thống kê thời gian giải quyết các yêu cầu hỗ trợ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="grid grid-cols-5 gap-2 w-full">
                  {resolutionTime.map((time) => (
                    <div key={time.name} className="flex flex-col items-center">
                      <div
                        className="bg-blue-500 w-full rounded-t-md"
                        style={{ height: `${time.total * 5}px`, maxHeight: "200px" }}
                      ></div>
                      <div className="text-sm font-medium mt-2">{time.name}</div>
                      <div className="text-xs text-slate-500">{time.total}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Hiệu suất đội ngũ</CardTitle>
              <CardDescription>Thống kê hiệu suất của từng thành viên trong đội ngũ hỗ trợ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="grid grid-cols-4 gap-4 w-full">
                  {teamPerformance.map((member) => (
                    <div key={member.name} className="flex flex-col items-center">
                      <div className="flex flex-col items-center w-full">
                        <div
                          className="bg-green-500 w-full rounded-t-md"
                          style={{ height: `${member.resolved / 2}px`, maxHeight: "180px" }}
                        ></div>
                        <div
                          className="bg-yellow-500 w-full"
                          style={{ height: `${member.active * 10}px`, maxHeight: "20px" }}
                        ></div>
                      </div>
                      <div className="text-sm font-medium mt-2">{member.name}</div>
                      <div className="text-xs text-slate-500">
                        <span className="text-green-600">{member.resolved}</span> /{" "}
                        <span className="text-yellow-600">{member.active}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Đã giải quyết</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Đang xử lý</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
