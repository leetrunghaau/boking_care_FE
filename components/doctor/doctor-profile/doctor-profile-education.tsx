"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GraduationCap, Plus, Trash } from "lucide-react"

interface DoctorProfileEducationProps {
  isEditing: boolean
}

export function DoctorProfileEducation({ isEditing }: DoctorProfileEducationProps) {
  // Dữ liệu mẫu cho học vấn
  const [educations, setEducations] = useState([
    {
      id: "1",
      degree: "Tiến sĩ Y khoa",
      institution: "Đại học Y Hà Nội",
      startDate: "2008",
      endDate: "2012",
      description: "Chuyên ngành Nội khoa, Luận án: Nghiên cứu về các phương pháp điều trị mới cho bệnh tim mạch.",
    },
    {
      id: "2",
      degree: "Bác sĩ Chuyên khoa I",
      institution: "Đại học Y Hà Nội",
      startDate: "2005",
      endDate: "2007",
      description: "Chuyên ngành Nội khoa.",
    },
    {
      id: "3",
      degree: "Bác sĩ Đa khoa",
      institution: "Đại học Y Hà Nội",
      startDate: "1998",
      endDate: "2004",
      description: "Tốt nghiệp loại Giỏi.",
    },
  ])

  // Thêm học vấn mới
  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setEducations([...educations, newEducation])
  }

  // Xóa học vấn
  const handleRemoveEducation = (id: string) => {
    setEducations(educations.filter((edu) => edu.id !== id))
  }

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Học vấn</CardTitle>
          <CardDescription>Thêm hoặc chỉnh sửa thông tin học vấn của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {educations.map((education, index) => (
            <div key={education.id} className="p-4 border rounded-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Học vấn {index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRemoveEducation(education.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`degree-${education.id}`}>Bằng cấp</Label>
                  <Input id={`degree-${education.id}`} defaultValue={education.degree} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`institution-${education.id}`}>Trường/Viện</Label>
                  <Input id={`institution-${education.id}`} defaultValue={education.institution} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${education.id}`}>Năm bắt đầu</Label>
                  <Input id={`startDate-${education.id}`} defaultValue={education.startDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${education.id}`}>Năm kết thúc</Label>
                  <Input id={`endDate-${education.id}`} defaultValue={education.endDate} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`description-${education.id}`}>Mô tả</Label>
                  <Textarea id={`description-${education.id}`} rows={3} defaultValue={education.description} />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full" onClick={handleAddEducation}>
            <Plus className="h-4 w-4 mr-1" />
            Thêm học vấn
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Học vấn</CardTitle>
        <CardDescription>Thông tin học vấn của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {educations.map((education) => (
          <div key={education.id} className="flex gap-4">
            <div className="mt-1">
              <div className="bg-green-100 p-2 rounded-full">
                <GraduationCap className="h-4 w-4 text-green-700" />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <h3 className="font-medium">{education.degree}</h3>
                <p className="text-sm text-slate-500">{education.institution}</p>
                <p className="text-xs text-slate-400">
                  {education.startDate} - {education.endDate}
                </p>
              </div>
              <p className="text-sm text-slate-700">{education.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
