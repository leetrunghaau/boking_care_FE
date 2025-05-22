"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

type DoctorFAQProps = {
  faqs: {
    question: string
    answer: string
  }[]
}

const DoctorFAQ: React.FC<DoctorFAQProps> = ({ faqs }) => {
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

export default DoctorFAQ
