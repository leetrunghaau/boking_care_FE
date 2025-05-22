"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import {
  ArrowLeft,
  Calendar,
  CalendarClock,
  Check,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  MessageSquare,
  Phone,
  Stethoscope,
  Trash,
  User,
} from "lucide-react"
import { PrescriptionForm } from "@/components/doctor/doctor-prescriptions/prescription-form"
import { PrescriptionPreview } from "@/components/doctor/doctor-prescriptions/prescription-preview"

// Dữ liệu mẫu cho chi tiết lịch hẹn
const appointmentDetail = {
  id: "1",
  patientName: "Nguyễn Văn A",
  patientAvatar: "/placeholder.svg?height=80&width=80",
  patientAge: 45,
  patientGender: "Nam",
  patientPhone: "0987654321",
  patientEmail: "nguyenvana@example.com",
  patientAddress: "123 Đường Lê Lợi, Quận 1, TP.HCM",
  date: new Date().toISOString(),
  time: "09:00",
  duration: 30,
  price: 300000,
  status: "confirmed",
  symptoms:
    "Đau đầu, sốt nhẹ, mệt mỏi kéo dài 2 ngày. Bệnh nhân cho biết có tiếp xúc với người bị cúm trong tuần trước.",
  medicalHistory: [
    { date: "15/03/2023", diagnosis: "Viêm họng", doctor: "BS. Trần Văn B" },
    { date: "10/12/2022", diagnosis: "Đau lưng", doctor: "BS. Lê Thị C" },
  ],
  vitalSigns: {
    bloodPressure: "120/80 mmHg",
    heartRate: "75 bpm",
    temperature: "37.2°C",
    respiratoryRate: "16 bpm",
    weight: "68 kg",
    height: "170 cm",
  },
  address: "Phòng khám số 3, Tầng 2, Tòa nhà Y",
}

export default function AppointmentDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [diagnosis, setDiagnosis] = useState("")
  const [clinicalNotes, setClinicalNotes] = useState("")
  const [followUpDate, setFollowUpDate] = useState("")
  const [followUpNotes, setFollowUpNotes] = useState("")

  // Trạng thái cho đơn thuốc
  const [hasPrescription, setHasPrescription] = useState(false)
  const [showPrescriptionPreview, setShowPrescriptionPreview] = useState(false)

  // Xử lý hoàn thành lịch hẹn
  const handleCompleteAppointment = () => {
    alert("Lịch hẹn đã được đánh dấu là hoàn thành!")
    // Trong thực tế, sẽ gọi API để cập nhật trạng thái
  }

  // Xử lý lưu đơn thuốc
  const handleSavePrescription = () => {
    setHasPrescription(true)
    alert("Đơn thuốc đã được lưu thành công!")
    // Trong thực tế, sẽ gọi API để lưu đơn thuốc
  }

  // Xử lý in đơn thuốc
  const handlePrintPrescription = () => {
    alert("Đang chuẩn bị in đơn thuốc...")
    // Trong thực tế, sẽ mở cửa sổ in
  }

  // Xử lý gửi đơn thuốc
  const handleSendPrescription = () => {
    alert("Đơn thuốc đã được gửi cho bệnh nhân!")
    // Trong thực tế, sẽ gọi API để gửi đơn thuốc
  }

  // Định dạng trạng thái
  const statusConfig = {
    confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-700" },
    completed: { label: "Đã hoàn thành", color: "bg-green-100 text-green-700" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
    pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700" },
  }

  const status = statusConfig[appointmentDetail.status as keyof typeof statusConfig]
  const appointmentDate = new Date(appointmentDetail.date)

  return (
    <div className="container mx-auto my-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-800">Chi tiết lịch hẹn</h1>
        </div>
        <Badge className={status.color}>{status.label}</Badge>
      </div>

      {/* Thông tin chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột thông tin bệnh nhân */}
        <div className="space-y-6">
          {/* Thẻ thông tin bệnh nhân */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-teal-600" />
                Thông tin bệnh nhân
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarImage src={appointmentDetail.patientAvatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-slate-100 text-lg">
                    {appointmentDetail.patientName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-slate-800">{appointmentDetail.patientName}</h3>
                <p className="text-sm text-slate-500">
                  {appointmentDetail.patientAge} tuổi • {appointmentDetail.patientGender}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span className="text-sm">{appointmentDetail.patientPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span className="text-sm">{appointmentDetail.patientEmail}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
                  <span className="text-sm">{appointmentDetail.patientAddress}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Nhắn tin
                </Button>
                <Button variant="default" size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700">
                  <FileText className="h-4 w-4 mr-1" />
                  Hồ sơ
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Thẻ thông tin lịch hẹn */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-teal-600" />
                Thông tin lịch hẹn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium">Ngày khám:</span>
                  </div>
                  <span className="text-sm">{format(appointmentDate, "EEEE, dd/MM/yyyy", { locale: vi })}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium">Giờ khám:</span>
                  </div>
                  <span className="text-sm">
                    {appointmentDetail.time} ({appointmentDetail.duration} phút)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium">Giá khám:</span>
                  </div>
                  <span className="text-sm">{new Intl.NumberFormat("vi-VN").format(appointmentDetail.price)} VNĐ</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium">Địa điểm:</span>
                  </div>
                  <span className="text-sm">{appointmentDetail.address}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Stethoscope className="h-4 w-4 text-slate-500" />
                  Triệu chứng:
                </h4>
                <p className="text-sm text-slate-600">{appointmentDetail.symptoms}</p>
              </div>
            </CardContent>
          </Card>

          {/* Thẻ dấu hiệu sinh tồn */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-teal-600" />
                Dấu hiệu sinh tồn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Huyết áp</p>
                  <p className="text-sm font-medium">{appointmentDetail.vitalSigns.bloodPressure}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Nhịp tim</p>
                  <p className="text-sm font-medium">{appointmentDetail.vitalSigns.heartRate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Nhiệt độ</p>
                  <p className="text-sm font-medium">{appointmentDetail.vitalSigns.temperature}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Nhịp thở</p>
                  <p className="text-sm font-medium">{appointmentDetail.vitalSigns.respiratoryRate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Cân nặng</p>
                  <p className="text-sm font-medium">{appointmentDetail.vitalSigns.weight}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Chiều cao</p>
                  <p className="text-sm font-medium">{appointmentDetail.vitalSigns.height}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cột chính - Tabs */}
        <div className="lg:col-span-2">
          <Card>
            <Tabs defaultValue="details" className="w-full" onValueChange={setActiveTab}>
              <CardHeader className="pb-2">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="details">Khám bệnh</TabsTrigger>
                  <TabsTrigger value="prescription">Kê đơn thuốc</TabsTrigger>
                  <TabsTrigger value="history">Lịch sử khám</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Tab khám bệnh */}
                <TabsContent value="details" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Chẩn đoán</Label>
                      <Input
                        id="diagnosis"
                        placeholder="Nhập chẩn đoán của bác sĩ"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clinical-notes">Ghi chú lâm sàng</Label>
                      <Textarea
                        id="clinical-notes"
                        placeholder="Nhập ghi chú lâm sàng, kết quả khám và các chỉ định"
                        rows={5}
                        value={clinicalNotes}
                        onChange={(e) => setClinicalNotes(e.target.value)}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Hẹn tái khám</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Input type="date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} />
                        </div>
                        <div>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn giờ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00">09:00</SelectItem>
                              <SelectItem value="09:30">09:30</SelectItem>
                              <SelectItem value="10:00">10:00</SelectItem>
                              <SelectItem value="10:30">10:30</SelectItem>
                              <SelectItem value="11:00">11:00</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="followup-notes">Ghi chú tái khám</Label>
                      <Textarea
                        id="followup-notes"
                        placeholder="Nhập hướng dẫn cho bệnh nhân khi tái khám"
                        rows={2}
                        value={followUpNotes}
                        onChange={(e) => setFollowUpNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Tab kê đơn thuốc */}
                <TabsContent value="prescription" className="mt-0">
                  {!showPrescriptionPreview ? (
                    <PrescriptionForm
                      onSave={handleSavePrescription}
                      onPreview={() => setShowPrescriptionPreview(true)}
                    />
                  ) : (
                    <PrescriptionPreview
                      patientName={appointmentDetail.patientName}
                      patientAge={appointmentDetail.patientAge}
                      patientGender={appointmentDetail.patientGender}
                      diagnosis={diagnosis}
                      date={new Date()}
                      onBack={() => setShowPrescriptionPreview(false)}
                      onPrint={handlePrintPrescription}
                      onSend={handleSendPrescription}
                    />
                  )}
                </TabsContent>

                {/* Tab lịch sử khám */}
                <TabsContent value="history" className="mt-0">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-slate-500">Lịch sử khám bệnh gần đây</h3>
                    {appointmentDetail.medicalHistory.length > 0 ? (
                      <div className="space-y-3">
                        {appointmentDetail.medicalHistory.map((record, index) => (
                          <div key={index} className="p-3 border rounded-md hover:bg-slate-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{record.diagnosis}</p>
                                <p className="text-sm text-slate-500">{record.doctor}</p>
                              </div>
                              <Badge variant="outline">{record.date}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">Không có lịch sử khám bệnh.</p>
                    )}
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline">
                <Trash className="h-4 w-4 mr-1" />
                Hủy lịch hẹn
              </Button>
              <Button onClick={handleCompleteAppointment} className="bg-teal-600 hover:bg-teal-700">
                <Check className="h-4 w-4 mr-1" />
                Hoàn thành khám
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function Activity(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
