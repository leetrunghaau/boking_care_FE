"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Award, Download, FileText, Plus, Trash, Upload } from "lucide-react"

interface DoctorProfileCertificatesProps {
  isEditing: boolean
}

export function DoctorProfileCertificates({ isEditing }: DoctorProfileCertificatesProps) {
  // Dữ liệu mẫu cho chứng chỉ
  const [certificates, setCertificates] = useState([
    {
      id: "1",
      name: "Chứng chỉ hành nghề khám chữa bệnh",
      issuer: "Bộ Y tế",
      issueDate: "2012",
      expiryDate: "Không thời hạn",
      fileUrl: "#",
    },
    {
      id: "2",
      name: "Chứng chỉ chuyên khoa Tim mạch",
      issuer: "Hiệp hội Tim mạch Việt Nam",
      issueDate: "2015",
      expiryDate: "2025",
      fileUrl: "#",
    },
    {
      id: "3",
      name: "Chứng nhận đào tạo liên tục",
      issuer: "Bệnh viện Đại học Y Hà Nội",
      issueDate: "2020",
      expiryDate: "2023",
      fileUrl: "#",
    },
  ])

  // Thêm chứng chỉ mới
  const handleAddCertificate = () => {
    const newCertificate = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      fileUrl: "",
    }
    setCertificates([...certificates, newCertificate])
  }

  // Xóa chứng chỉ
  const handleRemoveCertificate = (id: string) => {
    setCertificates(certificates.filter((cert) => cert.id !== id))
  }

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Chứng chỉ</CardTitle>
          <CardDescription>Thêm hoặc chỉnh sửa chứng chỉ của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {certificates.map((certificate, index) => (
            <div key={certificate.id} className="p-4 border rounded-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Chứng chỉ {index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRemoveCertificate(certificate.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${certificate.id}`}>Tên chứng chỉ</Label>
                  <Input id={`name-${certificate.id}`} defaultValue={certificate.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`issuer-${certificate.id}`}>Đơn vị cấp</Label>
                  <Input id={`issuer-${certificate.id}`} defaultValue={certificate.issuer} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`issueDate-${certificate.id}`}>Ngày cấp</Label>
                  <Input id={`issueDate-${certificate.id}`} defaultValue={certificate.issueDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`expiryDate-${certificate.id}`}>Ngày hết hạn</Label>
                  <Input id={`expiryDate-${certificate.id}`} defaultValue={certificate.expiryDate} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Tệp đính kèm</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex-1">
                      <Upload className="h-4 w-4 mr-1" />
                      <span>Tải lên chứng chỉ</span>
                    </Button>
                    {certificate.fileUrl && (
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full" onClick={handleAddCertificate}>
            <Plus className="h-4 w-4 mr-1" />
            Thêm chứng chỉ
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chứng chỉ</CardTitle>
        <CardDescription>Chứng chỉ và giấy phép hành nghề của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="flex items-start gap-4 p-3 border rounded-md">
            <div className="mt-1">
              <div className="bg-yellow-100 p-2 rounded-full">
                <Award className="h-4 w-4 text-yellow-700" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h3 className="font-medium">{certificate.name}</h3>
                  <p className="text-sm text-slate-500">{certificate.issuer}</p>
                </div>
                <div className="text-sm text-slate-500">
                  {certificate.issueDate} - {certificate.expiryDate}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Tải xuống</span>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
