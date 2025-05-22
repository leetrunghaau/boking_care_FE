"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DoctorProfileInfo } from "@/components/doctor/doctor-profile/doctor-profile-info"
import { DoctorProfileExperience } from "@/components/doctor/doctor-profile/doctor-profile-experience"
import { DoctorProfileEducation } from "@/components/doctor/doctor-profile/doctor-profile-education"
import { DoctorProfileCertificates } from "@/components/doctor/doctor-profile/doctor-profile-certificates"
import { Camera, Edit, Save, Upload } from "lucide-react"
import { DoctorHeader } from "@/components/doctor/doctor-schedule/doctor-header"

export default function DoctorProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  // Thông tin bác sĩ
  const doctorInfo = {
    doctorId: "D-123456",
    doctorName: "BS. Nguyễn Văn A",
    specialty: "Nội khoa tổng quát",
    stats: {
      total: 120,
      booked: 15,
      completed: 105,
    },
  }

  // Thông tin chi tiết
  const doctorDetails = {
    fullName: "Nguyễn Văn A",
    avatar: "/placeholder.svg?height=200&width=200",
    gender: "Nam",
    dateOfBirth: "15/05/1980",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    bio: "Bác sĩ chuyên khoa Nội tổng quát với hơn 15 năm kinh nghiệm. Chuyên điều trị các bệnh lý nội khoa, tim mạch và hô hấp.",
    specialties: ["Nội khoa tổng quát", "Tim mạch", "Hô hấp"],
    languages: ["Tiếng Việt", "Tiếng Anh"],
    workingHours: "Thứ 2 - Thứ 6: 8:00 - 17:00",
    consultationFee: 300000,
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header với thông tin bác sĩ và thống kê */}
      <DoctorHeader
        doctorId={doctorInfo.doctorId}
        doctorName={doctorInfo.doctorName}
        specialty={doctorInfo.specialty}
        stats={doctorInfo.stats}
      />

      {/* Tiêu đề trang */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Hồ sơ cá nhân</h1>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? "bg-teal-600 hover:bg-teal-700" : ""}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-1" />
              <span>Lưu thay đổi</span>
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-1" />
              <span>Chỉnh sửa hồ sơ</span>
            </>
          )}
        </Button>
      </div>

      {/* Thông tin cá nhân */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột bên trái - Ảnh đại diện và thông tin cơ bản */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                  <AvatarImage src={doctorDetails.avatar || "/placeholder.svg"} alt={doctorDetails.fullName} />
                  <AvatarFallback className="text-3xl">{doctorDetails.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full cursor-pointer shadow-md">
                    <Camera className="h-5 w-5" />
                  </div>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-800">{doctorDetails.fullName}</h2>
              <p className="text-sm text-slate-500 mt-1">{doctorInfo.specialty}</p>

              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                {doctorDetails.specialties.map((specialty, index) => (
                  <Badge key={index} className="bg-teal-100 text-teal-800 hover:bg-teal-200">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="w-full space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">ID:</span>
                  <span className="text-sm font-medium">{doctorInfo.doctorId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Giới tính:</span>
                  <span className="text-sm font-medium">{doctorDetails.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Ngày sinh:</span>
                  <span className="text-sm font-medium">{doctorDetails.dateOfBirth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Ngôn ngữ:</span>
                  <span className="text-sm font-medium">{doctorDetails.languages.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Phí tư vấn:</span>
                  <span className="text-sm font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      maximumFractionDigits: 0,
                    }).format(doctorDetails.consultationFee)}
                  </span>
                </div>
              </div>

              {isEditing && (
                <Button variant="outline" className="mt-4 w-full">
                  <Upload className="h-4 w-4 mr-1" />
                  <span>Tải lên CV</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Cột bên phải - Tabs thông tin */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="info">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="info">Thông tin</TabsTrigger>
              <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
              <TabsTrigger value="education">Học vấn</TabsTrigger>
              <TabsTrigger value="certificates">Chứng chỉ</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6">
              <DoctorProfileInfo doctorDetails={doctorDetails} isEditing={isEditing} />
            </TabsContent>

            <TabsContent value="experience" className="mt-6">
              <DoctorProfileExperience isEditing={isEditing} />
            </TabsContent>

            <TabsContent value="education" className="mt-6">
              <DoctorProfileEducation isEditing={isEditing} />
            </TabsContent>

            <TabsContent value="certificates" className="mt-6">
              <DoctorProfileCertificates isEditing={isEditing} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
