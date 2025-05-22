"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminSecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt mật khẩu</CardTitle>
          <CardDescription>
            Cài đặt chính sách mật khẩu cho người dùng
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="min-password-length">Độ dài tối thiểu</Label>
              <Input id="min-password-length" type="number" defaultValue="8" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-expiry">Thời gian hết hạn (ngày)</Label>
              <Input id="password-expiry" type="number" defaultValue="90" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Yêu cầu chữ hoa</p>
                <p className="text-sm text-muted-foreground">
                  Mật khẩu phải chứa ít nhất một chữ cái viết hoa
                </p>
              </div>
              <Switch id="require-uppercase" defaultChecked />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Yêu cầu số</p>
                <p className="text-sm text-muted-foreground">
                  Mật khẩu phải chứa ít nhất một chữ số
                </p>
              </div>
              <Switch id="require-number" defaultChecked />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Yêu cầu ký tự đặc biệt</p>
                <p className="text-sm text-muted-foreground">
                  Mật khẩu phải chứa ít nhất một ký tự đặc biệt
                </p>
              </div>
              <Switch id="require-special" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Xác thực hai yếu tố (2FA)</CardTitle>
          <CardDescription>
            Cài đặt xác thực hai yếu tố cho tài khoản admin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Bắt buộc 2FA cho admin</p>
                <p className="text-sm text-muted-foreground">
                  Yêu cầu tất cả tài khoản admin phải bật 2FA
                </p>
              </div>
              <Switch id="require-2fa" defaultChecked />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="2fa-method">Phương thức 2FA</Label>
            <Select defaultValue="app">
              <SelectTrigger id="2fa-method">
                <SelectValue placeholder="Chọn phương thức 2FA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app">Ứng dụng xác thực (Google Authenticator)</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Giới hạn đăng nhập</CardTitle>
          <CardDescription>
            Cài đặt giới hạn đăng nhập để bảo vệ tài khoản
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="max-login-attempts">Số lần thử tối đa</Label>
              <Input id="max-login-attempts" type="number" defaultValue="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lockout-duration">Thời gian khóa (phút)</Label>
              <Input id="lockout-duration" type="number" defaultValue="30" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo đăng nhập bất thường</p>
                <p className="text-sm text-muted-foreground">
                  Gửi email thông báo khi phát hiện đăng nhập từ thiết bị lạ
                </p>
              </div>
              <Switch id="notify-unusual-login" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}