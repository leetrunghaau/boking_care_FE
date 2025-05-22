import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { Bell, Calendar, MessageSquare, Star, User } from "lucide-react"

export function DoctorNotifications() {
  // Dữ liệu mẫu cho thông báo
  const notifications = [
    {
      id: "N-1",
      type: "appointment",
      message: "Bệnh nhân Nguyễn Văn X đã đặt lịch hẹn mới",
      time: new Date(Date.now() - 30 * 60 * 1000), // 30 phút trước
      read: false,
    },
    {
      id: "N-2",
      type: "review",
      message: "Bạn nhận được đánh giá 5 sao mới từ bệnh nhân Trần Thị Y",
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 giờ trước
      read: false,
    },
    {
      id: "N-3",
      type: "message",
      message: "Bệnh nhân Lê Văn Z đã gửi tin nhắn mới",
      time: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 giờ trước
      read: true,
    },
    {
      id: "N-4",
      type: "system",
      message: "Hệ thống đã được cập nhật lên phiên bản mới",
      time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 ngày trước
      read: true,
    },
  ]

  // Biểu tượng cho từng loại thông báo
  const notificationIcons = {
    appointment: <Calendar className="h-4 w-4 text-blue-500" />,
    review: <Star className="h-4 w-4 text-yellow-500" />,
    message: <MessageSquare className="h-4 w-4 text-green-500" />,
    system: <Bell className="h-4 w-4 text-purple-500" />,
    user: <User className="h-4 w-4 text-teal-500" />,
  }

  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-3 p-2 rounded-md ${notification.read ? "" : "bg-blue-50"}`}
        >
          <div className="mt-0.5">{notificationIcons[notification.type as keyof typeof notificationIcons]}</div>
          <div className="flex-1">
            <p className={`text-sm ${notification.read ? "text-slate-600" : "text-slate-800 font-medium"}`}>
              {notification.message}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-500">
                {formatDistanceToNow(notification.time, { addSuffix: true, locale: vi })}
              </span>
              {!notification.read && <Badge className="bg-blue-500 h-1.5 w-1.5 rounded-full p-0" />}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
