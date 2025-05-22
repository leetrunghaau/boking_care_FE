import { Card, CardContent } from "@/components/ui/card"
import { Calendar, CheckCircle, Clock, DollarSign, XCircle } from "lucide-react"

interface DoctorDashboardStatsProps {
  stats: {
    appointments: number
    completed: number
    upcoming: number
    cancelled: number
    revenue: number
  }
}

export function DoctorDashboardStats({ stats }: DoctorDashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <Card className="bg-slate-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-slate-200 p-2 rounded-full">
            <Calendar className="h-5 w-5 text-slate-700" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Tổng lịch hẹn</p>
            <p className="text-2xl font-bold text-slate-800">{stats.appointments}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-green-200 p-2 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <p className="text-sm text-green-500">Đã hoàn thành</p>
            <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-blue-200 p-2 rounded-full">
            <Clock className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <p className="text-sm text-blue-500">Sắp tới</p>
            <p className="text-2xl font-bold text-blue-700">{stats.upcoming}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-red-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-red-200 p-2 rounded-full">
            <XCircle className="h-5 w-5 text-red-700" />
          </div>
          <div>
            <p className="text-sm text-red-500">Đã hủy</p>
            <p className="text-2xl font-bold text-red-700">{stats.cancelled}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-teal-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-teal-200 p-2 rounded-full">
            <DollarSign className="h-5 w-5 text-teal-700" />
          </div>
          <div>
            <p className="text-sm text-teal-500">Doanh thu</p>
            <p className="text-2xl font-bold text-teal-700">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
                maximumFractionDigits: 0,
              }).format(stats.revenue)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
