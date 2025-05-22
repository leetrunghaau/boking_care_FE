"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import {
  AlertCircle,
  AlertTriangle,
  ArrowDownUp,
  Clock,
  FileText,
  Filter,
  HelpCircle,
  MessageSquare,
  MoreHorizontal,
  Search,
  UserPlus,
} from "lucide-react"
import type { Ticket } from "@/types/support"

interface AdminTicketListProps {
  tickets: Ticket[]
  supportTeam: any[]
  onAssign: (ticketId: string, adminId: string) => void
  filter: "all" | "unassigned"
}

export function AdminTicketList({ tickets, supportTeam, onAssign, filter }: AdminTicketListProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // Lọc ticket
  const filteredTickets = tickets.filter((ticket) => {
    // Lọc theo từ khóa
    const matchesSearch =
      searchQuery === "" ||
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.creator.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Lọc theo trạng thái
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    // Lọc theo mức độ ưu tiên
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    // Lọc theo loại yêu cầu
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  // Sắp xếp ticket
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "priority-high":
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return (
          priorityOrder[b.priority as keyof typeof priorityOrder] -
          priorityOrder[a.priority as keyof typeof priorityOrder]
        )
      case "priority-low":
        const priorityOrderReverse = { high: 1, medium: 2, low: 3 }
        return (
          priorityOrderReverse[b.priority as keyof typeof priorityOrderReverse] -
          priorityOrderReverse[a.priority as keyof typeof priorityOrderReverse]
        )
      default:
        return 0
    }
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
        <div className="flex flex-wrap gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Trạng thái" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="open">Đang mở</SelectItem>
              <SelectItem value="in_progress">Đang xử lý</SelectItem>
              <SelectItem value="resolved">Đã giải quyết</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Mức độ ưu tiên" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả mức độ</SelectItem>
              <SelectItem value="low">Thấp</SelectItem>
              <SelectItem value="medium">Trung bình</SelectItem>
              <SelectItem value="high">Cao</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Loại yêu cầu" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="error">Lỗi</SelectItem>
              <SelectItem value="question">Câu hỏi</SelectItem>
              <SelectItem value="feature">Tính năng</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <div className="flex items-center">
                <ArrowDownUp className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sắp xếp" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="oldest">Cũ nhất</SelectItem>
              <SelectItem value="priority-high">Ưu tiên cao nhất</SelectItem>
              <SelectItem value="priority-low">Ưu tiên thấp nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Danh sách ticket */}
      {sortedTickets.length > 0 ? (
        <div className="space-y-4">
          {sortedTickets.map((ticket) => {
            const status = statusConfig[ticket.status]
            const priority = priorityConfig[ticket.priority]
            const category = categoryConfig[ticket.category as keyof typeof categoryConfig]

            return (
              <Card
                key={ticket.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/admin/support/${ticket.id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <h3 className="font-medium text-slate-800">{ticket.title}</h3>
                      {ticket.priority === "high" && <AlertTriangle className="h-4 w-4 text-red-500" />}
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

                    {ticket.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={ticket.assignee.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{ticket.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm hidden md:inline">{ticket.assignee.name}</span>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="ml-auto" onClick={(e) => e.stopPropagation()}>
                            <UserPlus className="h-4 w-4 mr-1" />
                            <span>Phân công</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Chọn người xử lý</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {supportTeam.map((member) => (
                            <DropdownMenuItem
                              key={member.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                onAssign(ticket.id, member.id)
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{member.name}</span>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}

                    <Badge className={priority.color}>{priority.label}</Badge>
                    <Badge className={status.color}>{status.label}</Badge>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Đánh dấu là đã đọc</DropdownMenuItem>
                        <DropdownMenuItem>Thay đổi trạng thái</DropdownMenuItem>
                        <DropdownMenuItem>Thay đổi mức độ ưu tiên</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">Xóa yêu cầu</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
              setCategoryFilter("all")
            }}
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}
    </div>
  )
}
