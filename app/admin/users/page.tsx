import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminUserList } from "@/components/admin/users/admin-user-list"
import { AdminUserFilters } from "@/components/admin/users/admin-user-filters"

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Xuất Excel</Button>
          <Button>Thêm người dùng</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input placeholder="Tìm kiếm theo tên, email, số điện thoại..." className="max-w-md" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="inactive">Đã khóa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AdminUserFilters />
        <AdminUserList />
      </div>
    </div>
  )
}
