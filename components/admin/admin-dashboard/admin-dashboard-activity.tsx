import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function AdminDashboardActivity() {
  const activities = [
    {
      id: 1,
      user: {
        name: "Nguyễn Văn A",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Bệnh nhân",
      },
      action: "đã đặt lịch khám",
      target: "Bác sĩ Trần Thị B",
      time: "5 phút trước",
      type: "appointment",
    },
    {
      id: 2,
      user: {
        name: "Bác sĩ Lê Văn C",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Bác sĩ",
      },
      action: "đã hoàn thành",
      target: "5 lịch khám",
      time: "30 phút trước",
      type: "complete",
    },
    {
      id: 3,
      user: {
        name: "Phạm Thị D",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Bệnh nhân",
      },
      action: "đã đánh giá",
      target: "Bác sĩ Hoàng Văn E",
      time: "1 giờ trước",
      type: "review",
    },
    {
      id: 4,
      user: {
        name: "Trần Văn F",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Admin",
      },
      action: "đã duyệt",
      target: "hồ sơ bác sĩ mới",
      time: "2 giờ trước",
      type: "approve",
    },
    {
      id: 5,
      user: {
        name: "Nguyễn Thị G",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Bệnh nhân",
      },
      action: "đã hủy lịch khám",
      target: "Bác sĩ Lê Văn H",
      time: "3 giờ trước",
      type: "cancel",
    },
  ]

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "appointment":
        return "default"
      case "complete":
        return "success"
      case "review":
        return "secondary"
      case "approve":
        return "outline"
      case "cancel":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">{activity.user.name}</span> {activity.action}{" "}
              <span className="font-semibold">{activity.target}</span>
            </p>
            <div className="flex items-center gap-2">
              <Badge variant={getBadgeVariant(activity.type)} className="text-[10px]">
                {activity.user.role}
              </Badge>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
