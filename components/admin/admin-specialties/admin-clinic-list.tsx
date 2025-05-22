"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Search, Trash } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

// Dữ liệu mẫu cho phòng khám
const clinics = [
  {
    id: 1,
    name: "Phòng khám Đa khoa Hà Nội",
    address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    specialties: ["Nội khoa", "Nhi khoa", "Da liễu"],
    doctorCount: 15,
    status: "active",
  },
  {
    id: 2,
    name: "Phòng khám Sản phụ khoa Hạnh Phúc",
    address: "456 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    specialties: ["Sản phụ khoa"],
    doctorCount: 8,
    status: "active",
  },
  {
    id: 3,
    name: "Phòng khám Nhi đồng Thành phố",
    address: "789 Đường Cách Mạng Tháng 8, Quận 3, TP. Hồ Chí Minh",
    specialties: ["Nhi khoa"],
    doctorCount: 12,
    status: "active",
  },
  {
    id: 4,
    name: "Phòng khám Mắt Quốc tế",
    address: "101 Đường Nguyễn Du, Quận 1, TP. Hồ Chí Minh",
    specialties: ["Mắt"],
    doctorCount: 6,
    status: "inactive",
  },
  {
    id: 5,
    name: "Phòng khám Răng Hàm Mặt Tươi Sáng",
    address: "202 Đường Lý Tự Trọng, Quận 1, TP. Hồ Chí Minh",
    specialties: ["Răng Hàm Mặt"],
    doctorCount: 10,
    status: "active",
  },
]

export function AdminClinicList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClinics = clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm phòng khám..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên phòng khám</TableHead>
                <TableHead className="hidden md:table-cell">Địa chỉ</TableHead>
                <TableHead>Chuyên khoa</TableHead>
                <TableHead>Số bác sĩ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClinics.map((clinic) => (
                <TableRow key={clinic.id}>
                  <TableCell className="font-medium">{clinic.id}</TableCell>
                  <TableCell>{clinic.name}</TableCell>
                  <TableCell className="hidden max-w-[300px] truncate md:table-cell">
                    {clinic.address}
                  </TableCell>
                  <TableCell>{clinic.specialties.join(", ")}</TableCell>
                  <TableCell>{clinic.doctorCount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={clinic.status === "active" ? "default" : "secondary"}
                    >
                      {clinic.status === "active" ? "Hoạt động" : "Tạm ngưng"}
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
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
