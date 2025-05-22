"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminEmailSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cấu hình SMTP</CardTitle>
          <CardDescription>
            Cài đặt máy chủ SMTP để gửi email từ hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">Máy chủ SMTP</Label>
              <Input id="smtp-host" defaultValue="smtp.example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">Cổng SMTP</Label>
              <Input id="smtp-port" defaultValue="587" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtp-username">Tên đăng nhập</Label>
              <Input id="smtp-username" defaultValue="noreply@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-password">Mật khẩu</Label>
              <Input id="smtp-password" type="password" defaultValue="********" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtp-encryption">Mã hóa</Label>
              <Select defaultValue="tls">
                <SelectTrigger id="smtp-encryption">
                  <SelectValue placeholder="Chọn loại mã hóa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tls">TLS</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="none">Không mã hóa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-email">Email người gửi</Label>
              <Input id="from-email" defaultValue="noreply@example.com" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline">Kiểm tra kết nối</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mẫu email</CardTitle>
          <CardDescription>
            Cài đặt mẫu email gửi cho người dùng
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-template">Loại mẫu email</Label>
            <Select defaultValue="appointment-confirmation">
              <SelectTrigger id="email-template">
                <SelectValue placeholder="Chọn mẫu email" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="appointment-confirmation">Xác nhận lịch hẹn</SelectItem>
                <SelectItem value="appointment-reminder">Nhắc nhở lịch hẹn</SelectItem>
                <SelectItem value="appointment-cancellation">Hủy lịch hẹn</SelectItem>
                <SelectItem value="welcome">Chào mừng người dùng mới</SelectItem>
                <SelectItem value="password-reset">Đặt lại mật khẩu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-subject">Tiêu đề</Label>
            <Input id="email-subject" defaultValue="Xác nhận lịch hẹn của bạn" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-content">Nội dung</Label>
            <Textarea
              id="email-content"
              rows={10}
              defaultValue={`Kính gửi {patient_name},

Chúng tôi xác nhận lịch hẹn của bạn đã được đặt thành công:

- Bác sĩ: {doctor_name}
- Ngày: {appointment_date}
- Giờ: {appointment_time}
- Địa điểm: {clinic_name}

Vui lòng đến trước 15 phút để hoàn tất thủ tục.

Nếu bạn cần thay đổi hoặc hủy lịch hẹn, vui lòng liên hệ với chúng tôi qua số điện thoại {support_phone} hoặc email {support_email}.

Trân trọng,
{clinic_name}`}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-active">Kích hoạt</Label>
              <Switch id="email-active" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}