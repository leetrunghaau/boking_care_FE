import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Clock, Coffee, Copy, Save, Trash } from "lucide-react"

export function ScheduleSettings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-teal-600" />
            Cài đặt lịch làm việc
          </CardTitle>
          <CardDescription>Thiết lập mặc định cho lịch làm việc của bạn</CardDescription>
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
                  size="sm"
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="default-duration">Thời gian khám mặc định</Label>
            <Select defaultValue="30">
              <SelectTrigger id="default-duration">
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
            <Label htmlFor="default-price">Giá khám mặc định (VNĐ)</Label>
            <Input id="default-price" type="number" defaultValue="300000" />
          </div>

          <div className="space-y-2">
            <Label>Giờ làm việc</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time" className="text-xs text-slate-500">
                  Bắt đầu
                </Label>
                <Select defaultValue="08:00">
                  <SelectTrigger id="start-time">
                    <SelectValue placeholder="Giờ bắt đầu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="07:00">07:00</SelectItem>
                    <SelectItem value="07:30">07:30</SelectItem>
                    <SelectItem value="08:00">08:00</SelectItem>
                    <SelectItem value="08:30">08:30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="end-time" className="text-xs text-slate-500">
                  Kết thúc
                </Label>
                <Select defaultValue="17:00">
                  <SelectTrigger id="end-time">
                    <SelectValue placeholder="Giờ kết thúc" />
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
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="break-time-default">Nghỉ trưa mặc định</Label>
              <Switch id="break-time-default" defaultChecked={true} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="break-start" className="text-xs text-slate-500">
                  Bắt đầu
                </Label>
                <Select defaultValue="11:30">
                  <SelectTrigger id="break-start">
                    <SelectValue placeholder="Giờ bắt đầu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="11:30">11:30</SelectItem>
                    <SelectItem value="12:00">12:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="break-end" className="text-xs text-slate-500">
                  Kết thúc
                </Label>
                <Select defaultValue="13:30">
                  <SelectTrigger id="break-end">
                    <SelectValue placeholder="Giờ kết thúc" />
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
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" size="sm">
            <Trash className="h-4 w-4 mr-1" />
            Đặt lại
          </Button>
          <Button variant="default" size="sm" className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-1" />
            Lưu cài đặt
          </Button>
        </CardFooter>
      </Card>

      <ScheduleTemplates />
    </div>
  )
}

function ScheduleTemplates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Coffee className="h-4 w-4 text-teal-600" />
          Mẫu lịch làm việc
        </CardTitle>
        <CardDescription>Tạo và quản lý các mẫu lịch làm việc</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 cursor-pointer">
            <div>
              <h4 className="font-medium">Lịch làm việc chuẩn</h4>
              <p className="text-sm text-slate-500">T2-T6, 8:00-17:00, Nghỉ trưa 11:30-13:30</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Áp dụng
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-500">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 cursor-pointer">
            <div>
              <h4 className="font-medium">Lịch làm việc cuối tuần</h4>
              <p className="text-sm text-slate-500">T7-CN, 8:00-16:00, Không nghỉ trưa</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Áp dụng
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-500">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 cursor-pointer">
            <div>
              <h4 className="font-medium">Lịch làm việc buổi sáng</h4>
              <p className="text-sm text-slate-500">T2-T6, 8:00-12:00</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Áp dụng
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-500">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          <span>+ Tạo mẫu lịch mới</span>
        </Button>
      </CardContent>
    </Card>
  )
}
