"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import http from "@/helper/axios"
import { handleApiSuccess, handleErorr } from "@/helper/toast-utils"

type OpeningHour = {
  weekend: number // 0 = Chủ nhật
  timeStart: number // phút trong ngày
  timeEnd: number // phút trong ngày
}

type Facility = {
  name: string
  description: string
  address: string
  phone: string
  license: string
  openingHours: OpeningHour[]
}

export default function NewFacilityPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const [facility, setFacility] = useState<Facility>({
    name: "",
    description: "",
    address: "",
    phone: "",
    license: "",
    openingHours: [
      {
        weekend: 1, // Thứ 2 mặc định
        timeStart: 480, // 8:00
        timeEnd: 1020, // 17:00
      },
    ],
  })

  const updateOpeningHour = (index: number, field: keyof OpeningHour, value: number) => {
    const updated = [...facility.openingHours]
    updated[index][field] = value
    setFacility({ ...facility, openingHours: updated })
  }

  const addOpeningHour = () => {
    setFacility({
      ...facility,
      openingHours: [...facility.openingHours, { weekend: 1, timeStart: 480, timeEnd: 1020 }],
    })
  }

  const removeOpeningHour = (index: number) => {
    const updated = facility.openingHours.filter((_, i) => i !== index)
    setFacility({ ...facility, openingHours: updated })
  }

  const timeStringToMinutes = (time: string): number => {
    const [h, m] = time.split(":").map(Number)
    return h * 60 + m
  }

  const minutesToTimeString = (minutes: number): string => {
    const h = Math.floor(minutes / 60).toString().padStart(2, "0")
    const m = (minutes % 60).toString().padStart(2, "0")
    return `${h}:${m}`
  }

  const handleSave = () => {
    const postData = async () => {
      
      setSaving(true)
      try {
        const rs = await http.post("/admin-hospital/hospital", facility)

        if (rs) {
          handleApiSuccess("Bạn đã tạo cơ sở y tế thành công")
          router.push("/admin/facilities") // hoặc route tùy bạn
        }
      } catch (e) {
        handleErorr("Tạo cơ sở y tế thất bại, vui lòng thử lại!")
      } finally {
        setSaving(false)
      }
    }
    postData()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Thêm cơ sở y tế mới</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Hủy
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-700">
            {saving ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
          <CardDescription>Thông tin chung về cơ sở y tế</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Tên cơ sở y tế <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={facility.name}
                onChange={(e) => setFacility({ ...facility, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Mô tả <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                rows={4}
                value={facility.description}
                onChange={(e) => setFacility({ ...facility, description: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                Địa chỉ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                value={facility.address}
                onChange={(e) => setFacility({ ...facility, address: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={facility.phone}
                  onChange={(e) => setFacility({ ...facility, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">
                  Giấy phép hoạt động <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="license"
                  value={facility.license}
                  onChange={(e) => setFacility({ ...facility, license: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Giờ làm việc <span className="text-red-500">*</span></Label>
              {facility.openingHours.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 items-end">
                  <div>
                    <Label>Thứ</Label>
                    <select
                      className="w-full border rounded px-2 py-1"
                      value={item.weekend}
                      onChange={(e) =>
                        updateOpeningHour(index, "weekend", parseInt(e.target.value))
                      }
                    >
                      {["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"].map(
                        (day, i) => (
                          <option key={i} value={i}>
                            {day}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <Label>Giờ bắt đầu</Label>
                    <Input
                      type="time"
                      value={minutesToTimeString(item.timeStart)}
                      onChange={(e) =>
                        updateOpeningHour(index, "timeStart", timeStringToMinutes(e.target.value))
                      }
                    />
                  </div>

                  <div>
                    <Label>Giờ kết thúc</Label>
                    <Input
                      type="time"
                      value={minutesToTimeString(item.timeEnd)}
                      onChange={(e) =>
                        updateOpeningHour(index, "timeEnd", timeStringToMinutes(e.target.value))
                      }
                    />
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeOpeningHour(index)}
                  >
                    Xóa
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addOpeningHour}>
                + Thêm khung giờ
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
