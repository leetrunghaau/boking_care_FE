"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminPaymentSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt thanh toán chung</CardTitle>
          <CardDescription>
            Cài đặt chung cho hệ thống thanh toán
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currency">Đơn vị tiền tệ</Label>
              <Select defaultValue="vnd">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Chọn đơn vị tiền tệ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vnd">VND - Việt Nam Đồng</SelectItem>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Thuế VAT (%)</Label>
              <Input id="tax-rate" defaultValue="10" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Xuất hóa đơn tự động</p>
                <p className="text-sm text-muted-foreground">
                  Tự động xuất hóa đơn sau khi thanh toán thành công
                </p>
              </div>
              <Switch id="auto-invoice" defaultChecked />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Gửi email hóa đơn</p>
                <p className="text-sm text-muted-foreground">
                  Tự động gửi email hóa đơn cho người dùng
                </p>
              </div>
              <Switch id="email-invoice" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>VNPAY</CardTitle>
          <CardDescription>
            Cài đặt cổng thanh toán VNPAY
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Kích hoạt VNPAY</p>
                <p className="text-sm text-muted-foreground">
                  Cho phép thanh toán qua VNPAY
                </p>
              </div>
              <Switch id="vnpay-active" defaultChecked />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vnpay-merchant-id">Mã đơn vị (Terminal ID)</Label>
              <Input id="vnpay-merchant-id" defaultValue="VNPAY123456" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vnpay-secret-key">Khóa bí mật</Label>
              <Input id="vnpay-secret-key" type="password" defaultValue="********" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vnpay-return-url">URL callback</Label>
            <Input id="vnpay-return-url" defaultValue="https://doctor-schedule.example.com/api/payment/vnpay/callback" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>MoMo</CardTitle>
          <CardDescription>
            Cài đặt cổng thanh toán MoMo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Kích hoạt MoMo</p>
                <p className="text-sm text-muted-foreground">
                  Cho phép thanh toán qua MoMo
                </p>
              </div>
              <Switch id="momo-active" defaultChecked />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="momo-partner-code">Partner Code</Label>
              <Input id="momo-partner-code" defaultValue="MOMO123456" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="momo-access-key">Access Key</Label>
              <Input id="momo-access-key" defaultValue="abcdef123456" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="momo-secret-key">Secret Key</Label>
              <Input id="momo-secret-key" type="password" defaultValue="********" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="momo-environment">Môi trường</Label>
              <Select defaultValue="production">
                <SelectTrigger id="momo-environment">
                  <SelectValue placeholder="Chọn môi trường" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sandbox">Sandbox (Test)</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="momo-return-url">URL callback</Label>
            <Input id="momo-return-url" defaultValue="https://doctor-schedule.example.com/api/payment/momo/callback" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}