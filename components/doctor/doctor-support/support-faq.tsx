"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Dữ liệu mẫu cho FAQ
const faqData = [
  {
    id: "1",
    question: "Làm thế nào để đặt lịch hẹn mới?",
    answer:
      "Để đặt lịch hẹn mới, bạn cần đăng nhập vào hệ thống, sau đó vào mục 'Lịch hẹn' và nhấp vào nút 'Tạo lịch hẹn mới'. Điền đầy đủ thông tin bệnh nhân và chọn thời gian phù hợp, sau đó nhấn 'Xác nhận'.",
    category: "lịch hẹn",
  },
  {
    id: "2",
    question: "Làm thế nào để kê đơn thuốc cho bệnh nhân?",
    answer:
      "Để kê đơn thuốc, bạn cần vào chi tiết lịch hẹn của bệnh nhân, chọn tab 'Kê đơn thuốc'. Tại đây, bạn có thể thêm thuốc, liều lượng và hướng dẫn sử dụng. Sau khi hoàn tất, nhấn 'Lưu đơn thuốc' và có thể in hoặc gửi cho bệnh nhân.",
    category: "đơn thuốc",
  },
  {
    id: "3",
    question: "Làm thế nào để xuất báo cáo lịch hẹn?",
    answer:
      "Để xuất báo cáo lịch hẹn, vào mục 'Báo cáo' trên thanh điều hướng, chọn loại báo cáo 'Lịch hẹn', sau đó chọn khoảng thời gian bạn muốn xuất báo cáo. Nhấn 'Xuất báo cáo' và chọn định dạng (PDF, Excel) mà bạn muốn.",
    category: "báo cáo",
  },
  {
    id: "4",
    question: "Làm thế nào để cập nhật thông tin cá nhân?",
    answer:
      "Để cập nhật thông tin cá nhân, nhấp vào ảnh đại diện của bạn ở góc trên bên phải, chọn 'Hồ sơ'. Tại trang hồ sơ, bạn có thể chỉnh sửa thông tin cá nhân, thay đổi mật khẩu và cập nhật các thông tin khác.",
    category: "tài khoản",
  },
  {
    id: "5",
    question: "Làm thế nào để xem lịch sử khám bệnh của bệnh nhân?",
    answer:
      "Để xem lịch sử khám bệnh của bệnh nhân, vào trang 'Bệnh nhân', tìm kiếm và chọn bệnh nhân cần xem. Trong trang chi tiết bệnh nhân, chọn tab 'Lịch sử khám bệnh' để xem tất cả các lần khám trước đây.",
    category: "bệnh nhân",
  },
  {
    id: "6",
    question: "Hệ thống có hỗ trợ đồng bộ với Google Calendar không?",
    answer:
      "Có, hệ thống hỗ trợ đồng bộ với Google Calendar. Để thiết lập, vào 'Cài đặt' > 'Tích hợp' > 'Google Calendar' và làm theo hướng dẫn để kết nối tài khoản Google của bạn.",
    category: "tích hợp",
  },
  {
    id: "7",
    question: "Làm thế nào để thay đổi ngôn ngữ hiển thị?",
    answer:
      "Để thay đổi ngôn ngữ hiển thị, nhấp vào ảnh đại diện của bạn ở góc trên bên phải, chọn 'Cài đặt'. Trong phần 'Tùy chọn hiển thị', bạn có thể chọn ngôn ngữ mong muốn từ danh sách có sẵn.",
    category: "cài đặt",
  },
  {
    id: "8",
    question: "Làm thế nào để liên hệ với đội ngũ hỗ trợ kỹ thuật?",
    answer:
      "Để liên hệ với đội ngũ hỗ trợ kỹ thuật, bạn có thể tạo yêu cầu hỗ trợ mới trong trang 'Hỗ trợ', hoặc gọi đến hotline 1900 1234 trong giờ làm việc (8:00 - 17:00, Thứ Hai đến Thứ Sáu).",
    category: "hỗ trợ",
  },
]

export function SupportFAQ() {
  const [searchQuery, setSearchQuery] = useState("")

  // Lọc FAQ theo từ khóa tìm kiếm
  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm câu hỏi..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredFAQs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4">
                    <p className="text-slate-700">{faq.answer}</p>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-500">Không tìm thấy câu hỏi nào phù hợp với từ khóa tìm kiếm.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
