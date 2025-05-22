"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupportTicketList } from "@/components/doctor-site/support/support-ticket-list"
import { CreateTicketForm } from "@/components/doctor-site/support/create-ticket-form"
import { SupportHeader } from "@/components/doctor-site/support/support-header"
import { SupportFAQ } from "@/components/doctor-site/support/support-faq"
import { SupportStats } from "@/components/doctor-site/support/support-stats"
import { Ticket } from "@/types/support"

// Dữ liệu mẫu cho các ticket hỗ trợ
const sampleTickets: Ticket[] = [
  {
    id: "T-1001",
    title: "Không thể truy cập trang kê đơn thuốc",
    description: "Khi tôi nhấp vào tab kê đơn thuốc trong trang chi tiết lịch hẹn, trang hiển thị lỗi và không tải được.",
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
        content: "Tôi không thể truy cập trang kê đơn thuốc. Khi tôi nhấp vào tab kê đơn thuốc, trang hiển thị lỗi và không tải được.",
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
        content: "Cảm ơn bác sĩ đã báo cáo vấn đề. Vui lòng cho tôi biết phiên bản trình duyệt và hệ điều hành bạn đang sử dụng.",
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
        content: "Chúng tôi đã xác định được vấn đề và đang khắc phục. Dự kiến sẽ hoàn thành trong vòng 2 giờ tới. Xin lỗi vì sự bất tiện này.",
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
        content: "Chào bác sĩ, hiện tại chức năng xuất báo cáo theo tháng đang được phát triển và sẽ có trong bản cập nhật tới. Tạm thời, bạn có thể xuất báo cáo theo tuần và tổng hợp lại.",
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
        content: "Dự kiến tính năng này sẽ được triển khai trong bản cập nhật vào tuần sau. Chúng tôi sẽ thông báo cho bạn khi tính năng được phát hành.",
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
        content: "Hệ thống không gửi thông báo khi có bệnh nhân đặt lịch hẹn mới. Tôi đã kiểm tra cài đặt thông báo và mọi thứ đều bật.",
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
        content: "Chúng tôi đã ghi nhận vấn đề và đang điều tra. Có vẻ như đây là lỗi từ hệ thống thông báo của chúng tôi.",
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
]

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(sampleTickets)
  const [activeTab, setActiveTab] = useState("my-tickets")

  // Thống kê ticket
  const stats = {
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "open").length,
    inProgress: tickets.filter((ticket) => ticket.status === "in_progress").length,
    resolved: tickets.filter((ticket) => ticket.status === "resolved").length,
  }

  // Xử lý tạo ticket mới
  const handleCreateTicket = (newTicket: Partial<Ticket>) => {
    const ticket: Ticket = {
      id: `T-${1000 + tickets.length + 1}`,
      title: newTicket.title || "",
      description: newTicket.description || "",
      status: "open",
      priority: newTicket.priority || "medium",
      category: newTicket.category || "question",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creator: {
        id: "D-123",
        name: "BS. Nguyễn Văn A",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "doctor",
      },
      messages: [
        {
          id: `M-${Date.now()}`,
          content: newTicket.description || "",
          createdAt: new Date().toISOString(),
          sender: {
            id: "D-123",
            name: "BS. Nguyễn Văn A",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "doctor",
          },
          attachments: newTicket.messages?.[0]?.attachments || [],
        },
      ],
    }

    setTickets([ticket, ...tickets])
    setActiveTab("my-tickets")
    alert("Yêu cầu hỗ trợ đã được tạo thành công!")
  }

  return (
    <div className="container mx-auto my-8 px-4 space-y-6">
      {/* Header */}
      <SupportHeader />

      {/* Thống kê */}
      <SupportStats stats={stats} />

      {/* Tabs */}
      <Tabs defaultValue="my-tickets" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="my-tickets">Yêu cầu của tôi</TabsTrigger>
          <TabsTrigger value="create-ticket">Tạo yêu cầu mới</TabsTrigger>
          <TabsTrigger value="faq">Câu hỏi thường gặp</TabsTrigger>
        </TabsList>

        <TabsContent value="my-tickets" className="mt-6">
          <SupportTicketList tickets={tickets} />
        </TabsContent>

        <TabsContent value="create-ticket" className="mt-6">
          <CreateTicketForm onSubmit={handleCreateTicket} />
        </TabsContent>

        <TabsContent value="faq" className="mt-6">
          <SupportFAQ />
        </TabsContent>
      </Tabs>
    </div>
  )
}
