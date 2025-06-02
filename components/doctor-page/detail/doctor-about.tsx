"use client"

import http from "@/helper/axios"
import { CheckCircle, BookOpen, Award } from "lucide-react"
import { useEffect, useState } from "react"


interface Pops {
  doctor: any | null
}
// 
export default function ({ doctor }: Pops) {


  return (
    <div className="space-y-8">
      {/* Giới thiệu về bác sĩ */}

      {
        doctor && (
          <div>
            <h2 className="text-xl font-bold mb-4">Giới thiệu về bác sĩ</h2>
            <p className="text-muted-foreground">{doctor?.about}</p>
          </div>
        )
      }


      {/* Chuyên môn */}
      {
        doctor && doctor.technique?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3">Chuyên môn</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {doctor?.technique.map((i: any) => (
                <li key={i.id} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>{i.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      }


      {/* Học vấn */}

      {
        doctor && doctor.education?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3">Học vấn</h3>
            <ul className="space-y-4">
              {doctor.education.map((edu: any) => (
                <li key={edu.id} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-muted-foreground">
                      {edu.school} • {edu.year}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      }


      {/* Giải thưởng */}
      {
        doctor && doctor.awards?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3">Giải thưởng</h3>
            <ul className="space-y-4">
              {doctor.awards.map((award: any, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">{award.title}</p>
                    <p className="text-muted-foreground">{award.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      }


      {/* Nghiên cứu & Xuất bản */}
      {
        doctor && doctor.analysis?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3">Nghiên cứu & Xuất bản</h3>
            <ul className="space-y-4">
              {doctor.analysis.map((pub: any) => (
                <li key={pub.id} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{pub.title}</p>
                    <p className="text-muted-foreground">
                      {pub.journal} • {pub.year}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      }

    </div>
  )
}

