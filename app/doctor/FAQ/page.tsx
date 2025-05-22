"use client"

import { useEffect, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CalendarDays, CheckCircle2, Clock, Droplet, HeartPulse, Inbox, MessageCircleQuestion, MessageSquareText, Phone, ShieldAlert, User, User2 } from "lucide-react"
import { DoctorHeader } from "@/components/doctor/doctor-schedule/doctor-header"
type FAQ = {
  id: number
  patient: {
    name: string
    age: number
    gender: "Nam" | "Nữ"
    phone: string
  }
  question: string
  answer?: string
}

const mockFAQs: FAQ[] = [
  {
    id: 1,
    patient: {
      name: "Nguyễn Văn A",
      age: 32,
      gender: "Nam",
      phone: "0901234567",
    },
    question: "Bác sĩ có chuyên môn gì?",
  },
  {
    id: 2,
    patient: {
      name: "Trần Thị B",
      age: 28,
      gender: "Nữ",
      phone: "0912345678",
    },
    question: "Có cần nhịn ăn trước khi xét nghiệm không?",
    answer: "Có, bạn nên nhịn ăn ít nhất 8 tiếng.",
  },
  {
    id: 3,
    patient: {
      name: "Trần Thị B",
      age: 28,
      gender: "Nữ",
      phone: "0912345678",
    },
    question: "Có cần nhịn ăn trước khi xét nghiệm không?",
    answer: "Có, bạn nên nhịn ăn ít nhất 8 tiếng.",
  }, {
    id: 4,
    patient: {
      name: "Trần Thị B",
      age: 28,
      gender: "Nữ",
      phone: "0912345678",
    },
    question: "Có cần nhịn ăn trước khi xét nghiệm không?",
    answer: "Có, bạn nên nhịn ăn ít nhất 8 tiếng.",
  },
]
  // Thông tin bác sĩ
  const doctorInfo = {
    doctorId: "D-123456",
    doctorName: "BS. Nguyễn Văn A",
    specialty: "Nội khoa tổng quát",
    stats: {
      total: 120,
      booked: 15,
      completed: 105,
    },
  }

export default function DoctorFAQ() {
  const [FAQs, setFAQs] = useState<FAQ[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [replyText, setReplyText] = useState<Record<number, string>>({})
  const [selectStatus, setSelectStatus] = useState(-1)

  useEffect(() => {
    setFAQs(mockFAQs)
  }, [])

  const selectedFAQ = FAQs.find((faq) => faq.id === selectedId)

  const handleReply = (id: number) => {
    const reply = replyText[id]?.trim()
    if (!reply) return

    const updated = FAQs.map((faq) =>
      faq.id === id ? { ...faq, answer: reply } : faq
    )
    setFAQs(updated)
    setReplyText((prev) => ({ ...prev, [id]: "" }))
  }

  return (
    <div className="w-11/12 mx-auto my-12 space-y-16">
      <DoctorHeader
        doctorId={doctorInfo.doctorId}
        doctorName={doctorInfo.doctorName}
        specialty={doctorInfo.specialty}
        stats={doctorInfo.stats}
      />
      <section>
        <h1 className="text-3xl font-bold text-slate-800 mb-3 text-center">Giải đáp bệnh nhân</h1>
      </section>
      <section  >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 max-w-6xl mx-auto">
          <div className="flex flex-col gap-5 justify-center ">
            <div
              className={cn(
                "flex items-center gap-3 border rounded-lg p-4 transition bg-white",
                "hover:bg-gray-50 border-l-4 hover:cursor-pointer hover:border-blue-600",
                selectStatus === -1 ? "border-blue-600 bg-blue-50" : "border-gray-200"
              )}
              onClick={() => setSelectStatus(-1)}
            >
              <Inbox className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-sm text-slate-800">Tất cả</span>
            </div>

            <div
              className={cn(
                "flex items-center gap-3 border rounded-lg p-4 transition bg-white",
                "hover:bg-gray-50 border-l-4 hover:cursor-pointer hover:border-yellow-600",
                selectStatus === 0 ? "border-yellow-600 bg-yellow-50" : "border-gray-200"
              )}
              onClick={() => setSelectStatus(0)}
            >
              <MessageCircleQuestion className="h-5 w-5 text-yellow-600" />
              <span className="font-medium text-sm text-slate-800">Chưa trả lời</span>
            </div>

            <div
              className={cn(
                "flex items-center gap-3 border rounded-lg p-4 transition bg-white",
                "hover:bg-gray-50 border-l-4 hover:cursor-pointer hover:border-teal-600",
                selectStatus === 1 ? "border-teal-600 bg-teal-50" : "border-gray-200"
              )}
              onClick={() => setSelectStatus(1)}
            >
              <CheckCircle2 className="h-5 w-5 text-teal-600" />
              <span className="font-medium text-sm text-slate-800">Đã trả lời</span>
            </div>

          </div>
          <div className="col-span-2">
            <ScrollArea className="h-96 w-full rounded-lg bg-white ">
              <div className="space-y-4 p-4">
                {FAQs.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Không có câu hỏi hôm nay.</p>
                ) : (
                  FAQs.map((faq) => (
                    <div
                      key={faq.id}
                      className={cn(
                        "flex flex-col gap-4 border rounded-lg p-4 transition bg-white hover:bg-gray-50 border-l-4 hover:cursor-pointer",
                        faq.answer ? "hover:border-teal-600 " : "hover:border-yellow-600 ",
                        selectedId == faq.id ? (faq.answer ? " border-teal-600" : " border-yellow-600") : "border-gray-200"
                      )}
                      onClick={() => setSelectedId(selectedId != faq.id ? faq.id : null)}
                    >
                      <div className="flex ">
                        <div className="grow">
                          <div className="flex items-center gap-2 text-base font-semibold text-slate-800">
                            <User2 className="w-4 h-4 text-slate-500" />
                            {faq.patient.name}
                          </div>
                          <div className=" text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>06:30</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarDays className="w-4 h-4 text-gray-400" />
                              <span>12-06-2025</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">

                          <Badge
                            className={cn(
                              "text-xs font-medium h-6",
                              faq.answer
                                ? "bg-teal-100 text-teal-700 hover:bg-teal-50"
                                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-50"
                            )}
                          >
                            {faq.answer ? "Đã trả lời" : "Chưa trả lời"}
                          </Badge>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-600 rounded-full h-6 hover:bg-red-50 hover:text-red-600"
                          >
                            xóa
                          </Button>
                        </div>
                      </div>

                      <div className="text-base text-slate-700 leading-relaxed italic">
                        <span className="font-medium">Câu hỏi:</span> '{faq.question}''
                      </div>
                    </div>
                  ))
                )}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>

          {/* Right: Detail + Response */}
          <div className="col-span-2">
            {selectedFAQ ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-700 flex items-center gap-2">
                    <User className="h-5 w-5 text-teal-600" /> Hồ sơ bệnh nhân
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 text-sm text-gray-700">
                  {/* Thông tin cơ bản */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <span><strong>Họ tên:</strong> {selectedFAQ.patient.name}</span>
                    <span><strong>Giới tính:</strong> {selectedFAQ.patient.gender}</span>
                    <span><strong>SĐT:</strong> {selectedFAQ.patient.phone}</span>
                    <span><strong>Tuổi:</strong> {selectedFAQ.patient.age}</span>

                  </div>

                  {/* Thông tin y tế */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="flex items-start gap-2 ">
                      <Droplet className="w-4 h-4 text-red-500 mt-1" />
                      <div>
                        <strong>Nhóm máu</strong>
                        {/* <div>{selectedFAQ.patient.allergies || "Không có thông tin"}</div> */}
                        <div>O-</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 ">
                      <ShieldAlert className="w-4 h-4 text-yellow-500 mt-1" />
                      <div>
                        <strong>Dị ứng</strong>
                        {/* <div>{selectedFAQ.patient.allergies || "Không có thông tin"}</div> */}
                        <div>Penicillin</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 col-span-2">
                      <HeartPulse className="w-4 h-4 text-red-500 mt-1" />
                      <div>
                        <strong>Bệnh nền</strong>
                        {/* <div>{selectedFAQ.patient.medicalConditions || "Không có thông tin"}</div> */}
                        <div>Tăng huyết áp, Tiểu đường type 2</div>
                      </div>
                    </div>
                  </div>

                  {/* Câu hỏi */}
                  <div>
                    <p className="text-base font-medium text-slate-800 mb-1 flex items-center gap-1">
                      <MessageSquareText className="h-4 w-4 text-slate-500" /> Câu hỏi:
                    </p>
                    <p className="italic text-gray-700">"{selectedFAQ.question}"</p>
                  </div>

                  {/* Trả lời hoặc đã phản hồi */}
                  {selectedFAQ.answer ? (
                    <div className="bg-green-50 p-3 rounded border text-sm text-green-800">
                      <strong>Phản hồi:</strong> {selectedFAQ.answer}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Nhập phản hồi cho bệnh nhân..."
                        value={replyText[selectedFAQ.id] || ""}
                        onChange={(e) =>
                          setReplyText((prev) => ({
                            ...prev,
                            [selectedFAQ.id]: e.target.value,
                          }))
                        }
                      />
                      <Button
                        onClick={() => handleReply(selectedFAQ.id)}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        Gửi phản hồi
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="text-gray-500 text-sm mt-10 text-center">Chọn một câu hỏi để xem chi tiết.</div>
            )}
          </div>
        </div>

      </section>


    </div>

  )
}
