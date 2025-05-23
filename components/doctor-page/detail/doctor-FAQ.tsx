"use client"

import { Button } from "@/components/ui/button"
import http from "@/helper/axios"
import { MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"



interface Faqs {
  question: string
  answer: string
}
interface Pops {
  slug: string
}

export default function DoctorFAQ({ slug }: Pops) {
  const [faqs, setFaqs] = useState<Faqs[] >([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<Faqs[] >(`/doctor-site/doctor/${slug}/faqs`)
        console.log(res)
        setFaqs(res);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [])
  return (
    <div className="space-y-6">
      {/* Tiêu đề */}
      <h2 className="text-xl font-bold mb-4">Câu hỏi thường gặp</h2>

      {/* Danh sách các câu hỏi thường gặp */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Phần hỏi thêm */}
      <div className="bg-slate-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <MessageSquare className="h-5 w-5 text-teal-600 mt-0.5" />
          <div>
            <p className="font-medium">Bạn có câu hỏi khác?</p>
            <p className="text-sm text-muted-foreground mb-3">
              Đặt câu hỏi cho bác sĩ và nhận câu trả lời
            </p>
            <Button className="bg-teal-600 hover:bg-teal-700">Đặt câu hỏi</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

