"use client"

import { useState } from "react"
import { Search } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dữ liệu mẫu cho nhật ký hoạt động
const activityLogs = [
  {
    id: 1,
    user: {
      name: "Nguyễn Văn Admin",
      email: "admin@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Đăng nhập",
    target: "Hệ thống",
    timestamp: "2023-12-15T15:30:00",
    ip: "192.168.1.1",
    status: "success",
  },
  {
    id: 2,
    user: {
      name: "Nguyễn Văn Admin",
      email: "admin@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Cập nhật",
    target: "Thông tin bác sĩ #123",
    timestamp: "2023-12-15T15:35:00",
    ip: "192.168.1.1",
    status: "success",
  },
  {
    id: 3,
    user: {
      name: "Trần Thị Hỗ Trợ",
      email: "support@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Phản hồi",
    target: "Ticket hỗ trợ #456",
    timestamp: "2023-12-15T15:40:00",
    ip: "192.168.1.2",
    status: "success",
  },
  {
    id: 4,
    user: {
      name: "Lê Văn Điều Phối",
      email: "coordinator@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Cập nhật",
    target: "Lịch hẹn #789",
    timestamp: "2023-12-15T15:45:00",
    ip: "192.168.1.3",
    status: "success",
  },
  {
    id: 5,
    user: {
      name: "Phạm Thị Kế Toán",
      email: "finance@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Truy cập",
    target: "Báo cáo tài chính",
    timestamp: "2023-12-15T15:50:00",
    ip: "192.168.1.4",
    status: "warning",
  },
  {
    id: 6,
    user: {
      name: "Hoàng Văn Marketing",
      email: "marketing@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Đăng nhập",
    target: "Hệ thống",
    timestamp: "2023-12-15T15:55:00",
    ip: "192.168.1.5",
    status: "error",
  },
  {
    id: 7,
    user: {
      name: "Hoàng Văn Marketing",
      email: "marketing@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Đăng nhập",
    target: "Hệ thống",
    timestamp: "2023-12-15T16:00:00",
    ip: "192.168.1.5",
    status: "success",
  },
]

// Format ngày giờ
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

// Hiển thị trạng thái
const getStatusBadge = (status: string) => {
  switch (status) {
    case "success":
      return <Badge className="bg-emerald-500">Thành công</Badge>
    case "warning":
      return <Badge variant="outline" className="text-amber-500 border-amber-500">Cảnh báo</Badge>
    case "error":
      return <Badge variant="destructive">Lỗi</Badge>
    default:
      return <Badge variant="outline">Không xác định</Badge>
  }
}

export function AdminActivityLog() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm nhật ký..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Loại hoạt động" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="login">Đăng nhập</SelectItem>
            <SelectItem value="update">Cập nhật</SelectItem>
            <SelectItem value="create">Tạo mới</SelectItem>
            <SelectItem value="delete">Xóa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Người dùng</TableHead>
                <TableHead>Hành động</TableHead>
                <TableHead className="hidden md:table-cell">Đối tượng</TableHead>
                <TableHead className="hidden md:table-cell">Thời gian</TableHead>
                <TableHead className="hidden md:table-cell">IP</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={log.user.avatar || "/placeholder.svg"} alt={log.user.name} />
                        <AvatarFallback>{log.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{log.user.name}</span>
                        <span className="text-xs text-muted-foreground">{log.user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="hidden md:table-cell">{log.target}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(log.timestamp)}</TableCell>
                  <TableCell className="hidden md:table-cell">{log.ip}</TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}