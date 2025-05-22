"use client"

import { Edit, MoreHorizontal, Shield, Trash } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Dữ liệu mẫu cho vai trò
const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Toàn quyền quản lý hệ thống",
    userCount: 1,
    permissions: ["Tất cả quyền"],
  },
  {
    id: 2,
    name: "CSKH",
    description: "Quản lý hỗ trợ và chăm sóc khách hàng",
    userCount: 5,
    permissions: ["Quản lý hỗ trợ", "Xem người dùng", "Xem lịch hẹn"],
  },
  {
    id: 3,
    name: "Điều phối",
    description: "Quản lý lịch hẹn và điều phối bác sĩ",
    userCount: 3,
    permissions: ["Quản lý lịch hẹn", "Xem bác sĩ", "Xem người dùng"],
  },
  {
    id: 4,
    name: "Kế toán",
    description: "Quản lý thanh toán và hóa đơn",
    userCount: 2,
    permissions: ["Quản lý thanh toán", "Xem báo cáo tài chính"],
  },
  {
    id: 5,
    name: "Marketing",
    description: "Quản lý nội dung và marketing",
    userCount: 2,
    permissions: ["Quản lý nội dung", "Xem thống kê"],
  },
]

export function AdminRoleList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Thêm vai trò mới
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên vai trò</TableHead>
                <TableHead className="hidden md:table-cell">Mô tả</TableHead>
                <TableHead>Số người dùng</TableHead>
                <TableHead className="hidden md:table-cell">Quyền</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.id}</TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell className="hidden max-w-[300px] truncate md:table-cell">
                    {role.description}
                  </TableCell>
                  <TableCell>{role.userCount}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline">
                          {permission}
                        </Badge>
                      ))}
                    </div>
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