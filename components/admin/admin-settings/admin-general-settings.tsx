"use client"

import { useState } from "react"
import { Upload } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminGeneralSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin hệ thống</CardTitle>
          <CardDescription>
            Cài đặt thông tin cơ bản của hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="site-name">Tên hệ thống</Label>
              <Input id="site-name" defaultValue="Doctor Schedule Manager" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-url">URL hệ thống</Label>
              <Input id="site-url" defaultValue="https://doctor-schedule.example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="site-description">Mô tả</Label>
            <Textarea
              id="site-description"
              defaultValue="Hệ thống quản lý lịch hẹn và đặt khám bác sĩ trực tuyến"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site-logo">Logo</Label>
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg?height=60&width=60"
                alt="Logo"
                className="h-16 w-16 rounded-md border"
              />
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Tải lên
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cài đặt khu vực</CardTitle>
          <CardDescription>
            Cài đặt ngôn ngữ, múi giờ và định dạng
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="language">Ngôn ngữ</Label>
              <Select defaultValue="vi">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Chọn ngôn ngữ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Múi giờ</Label>
              <Select defaultValue="asia-ho_chi_minh">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Chọn múi giờ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-ho_chi_minh">Asia/Ho_Chi_Minh (GMT+7)</SelectItem>
                  <SelectItem value="asia-bangkok">Asia/Bangkok (GMT+7)</SelectItem>
                  <SelectItem value="asia-singapore">Asia/Singapore (GMT+8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date-format">Định dạng ngày</Label>
              <Select defaultValue="dd-mm-yyyy">
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="Chọn định dạng ngày" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                  <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-format">Định dạng giờ</Label>
              <Select defaultValue="24h">
                <SelectTrigger id="time-format">
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
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chế độ bảo trì</CardTitle>
          <CardDescription>
            Bật/tắt chế độ bảo trì hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Chế độ bảo trì</p>
              <p className="text-sm text-muted-foreground">
                Khi bật, người dùng sẽ thấy thông báo bảo trì và không thể truy cập hệ thống
              </p>
            </div>
            <Switch
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
            />
          </div>
          {maintenanceMode && (
            <div className="space-y-2">
              <Label htmlFor="maintenance-message">Thông báo bảo trì</Label>
              <Textarea
                id="maintenance-message"
                defaultValue="Hệ thống đang được bảo trì. Vui lòng quay lại sau."
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}