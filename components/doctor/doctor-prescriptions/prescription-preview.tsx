"use client"

import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { ArrowLeft, Printer, Send } from "lucide-react"

interface PrescriptionPreviewProps {
  patientName: string
  patientAge: number
  patientGender: string
  diagnosis: string
  date: Date
  onBack: () => void
  onPrint: () => void
  onSend: () => void
}

export function PrescriptionPreview({
  patientName,
  patientAge,
  patientGender,
  diagnosis,
  date,
  onBack,
  onPrint,
  onSend,
}: PrescriptionPreviewProps) {
  // Dữ liệu mẫu cho đơn thuốc
  const medications = [
    {
      name: "Paracetamol 500mg",
      dosage: "1 viên",
      frequency: "3 lần/ngày",
      duration: "5 ngày",
      instructions: "Uống sau khi ăn. Nếu sốt cao trên 39°C, có thể uống 4 lần/ngày, cách nhau ít nhất 4 giờ.",
    },
    {
      name: "Amoxicillin 500mg",
      dosage: "1 viên",
      frequency: "2 lần/ngày",
      duration: "7 ngày",
      instructions: "Uống sau khi ăn. Uống đủ liệu trình kể cả khi đã cảm thấy khỏe.",
    },
    {
      name: "Loratadine 10mg",
      dosage: "1 viên",
      frequency: "1 lần/ngày",
      duration: "5 ngày",
      instructions: "Uống vào buổi sáng. Có thể gây buồn ngủ, tránh lái xe sau khi uống thuốc.",
    },
  ]

  const generalInstructions =
    "Uống nhiều nước, nghỉ ngơi đầy đủ. Tránh thức ăn cay nóng, đồ uống có cồn. Tái khám sau 7 ngày hoặc khi triệu chứng nặng hơn."

  const doctorInfo = {
    name: "BS. Nguyễn Văn B",
    specialty: "Nội khoa tổng quát",
    license: "12345/BYT-CCHN",
    hospital: "Bệnh viện Đa khoa XYZ",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Quay lại
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPrint}>
            <Printer className="h-4 w-4 mr-1" />
            In đơn thuốc
          </Button>
          <Button onClick={onSend} className="bg-teal-600 hover:bg-teal-700">
            <Send className="h-4 w-4 mr-1" />
            Gửi cho bệnh nhân
          </Button>
        </div>
      </div>

      {/* Xem trước đơn thuốc */}
      <div className="border rounded-md p-6 bg-white">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold uppercase text-teal-700">Đơn thuốc</h2>
          <p className="text-sm text-slate-500">Ngày kê đơn: {format(date, "dd/MM/yyyy", { locale: vi })}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm">
              <span className="font-medium">Họ tên bệnh nhân:</span> {patientName}
            </p>
            <p className="text-sm">
              <span className="font-medium">Tuổi:</span> {patientAge}
            </p>
            <p className="text-sm">
              <span className="font-medium">Giới tính:</span> {patientGender}
            </p>
          </div>
          <div>
            <p className="text-sm">
              <span className="font-medium">Chẩn đoán:</span> {diagnosis || "Viêm đường hô hấp trên"}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium border-b pb-2 mb-3">Thuốc điều trị</h3>
          <div className="space-y-4">
            {medications.map((med, index) => (
              <div key={index} className="border-b pb-3">
                <div className="flex items-baseline">
                  <span className="font-medium text-teal-700 mr-2">{index + 1}.</span>
                  <div className="flex-1">
                    <p className="font-medium">{med.name}</p>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <p className="text-sm">
                        <span className="text-slate-500">Liều dùng:</span> {med.dosage}
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-500">Tần suất:</span> {med.frequency}
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-500">Thời gian:</span> {med.duration}
                      </p>
                    </div>
                    <p className="text-sm mt-1">
                      <span className="text-slate-500">Hướng dẫn:</span> {med.instructions}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium border-b pb-2 mb-3">Hướng dẫn chung</h3>
          <p className="text-sm">{generalInstructions}</p>
        </div>

        <div className="flex justify-end mt-8">
          <div className="text-center">
            <p className="font-medium">{doctorInfo.name}</p>
            <p className="text-sm">{doctorInfo.specialty}</p>
            <p className="text-sm text-slate-500">Số CCHN: {doctorInfo.license}</p>
            <p className="text-sm text-slate-500">{doctorInfo.hospital}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
