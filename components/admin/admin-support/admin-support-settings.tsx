"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Trash, Plus, Mail, MessageSquare, Bell, Clock } from "lucide-react"

export function AdminSupportSettings() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 w-full max-w-2xl">
        <TabsTrigger value="general">Cài đặt chung</TabsTrigger>
        <TabsTrigger value="templates">Mẫu phản hồi</TabsTrigger>
        <TabsTrigger value="notifications">Thông báo</TabsTrigger>
        <TabsTrigger value="automation">Tự động hóa</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt chung</CardTitle>
            <CardDescription>Quản lý các cài đặt chung cho hệ thống hỗ trợ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="support-email">Email hỗ trợ</Label>
              <Input id="support-email" defaultValue="support@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-phone">Số điện thoại hỗ trợ</Label>
              <Input id="support-phone" defaultValue="1900 1234" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="working-hours">Giờ làm việc</Label>
              <Input id="working-hours" defaultValue="8:00 - 17:00, Thứ Hai - Thứ Sáu" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-response-time">Thời gian phản hồi mặc định</Label>
              <Select defaultValue="24">
                <SelectTrigger id="default-response-time">
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 giờ</SelectItem>
                  <SelectItem value="4">4 giờ</SelectItem>
                  <SelectItem value="8">8 giờ</SelectItem>
                  <SelectItem value="24">24 giờ</SelectItem>
                  <SelectItem value="48">48 giờ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-assign">Tự động phân công yêu cầu</Label>
                <p className="text-sm text-slate-500">Tự động phân công yêu cầu cho nhân viên hỗ trợ</p>
              </div>
              <Switch id="auto-assign" defaultChecked />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <Trash className="h-4 w-4 mr-1" />
              Đặt lại
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Save className="h-4 w-4 mr-1" />
              Lưu thay đổi
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="templates" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Mẫu phản hồi</CardTitle>
            <CardDescription>Quản lý các mẫu phản hồi nhanh cho các yêu cầu thường gặp</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Chào mừng và xác nhận yêu cầu</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      Chỉnh sửa
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Chào [Tên bác sĩ], Cảm ơn bạn đã gửi yêu cầu hỗ trợ. Chúng tôi đã nhận được yêu cầu của bạn và sẽ phản
                  hồi trong thời gian sớm nhất. Mã yêu cầu của bạn là [ID].
                </p>
              </div>

              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Yêu cầu thêm thông tin</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      Chỉnh sửa
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Chào [Tên bác sĩ], Cảm ơn bạn đã gửi yêu cầu hỗ trợ. Để giúp chúng tôi giải quyết vấn đề nhanh hơn,
                  vui lòng cung cấp thêm thông tin sau: [Thông tin cần cung cấp].
                </p>
              </div>

              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Thông báo giải quyết xong</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      Chỉnh sửa
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Chào [Tên bác sĩ], Chúng tôi đã giải quyết xong yêu cầu hỗ trợ của bạn. Vui lòng kiểm tra và phản hồi
                  nếu vấn đề vẫn chưa được giải quyết. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-1" />
              Thêm mẫu mới
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt thông báo</CardTitle>
            <CardDescription>Quản lý cách thức gửi thông báo cho người dùng và nhân viên hỗ trợ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium">Thông báo cho bác sĩ</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <Label htmlFor="doctor-email">Thông báo qua email</Label>
                  </div>
                  <Switch id="doctor-email" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-slate-500" />
                    <Label htmlFor="doctor-push">Thông báo đẩy</Label>
                  </div>
                  <Switch id="doctor-push" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-slate-500" />
                    <Label htmlFor="doctor-sms">Thông báo qua SMS</Label>
                  </div>
                  <Switch id="doctor-sms" />
                </div>
              </div>

              <h3 className="font-medium pt-4">Thông báo cho nhân viên hỗ trợ</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <Label htmlFor="staff-email">Thông báo qua email</Label>
                  </div>
                  <Switch id="staff-email" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-slate-500" />
                    <Label htmlFor="staff-push">Thông báo đẩy</Label>
                  </div>
                  <Switch id="staff-push" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-slate-500" />
                    <Label htmlFor="staff-sms">Thông báo qua SMS</Label>
                  </div>
                  <Switch id="staff-sms" defaultChecked />
                </div>
              </div>

              <h3 className="font-medium pt-4">Tần suất thông báo</h3>
              <div className="space-y-2">
                <Label htmlFor="notification-frequency">Tần suất nhắc nhở</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Chọn tần suất" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Thời gian thực</SelectItem>
                    <SelectItem value="hourly">Hàng giờ</SelectItem>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="weekly">Hàng tuần</SelectItem>
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
      </TabsContent>

      <TabsContent value="automation" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Tự động hóa</CardTitle>
            <CardDescription>Thiết lập các quy tắc tự động hóa để xử lý yêu cầu hỗ trợ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Tự động phân loại yêu cầu</h3>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Tự động phân loại yêu cầu dựa trên từ khóa trong tiêu đề và nội dung
                </p>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Áp dụng ngay khi nhận được yêu cầu</span>
                </div>
              </div>

              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Tự động gửi email xác nhận</h3>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Tự động gửi email xác nhận khi nhận được yêu cầu hỗ trợ mới
                </p>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Áp dụng ngay khi nhận được yêu cầu</span>
                </div>
              </div>

              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Tự động đóng yêu cầu không hoạt động</h3>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Tự động đóng yêu cầu không có hoạt động trong một khoảng thời gian
                </p>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Áp dụng sau 7 ngày không hoạt động</span>
                </div>
              </div>

              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Tự động nhắc nhở yêu cầu chưa giải quyết</h3>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Tự động gửi nhắc nhở cho nhân viên hỗ trợ về các yêu cầu chưa giải quyết
                </p>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Áp dụng sau 24 giờ không có phản hồi</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-1" />
              Thêm quy tắc mới
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Save className="h-4 w-4 mr-1" />
              Lưu thay đổi
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
