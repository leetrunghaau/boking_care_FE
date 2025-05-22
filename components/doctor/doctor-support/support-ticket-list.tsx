"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { AlertCircle, Clock, FileText, HelpCircle, MessageSquare, Search } from "lucide-react"
import type { Ticket } from "@/types/support"

interface SupportTicketListProps {
  tickets: Ticket[]
}

export function SupportTicketList({ tickets }: SupportTicketListProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Lọc ticket
  const filteredTickets = tickets.filter((ticket) => {
    // Lọc theo từ khóa
    const matchesSearch =
      searchQuery === "" ||
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Lọc theo trạng thái
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    // Lọc theo mức độ ưu tiên
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Định dạng trạng thái
  const statusConfig = {
    open: { label: "Đang mở", color: "bg-blue-100 text-blue-700" },
    in_progress: { label: "Đang xử lý", color: "bg-yellow-100 text-yellow-700" },
    resolved: { label: "Đã giải quyết", color: "bg-green-100 text-green-700" },
  }

  // Định dạng mức độ ưu tiên
  const priorityConfig = {
    low: { label: "Thấp", color: "bg-slate-100 text-slate-700" },
    medium: { label: "Trung bình", color: "bg-yellow-100 text-yellow-700" },
    high: { label: "Cao", color: "bg-red-100 text-red-700" },
  }

  // Định dạng loại yêu cầu
  const categoryConfig = {
    error: { label: "Lỗi", icon: <AlertCircle className="h-4 w-4 text-red-500" /> },
    question: { label: "Câu hỏi", icon: <HelpCircle className="h-4 w-4 text-blue-500" /> },
    feature: { label: "Tính năng", icon: <FileText className="h-4 w-4 text-green-500" /> },
  }

  return (
    <div className="space-y-6">
      {/* Bộ lọc */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm yêu cầu..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="open">Đang mở</SelectItem>
              <SelectItem value="in_progress">Đang xử lý</SelectItem>
              <SelectItem value="resolved">Đã giải quyết</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mức độ ưu tiên" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả mức độ</SelectItem>
              <SelectItem value="low">Thấp</SelectItem>
              <SelectItem value="medium">Trung bình</SelectItem>
              <SelectItem value="high">Cao</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Danh sách ticket */}
      {filteredTickets.length > 0 ? (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => {
            const status = statusConfig[ticket.status]
            const priority = priorityConfig[ticket.priority]
            const category = categoryConfig[ticket.category as keyof typeof categoryConfig]

            return (
              <Card
                key={ticket.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/support/${ticket.id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <h3 className="font-medium text-slate-800">{ticket.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">#{ticket.id}</span>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-xs text-slate-500">
                          {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true, locale: vi })}
                        </span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-xs text-slate-500">{ticket.messages.length} tin nhắn</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={ticket.creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{ticket.creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm hidden md:inline">{ticket.creator.name}</span>
                    </div>

                    <Badge className={priority.color}>{priority.label}</Badge>
                    <Badge className={status.color}>{status.label}</Badge>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-800 mb-2">Không tìm thấy yêu cầu nào</h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            Không có yêu cầu hỗ trợ nào phù hợp với bộ lọc của bạn. Vui lòng thử lại với các tiêu chí khác.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setStatusFilter("all")
              setPriorityFilter("all")
            }}
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}
    </div>
  )
}
