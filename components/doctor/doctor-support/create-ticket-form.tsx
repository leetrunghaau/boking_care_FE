"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, FileText, HelpCircle, Paperclip, Send } from "lucide-react"
import type { Ticket } from "@/types/support"

interface CreateTicketFormProps {
  onSubmit: (ticket: Partial<Ticket>) => void
}

export function CreateTicketForm({ onSubmit }: CreateTicketFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("question")
  const [priority, setPriority] = useState("medium")
  const [attachments, setAttachments] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Xử lý tải lên tệp đính kèm
  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  // Xử lý gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description) {
      alert("Vui lòng nhập đầy đủ thông tin!")
      return
    }

    // Tạo ticket mới
    const newTicket: Partial<Ticket> = {
      title,
      description,
      category: category as "error" | "question" | "feature",
      priority: priority as "low" | "medium" | "high",
      messages: [
        {
          id: `M-${Date.now()}`,
          content: description,
          createdAt: new Date().toISOString(),
          sender: {
            id: "D-123",
            name: "BS. Nguyễn Văn A",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "doctor",
          },
          attachments: [],
        },
      ],
    }

    onSubmit(newTicket)

    // Reset form
    setTitle("")
    setDescription("")
    setCategory("question")
    setPriority("medium")
    setAttachments([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Send className="h-5 w-5 text-teal-600" />
          Tạo yêu cầu hỗ trợ mới
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              id="title"
              placeholder="Nhập tiêu đề ngắn gọn về vấn đề của bạn"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Loại yêu cầu</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="error" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span>Báo lỗi</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="question">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-blue-500" />
                      <span>Câu hỏi</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="feature">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      <span>Yêu cầu tính năng</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Mức độ ưu tiên</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Thấp</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="high">Cao</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả chi tiết</Label>
            <Textarea
              id="description"
              placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tệp đính kèm</Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={handleFileUpload}>
                <Paperclip className="h-4 w-4 mr-1" />
                Chọn tệp
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setAttachments(Array.from(e.target.files))
                  }
                }}
              />
              {attachments.length > 0 ? (
                <span className="text-sm text-slate-500">{attachments.length} tệp đã chọn</span>
              ) : (
                <span className="text-sm text-slate-500">Chưa có tệp nào được chọn</span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Hỗ trợ các định dạng: PNG, JPG, PDF, DOC, DOCX. Kích thước tối đa: 5MB.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
            <Send className="h-4 w-4 mr-1" />
            Gửi yêu cầu
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
