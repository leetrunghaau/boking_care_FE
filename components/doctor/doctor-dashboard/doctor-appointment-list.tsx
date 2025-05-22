import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Calendar, Clock, FileText } from "lucide-react"

export function DoctorAppointmentList() {
  // Dữ liệu mẫu cho lịch hẹn sắp tới
  const upcomingAppointments = [
    {
      id: "A-1001",
      patientName: "Nguyễn Văn X",
      patientAvatar: "/placeholder.svg?height=32&width=32&text=NX",
      date: new Date(),
      time: "11:00",
      duration: 30,
      reason: "Khám tổng quát",
      status: "confirmed",
    },
    {
      id: "A-1002",
      patientName: "Trần Thị Y",
      patientAvatar: "/placeholder.svg?height=32&width=32&text=TY",
      date: new Date(),
      time: "15:00",
      duration: 45,
      reason: "Đau đầu, sốt nhẹ",
      status: "confirmed",
    },
    {
      id: "A-1003",
      patientName: "Lê Văn Z",
      patientAvatar: "/placeholder.svg?height=32&width=32&text=LZ",
      date: new Date(),
      time: "16:00",
      duration: 30,
      reason: "Tái khám",
      status: "confirmed",
    },
  ]

  // Định dạng trạng thái
  const statusConfig = {
    confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-700" },
    completed: { label: "Đã hoàn thành", color: "bg-green-100 text-green-700" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
    pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700" },
  }

  return (
    <div className="space-y-4">
      {upcomingAppointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={appointment.patientAvatar || "/placeholder.svg"} />
              <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{appointment.patientName}</h3>
                <Badge className={statusConfig[appointment.status as keyof typeof statusConfig].color}>
                  {statusConfig[appointment.status as keyof typeof statusConfig].label}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{format(appointment.date, "EEEE, dd/MM/yyyy", { locale: vi })}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    {appointment.time} ({appointment.duration} phút)
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-1">{appointment.reason}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              Chi tiết
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <Button variant="outline" className="w-full">
          Xem tất cả lịch hẹn
        </Button>
      </div>
    </div>
  )
}
