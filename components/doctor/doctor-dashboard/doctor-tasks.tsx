import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

export function DoctorTasks() {
  // Dữ liệu mẫu cho nhiệm vụ
  const tasks = [
    {
      id: "T-1",
      title: "Hoàn thành hồ sơ bệnh nhân Nguyễn Văn X",
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 ngày sau
      priority: "high",
      completed: false,
    },
    {
      id: "T-2",
      title: "Xem xét kết quả xét nghiệm của bệnh nhân Trần Thị Y",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 ngày sau
      priority: "medium",
      completed: false,
    },
    {
      id: "T-3",
      title: "Cập nhật lịch làm việc tuần tới",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 ngày sau
      priority: "low",
      completed: true,
    },
    {
      id: "T-4",
      title: "Phản hồi đánh giá của bệnh nhân",
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 ngày sau
      priority: "medium",
      completed: false,
    },
  ]

  // Định dạng mức độ ưu tiên
  const priorityConfig = {
    high: { label: "Cao", color: "bg-red-100 text-red-700" },
    medium: { label: "Trung bình", color: "bg-yellow-100 text-yellow-700" },
    low: { label: "Thấp", color: "bg-slate-100 text-slate-700" },
  }

  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-start gap-3 p-2 rounded-md border ${task.completed ? "bg-slate-50" : ""}`}
        >
          <Checkbox id={task.id} checked={task.completed} className="mt-1" />
          <div className="flex-1">
            <label
              htmlFor={task.id}
              className={`text-sm ${task.completed ? "text-slate-500 line-through" : "text-slate-800"}`}
            >
              {task.title}
            </label>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-500">Hạn: {format(task.dueDate, "dd/MM/yyyy", { locale: vi })}</span>
              <Badge className={priorityConfig[task.priority as keyof typeof priorityConfig].color}>
                {priorityConfig[task.priority as keyof typeof priorityConfig].label}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
