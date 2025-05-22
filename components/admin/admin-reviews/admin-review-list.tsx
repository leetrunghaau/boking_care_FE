"use client"

import { useState } from "react"
import { Eye, MoreHorizontal, AlertTriangle, CheckCircle, XCircle, Star, Edit } from "lucide-react"
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
const reviews = [
  {
    id: "R1",
    patient: {
      name: "Nguyễn Văn A",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    doctor: {
      name: "BS. Trần Thị B",
      specialty: "Tim mạch",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    comment:
      "Bác sĩ rất tận tâm, giải thích chi tiết về tình trạng bệnh và phương pháp điều trị. Tôi rất hài lòng với dịch vụ.",
    date: "15/04/2023",
    status: "published",
    reports: 0,
  },
  {
    id: "R2",
    patient: {
      name: "Lê Văn C",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    doctor: {
      name: "BS. Phạm Thị D",
      specialty: "Nhi khoa",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 4,
    comment: "Bác sĩ khám rất kỹ và tư vấn tận tình. Tuy nhiên, thời gian chờ đợi hơi lâu.",
    date: "20/04/2023",
    status: "published",
    reports: 0,
  },
  {
    id: "R3",
    patient: {
      name: "Hoàng Văn E",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    doctor: {
      name: "BS. Nguyễn Văn F",
      specialty: "Da liễu",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 2,
    comment: "Bác sĩ khám quá nhanh, không giải thích rõ ràng về tình trạng bệnh. Tôi không hài lòng với dịch vụ này.",
    date: "25/04/2023",
    status: "reported",
    reports: 3,
  },
  {
    id: "R4",
    patient: {
      name: "Trần Thị G",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    doctor: {
      name: "BS. Lê Văn H",
      specialty: "Thần kinh",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    comment: "Bác sĩ rất chuyên nghiệp và tận tâm. Tôi đã được tư vấn rất chi tiết về tình trạng sức khỏe.",
    date: "28/04/2023",
    status: "published",
    reports: 0,
  },
  {
    id: "R5",
    patient: {
      name: "Phạm Văn I",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    doctor: {
      name: "BS. Hoàng Thị K",
      specialty: "Nội tiết",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 1,
    comment: "Thái độ phục vụ kém, bác sĩ không lắng nghe bệnh nhân. Tôi sẽ không quay lại nữa.",
    date: "30/04/2023",
    status: "hidden",
    reports: 5,
  },
]

export function AdminReviewList() {
  const [page, setPage] = useState(1)

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
      </div>
    )
  }

  const getStatusBadge = (status: string, reports: number) => {
    if (status === "published" && reports === 0) {
      return (
        <Badge variant="outline" className="border-green-500 text-green-500">
          Đã đăng
        </Badge>
      )
    } else if (status === "hidden") {
      return (
        <Badge variant="outline" className="border-gray-500 text-gray-500">
          Đã ẩn
        </Badge>
      )
    } else if (status === "reported" || reports > 0) {
      return (
        <Badge variant="outline" className="border-red-500 text-red-500">
          Bị báo cáo ({reports})
        </Badge>
      )
    }
    return null
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Bệnh nhân</TableHead>
            <TableHead>Bác sĩ</TableHead>
            <TableHead>Đánh giá</TableHead>
            <TableHead className="w-[300px]">Nội dung</TableHead>
            <TableHead>Ngày đăng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">{review.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={review.patient.avatar || "/placeholder.svg"} alt={review.patient.name} />
                    <AvatarFallback>{review.patient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{review.patient.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={review.doctor.avatar || "/placeholder.svg"} alt={review.doctor.name} />
                    <AvatarFallback>{review.doctor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm">{review.doctor.name}</span>
                    <span className="text-xs text-muted-foreground">{review.doctor.specialty}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{renderStars(review.rating)}</TableCell>
              <TableCell className="max-w-[300px] truncate">{review.comment}</TableCell>
              <TableCell>{review.date}</TableCell>
              <TableCell>{getStatusBadge(review.status, review.reports)}</TableCell>
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
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Chỉnh sửa</span>
                    </DropdownMenuItem>
                    {review.status === "published" ? (
                      <DropdownMenuItem>
                        <XCircle className="mr-2 h-4 w-4" />
                        <span>Ẩn đánh giá</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span>Hiện đánh giá</span>
                      </DropdownMenuItem>
                    )}
                    {review.reports > 0 && (
                      <DropdownMenuItem>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        <span>Xem báo cáo</span>
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
        <div className="text-sm text-muted-foreground">Hiển thị 1-5 của 245 đánh giá</div>
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
