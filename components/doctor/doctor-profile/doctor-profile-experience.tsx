"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Plus, Trash } from "lucide-react"

interface DoctorProfileExperienceProps {
  isEditing: boolean
}

export function DoctorProfileExperience({ isEditing }: DoctorProfileExperienceProps) {
  // Dữ liệu mẫu cho kinh nghiệm làm việc
  const [experiences, setExperiences] = useState([
    {
      id: "1",
      position: "Bác sĩ Nội khoa",
      organization: "Bệnh viện Đa khoa XYZ",
      startDate: "01/2015",
      endDate: "Hiện tại",
      description:
        "Khám và điều trị các bệnh lý nội khoa tổng quát. Chuyên sâu về tim mạch và hô hấp. Tham gia nghiên cứu lâm sàng và đào tạo sinh viên y khoa.",
    },
    {
      id: "2",
      position: "Bác sĩ Nội trú",
      organization: "Bệnh viện ABC",
      startDate: "01/2012",
      endDate: "12/2014",
      description:
        "Thực hiện các ca trực, khám và điều trị bệnh nhân dưới sự hướng dẫn của bác sĩ chuyên khoa. Tham gia các buổi hội chẩn và nghiên cứu khoa học.",
    },
  ])

  // Thêm kinh nghiệm mới
  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      position: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setExperiences([...experiences, newExperience])
  }

  // Xóa kinh nghiệm
  const handleRemoveExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Kinh nghiệm làm việc</CardTitle>
          <CardDescription>Thêm hoặc chỉnh sửa kinh nghiệm làm việc của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="p-4 border rounded-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Kinh nghiệm {index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRemoveExperience(experience.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`position-${experience.id}`}>Vị trí</Label>
                  <Input id={`position-${experience.id}`} defaultValue={experience.position} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`organization-${experience.id}`}>Tổ chức</Label>
                  <Input id={`organization-${experience.id}`} defaultValue={experience.organization} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${experience.id}`}>Ngày bắt đầu</Label>
                  <Input id={`startDate-${experience.id}`} defaultValue={experience.startDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${experience.id}`}>Ngày kết thúc</Label>
                  <Input id={`endDate-${experience.id}`} defaultValue={experience.endDate} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`description-${experience.id}`}>Mô tả</Label>
                  <Textarea id={`description-${experience.id}`} rows={3} defaultValue={experience.description} />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full" onClick={handleAddExperience}>
            <Plus className="h-4 w-4 mr-1" />
            Thêm kinh nghiệm
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kinh nghiệm làm việc</CardTitle>
        <CardDescription>Kinh nghiệm làm việc của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="flex gap-4">
            <div className="mt-1">
              <div className="bg-blue-100 p-2 rounded-full">
                <Briefcase className="h-4 w-4 text-blue-700" />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <h3 className="font-medium">{experience.position}</h3>
                <p className="text-sm text-slate-500">{experience.organization}</p>
                <p className="text-xs text-slate-400">
                  {experience.startDate} - {experience.endDate}
                </p>
              </div>
              <p className="text-sm text-slate-700">{experience.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
