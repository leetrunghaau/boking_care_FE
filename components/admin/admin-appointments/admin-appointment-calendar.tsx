"use client"

import { useState } from "react"
import { Clock, User } from "lucide-react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminAppointmentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState("day")

  // Dữ liệu mẫu cho lịch hẹn trong ngày
  const dayAppointments = [
    {
      id: "A1",
      time: "09:00 - 09:30",
      patient: {
        name: "Nguyễn Văn A",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      doctor: {
        name: "BS. Trần Thị B",
        specialty: "Tim mạch",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "confirmed",
    },
    {
      id: "A2",
      time: "10:00 - 10:30",
      patient: {
        name: "Lê Văn C",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      doctor: {
        name: "BS. Phạm Thị D",
        specialty: "Nhi khoa",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "pending",
    },
    {
      id: "A3",
      time: "11:00 - 11:30",
      patient: {
        name: "Hoàng Văn E",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      doctor: {
        name: "BS. Nguyễn Văn F",
        specialty: "Da liễu",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "completed",
    },
    {
      id: "A4",
      time: "13:30 - 14:00",
      patient: {
        name: "Trần Thị G",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      doctor: {
        name: "BS. Lê Văn H",
        specialty: "Thần kinh",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "cancelled",
    },
    {
      id: "A5",
      time: "14:30 - 15:00",
      patient: {
        name: "Phạm Văn I",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      doctor: {
        name: "BS. Hoàng Thị K",
        specialty: "Nội tiết",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "confirmed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <CalendarComponent mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Bộ lọc</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Chế độ xem</label>
              <Select value={view} onValueChange={setView}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn chế độ xem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Ngày</SelectItem>
                  <SelectItem value="week">Tuần</SelectItem>
                  <SelectItem value="month">Tháng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bác sĩ</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn bác sĩ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả bác sĩ</SelectItem>
                  <SelectItem value="1">BS. Trần Thị B</SelectItem>
                  <SelectItem value="2">BS. Phạm Thị D</SelectItem>
                  <SelectItem value="3">BS. Nguyễn Văn F</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Trạng thái</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="pending">Chờ xác nhận</SelectItem>
                  <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                  <SelectItem value="completed">Đã hoàn tất</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              Lịch hẹn{" "}
              {date?.toLocaleDateString("vi-VN", {
                weekday: "long",
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })}
            </CardTitle>
            <CardDescription>{dayAppointments.length} lịch hẹn</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Ngày trước
            </Button>
            <Button variant="outline" size="sm">
              Hôm nay
            </Button>
            <Button variant="outline" size="sm">
              Ngày sau
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`flex items-center justify-between rounded-lg p-3 ${getStatusColor(appointment.status)}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{appointment.time}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-3 w-3" />
                      <span>{appointment.patient.name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">{appointment.doctor.name}</div>
                    <div className="text-sm">{appointment.doctor.specialty}</div>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={appointment.doctor.avatar || "/placeholder.svg"} alt={appointment.doctor.name} />
                    <AvatarFallback>{appointment.doctor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
