import { AdminDoctorList } from "@/components/admin/admin-doctors/admin-doctor-list"
import { AdminDoctorPendingList } from "@/components/admin/admin-doctors/admin-doctor-pending-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDoctorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý bác sĩ</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Xuất Excel</Button>
          <Button>Thêm bác sĩ</Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Đang hoạt động</TabsTrigger>
          <TabsTrigger value="pending">Chờ duyệt</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <div className="flex items-center gap-4">
            <Input placeholder="Tìm kiếm theo tên, chuyên khoa, ID..." className="max-w-md" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chuyên khoa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả chuyên khoa</SelectItem>
                <SelectItem value="cardiology">Tim mạch</SelectItem>
                <SelectItem value="neurology">Thần kinh</SelectItem>
                <SelectItem value="pediatrics">Nhi khoa</SelectItem>
                <SelectItem value="dermatology">Da liễu</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="inactive">Tạm ngưng</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AdminDoctorList />
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <div className="flex items-center gap-4">
            <Input placeholder="Tìm kiếm theo tên, chuyên khoa, ID..." className="max-w-md" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chuyên khoa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả chuyên khoa</SelectItem>
                <SelectItem value="cardiology">Tim mạch</SelectItem>
                <SelectItem value="neurology">Thần kinh</SelectItem>
                <SelectItem value="pediatrics">Nhi khoa</SelectItem>
                <SelectItem value="dermatology">Da liễu</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ngày đăng ký" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AdminDoctorPendingList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
