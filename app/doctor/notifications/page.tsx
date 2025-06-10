"use client"

import { useEffect, useState, useRef } from "react"
import http from "@/helper/axios"
import { AlertCircle, Bell, Calendar, CheckCircle, Info, Gift, Repeat } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog } from "@radix-ui/react-dialog"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ThongBaoPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const hoverTimeouts = useRef<{ [key: number]: NodeJS.Timeout }>({})
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await http.get<any[]>("/doctor-notifications")
        setNotifications(res)
      } catch (err) {
        console.error("Lỗi khi lấy danh sách thông báo:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="w-6 h-6 text-teal-500 mt-1" />
      case "reminder":
        return <Repeat className="w-6 h-6 text-orange-500 mt-1" />
      case "general":
        return <Info className="w-6 h-6 text-blue-500 mt-1" />
      case "promotion":
        return <Gift className="w-6 h-6 text-pink-500 mt-1" />
      default:
        return <Bell className="w-6 h-6 text-gray-400 mt-1" />
    }
  }

  const markAsRead = async (id: number) => {
    try {
      await http.get(`/doctor-notification/${id}`)
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isRead: true } : item
        )
      )
    } catch (err) {
      console.error(`Lỗi khi đánh dấu thông báo ${id} là đã đọc:`, err)
    }
  }

  const handleMouseEnter = (id: number, isRead: boolean) => {
    if (isRead) return
    hoverTimeouts.current[id] = setTimeout(() => {
      markAsRead(id)
    }, 500)
  }

  const handleMouseLeave = (id: number) => {
    clearTimeout(hoverTimeouts.current[id])
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
        Thông báo
      </h1>

      {loading ? (
        <div>Đang tải...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-slate-400 py-12">
          <Bell className="mx-auto mb-2 w-8 h-8 text-teal-500" />
          <p className="text-lg">Không có thông báo nào.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((data) => (
            <div
              key={data.id}
              onClick={() => setSelectedNotification(data)}
              onMouseEnter={() => handleMouseEnter(data.id, data.isRead)}
              onMouseLeave={() => handleMouseLeave(data.id)}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl border transition-all shadow-sm hover:shadow-lg group",
                data.isRead
                  ? "bg-white dark:bg-slate-800"
                  : "bg-gradient-to-r from-teal-50 to-white dark:from-teal-900 dark:to-slate-800"
              )}
            >
              {getIcon(data.type)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-800 dark:text-white">
                    {data.title}
                  </h3>
                  {data.isRead && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {data.message}
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 inline-block">
                  {data.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedNotification && (
        <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedNotification.title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Thời gian nhận: {selectedNotification.time}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {selectedNotification.message}
            </div>
            <DialogFooter className="mt-6">
              <DialogClose className="px-4 py-2 text-sm bg-teal-600 text-white rounded hover:bg-teal-700">
                Đóng
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  )
}
