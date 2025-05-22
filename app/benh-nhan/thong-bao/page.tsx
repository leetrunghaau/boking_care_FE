"use client"

import { NotificationList, Notification } from "@/components/customer-temp/notification"

const mockData: Notification[] = [
  {
    id: 1,
    title: "Lịch khám sắp tới",
    message: "Bạn có lịch khám với BS. Hồng vào lúc 8:30 ngày 20/05.",
    type: "appointment",
    date: "2025-05-19 14:00",
    read: false,
  },
  {
    id: 2,
    title: "Cảnh báo sức khỏe",
    message: "Huyết áp tăng cao bất thường.",
    type: "alert",
    date: "2025-05-18 11:20",
    read: true,
  },
  {
    id: 3,
    title: "Thông tin từ hệ thống",
    message: "Bạn vừa cập nhật hồ sơ bệnh nhân thành công.",
    type: "info",
    date: "2025-05-17 09:30",
    read: true,
  },
]

export default function ThongBaoPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
        Thông báo
      </h1>
      <NotificationList notifications={mockData} />
    </div>
  )
}
