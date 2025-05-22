import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"

const facilities = [
  {
    id: "123",
    name: "Phòng khám Đa khoa An Tâm",
    address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    phone: "1900 999 888",
    status: "active",
    updatedAt: "Hôm nay",
  },
  {
    id: "456",
    name: "Bệnh viện Quốc tế Việt Đức",
    address: "456 Lê Hồng Phong, Quận 10, TP.HCM",
    phone: "1800 888 777",
    status: "active",
    updatedAt: "Hôm qua",
  },
  {
    id: "789",
    name: "Phòng khám Chuyên khoa Mắt Sáng Tươi",
    address: "789 Trần Hưng Đạo, Quận 1, TP.HCM",
    phone: "1900 777 666",
    status: "pending",
    updatedAt: "3 ngày trước",
  },
  {
    id: "101",
    name: "Phòng khám Nha khoa Răng Khỏe",
    address: "101 Nguyễn Thị Minh Khai, Quận 3, TP.HCM",
    phone: "1800 666 555",
    status: "active",
    updatedAt: "1 tuần trước",
  },
  {
    id: "202",
    name: "Trung tâm Y tế Quận 2",
    address: "202 Mai Chí Thọ, Quận 2, TP.HCM",
    phone: "1900 555 444",
    status: "inactive",
    updatedAt: "2 tuần trước",
  },
]

export default function FacilitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý cơ sở y tế</h1>
        <Button asChild>
          <Link href="/admin/facilities/new">
            <Plus className="mr-2 h-4 w-4" />
            Thêm cơ sở mới
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách cơ sở y tế</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Tìm kiếm..." className="w-full pl-8" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Lọc
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên cơ sở</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Điện thoại</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Cập nhật</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facilities.map((facility) => (
                <TableRow key={facility.id}>
                  <TableCell className="font-medium">{facility.name}</TableCell>
                  <TableCell>{facility.address}</TableCell>
                  <TableCell>{facility.phone}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        facility.status === "active"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : facility.status === "pending"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {facility.status === "active"
                        ? "Hoạt động"
                        : facility.status === "pending"
                          ? "Đang xét duyệt"
                          : "Tạm ngưng"}
                    </span>
                  </TableCell>
                  <TableCell>{facility.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/facilities/${facility.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Xem</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/facilities/${facility.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Sửa</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Xóa</span>
                      </Button>
                    </div>
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
