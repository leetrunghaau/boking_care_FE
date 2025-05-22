"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Ticket } from "@/types/support"
import { AdminTicketList } from "@/components/admin/admin-support/admin-ticket-list"
import { AdminSupportHeader } from "@/components/admin/admin-support/admin-support-header"
import { AdminSupportStats } from "@/components/admin/admin-support/admin-support-stats"
import { AdminSupportTeam } from "@/components/admin/admin-support/admin-support-team"
import { AdminSupportAnalytics } from "@/components/admin/admin-support/admin-support-analytics"
import { AdminSupportSettings } from "@/components/admin/admin-support/admin-support-settings"

// Dữ liệu mẫu cho các ticket hỗ trợ
const sampleTickets: Ticket[] = [
  {
    id: "T-1001",
    title: "Không thể truy cập trang kê đơn thuốc",
    description:
      "Khi tôi nhấp vào tab kê đơn thuốc trong trang chi tiết lịch hẹn, trang hiển thị lỗi và không tải được.",
    status: "open",
    priority: "high",
    category: "error",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 giờ trước
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 phút trước
    creator: {
      id: "D-123",
      name: "BS. Nguyễn Văn A",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "doctor",
    },
    assignee: {
      id: "A-001",
      name: "Trần Văn Support",
      avatar: "/placeholder.svg?height=40&width=40&text=TS",
      role: "admin",
    },
    messages: [
      {
        id: "M-1",
        content:
          "Tôi không thể truy cập trang kê đơn thuốc. Khi tôi nhấp vào tab kê đơn thuốc, trang hiển thị lỗi và không tải được.",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "D-123",
          name: "BS. Nguyễn Văn A",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "doctor",
        },
        attachments: [
          {
            id: "A-1",
            name: "screenshot-error.png",
            url: "/placeholder.svg?height=300&width=500&text=Screenshot",
            type: "image/png",
          },
        ],
      },
      {
        id: "M-2",
        content:
          "Cảm ơn bác sĩ đã báo cáo vấn đề. Vui lòng cho tôi biết phiên bản trình duyệt và hệ điều hành bạn đang sử dụng.",
        createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "A-001",
          name: "Trần Văn Support",
          avatar: "/placeholder.svg?height=40&width=40&text=TS",
          role: "admin",
        },
      },
      {
        id: "M-3",
        content: "Tôi đang sử dụng Chrome phiên bản 98.0.4758.102 trên Windows 10.",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "D-123",
          name: "BS. Nguyễn Văn A",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "doctor",
        },
      },
      {
        id: "M-4",
        content:
          "Chúng tôi đã xác định được vấn đề và đang khắc phục. Dự kiến sẽ hoàn thành trong vòng 2 giờ tới. Xin lỗi vì sự bất tiện này.",
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        sender: {
          id: "A-001",
          name: "Trần Văn Support",
          avatar: "/placeholder.svg?height=40&width=40&text=TS",
          role: "admin",
        },
      },
    ],
  },
  {
    id: "T-1002",
    title: "Cần hướng dẫn cách xuất báo cáo lịch hẹn theo tháng",
    description: "Tôi muốn xuất báo cáo lịch hẹn theo tháng nhưng không tìm thấy chức năng này. Vui lòng hướng dẫn.",
    status: "in_progress",
    priority: "medium",
    category: "question",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 ngày trước
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 giờ trước
    creator: {
      id: "D-456",
      name: "BS. Lê Thị B",
      avatar: "/placeholder.svg?height=40&width=40&text=LB",
      role: "doctor",
    },
    assignee: {
      id: "A-002",
      name: "Phạm Thị Hỗ Trợ",
      avatar: "/placeholder.svg?height=40&width=40&text=PT",
      role: "admin",
    },
    messages: [
      {
        id: "M-5",
        content: "Tôi muốn xuất báo cáo lịch hẹn theo tháng nhưng không tìm thấy chức năng này. Vui lòng hướng dẫn.",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "D-456",
          name: "BS. Lê Thị B",
          avatar: "/placeholder.svg?height=40&width=40&text=LB",
          role: "doctor",
        },
      },
      {
        id: "M-6",
        content:
          "Chào bác sĩ, hiện tại chức năng xuất báo cáo theo tháng đang được phát triển và sẽ có trong bản cập nhật tới. Tạm thời, bạn có thể xuất báo cáo theo tuần và tổng hợp lại.",
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "A-002",
          name: "Phạm Thị Hỗ Trợ",
          avatar: "/placeholder.svg?height=40&width=40&text=PT",
          role: "admin",
        },
      },
      {
        id: "M-7",
        content: "Cảm ơn thông tin. Vậy khi nào tính năng này sẽ được triển khai?",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "D-456",
          name: "BS. Lê Thị B",
          avatar: "/placeholder.svg?height=40&width=40&text=LB",
          role: "doctor",
        },
      },
      {
        id: "M-8",
        content:
          "Dự kiến tính năng này sẽ được triển khai trong bản cập nhật vào tuần sau. Chúng tôi sẽ thông báo cho bạn khi tính năng được phát hành.",
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "A-002",
          name: "Phạm Thị Hỗ Trợ",
          avatar: "/placeholder.svg?height=40&width=40&text=PT",
          role: "admin",
        },
      },
    ],
  },
  {
    id: "T-1003",
    title: "Không nhận được thông báo khi có lịch hẹn mới",
    description: "Hệ thống không gửi thông báo khi có bệnh nhân đặt lịch hẹn mới.",
    status: "resolved",
    priority: "high",
    category: "error",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 ngày trước
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 ngày trước
    creator: {
      id: "D-789",
      name: "BS. Trần Văn C",
      avatar: "/placeholder.svg?height=40&width=40&text=TC",
      role: "doctor",
    },
    assignee: {
      id: "A-001",
      name: "Trần Văn Support",
      avatar: "/placeholder.svg?height=40&width=40&text=TS",
      role: "admin",
    },
    messages: [
      {
        id: "M-9",
        content:
          "Hệ thống không gửi thông báo khi có bệnh nhân đặt lịch hẹn mới. Tôi đã kiểm tra cài đặt thông báo và mọi thứ đều bật.",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "D-789",
          name: "BS. Trần Văn C",
          avatar: "/placeholder.svg?height=40&width=40&text=TC",
          role: "doctor",
        },
      },
      {
        id: "M-10",
        content:
          "Chúng tôi đã ghi nhận vấn đề và đang điều tra. Có vẻ như đây là lỗi từ hệ thống thông báo của chúng tôi.",
        createdAt: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "A-001",
          name: "Trần Văn Support",
          avatar: "/placeholder.svg?height=40&width=40&text=TS",
          role: "admin",
        },
      },
      {
        id: "M-11",
        content: "Chúng tôi đã khắc phục lỗi thông báo. Vui lòng đăng xuất và đăng nhập lại để áp dụng thay đổi.",
        createdAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "A-001",
          name: "Trần Văn Support",
          avatar: "/placeholder.svg?height=40&width=40&text=TS",
          role: "admin",
        },
      },
      {
        id: "M-12",
        content: "Tôi đã đăng xuất và đăng nhập lại, thông báo đã hoạt động bình thường. Cảm ơn đội ngũ hỗ trợ.",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "D-789",
          name: "BS. Trần Văn C",
          avatar: "/placeholder.svg?height=40&width=40&text=TC",
          role: "doctor",
        },
      },
    ],
  },
  {
    id: "T-1004",
    title: "Lỗi khi tải lên kết quả xét nghiệm",
    description: "Không thể tải lên file PDF kết quả xét nghiệm cho bệnh nhân.",
    status: "open",
    priority: "medium",
    category: "error",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 giờ trước
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 giờ trước
    creator: {
      id: "D-101",
      name: "BS. Hoàng Thị D",
      avatar: "/placeholder.svg?height=40&width=40&text=HD",
      role: "doctor",
    },
    messages: [
      {
        id: "M-13",
        content:
          "Tôi không thể tải lên file PDF kết quả xét nghiệm cho bệnh nhân. Khi nhấn nút tải lên, hệ thống hiển thị thông báo lỗi 'Không hỗ trợ định dạng file'.",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "D-101",
          name: "BS. Hoàng Thị D",
          avatar: "/placeholder.svg?height=40&width=40&text=HD",
          role: "doctor",
        },
        attachments: [
          {
            id: "A-2",
            name: "error-screenshot.png",
            url: "/placeholder.svg?height=300&width=500&text=Error+Screenshot",
            type: "image/png",
          },
        ],
      },
    ],
  },
  {
    id: "T-1005",
    title: "Yêu cầu thêm tính năng nhắc nhở tái khám",
    description: "Đề xuất thêm tính năng tự động gửi nhắc nhở tái khám cho bệnh nhân.",
    status: "in_progress",
    priority: "low",
    category: "feature",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 ngày trước
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 ngày trước
    creator: {
      id: "D-202",
      name: "BS. Phan Văn E",
      avatar: "/placeholder.svg?height=40&width=40&text=PE",
      role: "doctor",
    },
    assignee: {
      id: "A-003",
      name: "Lê Minh Phát Triển",
      avatar: "/placeholder.svg?height=40&width=40&text=LP",
      role: "admin",
    },
    messages: [
      {
        id: "M-14",
        content:
          "Tôi đề xuất thêm tính năng tự động gửi nhắc nhở tái khám cho bệnh nhân. Hiện tại, chúng tôi phải nhắc nhở thủ công, rất mất thời gian và dễ bỏ sót.",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "D-202",
          name: "BS. Phan Văn E",
          avatar: "/placeholder.svg?height=40&width=40&text=PE",
          role: "doctor",
        },
      },
      {
        id: "M-15",
        content:
          "Cảm ơn bác sĩ đã đề xuất. Đây là một ý tưởng rất hay và chúng tôi đã chuyển yêu cầu này đến đội ngũ phát triển sản phẩm để xem xét.",
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "A-003",
          name: "Lê Minh Phát Triển",
          avatar: "/placeholder.svg?height=40&width=40&text=LP",
          role: "admin",
        },
      },
      {
        id: "M-16",
        content:
          "Chúng tôi đã đưa tính năng này vào kế hoạch phát triển. Dự kiến sẽ được triển khai trong bản cập nhật tháng tới. Chúng tôi sẽ cập nhật thông tin cho bạn.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        sender: {
          id: "A-003",
          name: "Lê Minh Phát Triển",
          avatar: "/placeholder.svg?height=40&width=40&text=LP",
          role: "admin",
        },
      },
    ],
  },
]

// Dữ liệu mẫu cho đội ngũ hỗ trợ
const supportTeam = [
  {
    id: "A-001",
    name: "Trần Văn Support",
    avatar: "/placeholder.svg?height=40&width=40&text=TS",
    role: "Quản lý hỗ trợ",
    email: "tran.support@example.com",
    phone: "0987654321",
    department: "Hỗ trợ kỹ thuật",
    activeTickets: 5,
    resolvedTickets: 120,
    status: "online",
  },
  {
    id: "A-002",
    name: "Phạm Thị Hỗ Trợ",
    avatar: "/placeholder.svg?height=40&width=40&text=PT",
    role: "Chuyên viên hỗ trợ",
    email: "pham.support@example.com",
    phone: "0912345678",
    department: "Hỗ trợ kỹ thuật",
    activeTickets: 3,
    resolvedTickets: 85,
    status: "online",
  },
  {
    id: "A-003",
    name: "Lê Minh Phát Triển",
    avatar: "/placeholder.svg?height=40&width=40&text=LP",
    role: "Chuyên viên phát triển",
    email: "le.dev@example.com",
    phone: "0909123456",
    department: "Phát triển sản phẩm",
    activeTickets: 2,
    resolvedTickets: 45,
    status: "away",
  },
  {
    id: "A-004",
    name: "Nguyễn Thị Quản Lý",
    avatar: "/placeholder.svg?height=40&width=40&text=NQ",
    role: "Quản lý sản phẩm",
    email: "nguyen.manager@example.com",
    phone: "0978123456",
    department: "Quản lý sản phẩm",
    activeTickets: 0,
    resolvedTickets: 30,
    status: "offline",
  },
]

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(sampleTickets)
  const [activeTab, setActiveTab] = useState("all-tickets")

  // Thống kê ticket
  const stats = {
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "open").length,
    inProgress: tickets.filter((ticket) => ticket.status === "in_progress").length,
    resolved: tickets.filter((ticket) => ticket.status === "resolved").length,
    unassigned: tickets.filter((ticket) => !ticket.assignee).length,
    highPriority: tickets.filter((ticket) => ticket.priority === "high").length,
  }

  // Xử lý phân công ticket
  const handleAssignTicket = (ticketId: string, adminId: string) => {
    const admin = supportTeam.find((member) => member.id === adminId)
    if (!admin) return

    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            assignee: {
              id: admin.id,
              name: admin.name,
              avatar: admin.avatar,
              role: "admin",
            },
            updatedAt: new Date().toISOString(),
          }
        }
        return ticket
      }),
    )
  }

  return (
    <div className="container mx-auto my-8 px-4 space-y-6">
      {/* Header */}
      <AdminSupportHeader />

      {/* Thống kê */}
      <AdminSupportStats stats={stats} />

      {/* Tabs */}
      <Tabs defaultValue="all-tickets" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all-tickets">Tất cả yêu cầu</TabsTrigger>
          <TabsTrigger value="unassigned">Chưa phân công</TabsTrigger>
          <TabsTrigger value="team">Đội ngũ hỗ trợ</TabsTrigger>
          <TabsTrigger value="analytics">Thống kê & Báo cáo</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="all-tickets" className="mt-6">
          <AdminTicketList tickets={tickets} supportTeam={supportTeam} onAssign={handleAssignTicket} filter="all" />
        </TabsContent>

        <TabsContent value="unassigned" className="mt-6">
          <AdminTicketList
            tickets={tickets.filter((ticket) => !ticket.assignee)}
            supportTeam={supportTeam}
            onAssign={handleAssignTicket}
            filter="unassigned"
          />
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <AdminSupportTeam team={supportTeam} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AdminSupportAnalytics tickets={tickets} team={supportTeam} />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <AdminSupportSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
