"use client"

import { useState } from "react"
import { Eye, MoreHorizontal, PauseCircle, PlayCircle, Edit, Award, Star } from "lucide-react"
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
const doctors = [
  {
    id: "1",
    name: "TS. BS. Nguyễn Văn A",
    specialty: "Tim mạch",
    hospital: "Bệnh viện Đa khoa Trung ương",
    experience: "15 năm",
    appointments: 245,
    rating: 4.9,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "PGS. TS. Trần Thị B",
    specialty: "Nhi khoa",
    hospital: "Bệnh viện Nhi Trung ương",
    experience: "12 năm",
    appointments: 198,
    rating: 4.8,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "BS. CKI. Lê Văn C",
    specialty: "Da liễu",
    hospital: "Bệnh viện Da liễu Trung ương",
    experience: "8 năm",
    appointments: 156,
    rating: 4.7,
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "BS. CKII. Phạm Thị D",
    specialty: "Thần kinh",
    hospital: "Bệnh viện Bạch Mai",
    experience: "10 năm",
    appointments: 187,
    rating: 4.6,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "TS. BS. Hoàng Văn E",
    specialty: "Nội tiết",
    hospital: "Bệnh viện Việt Đức",
    experience: "14 năm",
    appointments: 210,
    rating: 4.5,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AdminDoctorList() {
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
            <TableHead>Lịch hẹn</TableHead>
            <TableHead>Đánh giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
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
              <TableCell>{doctor.appointments}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Star className="mr-1 h-3.5 w-3.5 fill-primary text-primary" />
                  <span>{doctor.rating}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={doctor.status === "active" ? "outline" : "secondary"}>
                  {doctor.status === "active" ? "Hoạt động" : "Tạm ngưng"}
                </Badge>
              </TableCell>
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
                      <span>Xem hồ sơ</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Chỉnh sửa</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Award className="mr-2 h-4 w-4" />
                      <span>Phân quyền</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {doctor.status === "active" ? (
                      <DropdownMenuItem>
                        <PauseCircle className="mr-2 h-4 w-4" />
                        <span>Tạm ngưng</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        <span>Kích hoạt</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-sm text-muted-foreground">Hiển thị 1-5 của 50 bác sĩ</div>
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
