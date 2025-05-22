import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Clock, HelpCircle, TicketIcon } from "lucide-react"

interface SupportStatsProps {
  stats: {
    total: number
    open: number
    inProgress: number
    resolved: number
  }
}

export function SupportStats({ stats }: SupportStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
    </div>
  )
}
