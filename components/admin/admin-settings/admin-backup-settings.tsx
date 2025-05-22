"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Upload, Calendar, RotateCcw } from 'lucide-react'

export function AdminBackupSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sao lưu tự động</CardTitle>
          <CardDescription>
            Cài đặt lịch sao lưu tự động cho hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Kích hoạt sao lưu tự động</p>
                <p className="text-sm text-muted-foreground">
                  Tự động sao lưu dữ liệu theo lịch đã cài đặt
                </p>
              </div>
              <Switch id="auto-backup" defaultChecked />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Tần suất</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="backup-frequency">
                  <SelectValue placeholder="Chọn tần suất sao lưu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hàng giờ</SelectItem>
                  <SelectItem value="daily">Hàng ngày</SelectItem>
                  <SelectItem value="weekly">Hàng tuần</SelectItem>
                  <SelectItem value="monthly">Hàng tháng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-time">Thời gian</Label>
              <Input id="backup-time" type="time" defaultValue="02:00" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="backup-retention">Thời gian lưu trữ (ngày)</Label>
              <Input id="backup-retention" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-storage">Nơi lưu trữ</Label>
              <Select defaultValue="cloud">
                <SelectTrigger id="backup-storage">
                  <SelectValue placeholder="Chọn nơi lưu trữ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Máy chủ cục bộ</SelectItem>
                  <SelectItem value="cloud">Cloud Storage</SelectItem>
                  <SelectItem value="both">Cả hai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sao lưu thủ công</CardTitle>
          <CardDescription>
            Tạo và quản lý bản sao lưu thủ công
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backup-type">Loại sao lưu</Label>
            <Select defaultValue="full">
              <SelectTrigger id="backup-type">
                <SelectValue placeholder="Chọn loại sao lưu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Toàn bộ dữ liệu</SelectItem>
                <SelectItem value="database">Chỉ cơ sở dữ liệu</SelectItem>
                <SelectItem value="files">Chỉ tệp tin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">

            <Label htmlFor="backup-name">Tên bản sao lưu</Label>
            <Input id="backup-name" placeholder="Nhập tên bản sao lưu" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row md:justify-between gap-4">
          <Button variant="default" className="w-full md:w-auto">
            <Upload className="mr-2 h-4 w-4" />
            Tạo bản sao lưu
          </Button>
          <Button variant="secondary" className="w-full md:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Tải bản sao lưu
          </Button>
          <Button variant="outline" className="w-full md:w-auto">
            <RotateCcw className="mr-2 h-4 w-4" />
            Khôi phục dữ liệu
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
