import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function AdminDashboardAlerts() {
  const alerts = [
    {
      id: 1,
      type: "error",
      title: "Báo cáo bác sĩ",
      description: "Bác sĩ Nguyễn Văn A có 3 báo cáo tiêu cực mới",
      icon: AlertCircle,
    },
    {
      id: 2,
      type: "warning",
      title: "Đánh giá thấp",
      description: "5 bác sĩ có đánh giá dưới 3 sao trong tuần qua",
      icon: AlertTriangle,
    },
    {
      id: 3,
      type: "info",
      title: "Hồ sơ chờ duyệt",
      description: "12 hồ sơ bác sĩ mới đang chờ xét duyệt",
      icon: Info,
    },
    {
      id: 4,
      type: "warning",
      title: "Tỷ lệ hủy cao",
      description: "Tỷ lệ hủy lịch hẹn tăng 15% so với tuần trước",
      icon: AlertTriangle,
    },
  ]

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          variant={alert.type === "error" ? "destructive" : alert.type === "warning" ? "default" : "outline"}
        >
          <alert.icon className="h-4 w-4" />
          <AlertTitle className="flex items-center justify-between">
            {alert.title}
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              Xem
            </Button>
          </AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
