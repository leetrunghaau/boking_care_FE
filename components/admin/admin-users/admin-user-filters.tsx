"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AdminUserFilters() {
  const filters = [
    { id: 1, name: "Trạng thái", value: "Đang hoạt động" },
    { id: 2, name: "Ngày đăng ký", value: "Tháng này" },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => (
        <Badge key={filter.id} variant="outline" className="rounded-md px-3 py-1">
          <span className="text-muted-foreground">{filter.name}:</span> <span>{filter.value}</span>
          <Button variant="ghost" size="icon" className="ml-1 h-4 w-4 p-0">
            <X className="h-3 w-3" />
            <span className="sr-only">Xóa {filter.name}</span>
          </Button>
        </Badge>
      ))}
      {filters.length > 0 && (
        <Button variant="ghost" size="sm" className="h-7 text-xs">
          Xóa tất cả bộ lọc
        </Button>
      )}
    </div>
  )
}
