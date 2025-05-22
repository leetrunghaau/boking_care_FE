import { AdminReviewList } from "@/components/admin/admin-reviews/admin-review-list"
import { AdminReviewStats } from "@/components/admin/admin-reviews/admin-review-stats"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminReviewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý đánh giá & phản hồi</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Xuất báo cáo</Button>
        </div>
      </div>

      <AdminReviewStats />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input placeholder="Tìm kiếm theo tên bác sĩ, bệnh nhân, nội dung..." className="max-w-md" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Đánh giá" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả đánh giá</SelectItem>
              <SelectItem value="5">5 sao</SelectItem>
              <SelectItem value="4">4 sao</SelectItem>
              <SelectItem value="3">3 sao</SelectItem>
              <SelectItem value="2">2 sao</SelectItem>
              <SelectItem value="1">1 sao</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="published">Đã đăng</SelectItem>
              <SelectItem value="hidden">Đã ẩn</SelectItem>
              <SelectItem value="reported">Bị báo cáo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AdminReviewList />
      </div>
    </div>
  )
}
