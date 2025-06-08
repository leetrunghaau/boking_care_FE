// 👇 imports vẫn giữ nguyên
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Clock, Coffee, Copy, Save, Trash } from "lucide-react"
import http from "@/helper/axios"
import { Textarea } from "@/components/ui/textarea" // 👈 đảm bảo có Textarea
import { toast } from '@/hooks/use-toast';
import { handleApiSuccess } from "@/helper/toast-utils"

export function ScheduleSettings() {
  const [settings, setSettings] = useState({
    id: null,
    workingDays: ["T2", "T3", "T4", "T5", "T6"],
    appointmentDuration: 30,
    appointmentPrice: 0,
    startTime: "07:00",
    endTime: "17:00",
    hasLunchBreak: true,
    lunchStart: "11:00",
    lunchEnd: "13:30",
    notes: ""
  })
  const [template, setTeamplate] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleWorkingDay = (day: string) => {
    setSettings(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }))
  }

  const handleChange = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await http.post<any | null>(`/doctor-schedule/setting`, settings)
      if (res) {
        setSettings(res)
      }
      handleApiSuccess("Bạn đã lưu lịch biểu thành công.");
    } catch (err) {
      console.error("Lỗi khi tải chi tiết lịch:", err)
      setError("Không thể tải thông tin lịch làm việc. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  const handleNew = async () => {
    setSettings({
      id: null,
      workingDays: ["T2", "T3", "T4", "T5", "T6"],
      appointmentDuration: 30,
      appointmentPrice: 0,
      startTime: "07:00",
      endTime: "17:00",
      hasLunchBreak: true,
      lunchStart: "11:00",
      lunchEnd: "13:30",
      notes: ""
    })


  }


  const handleLoad = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await http.get<any>(`/doctor-schedule/setting`)
      console.log("Cài đặt lịch làm việc đã được tải:", res)
      if (res) {
        setSettings(res)
      }
      const temp = await http.get<any>(`/doctor-schedule/templates`)
      if (res) {
        setTeamplate(temp)
      }
    } catch (err) {
      console.error("Lỗi khi tải chi tiết lịch:", err)
      setError("Không thể tải thông tin lịch làm việc. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }
  const handleApply = async (id: number) => {
    setLoading(true)
    setError(null)

    try {
      const res = await http.post<any>(`/doctor-schedule/apply`, { id: id })
      console.log("Cài đặt lịch làm việc đã được tải:", res)
      if (res) {
        setSettings(res.mainSchedule)
        setTeamplate(res.templates)
        handleApiSuccess("Bạn đã áp dụng lịch biểu thành công.");
      }

    } catch (err) {
      console.error("Lỗi khi tải chi tiết lịch:", err)
      setError("Không thể tải thông tin lịch làm việc. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleLoad()
  }, [])
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
            {template.map((i: any, index: number) => (
              <div
                key={i.id || index}
                className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 cursor-pointer"
              >
                <div>
                  <h4 className="font-medium">{i.title}</h4>
                  <p className="text-sm text-slate-500">{i.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={()=>handleApply(i.id)}>
                    Áp dụng
                  </Button>
                </div>
              </div>
            ))}



          </div>

          <Button variant="outline" className="w-full" onClick={() => handleNew()}>
            <span>+ Tạo mẫu lịch mới</span>
          </Button>
        </CardContent>
      </Card>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-teal-600" />
              Cài đặt lịch làm việc
            </CardTitle>
            <CardDescription>Thiết lập mặc định cho lịch làm việc của bạn</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNew()}
          >
            + Tạo mới
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Ngày làm việc trong tuần */}
          <div className="space-y-2">
            <Label>Ngày làm việc trong tuần</Label>
            <div className="flex flex-wrap gap-2">
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => {
                const isActive = settings.workingDays.includes(day)
                return (
                  <Button
                    key={index}
                    variant={isActive ? "default" : "outline"}
                    className={isActive ? "bg-teal-600 hover:bg-teal-700" : ""}
                    size="sm"
                    onClick={() => toggleWorkingDay(day)}
                  >
                    {day}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Thời gian khám mặc định */}
          <div className="space-y-2">
            <Label htmlFor="appointment-duration">Thời gian khám mặc định</Label>
            <Select value={settings.appointmentDuration.toString()} onValueChange={(val) => handleChange("appointmentDuration", parseInt(val))}>
              <SelectTrigger id="appointment-duration">
                <SelectValue placeholder="Chọn thời gian khám" />
              </SelectTrigger>
              <SelectContent>
                {["15", "30", "45", "60"].map(value => (
                  <SelectItem key={value} value={value}>
                    {value} phút
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Giá khám mặc định */}
          <div className="space-y-2">
            <Label htmlFor="appointment-price">Giá khám mặc định (VNĐ)</Label>
            <Input
              id="appointment-price"
              type="number"
              placeholder="Nhập giá khám mặc định"
              value={settings.appointmentPrice}
              onChange={e => handleChange("appointmentPrice", e.target.value)}
            />
          </div>

          {/* Giờ làm việc */}
          <div className="space-y-2">
            <Label>Giờ làm việc</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time" className="text-xs text-slate-500">Bắt đầu</Label>
                <Select value={settings.startTime} onValueChange={val => handleChange("startTime", val)}>
                  <SelectTrigger id="start-time"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["07:00", "07:30", "08:00", "08:30"].map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="end-time" className="text-xs text-slate-500">Kết thúc</Label>
                <Select value={settings.endTime} onValueChange={val => handleChange("endTime", val)}>
                  <SelectTrigger id="end-time"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["16:00", "16:30", "17:00", "17:30", "18:00"].map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Nghỉ trưa */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="has-lunch-break">Nghỉ trưa</Label>
              <Switch
                id="has-lunch-break"
                checked={settings.hasLunchBreak}
                onCheckedChange={val => handleChange("hasLunchBreak", val)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lunch-start" className="text-xs text-slate-500">Bắt đầu</Label>
                <Select value={settings.lunchStart} onValueChange={val => handleChange("lunchStart", val)}>
                  <SelectTrigger id="lunch-start"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["11:00", "11:30", "12:00"].map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="lunch-end" className="text-xs text-slate-500">Kết thúc</Label>
                <Select value={settings.lunchEnd} onValueChange={val => handleChange("lunchEnd", val)}>
                  <SelectTrigger id="lunch-end"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["13:00", "13:30", "14:00"].map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Ghi chú */}
          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú</Label>
            <Textarea
              id="notes"
              value={settings.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Nhập ghi chú cho lịch làm việc..."
              className="resize-none"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" size="sm" onClick={() => {
            handleLoad()
          }}>
            <Trash className="h-4 w-4 mr-1" />
            Đặt lại
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-teal-600 hover:bg-teal-700"
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-1" />
            Lưu cài đặt
          </Button>
        </CardFooter>
      </Card>
      <ScheduleTemplates />
    </div>
  )
}

