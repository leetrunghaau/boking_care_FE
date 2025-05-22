"use client"

import {
  CalendarClock,
  AlertCircle,
  Info,
  Bell,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type NotificationType = "appointment" | "alert" | "info"

export interface Notification {
  id: number
  title: string
  message: string
  type: NotificationType
  date: string
  read: boolean
}

interface NotificationItemProps {
  data: Notification
}

const NotificationItem = ({ data }: NotificationItemProps) => {
  const getIcon = () => {
    switch (data.type) {
      case "appointment":
        return (
          <div className="bg-teal-100 text-teal-600 p-2 rounded-full">
            <CalendarClock className="w-5 h-5" />
          </div>
        )
      case "alert":
        return (
          <div className="bg-red-100 text-red-600 p-2 rounded-full">
            <AlertCircle className="w-5 h-5" />
          </div>
        )
      case "info":
      default:
        return (
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <Info className="w-5 h-5" />
          </div>
        )
    }
  }

  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 rounded-xl border transition-all shadow-sm hover:shadow-lg group",
        data.read
          ? "bg-white dark:bg-slate-800"
          : "bg-gradient-to-r from-teal-50 to-white dark:from-teal-900 dark:to-slate-800"
      )}
    >
      {getIcon()}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800 dark:text-white">
            {data.title}
          </h3>
          {data.read && (
            <CheckCircle className="w-4 h-4 text-green-500"  />
          )}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
          {data.message}
        </p>
        <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 inline-block">
          {data.date}
        </span>
      </div>
    </div>
  )
}

interface NotificationListProps {
  notifications: Notification[]
}

export const NotificationList = ({ notifications }: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-slate-400 py-12">
        <Bell className="mx-auto mb-2 w-8 h-8 text-teal-500" />
        <p className="text-lg">Không có thông báo nào.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notifications.map((item) => (
        <NotificationItem key={item.id} data={item} />
      ))}
    </div>
  )
}
