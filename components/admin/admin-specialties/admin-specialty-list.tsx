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

// Dữ liệu mẫu cho chuyên khoa
const specialties = [
  {
    id: 1,
    name: "Nội khoa",
    description: "Chẩn đoán và điều trị các bệnh lý nội khoa",
    doctorCount: 24,
    status: "active",
  },
  {
    id: 2,
    name: "Nhi khoa",
    description: "Chăm sóc sức khỏe trẻ em từ sơ sinh đến 18 tuổi",
    doctorCount: 18,
    status: "active",
  },
  {
    id: 3,
    name: "Da liễu",
    description: "Chẩn đoán và điều trị các bệnh về da",
    doctorCount: 12,
    status: "active",
  },
  {
    id: 4,
    name: "Thần kinh",
    description: "Chẩn đoán và điều trị các bệnh lý thần kinh",
    doctorCount: 8,
    status: "active",
  },
  {
    id: 5,
    name: "Tai mũi họng",
    description: "Chẩn đoán và điều trị các bệnh lý tai mũi họng",
    doctorCount: 15,
    status: "active",
  },
  {
    id: 6,
    name: "Mắt",
    description: "Chẩn đoán và điều trị các bệnh lý về mắt",
    doctorCount: 10,
    status: "inactive",
  },
  {
    id: 7,
    name: "Tim mạch",
    description: "Chẩn đoán và điều trị các bệnh lý tim mạch",
    doctorCount: 14,
    status: "active",
  },
]

export function AdminSpecialtyList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSpecialties = specialties.filter((specialty) =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm chuyên khoa..."
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
                <TableHead>Tên chuyên khoa</TableHead>
                <TableHead className="hidden md:table-cell">Mô tả</TableHead>
                <TableHead>Số bác sĩ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSpecialties.map((specialty) => (
                <TableRow key={specialty.id}>
                  <TableCell className="font-medium">{specialty.id}</TableCell>
                  <TableCell>{specialty.name}</TableCell>
                  <TableCell className="hidden max-w-[300px] truncate md:table-cell">
                    {specialty.description}
                  </TableCell>
                  <TableCell>{specialty.doctorCount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={specialty.status === "active" ? "default" : "secondary"}
                    >
                      {specialty.status === "active" ? "Hoạt động" : "Tạm ngưng"}
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
