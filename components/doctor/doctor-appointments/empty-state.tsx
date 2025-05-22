import { Button } from "@/components/ui/button"
import { Calendar, CalendarCheck, History, Clock } from "lucide-react"

interface EmptyStateProps {
  filterType: string
}

export function EmptyState({ filterType }: EmptyStateProps) {
  const config = {
    "Hôm nay": {
      icon: <Calendar className="h-12 w-12 text-blue-200" />,
      title: "Không có lịch hẹn hôm nay",
      description: "Bạn không có lịch hẹn nào vào hôm nay.",
    },
    "Tuần này": {
      icon: <CalendarCheck className="h-12 w-12 text-green-200" />,
      title: "Không có lịch hẹn trong tuần này",
      description: "Bạn không có lịch hẹn nào trong tuần này.",
    },
    "Lịch sử": {
      icon: <History className="h-12 w-12 text-yellow-200" />,
      title: "Chưa có lịch sử khám",
      description: "Bạn chưa có lịch sử khám bệnh nào.",
    },
    "Tương lai": {
      icon: <Clock className="h-12 w-12 text-teal-200" />,
      title: "Không có lịch hẹn trong tương lai",
      description: "Bạn không có lịch hẹn nào trong tương lai.",
    },
  }

  const content = config[filterType] || config["Hôm nay"]

  return (
    <div className="text-center py-16 px-4 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
      <div className="flex justify-center mb-4">{content.icon}</div>
      <h3 className="text-lg font-medium text-slate-800 mb-2">{content.title}</h3>
      <p className="text-slate-500 mb-6 max-w-md mx-auto">{content.description}</p>
      <Button variant="outline">Xem lịch làm việc</Button>
    </div>
  )
}
