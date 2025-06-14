"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Upload,
  Clock,
  MapPin,
  Phone,
  FileText,
  Plus,
  LinkIcon,
  Save,
  X,
  Check,
  Edit,
  XCircle,
  Building2,
  Calendar,
  Timer,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ImageUploadBox from "@/components/share/image-upload-box"
import http from "@/helper/axios"
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils"

interface Facility {
  id: number
  name: string
  about: string
  address: string
  phone: string
  license: string
  image: string | File | null
  year: number
  mapEmbedUrl: string
  times: {
    id: number | null
    dayOfWeek: number
    startTime: number
    endTime: number
  }[]
}

const DAYS_OF_WEEK = [
  { value: "1", label: "Thứ 2" },
  { value: "2", label: "Thứ 3" },
  { value: "3", label: "Thứ 4" },
  { value: "4", label: "Thứ 5" },
  { value: "5", label: "Thứ 6" },
  { value: "6", label: "Thứ 7" },
  { value: "0", label: "Chủ nhật" },
]



export default function EditHospitalBasicCard() {
  const params = useParams()
  const id = params?.id as string

  const [facility, setFacility] = useState<Facility>({
    id: 0,
    name: "",
    about: "",
    address: "",
    phone: "",
    license: "",
    image: null,
    year: 15,
    mapEmbedUrl: "https://maps.google.com/embed?pb=...",
    times: [ ],
  })

  const getDayLabel = (value: string | number): string => {
    const stringValue = String(value)
    return DAYS_OF_WEEK.find((day) => day.value === stringValue)?.label ?? ""
  }

  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [newTime, setNewTime] = useState<any | null>(null)

  const handleSave = async () => {
    try {
      setIsSaving(true)
      let imgRS = facility.image;
      if (facility.image instanceof File) {
         imgRS = await http.postFile<string | null>(`/admin-hospital/basic-hospital/${id}/img`, facility.image)
        console.log("hình trả về, ", imgRS)
      }
      console.log("Data to save:", facility)
      const infoRs = await http.post(`/admin-hospital/basic-hospital/${id}`, {...facility, image: imgRS})
      if (infoRs){
        handleApiSuccess("Bạn đã lưu thông tin bệnh viện thành công")
      }
      console.log("kết quả trả về sau khi lưu", infoRs)
    } catch (error) {
      console.log(error)
     handleApiError(error)
    } finally {
      setIsSaving(false)
    }
  }

  const formatTime = (minutes: number) => {
    const h = String(Math.floor(minutes / 60)).padStart(2, "0")
    const m = String(minutes % 60).padStart(2, "0")
    return `${h}:${m}`
  }

  const parseTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number)
    return hours * 60 + minutes
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const rs = await http.get<Facility | null>(`/admin-hospital/basic-hospital/${id}`)
        console.log("get data done", rs)
        if (rs) {

          setFacility(rs)
        }
      } catch (err) {
        handleApiError(err)
      }
    }
    getData()
  }, [])
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-teal-100 p-3 rounded-lg">
                <Building2 className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa thông tin bệnh viện</h1>
                <p className="text-gray-600">Cập nhật thông tin cơ bản và cài đặt hoạt động</p>
              </div>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8"
            >
              <Save className="w-5 h-5 mr-2" />
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card className="shadow-sm border-0 shadow-gray-100">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-t-lg">
                <CardTitle className="text-xl flex items-center text-gray-800">
                  <FileText className="w-6 h-6 mr-3 text-teal-600" />
                  Thông tin cơ bản
                </CardTitle>
                <CardDescription className="text-gray-600">Thông tin chính về cơ sở y tế</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="facility-name" className="text-sm font-semibold text-gray-700">
                      Tên cơ sở y tế
                    </Label>
                    <Input
                      id="facility-name"
                      placeholder="Nhập tên cơ sở y tế"
                      value={facility?.name ?? ""}
                      className="h-12 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onChange={(e) => setFacility({ ...facility, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="year" className="text-sm font-semibold text-gray-700">
                      Số năm hoạt động
                    </Label>
                    <Input
                      id="year"
                      value={facility?.year ?? "0"}
                      type="number"
                      placeholder="15"
                      className="h-12 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onChange={(e) =>
                        setFacility({
                          ...facility,
                          year: Number.parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="about" className="text-sm font-semibold text-gray-700">
                    Giới thiệu về cơ sở
                  </Label>
                  <Textarea
                    id="about"
                    value={facility.about}
                    rows={4}
                    placeholder="Mô tả chi tiết về cơ sở y tế, dịch vụ và đặc điểm nổi bật..."
                    className="border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    onChange={(e) => setFacility({ ...facility, about: e.target.value })}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-teal-600" />
                      Số điện thoại
                    </Label>
                    <Input
                      id="phone"
                      value={facility?.phone ?? ""}
                      placeholder="028-1234-5678"
                      className="h-12 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onChange={(e) => setFacility({ ...facility, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="license" className="text-sm font-semibold text-gray-700">
                      Giấy phép hoạt động
                    </Label>
                    <Input
                      id="license"
                      value={facility?.license ?? ""}
                      placeholder="BYT-2023-001"
                      className="h-12 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onChange={(e) => setFacility({ ...facility, license: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="address" className="text-sm font-semibold text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                    Địa chỉ
                  </Label>
                  <Input
                    id="address"
                    value={facility?.address ?? ""}
                    placeholder="Nhập địa chỉ đầy đủ"
                    className="h-12 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    onChange={(e) => setFacility({ ...facility, address: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="mapEmbedUrl" className="text-sm font-semibold text-gray-700 flex items-center">
                    <LinkIcon className="w-4 h-4 mr-2 text-teal-600" />
                    URL Google Maps
                  </Label>
                  <Input
                    id="mapEmbedUrl"
                    value={facility?.mapEmbedUrl ?? ""}
                    placeholder="https://maps.google.com/embed?pb=..."
                    className="h-12 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    onChange={(e) => setFacility({ ...facility, mapEmbedUrl: e.target.value })}
                  />

                  {facility.mapEmbedUrl && (
                    <div className="mt-4 border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Xem trước bản đồ</span>
                        <Badge variant="outline" className="text-xs">
                          Preview
                        </Badge>
                      </div>
                      <div className="aspect-video w-full">
                        {facility.mapEmbedUrl.includes("https://www.google.com/maps/embed?pb=") ? (
                          <iframe
                            src={facility.mapEmbedUrl}
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps Preview"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-500 text-sm">
                            <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                            Nhập URL Google Maps hợp lệ để xem trước
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card className="shadow-sm border-0 shadow-gray-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                <CardTitle className="text-xl flex items-center text-gray-800">
                  <Upload className="w-6 h-6 mr-3 text-blue-600" />
                  Ảnh đại diện

                </CardTitle>
                <CardDescription className="text-gray-600">Tải lên hình ảnh đại diện cho cơ sở y tế</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <ImageUploadBox
                  initImg={typeof facility.image == "string" ? facility.image : null}
                  onChange={(img) => {
                    setFacility({ ...facility, image: img })
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Operating Hours Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-sm border-0 shadow-gray-100">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg">
                <CardTitle className="text-xl flex items-center text-gray-800">
                  <Clock className="w-6 h-6 mr-3 text-green-600" />
                  Giờ hoạt động
                </CardTitle>
                <CardDescription className="text-gray-600">Quản lý thời gian hoạt động</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Add/Edit Form */}
                {newTime ? (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <Timer className="w-4 h-4 mr-2" />
                        {newTime.temp ? "Chỉnh sửa" : "Thêm mới"}
                      </h4>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Ngày trong tuần</Label>
                        <Select
                          value={newTime.dayOfWeek}
                          onValueChange={(value) => setNewTime({ ...newTime, dayOfWeek: value })}
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Chọn ngày" />
                          </SelectTrigger>
                          <SelectContent>
                            {DAYS_OF_WEEK.map((day) => (
                              <SelectItem value={day.value} key={day.value}>
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
                            value={newTime.startTime}
                            onChange={(e) => setNewTime({ ...newTime, startTime: e.target.value })}
                            className="h-10"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Giờ kết thúc</Label>
                          <Input
                            type="time"
                            value={newTime.endTime}
                            onChange={(e) => setNewTime({ ...newTime, endTime: e.target.value })}
                            className="h-10"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            setFacility({
                              ...facility,
                              times: [
                                ...facility.times,
                                {
                                  id: newTime.id,
                                  dayOfWeek: Number(newTime.dayOfWeek),
                                  startTime: parseTime(newTime.startTime),
                                  endTime: parseTime(newTime.endTime),
                                },
                              ],
                            })
                            setNewTime(null)
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Lưu
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (newTime.temp) {
                              setFacility({
                                ...facility,
                                times: [...facility.times, newTime.temp],
                              })
                            }
                            setNewTime(null)
                          }}
                          className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Hủy
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 border-dashed border-teal-300 text-teal-600 hover:bg-teal-50 hover:border-teal-400"
                    onClick={() =>
                      setNewTime({
                        id: -Date.now(),
                        dayOfWeek: "1",
                        startTime: "08:00",
                        endTime: "17:00",
                      })
                    }
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Thêm giờ hoạt động
                  </Button>
                )}

                {/* Operating Hours List */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Lịch hoạt động ({facility.times.length})
                  </h4>

                  {facility.times.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>Chưa có giờ hoạt động nào</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {facility.times.map((time, index) => (
                        <div key={index} className="bg-white border rounded-lg p-3 hover:shadow-sm transition-shadow">
                          <div className="flex items-center justify-between">
                            <div>
                              <Badge variant="secondary" className="mb-1">
                                {getDayLabel(time.dayOfWeek)}
                              </Badge>
                              <p className="text-sm text-gray-600">
                                {formatTime(time.startTime)} - {formatTime(time.endTime)}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                onClick={() => {
                                  setNewTime({
                                    id: time.id,
                                    dayOfWeek: String(time.dayOfWeek),
                                    startTime: formatTime(time.startTime),
                                    endTime: formatTime(time.endTime),
                                    temp: time,
                                  })
                                  setFacility({
                                    ...facility,
                                    times: facility.times.filter((prev) => prev.id !== time.id),
                                  })
                                }}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-amber-600 hover:bg-amber-50"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                onClick={() => {
                                  setFacility({
                                    ...facility,
                                    times: facility.times.filter((prev) => prev.id !== time.id),
                                  })
                                }}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                              >
                                <XCircle className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
