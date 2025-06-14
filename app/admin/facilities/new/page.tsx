"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  Plus,
  Save,
  ArrowLeft,
  FileText,
  Clock,
  Phone,
  MapPin,
  Shield,
  Trash2,
  Calendar,
  Timer,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { handleApiSuccess, handleErorr } from "@/helper/toast-utils"
import http from "@/helper/axios"

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

const DAYS_OF_WEEK = [
  { value: 0, label: "Chủ nhật" },
  { value: 1, label: "Thứ 2" },
  { value: 2, label: "Thứ 3" },
  { value: 3, label: "Thứ 4" },
  { value: 4, label: "Thứ 5" },
  { value: 5, label: "Thứ 6" },
  { value: 6, label: "Thứ 7" },
]

export default function NewFacilityPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

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
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0")
    const m = (minutes % 60).toString().padStart(2, "0")
    return `${h}:${m}`
  }

  const getDayLabel = (value: number): string => {
    return DAYS_OF_WEEK.find((day) => day.value === value)?.label ?? ""
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!facility.name.trim()) {
      newErrors.name = "Tên cơ sở y tế là bắt buộc"
    }
    if (!facility.description.trim()) {
      newErrors.description = "Mô tả là bắt buộc"
    }
    if (!facility.address.trim()) {
      newErrors.address = "Địa chỉ là bắt buộc"
    }
    if (!facility.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc"
    }
    if (!facility.license.trim()) {
      newErrors.license = "Giấy phép hoạt động là bắt buộc"
    }
    if (facility.openingHours.length === 0) {
      newErrors.openingHours = "Cần có ít nhất một khung giờ hoạt động"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setSaving(true)
    try {
      const rs = await http.post("/admin-hospital/hospital", facility)

      if (rs) {
        handleApiSuccess("Bạn đã tạo cơ sở y tế thành công")
        router.push(`/admin/facilities?page=1&search=${facility.name}`)
      }
    } catch (e) {
      handleErorr("Tạo cơ sở y tế thất bại, vui lòng thử lại!")
    } finally {
      setSaving(false)
    }
  }

  const isFormValid = facility.name && facility.description && facility.address && facility.phone && facility.license

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-11/12 mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-3">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Building2 className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Thêm cơ sở y tế mới</h1>
                  <p className="text-gray-600">Tạo mới thông tin cơ sở y tế và cài đặt hoạt động</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isFormValid && (
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Sẵn sàng lưu
                </div>
              )}
              <Button
                onClick={handleSave}
                disabled={saving || !isFormValid}
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8"
              >
                <Save className="w-5 h-5 mr-2" />
                {saving ? "Đang tạo..." : "Tạo cơ sở"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm border-0 shadow-gray-100">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-t-lg">
                <CardTitle className="text-xl flex items-center text-gray-800">
                  <FileText className="w-6 h-6 mr-3 text-teal-600" />
                  Thông tin cơ bản
                </CardTitle>
                <CardDescription className="text-gray-600">Nhập thông tin chính về cơ sở y tế mới</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center">
                    Tên cơ sở y tế
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Nhập tên cơ sở y tế"
                    value={facility.name}
                    onChange={(e) => {
                      setFacility({ ...facility, name: e.target.value })
                      if (errors.name) {
                        setErrors({ ...errors, name: "" })
                      }
                    }}
                    className={`h-12 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.name ? "border-red-300 focus:ring-red-500" : ""
                      }`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center">
                    Mô tả về cơ sở
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Mô tả chi tiết về cơ sở y tế, dịch vụ và đặc điểm nổi bật..."
                    value={facility.description}
                    onChange={(e) => {
                      setFacility({ ...facility, description: e.target.value })
                      if (errors.description) {
                        setErrors({ ...errors, description: "" })
                      }
                    }}
                    className={`border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${errors.description ? "border-red-300 focus:ring-red-500" : ""
                      }`}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label htmlFor="address" className="text-sm font-semibold text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                    Địa chỉ
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="Nhập địa chỉ đầy đủ"
                    value={facility.address}
                    onChange={(e) => {
                      setFacility({ ...facility, address: e.target.value })
                      if (errors.address) {
                        setErrors({ ...errors, address: "" })
                      }
                    }}
                    className={`h-12 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.address ? "border-red-300 focus:ring-red-500" : ""
                      }`}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-teal-600" />
                      Số điện thoại
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="028-1234-5678"
                      value={facility.phone}
                      onChange={(e) => {
                        setFacility({ ...facility, phone: e.target.value })
                        if (errors.phone) {
                          setErrors({ ...errors, phone: "" })
                        }
                      }}
                      className={`h-12 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.phone ? "border-red-300 focus:ring-red-500" : ""
                        }`}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="license" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-teal-600" />
                      Giấy phép hoạt động
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="license"
                      placeholder="BYT-2023-001"
                      value={facility.license}
                      onChange={(e) => {
                        setFacility({ ...facility, license: e.target.value })
                        if (errors.license) {
                          setErrors({ ...errors, license: "" })
                        }
                      }}
                      className={`h-12 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.license ? "border-red-300 focus:ring-red-500" : ""
                        }`}
                    />
                    {errors.license && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.license}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Operating Hours Sidebar */}
          <div>
            <Card className="shadow-sm border-0 shadow-gray-100">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg">
                <CardTitle className="text-xl flex items-center text-gray-800">
                  <Clock className="w-6 h-6 mr-3 text-green-600" />
                  Giờ hoạt động
                </CardTitle>
                <CardDescription className="text-gray-600">Thiết lập thời gian hoạt động</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Lịch hoạt động ({facility.openingHours.length})
                    </h4>
                    <Button
                      onClick={addOpeningHour}
                      size="sm"
                      variant="outline"
                      className="border-teal-300 text-teal-600 hover:bg-teal-50"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Thêm
                    </Button>
                  </div>

                  {facility.openingHours.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>Chưa có giờ hoạt động nào</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {facility.openingHours.map((hour, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-gray-800 flex items-center">
                              <Timer className="w-4 h-4 mr-2" />
                              Khung giờ {index + 1}
                            </h5>
                            {facility.openingHours.length > 1 && (
                              <Button
                                onClick={() => removeOpeningHour(index)}
                                size="sm"
                                variant="ghost"
                                className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>

                          <div className="space-y-3">
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">Ngày trong tuần</Label>
                              <Select
                                value={hour.weekend.toString()}
                                onValueChange={(value) => updateOpeningHour(index, "weekend", Number.parseInt(value))}
                              >
                                <SelectTrigger className="h-10">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {DAYS_OF_WEEK.map((day) => (
                                    <SelectItem key={day.value} value={day.value.toString()}>
                                      {day.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Giờ bắt đầu</Label>
                                <Input
                                  type="time"
                                  value={minutesToTimeString(hour.timeStart)}
                                  onChange={(e) =>
                                    updateOpeningHour(index, "timeStart", timeStringToMinutes(e.target.value))
                                  }
                                  className="h-10"
                                />
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Giờ kết thúc</Label>
                                <Input
                                  type="time"
                                  value={minutesToTimeString(hour.timeEnd)}
                                  onChange={(e) =>
                                    updateOpeningHour(index, "timeEnd", timeStringToMinutes(e.target.value))
                                  }
                                  className="h-10"
                                />
                              </div>
                            </div>

                            <div className="pt-2 border-t border-gray-200">
                              <Badge variant="secondary" className="text-xs">
                                {getDayLabel(hour.weekend)}: {minutesToTimeString(hour.timeStart)} -{" "}
                                {minutesToTimeString(hour.timeEnd)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.openingHours && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.openingHours}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
