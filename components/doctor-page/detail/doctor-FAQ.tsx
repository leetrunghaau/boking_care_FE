"use client"

import { Button } from "@/components/ui/button"
import http from "@/helper/axios"
import { MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"


interface Pops {
  doctor: any
}
export default function DoctorFAQ({ doctor }: Pops) {
  return (
    <div className="space-y-6">
      {/* Tiêu đề */}
      <h2 className="text-xl font-bold mb-4">Hỏi thường gặp</h2>

      {/* Danh sách các câu hỏi thường gặp */}
      <div className="space-y-4">
        {doctor.faqs.map((faq: any, index: number) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

