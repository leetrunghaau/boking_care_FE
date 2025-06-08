"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Plus, Trash } from "lucide-react"

interface DoctorProfileExperienceProps {
  info: any | null
}

export function DoctorProfileExperience({ info }: DoctorProfileExperienceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kinh nghiệm làm việc</CardTitle>
        <CardDescription>Kinh nghiệm làm việc của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {info?.experiences?.map((experience: any) => (
          <div key={experience.id} className="flex gap-4 mb-4">
            {/* Icon bên trái */}
            <div className="mt-1">
              <div className="bg-blue-100 p-2 rounded-full">
                <Briefcase className="h-4 w-4 text-blue-700" />
              </div>
            </div>

            {/* Nội dung bên phải */}
            <div className="space-y-1">
              {/* Vị trí & tổ chức */}
              <div>
                <h3 className="font-medium text-base text-slate-800">
                  {experience.position || 'Chức danh chưa có'}
                </h3>
                <p className="text-sm text-slate-500">
                  {experience.organization || 'Tên tổ chức'}
                </p>
                <p className="text-xs text-slate-400">
                  {experience.startDate || 'Bắt đầu'} - {experience.endDate || 'Kết thúc'}
                </p>
              </div>

              {/* Mô tả công việc */}
              {experience.description && (
                <p className="text-sm text-slate-700">{experience.description}</p>
              )}
            </div>
          </div>
        ))}
        </div>

      </CardContent>
    </Card>
  )
}
