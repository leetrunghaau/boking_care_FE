"use client"

import { useState } from "react"
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Dữ liệu mẫu
const pendingDoctors = [
  {
    id: "P1",
    name: "BS. Nguyễn Văn X",
    specialty: "Tim mạch",
    hospital: "Bệnh viện Đa khoa Tỉnh",
    experience: "8 năm",
    registeredDate: "15/04/2023",
    documents: 5,
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P2",
    name: "BS. Trần Thị Y",
    specialty: "Nhi khoa",
    hospital: "Bệnh viện Nhi Đồng",
    experience: "6 năm",
    registeredDate: "20/04/2023",
    documents: 4,
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P3",
    name: "BS. Lê Văn Z",
    specialty: "Da liễu",
    hospital: "Bệnh viện Da liễu",
    experience: "5 năm",
    registeredDate: "25/04/2023",
    documents: 6,
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P4",
    name: "BS. Phạm Thị K",
    specialty: "Thần kinh",
    hospital: "Bệnh viện Đa khoa",
    experience: "7 năm",
    registeredDate: "28/04/2023",
    documents: 5,
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P5",
    name: "BS. Hoàng Văn M",
    specialty: "Nội tiết",
    hospital: "Bệnh viện Đa khoa",
    experience: "9 năm",
    registeredDate: "30/04/2023",
    documents: 7,
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AdminDoctorPendingList() {
  const [page, setPage] = useState(1)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Bác sĩ</TableHead>
            <TableHead>Chuyên khoa</TableHead>
            <TableHead>Nơi công tác</TableHead>
            <TableHead>Kinh nghiệm</TableHead>
            <TableHead>Ngày đăng ký</TableHead>
            <TableHead>Tài liệu</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingDoctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-xs text-muted-foreground">ID: {doctor.id}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{doctor.specialty}</TableCell>
              <TableCell>{doctor.hospital}</TableCell>
              <TableCell>{doctor.experience}</TableCell>
              <TableCell>{doctor.registeredDate}</TableCell>
              <TableCell>{doctor.documents} tài liệu</TableCell>
              <TableCell>
                <Badge variant="secondary" className="flex w-fit items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Chờ duyệt</span>
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Xem hồ sơ</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 text-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <span className="sr-only">Duyệt</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 text-destructive">
                    <XCircle className="h-4 w-4" />
                    <span className="sr-only">Từ chối</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-sm text-muted-foreground">Hiển thị 1-5 của 12 bác sĩ chờ duyệt</div>
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
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
