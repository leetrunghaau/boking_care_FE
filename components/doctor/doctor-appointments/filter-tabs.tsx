"use client"

import { Calendar, CalendarCheck, History, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterTabsProps {
  currentType: string
  onTypeChange: (type: string) => void
}

export function FilterTabs({ currentType, onTypeChange }: FilterTabsProps) {
  const filters = [
    { type: "Hôm nay", icon: <Calendar className="h-5 w-5" />, color: "blue" },
    { type: "Tuần này", icon: <CalendarCheck className="h-5 w-5" />, color: "green" },
    { type: "Lịch sử", icon: <History className="h-5 w-5" />, color: "yellow" },
    { type: "Tương lai", icon: <Clock className="h-5 w-5" />, color: "teal" },
  ]

  // Tailwind không hỗ trợ dynamic class names với biến, nên chúng ta cần định nghĩa trước
  const getColorClasses = (type: string, color: string) => {
    const isActive = currentType === type

    const baseClasses =
      "p-4 rounded-lg text-center shadow text-gray-600 duration-100 hover:cursor-pointer hover:translate-y-1"

    if (!isActive) return cn(baseClasses, "bg-gray-50")

    // Sử dụng switch để xác định màu sắc khi active
    switch (color) {
      case "blue":
        return cn(baseClasses, "bg-blue-50")
      case "green":
        return cn(baseClasses, "bg-green-50")
      case "yellow":
        return cn(baseClasses, "bg-yellow-50")
      case "teal":
        return cn(baseClasses, "bg-teal-50")
      default:
        return cn(baseClasses, "bg-gray-50")
    }
  }

  const getIconColorClass = (type: string, color: string) => {
    const isActive = currentType === type
    if (!isActive) return "text-gray-600"

    switch (color) {
      case "blue":
        return "text-blue-600"
      case "green":
        return "text-green-600"
      case "yellow":
        return "text-yellow-600"
      case "teal":
        return "text-teal-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {filters.map(({ type, icon, color }) => (
        <div key={type} className={getColorClasses(type, color)} onClick={() => onTypeChange(type)}>
          <div className={cn("flex items-center justify-center mx-auto mb-2", getIconColorClass(type, color))}>
            {icon}
          </div>
          <p className="text-sm font-medium">{type}</p>
        </div>
      ))}
    </div>
  )
}
