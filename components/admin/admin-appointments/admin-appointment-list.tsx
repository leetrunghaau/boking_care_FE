"use client"

import { useState } from "react"
import { Eye, MoreHorizontal, CheckCircle, XCircle, Clock, Calendar, CheckSquare } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Dữ liệu mẫu
const appointments = [
  {
    id: "A1",
    patient: {
      name: "Nguyễn Văn A",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    doctor: {
      name: "BS. Trần Thị B",
      specialty: "Tim mạch",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "15/05/2023",
    time: "09:00 - 09:30",
    type: "Khám định kỳ",
    status: "confirmed",
    payment: "Đã thanh toán",
  },
  {
    id: "A2",
    patient: {
      name: "Lê Văn C",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    doctor: {
      name: "BS. Phạm Thị D",
      specialty: "Nhi khoa",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "15/05/2023",
    time: "10:00 - 10:30",
    type: "Khám lần đầu",
    status: "pending",
    payment: "Chưa thanh toán",
  },
  {
    id: "A3",
    patient: {
      name: "Hoàng Văn E",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    doctor: {
      name: "BS. Nguyễn Văn F",
      specialty: "Da liễu",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "15/05/2023",
    time: "11:00 - 11:30",
    type: "Tái khám",
    status: "completed",
    payment: "Đã thanh toán",
  },
  {
    id: "A4",
    patient: {
      name: "Trần Thị G",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    doctor: {
      name: "BS. Lê Văn H",
      specialty: "Thần kinh",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "16/05/2023",
    time: "09:00 - 09:30",
    type: "Khám định kỳ",
    status: "cancelled",
    payment: "Hoàn tiền",
  },
  {
    id: "A5",
    patient: {
      name: "Phạm Văn I",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    doctor: {
      name: "BS. Hoàng Thị K",
      specialty: "Nội tiết",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "16/05/2023",
    time: "10:00 - 10:30",
    type: "Khám lần đầu",
    status: "confirmed",
    payment: "Đã thanh toán",
  },
]

export function AdminAppointmentList() {
  const [page, setPage] = useState(1)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 border-yellow-500 text-yellow-500">
            <Clock className="h-3 w-3" />
            <span>Chờ xác nhận</span>
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 border-blue-500 text-blue-500">
            <Calendar className="h-3 w-3" />
            <span>Đã xác nhận</span>
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 border-green-500 text-green-500">
            <CheckSquare className="h-3 w-3" />
            <span>Đã hoàn tất</span>
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 border-red-500 text-red-500">
            <XCircle className="h-3 w-3" />
            <span>Đã hủy</span>
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Bệnh nhân</TableHead>
            <TableHead>Bác sĩ</TableHead>
            <TableHead>Ngày & Giờ</TableHead>
            <TableHead>Loại khám</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thanh toán</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">{appointment.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={appointment.patient.avatar || "/placeholder.svg"}
                      alt={appointment.patient.name}
                    />
                    <AvatarFallback>{appointment.patient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{appointment.patient.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={appointment.doctor.avatar || "/placeholder.svg"} alt={appointment.doctor.name} />
                    <AvatarFallback>{appointment.doctor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm">{appointment.doctor.name}</span>
                    <span className="text-xs text-muted-foreground">{appointment.doctor.specialty}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm">{appointment.date}</span>
                  <span className="text-xs text-muted-foreground">{appointment.time}</span>
                </div>
              </TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>{getStatusBadge(appointment.status)}</TableCell>
              <TableCell>{appointment.payment}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Mở menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Xem chi tiết</span>
                    </DropdownMenuItem>
                    {appointment.status === "pending" && (
                      <>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          <span>Xác nhận</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          <span>Hủy lịch</span>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-sm text-muted-foreground">Hiển thị 1-5 của 120 lịch hẹn</div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
