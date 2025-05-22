import { Button } from "@/components/ui/button"
import { Headset, Settings } from "lucide-react"

export function AdminSupportHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4 border-b">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <Headset className="h-8 w-8 text-teal-600" />
          Quản lý hỗ trợ kỹ thuật
        </h1>
        <p className="text-slate-500 mt-1">Quản lý và phản hồi các yêu cầu hỗ trợ từ bác sĩ</p>
      </div>
      <Button variant="outline" className="flex items-center gap-2">
        <Settings className="h-4 w-4" />
        <span>Cấu hình hệ thống</span>
      </Button>
    </div>
  )
}
