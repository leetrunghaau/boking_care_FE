import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, CheckCircle2, Clock, HelpCircle, TicketIcon, UserMinus } from "lucide-react"

interface AdminSupportStatsProps {
  stats: {
    total: number
    open: number
    inProgress: number
    resolved: number
    unassigned: number
    highPriority: number
  }
}

export function AdminSupportStats({ stats }: AdminSupportStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card className="bg-slate-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-slate-200 p-2 rounded-full">
            <TicketIcon className="h-5 w-5 text-slate-700" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Tổng yêu cầu</p>
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-blue-200 p-2 rounded-full">
            <HelpCircle className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <p className="text-sm text-blue-500">Đang mở</p>
            <p className="text-2xl font-bold text-blue-700">{stats.open}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-yellow-200 p-2 rounded-full">
            <Clock className="h-5 w-5 text-yellow-700" />
          </div>
          <div>
            <p className="text-sm text-yellow-500">Đang xử lý</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.inProgress}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-green-200 p-2 rounded-full">
            <CheckCircle2 className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <p className="text-sm text-green-500">Đã giải quyết</p>
            <p className="text-2xl font-bold text-green-700">{stats.resolved}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-purple-200 p-2 rounded-full">
            <UserMinus className="h-5 w-5 text-purple-700" />
          </div>
          <div>
            <p className="text-sm text-purple-500">Chưa phân công</p>
            <p className="text-2xl font-bold text-purple-700">{stats.unassigned}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-red-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-red-200 p-2 rounded-full">
            <AlertTriangle className="h-5 w-5 text-red-700" />
          </div>
          <div>
            <p className="text-sm text-red-500">Ưu tiên cao</p>
            <p className="text-2xl font-bold text-red-700">{stats.highPriority}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
