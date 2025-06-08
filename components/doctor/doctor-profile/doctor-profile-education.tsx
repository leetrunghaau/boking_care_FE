"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GraduationCap, Plus, Trash } from "lucide-react"

interface DoctorProfileEducationProps {
  info: any | null
}

export function DoctorProfileEducation({ info }: DoctorProfileEducationProps) {


  return (
    <Card>
      <CardHeader>
        <CardTitle>Học vấn</CardTitle>
        <CardDescription>Thông tin học vấn của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

        {info?.educations?.map((education: any) => (
          <div key={education.id} className="flex gap-4">
            <div className="mt-1">
              <div className="bg-green-100 p-2 rounded-full">
                <GraduationCap className="h-4 w-4 text-green-700" />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <h3 className="font-medium">{education.degree}</h3>
                <p className="text-sm text-slate-500">{education.school}</p>
                <p className="text-xs text-slate-400">
                  {education.year}
                </p>
              </div>
              {/* <p className="text-sm text-slate-700">{education.description}</p> */}
            </div>
          </div>
        ))}
        </div>
      </CardContent>
    </Card>
  )
}
