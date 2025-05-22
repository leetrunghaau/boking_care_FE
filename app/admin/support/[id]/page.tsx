"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  MessageSquare,
  Paperclip,
  Send,
  UserPlus,
  XCircle,
} from "lucide-react"
import type { Ticket, Message } from "@/types/support"

// Dữ liệu mẫu cho chi tiết ticket
const ticketDetail: Ticket = {
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
}

// Dữ liệu mẫu cho đội ngũ hỗ trợ
const supportTeam = [
  {
    id: "A-001",
    name: "Trần Văn Support",
    avatar: "/placeholder.svg?height=40&width=40&text=TS",
    role: "Quản lý hỗ trợ",
  },
  {
    id: "A-002",
    name: "Phạm Thị Hỗ Trợ",
    avatar: "/placeholder.svg?height=40&width=40&text=PT",
    role: "Chuyên viên hỗ trợ",
  },
  {
    id: "A-003",
    name: "Lê Minh Phát Triển",
    avatar: "/placeholder.svg?height=40&width=40&text=LP",
    role: "Chuyên viên phát triển",
  },
]

// Dữ liệu mẫu cho mẫu phản hồi
const responseTemplates = [
  {
    id: "RT-1",
    title: "Chào mừng và xác nhận yêu cầu",
    content:
      "Chào bác sĩ, Cảm ơn bạn đã gửi yêu cầu hỗ trợ. Chúng tôi đã nhận được yêu cầu của bạn và sẽ phản hồi trong thời gian sớm nhất.",
  },
  {
    id: "RT-2",
    title: "Yêu cầu thêm thông tin",
    content:
      "Chào bác sĩ, Cảm ơn bạn đã gửi yêu cầu hỗ trợ. Để giúp chúng tôi giải quyết vấn đề nhanh hơn, vui lòng cung cấp thêm thông tin sau: [Thông tin cần cung cấp].",
  },
  {
    id: "RT-3",
    title: "Thông báo giải quyết xong",
    content:
      "Chào bác sĩ, Chúng tôi đã giải quyết xong yêu cầu hỗ trợ của bạn. Vui lòng kiểm tra và phản hồi nếu vấn đề vẫn chưa được giải quyết. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.",
  },
]

export default function AdminTicketDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [ticket, setTicket] = useState<Ticket>(ticketDetail)
  const [newMessage, setNewMessage] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [activeTab, setActiveTab] = useState("conversation")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [ticket.messages])

  // Xử lý gửi tin nhắn mới
  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: `M-${Date.now()}`,
      content: newMessage,
      createdAt: new Date().toISOString(),
      sender: {
        id: "A-001",
        name: "Trần Văn Support",
        avatar: "/placeholder.svg?height=40&width=40&text=TS",
        role: "admin",
      },
      attachments: [],
    }

    setTicket({
      ...ticket,
      messages: [...ticket.messages, message],
      updatedAt: new Date().toISOString(),
    })

    setNewMessage("")
    setAttachments([])
  }

  // Xử lý thay đổi trạng thái ticket
  const handleStatusChange = (status: string) => {
    setTicket({
      ...ticket,
      status: status as "open" | "in_progress" | "resolved",
      updatedAt: new Date().toISOString(),
    })
  }

  // Xử lý thay đổi mức độ ưu tiên
  const handlePriorityChange = (priority: string) => {
    setTicket({
      ...ticket,
      priority: priority as "low" | "medium" | "high",
      updatedAt: new Date().toISOString(),
    })
  }

  // Xử lý thay đổi người được phân công
  const handleAssigneeChange = (assigneeId: string) => {
    const assignee = supportTeam.find((member) => member.id === assigneeId)
    if (!assignee) return

    setTicket({
      ...ticket,
      assignee: {
        id: assignee.id,
        name: assignee.name,
        avatar: assignee.avatar,
        role: "admin",
      },
      updatedAt: new Date().toISOString(),
    })
  }

  // Xử lý tải lên tệp đính kèm
  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  // Xử lý chọn mẫu phản hồi
  const handleTemplateSelect = (templateId: string) => {
    const template = responseTemplates.find((t) => t.id === templateId)
    if (template) {
      setNewMessage(template.content)
    }
    setSelectedTemplate("")
  }

  // Định dạng trạng thái
  const statusConfig = {
    open: { label: "Đang mở", color: "bg-blue-100 text-blue-700" },
    in_progress: { label: "Đang xử lý", color: "bg-yellow-100 text-yellow-700" },
    resolved: { label: "Đã giải quyết", color: "bg-green-100 text-green-700" },
  }

  // Định dạng mức độ ưu tiên
  const priorityConfig = {
    low: { label: "Thấp", color: "bg-slate-100 text-slate-700" },
    medium: { label: "Trung bình", color: "bg-yellow-100 text-yellow-700" },
    high: { label: "Cao", color: "bg-red-100 text-red-700" },
  }

  // Định dạng loại yêu cầu
  const categoryConfig = {
    error: { label: "Lỗi", icon: <AlertCircle className="h-4 w-4 text-red-500" /> },
    question: { label: "Câu hỏi", icon: <HelpCircle className="h-4 w-4 text-blue-500" /> },
    feature: { label: "Tính năng", icon: <FileText className="h-4 w-4 text-green-500" /> },
  }

  const status = statusConfig[ticket.status]
  const priority = priorityConfig[ticket.priority]
  const category = categoryConfig[ticket.category as keyof typeof categoryConfig]

  return (
    <div className="container mx-auto my-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-800">Chi tiết yêu cầu hỗ trợ</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={priority.color}>{priority.label}</Badge>
          <Badge className={status.color}>{status.label}</Badge>
        </div>
      </div>

      {/* Thông tin chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột thông tin ticket */}
        <div className="space-y-6">
          {/* Thẻ thông tin ticket */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-teal-600" />
                Thông tin yêu cầu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-slate-800">{ticket.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    {category.icon}
                    <span className="text-sm">{category.label}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">
                      {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true, locale: vi })}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">ID:</span>
                  <span className="text-sm">{ticket.id}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Người tạo:</span>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={ticket.creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{ticket.creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{ticket.creator.name}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Ngày tạo:</span>
                  <span className="text-sm">{format(new Date(ticket.createdAt), "dd/MM/yyyy HH:mm")}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cập nhật:</span>
                  <span className="text-sm">{format(new Date(ticket.updatedAt), "dd/MM/yyyy HH:mm")}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div>
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select value={ticket.status} onValueChange={handleStatusChange}>
                    <SelectTrigger id="status" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Đang mở</SelectItem>
                      <SelectItem value="in_progress">Đang xử lý</SelectItem>
                      <SelectItem value="resolved">Đã giải quyết</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Mức độ ưu tiên</Label>
                  <Select value={ticket.priority} onValueChange={handlePriorityChange}>
                    <SelectTrigger id="priority" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Thấp</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="high">Cao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="assignee">Người xử lý</Label>
                  <Select value={ticket.assignee?.id || ""} onValueChange={handleAssigneeChange}>
                    <SelectTrigger id="assignee" className="mt-1">
                      <SelectValue placeholder="Chọn người xử lý" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportTeam.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{member.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thẻ thông tin người tạo */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-teal-600" />
                Thông tin người tạo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="h-16 w-16 mb-3">
                  <AvatarImage src={ticket.creator.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-slate-100 text-lg">{ticket.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold text-slate-800">{ticket.creator.name}</h3>
                <p className="text-sm text-slate-500">Bác sĩ</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm">doctor@example.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Số điện thoại:</span>
                  <span className="text-sm">0987654321</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Chuyên khoa:</span>
                  <span className="text-sm">Nội khoa tổng quát</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Yêu cầu đã tạo:</span>
                  <span className="text-sm">5 yêu cầu</span>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Nhắn tin
                </Button>
                <Button variant="default" size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700">
                  <FileText className="h-4 w-4 mr-1" />
                  Hồ sơ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cột chính - Tabs */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <Tabs defaultValue="conversation" value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <CardHeader className="pb-2">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="conversation">Cuộc hội thoại</TabsTrigger>
                  <TabsTrigger value="activity">Lịch sử hoạt động</TabsTrigger>
                  <TabsTrigger value="notes">Ghi chú nội bộ</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden pt-6">
                <TabsContent value="conversation" className="h-full mt-0">
                  <div className="h-[500px] overflow-y-auto pr-2 space-y-4">
                    {ticket.messages.map((message) => (
                      <div key={message.id} className="flex flex-col">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{message.sender.name}</span>
                                <Badge variant="outline" className="text-xs font-normal">
                                  {message.sender.role === "admin" ? "Hỗ trợ" : "Bác sĩ"}
                                </Badge>
                              </div>
                              <span className="text-xs text-slate-500">
                                {format(new Date(message.createdAt), "dd/MM/yyyy HH:mm")}
                              </span>
                            </div>
                            <p className="mt-1 text-slate-700">{message.content}</p>

                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment) => (
                                  <div key={attachment.id} className="rounded-md overflow-hidden border">
                                    {attachment.type.startsWith("image/") ? (
                                      <img
                                        src={attachment.url || "/placeholder.svg"}
                                        alt={attachment.name}
                                        className="max-w-full h-auto max-h-60 object-contain"
                                      />
                                    ) : (
                                      <div className="flex items-center gap-2 p-2 bg-slate-50">
                                        <FileText className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm">{attachment.name}</span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="h-full mt-0">
                  <div className="h-[500px] overflow-y-auto pr-2 space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <MessageSquare className="h-4 w-4 text-blue-700" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">BS. Nguyễn Văn A</span> đã tạo yêu cầu hỗ trợ
                          </p>
                          <p className="text-xs text-slate-500">
                            {format(new Date(ticket.createdAt), "dd/MM/yyyy HH:mm")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <UserPlus className="h-4 w-4 text-yellow-700" />
                        </div>
                        <div>
                          <p className="text-sm">
                            Yêu cầu được phân công cho <span className="font-medium">Trần Văn Support</span>
                          </p>
                          <p className="text-xs text-slate-500">
                            {format(
                              new Date(new Date(ticket.createdAt).getTime() + 10 * 60 * 1000),
                              "dd/MM/yyyy HH:mm",
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <MessageSquare className="h-4 w-4 text-green-700" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Trần Văn Support</span> đã phản hồi yêu cầu
                          </p>
                          <p className="text-xs text-slate-500">
                            {format(
                              new Date(new Date(ticket.createdAt).getTime() + 30 * 60 * 1000),
                              "dd/MM/yyyy HH:mm",
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-purple-700" />
                        </div>
                        <div>
                          <p className="text-sm">
                            Trạng thái yêu cầu được thay đổi từ <span className="font-medium">Đang mở</span> sang{" "}
                            <span className="font-medium">Đang xử lý</span>
                          </p>
                          <p className="text-xs text-slate-500">
                            {format(
                              new Date(new Date(ticket.createdAt).getTime() + 35 * 60 * 1000),
                              "dd/MM/yyyy HH:mm",
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <MessageSquare className="h-4 w-4 text-green-700" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">BS. Nguyễn Văn A</span> đã phản hồi yêu cầu
                          </p>
                          <p className="text-xs text-slate-500">
                            {format(
                              new Date(new Date(ticket.createdAt).getTime() + 60 * 60 * 1000),
                              "dd/MM/yyyy HH:mm",
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <MessageSquare className="h-4 w-4 text-green-700" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Trần Văn Support</span> đã phản hồi yêu cầu
                          </p>
                          <p className="text-xs text-slate-500">
                            {format(
                              new Date(new Date(ticket.createdAt).getTime() + 90 * 60 * 1000),
                              "dd/MM/yyyy HH:mm",
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="h-full mt-0">
                  <div className="h-[500px] overflow-y-auto pr-2 space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md bg-slate-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=40&width=40&text=TS" />
                              <AvatarFallback>TS</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">Trần Văn Support</span>
                          </div>
                          <span className="text-xs text-slate-500">
                            {format(
                              new Date(new Date(ticket.createdAt).getTime() + 15 * 60 * 1000),
                              "dd/MM/yyyy HH:mm",
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700">
                          Đây có vẻ là lỗi từ bản cập nhật mới nhất. Đã kiểm tra và xác nhận lỗi này xảy ra trên nhiều
                          tài khoản bác sĩ. Cần ưu tiên khắc phục.
                        </p>
                      </div>

                      <div className="p-4 border rounded-md bg-slate-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=40&width=40&text=LP" />
                              <AvatarFallback>LP</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">Lê Minh Phát Triển</span>
                          </div>
                          <span className="text-xs text-slate-500">
                            {format(
                              new Date(new Date(ticket.createdAt).getTime() + 45 * 60 * 1000),
                              "dd/MM/yyyy HH:mm",
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700">
                          Đã xác định nguyên nhân lỗi. Có vấn đề với API kê đơn thuốc. Đang khắc phục và dự kiến hoàn
                          thành trong 2 giờ tới.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Textarea placeholder="Thêm ghi chú nội bộ mới..." rows={3} />
                      <Button className="mt-2 bg-teal-600 hover:bg-teal-700">
                        <Send className="h-4 w-4 mr-1" />
                        Thêm ghi chú
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
            <CardFooter className="border-t pt-4">
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center">
                  <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Chọn mẫu phản hồi" />
                    </SelectTrigger>
                    <SelectContent>
                      {responseTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleStatusChange("resolved")}>
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Đánh dấu đã giải quyết
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <XCircle className="h-4 w-4 mr-1" />
                      Đóng yêu cầu
                    </Button>
                  </div>
                </div>

                <Textarea
                  placeholder="Nhập tin nhắn của bạn..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleFileUpload}>
                      <Paperclip className="h-4 w-4 mr-1" />
                      Đính kèm
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          setAttachments(Array.from(e.target.files))
                        }
                      }}
                    />
                    {attachments.length > 0 && (
                      <span className="text-xs text-slate-500">{attachments.length} tệp đã chọn</span>
                    )}
                  </div>
                  <Button onClick={handleSendMessage} className="bg-teal-600 hover:bg-teal-700">
                    <Send className="h-4 w-4 mr-1" />
                    Gửi
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
