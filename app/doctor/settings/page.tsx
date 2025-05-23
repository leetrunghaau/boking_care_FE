"use client";
// React core and hooks
import { useState } from "react";

// UI components - Data display
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Icons
import {
  Bell,
  Calendar,
  Eye,
  EyeOff,
  Globe,
  Key,
  Lock,
  LogOut,
  Moon,
  Save,
  Settings,
  Smartphone,
  Sun,
  User,
} from "lucide-react";

// Doctor components
import { DoctorHeader } from "@/components/doctor/doctor-schedule/doctor-header";

export default function DoctorSettingsPage() {
  //State
  const [activeTab, setActiveTab] = useState("account");

  // Thông tin bác sĩ
  const doctorInfo = {
    doctorId: "D-123456",
    doctorName: "BS. Nguyễn Văn A",
    specialty: "Nội khoa tổng quát",
    stats: {
      total: 120,
      booked: 15,
      completed: 105,
    },
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header với thông tin bác sĩ và thống kê */}
      <DoctorHeader
        doctorId={doctorInfo.doctorId}
        doctorName={doctorInfo.doctorName}
        specialty={doctorInfo.specialty}
        stats={doctorInfo.stats}
      />

      {/* Tiêu đề trang */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Cài đặt
        </h1>
      </div>

      {/* Tabs cài đặt */}
      <Tabs
        defaultValue="account"
        value={activeTab}
        onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <Card className="md:w-64">
            <CardContent className="p-4">
              <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                <TabsTrigger
                  value="account"
                  className="justify-start px-3 data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">
                  <User className="h-4 w-4 mr-2" />
                  Tài khoản
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="justify-start px-3 data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">
                  <Lock className="h-4 w-4 mr-2" />
                  Bảo mật
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="justify-start px-3 data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">
                  <Bell className="h-4 w-4 mr-2" />
                  Thông báo
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="justify-start px-3 data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">
                  <Calendar className="h-4 w-4 mr-2" />
                  Lịch làm việc
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="justify-start px-3 data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">
                  <Settings className="h-4 w-4 mr-2" />
                  Giao diện
                </TabsTrigger>

                <Separator className="my-2" />

                <Button
                  variant="ghost"
                  className="justify-start px-3 text-red-500 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </Button>
              </TabsList>
            </CardContent>
          </Card>

          {/* Nội dung tab */}
          <div className="flex-1">
            <TabsContent value="account" className="m-0">
              <AccountSettings />
            </TabsContent>

            <TabsContent value="security" className="m-0">
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="notifications" className="m-0">
              <NotificationSettings />
            </TabsContent>

            <TabsContent value="schedule" className="m-0">
              <ScheduleSettings />
            </TabsContent>

            <TabsContent value="appearance" className="m-0">
              <AppearanceSettings />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

function AccountSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin tài khoản</CardTitle>
          <CardDescription>
            Cập nhật thông tin tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input id="fullName" defaultValue="Nguyễn Văn A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input id="username" defaultValue="nguyenvana" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="nguyenvana@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" defaultValue="0987654321" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="specialty">Chuyên khoa</Label>
              <Input id="specialty" defaultValue="Nội khoa tổng quát" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Giới thiệu</Label>
              <Input
                id="bio"
                defaultValue="Bác sĩ chuyên khoa Nội tổng quát với hơn 15 năm kinh nghiệm."
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-1" />
            Lưu thay đổi
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ngôn ngữ và khu vực</CardTitle>
          <CardDescription>Cài đặt ngôn ngữ và khu vực của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Ngôn ngữ</Label>
              <Select defaultValue="vi">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Chọn ngôn ngữ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">Tiếng Anh</SelectItem>
                  <SelectItem value="fr">Tiếng Pháp</SelectItem>
                  <SelectItem value="zh">Tiếng Trung</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Múi giờ</Label>
              <Select defaultValue="asia_ho_chi_minh">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Chọn múi giờ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia_ho_chi_minh">
                    Asia/Ho_Chi_Minh (GMT+7)
                  </SelectItem>
                  <SelectItem value="asia_bangkok">
                    Asia/Bangkok (GMT+7)
                  </SelectItem>
                  <SelectItem value="asia_singapore">
                    Asia/Singapore (GMT+8)
                  </SelectItem>
                  <SelectItem value="asia_tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFormat">Định dạng ngày</Label>
              <Select defaultValue="dd/mm/yyyy">
                <SelectTrigger id="dateFormat">
                  <SelectValue placeholder="Chọn định dạng ngày" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy/mm/dd">YYYY/MM/DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeFormat">Định dạng giờ</Label>
              <Select defaultValue="24h">
                <SelectTrigger id="timeFormat">
                  <SelectValue placeholder="Chọn định dạng giờ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 giờ</SelectItem>
                  <SelectItem value="12h">12 giờ (AM/PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-1" />
            Lưu thay đổi
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Đổi mật khẩu</CardTitle>
          <CardDescription>
            Cập nhật mật khẩu của bạn để bảo mật tài khoản
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
            <div className="relative">
              <Input id="currentPassword" type="password" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <div className="relative">
              <Input id="newPassword" type="password" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full">
                <EyeOff className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
            <div className="relative">
              <Input id="confirmPassword" type="password" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full">
                <EyeOff className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Key className="h-4 w-4 mr-1" />
            Cập nhật mật khẩu
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Xác thực hai yếu tố</CardTitle>
          <CardDescription>
            Tăng cường bảo mật cho tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa">Xác thực hai yếu tố</Label>
              <p className="text-sm text-slate-500">
                Bảo vệ tài khoản của bạn bằng xác thực hai yếu tố.
              </p>
            </div>
            <Switch id="2fa" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms">Xác thực qua SMS</Label>
              <p className="text-sm text-slate-500">
                Nhận mã xác thực qua tin nhắn SMS.
              </p>
            </div>
            <Switch id="sms" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="app">Xác thực qua ứng dụng</Label>
              <p className="text-sm text-slate-500">
                Sử dụng ứng dụng xác thực như Google Authenticator.
              </p>
            </div>
            <Switch id="app" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-1" />
            Lưu thay đổi
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phiên đăng nhập</CardTitle>
          <CardDescription>Quản lý các phiên đăng nhập của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="p-3 border rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Smartphone className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <p className="font-medium">iPhone 13 Pro - Safari</p>
                    <p className="text-xs text-slate-500">
                      Hà Nội, Việt Nam - Hiện tại
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">Hiện tại</Badge>
              </div>
            </div>

            <div className="p-3 border rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <Globe className="h-4 w-4 text-slate-700" />
                  </div>
                  <div>
                    <p className="font-medium">Windows 10 - Chrome</p>
                    <p className="text-xs text-slate-500">
                      Hà Nội, Việt Nam - 2 ngày trước
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Đăng xuất
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="outline"
            className="text-red-500 hover:text-red-700 hover:bg-red-50">
            Đăng xuất khỏi tất cả các thiết bị
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt thông báo</CardTitle>
          <CardDescription>Quản lý cách bạn nhận thông báo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Thông báo lịch hẹn</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appointment-email">Thông báo qua email</Label>
                  <p className="text-sm text-slate-500">
                    Nhận thông báo về lịch hẹn qua email.
                  </p>
                </div>
                <Switch id="appointment-email" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appointment-push">Thông báo đẩy</Label>
                  <p className="text-sm text-slate-500">
                    Nhận thông báo đẩy về lịch hẹn.
                  </p>
                </div>
                <Switch id="appointment-push" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appointment-sms">Thông báo qua SMS</Label>
                  <p className="text-sm text-slate-500">
                    Nhận thông báo về lịch hẹn qua SMS.
                  </p>
                </div>
                <Switch id="appointment-sms" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Thông báo tin nhắn</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="message-email">Thông báo qua email</Label>
                  <p className="text-sm text-slate-500">
                    Nhận thông báo về tin nhắn mới qua email.
                  </p>
                </div>
                <Switch id="message-email" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="message-push">Thông báo đẩy</Label>
                  <p className="text-sm text-slate-500">
                    Nhận thông báo đẩy về tin nhắn mới.
                  </p>
                </div>
                <Switch id="message-push" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="message-sms">Thông báo qua SMS</Label>
                  <p className="text-sm text-slate-500">
                    Nhận thông báo về tin nhắn mới qua SMS.
                  </p>
                </div>
                <Switch id="message-sms" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Thông báo đánh giá</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="review-email">Thông báo qua email</Label>
                  <p className="text-sm text-slate-500">
                    Nhận thông báo về đánh giá mới qua email.
                  </p>
                </div>
                <Switch id="review-email" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="review-push">Thông báo đẩy</Label>
                  <p className="text-sm text-slate-500">
                    Nhận thông báo đẩy về đánh giá mới.
                  </p>
                </div>
                <Switch id="review-push" defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Thông báo hệ thống</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-email">Thông báo qua email</Label>
                  <p className="text-sm text-slate-500">
                    Nhận thông báo về cập nhật hệ thống qua email.
                  </p>
                </div>
                <Switch id="system-email" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-push">Thông báo đẩy</Label>
                  <p className="text-sm text-slate-500">
                    Nhận thông báo đẩy về cập nhật hệ thống.
                  </p>
                </div>
                <Switch id="system-push" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-1" />
            Lưu thay đổi
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function ScheduleSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt lịch làm việc</CardTitle>
          <CardDescription>Quản lý lịch làm việc của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Ngày làm việc trong tuần</Label>
            <div className="flex flex-wrap gap-2">
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => (
                <Button
                  key={index}
                  variant={index < 6 ? "default" : "outline"}
                  className={index < 6 ? "bg-teal-600 hover:bg-teal-700" : ""}
                  size="sm">
                  {day}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Giờ bắt đầu</Label>
              <Select defaultValue="08:00">
                <SelectTrigger id="start-time">
                  <SelectValue placeholder="Chọn giờ bắt đầu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="07:00">07:00</SelectItem>
                  <SelectItem value="07:30">07:30</SelectItem>
                  <SelectItem value="08:00">08:00</SelectItem>
                  <SelectItem value="08:30">08:30</SelectItem>
                  <SelectItem value="09:00">09:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">Giờ kết thúc</Label>
              <Select defaultValue="17:00">
                <SelectTrigger id="end-time">
                  <SelectValue placeholder="Chọn giờ kết thúc" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16:00">16:00</SelectItem>
                  <SelectItem value="16:30">16:30</SelectItem>
                  <SelectItem value="17:00">17:00</SelectItem>
                  <SelectItem value="17:30">17:30</SelectItem>
                  <SelectItem value="18:00">18:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="break-time">Nghỉ trưa</Label>
              <Switch id="break-time" defaultChecked />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="break-start">Giờ bắt đầu nghỉ</Label>
                <Select defaultValue="11:30">
                  <SelectTrigger id="break-start">
                    <SelectValue placeholder="Chọn giờ bắt đầu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="11:30">11:30</SelectItem>
                    <SelectItem value="12:00">12:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="break-end">Giờ kết thúc nghỉ</Label>
                <Select defaultValue="13:30">
                  <SelectTrigger id="break-end">
                    <SelectValue placeholder="Chọn giờ kết thúc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="13:00">13:00</SelectItem>
                    <SelectItem value="13:30">13:30</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointment-duration">
              Thời gian khám mặc định
            </Label>
            <Select defaultValue="30">
              <SelectTrigger id="appointment-duration">
                <SelectValue placeholder="Chọn thời gian khám" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 phút</SelectItem>
                <SelectItem value="30">30 phút</SelectItem>
                <SelectItem value="45">45 phút</SelectItem>
                <SelectItem value="60">60 phút</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="buffer-time">Thời gian đệm giữa các lịch hẹn</Label>
            <Select defaultValue="5">
              <SelectTrigger id="buffer-time">
                <SelectValue placeholder="Chọn thời gian đệm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 phút</SelectItem>
                <SelectItem value="5">5 phút</SelectItem>
                <SelectItem value="10">10 phút</SelectItem>
                <SelectItem value="15">15 phút</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-appointments">
              Số lượng lịch hẹn tối đa mỗi ngày
            </Label>
            <Input id="max-appointments" type="number" defaultValue="15" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-confirm">Tự động xác nhận lịch hẹn</Label>
              <p className="text-sm text-slate-500">
                Tự động xác nhận lịch hẹn khi bệnh nhân đặt lịch.
              </p>
            </div>
            <Switch id="auto-confirm" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-1" />
            Lưu thay đổi
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Giao diện</CardTitle>
          <CardDescription>Tùy chỉnh giao diện người dùng</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Chế độ hiển thị</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-24 p-4">
                <Sun className="h-8 w-8 mb-2" />
                <span>Sáng</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-24 p-4">
                <Moon className="h-8 w-8 mb-2" />
                <span>Tối</span>
              </Button>
              <Button
                variant="default"
                className="flex flex-col items-center justify-center h-24 p-4 bg-teal-600 hover:bg-teal-700">
                <div className="flex">
                  <Sun className="h-8 w-8" />
                  <Moon className="h-8 w-8" />
                </div>
                <span className="mt-2">Hệ thống</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-size">Cỡ chữ</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="font-size">
                <SelectValue placeholder="Chọn cỡ chữ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Nhỏ</SelectItem>
                <SelectItem value="medium">Vừa</SelectItem>
                <SelectItem value="large">Lớn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color-scheme">Màu sắc chủ đạo</Label>
            <Select defaultValue="teal">
              <SelectTrigger id="color-scheme">
                <SelectValue placeholder="Chọn màu sắc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teal">Xanh lục lam</SelectItem>
                <SelectItem value="blue">Xanh dương</SelectItem>
                <SelectItem value="purple">Tím</SelectItem>
                <SelectItem value="green">Xanh lá</SelectItem>
                <SelectItem value="red">Đỏ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="animations">Hiệu ứng chuyển động</Label>
              <p className="text-sm text-slate-500">
                Bật/tắt hiệu ứng chuyển động trong giao diện.
              </p>
            </div>
            <Switch id="animations" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compact-view">Chế độ xem gọn</Label>
              <p className="text-sm text-slate-500">
                Hiển thị nhiều thông tin hơn trên một màn hình.
              </p>
            </div>
            <Switch id="compact-view" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-1" />
            Lưu thay đổi
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
