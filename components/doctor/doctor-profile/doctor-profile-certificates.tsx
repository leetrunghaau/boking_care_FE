"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Download, FileText, Plus, Trash, Upload } from "lucide-react"

interface DoctorProfileCertificatesProps {
  info: any | null
}

export function DoctorProfileCertificates({ info }: DoctorProfileCertificatesProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chứng chỉ</CardTitle>
        <CardDescription>Chứng chỉ và giấy phép hành nghề của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1  lg:grid-cols-2">

          {info?.analyses?.map((item: any) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
            >
              {/* Icon */}
              <div className="mt-1">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-yellow-700" />
                </div>
              </div>

              {/* Nội dung chính */}
              <div className="flex-1 space-y-1">
                {/* Tiêu đề và thông tin */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-slate-800">
                      {item.title || 'Chưa có tiêu đề'}
                    </h3>
                    <p className="text-sm text-slate-500">{item.journal || 'Tạp chí không xác định'}</p>
                  </div>
                  <div className="text-sm text-slate-400 whitespace-nowrap">
                    {item.publishedAt || 'Ngày không rõ'}
                  </div>
                </div>

                {/* Mô tả nếu có */}
                {item.description && (
                  <p className="text-sm text-slate-600 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}

        </div>
      </CardContent>
    </Card>
  )
}
