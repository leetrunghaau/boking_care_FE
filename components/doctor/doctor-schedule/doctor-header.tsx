import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Bell, FileText } from "lucide-react"

interface DoctorHeaderProps {
  doctorId: string
  doctorName: string
  specialty: string
  stats: {
    total: number
    booked: number
    completed: number
  }
}

export function DoctorHeader({ doctorId, doctorName, specialty, stats }: DoctorHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-teal-100">
          <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={doctorName} />
          <AvatarFallback className="bg-teal-100 text-teal-700">
            {doctorName.split(" ").pop()?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold text-slate-800">{doctorName}</h2>
          <p className="text-sm text-slate-500">
            {specialty} - ID: {doctorId}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <StatsCard title="Tổng lịch hẹn" value={stats.total} icon={<Users className="h-3.5 w-3.5" />} color="teal" />
        <StatsCard title="Đã đặt" value={stats.booked} icon={<Bell className="h-3.5 w-3.5" />} color="blue" />
        <StatsCard
          title="Hoàn thành"
          value={stats.completed}
          icon={<FileText className="h-3.5 w-3.5" />}
          color="green"
        />
      </div>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: "teal" | "blue" | "green"
}

function StatsCard({ title, value, icon, color }: StatsCardProps) {
  const colorClasses = {
    teal: "bg-teal-50 border-teal-100 text-teal-700",
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    green: "bg-green-50 border-green-100 text-green-700",
  }

  return (
    <Card className={`w-[140px] ${colorClasses[color]}`}>
      <CardHeader className="py-2 px-3">
        <CardTitle className={`text-sm font-medium flex items-center gap-1 ${colorClasses[color]}`}>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="py-2 px-3">
        <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
      </CardContent>
    </Card>
  )
}
