"use client"

import Image from "next/image"
import Link from "next/link"
import {
  BadgeCheck, CalendarDays, Clock, FileText,
  MapPin, Stethoscope, Info, User
} from "lucide-react"
import { Button } from "@/components/ui/button"

const mockAppointment = {
  id: 1,
  code: "APPT-20250522-001",
  patientId: "BN-1029",
  date: "2025-05-22",
  time: "14:00",
  doctor: {
    name: "TS.BS. Nguyễn Văn A",
    avatar: "/doctors/bs-a.jpg",
    specialty: "Tim mạch",
    experience: "20 năm kinh nghiệm",
    position: "Trưởng khoa Tim mạch",
    workplace: "BV Đại học Y Dược TP.HCM"
  },
  facility: {
    name: "BV Đại học Y Dược TP.HCM",
    address: "215 Hồng Bàng, Quận 5, TP.HCM",
    image: "/facilities/yduoc.jpg"
  },
  status: "Đã xác nhận",
  notes: "Bệnh nhân cần nhịn ăn ít nhất 6 tiếng trước khi khám. Vui lòng mang theo kết quả xét nghiệm gần nhất và đơn thuốc nếu có.",
  resultFile: "/files/ket-qua-kham.pdf",
  prescriptionFile: "/files/don-thuoc.pdf",
  allowCancel: true,
  allowCheckIn: true,
  alerts: [
    "Vui lòng đến trước 15 phút để làm thủ tục.",
    "Không sử dụng chất kích thích trong vòng 12 giờ trước khám."
  ]
}

export default function AppointmentDetailPage() {
  const appt = mockAppointment

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">

      {/* Tiêu đề và mã lịch hẹn */}
      <header className="border-b pb-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-1">Chi tiết lịch khám</h1>
            <p className="text-sm text-muted-foreground">Mã lịch hẹn: <span className="font-medium text-slate-700">{appt.code}</span></p>
            <p className="text-sm text-muted-foreground">Mã bệnh nhân: <span className="text-slate-700">{appt.patientId}</span></p>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600">{appt.status}</span>
          </div>
        </div>
      </header>

      {/* Thông tin bác sĩ */}
      <section className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow border">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border shadow-sm shrink-0">
          <Image src={appt.doctor.avatar} alt="Avatar bác sĩ" fill className="object-cover" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-800">{appt.doctor.name}</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-teal-600" /> {appt.doctor.specialty}
          </p>
          <p className="text-sm text-slate-600">{appt.doctor.position}</p>
          <p className="text-sm text-slate-600">{appt.doctor.experience}</p>
          <p className="text-sm text-slate-600"><strong>Cơ sở:</strong> {appt.doctor.workplace}</p>
          <Link href="/bac-si/nguyen-van-a">
            <Button variant="outline" size="sm" className="mt-3">Xem hồ sơ bác sĩ</Button>
          </Link>
        </div>
      </section>

      {/* Chi tiết lịch hẹn */}
      <section className="bg-white p-6 rounded-lg shadow border space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">Thông tin lịch khám</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p className="flex items-center gap-2 text-slate-700">
            <CalendarDays className="w-5 h-5 text-teal-600" />
            Ngày khám: <span className="font-medium">{appt.date}</span>
          </p>
          <p className="flex items-center gap-2 text-slate-700">
            <Clock className="w-5 h-5 text-teal-600" />
            Giờ khám: <span className="font-medium">{appt.time}</span>
          </p>
          <p className="flex items-center gap-2 text-slate-700 col-span-full">
            <MapPin className="w-5 h-5 text-teal-600" />
            Địa điểm: <span className="font-medium">{appt.facility.name} – {appt.facility.address}</span>
          </p>
        </div>
        <Image
          src={appt.facility.image}
          alt="Cơ sở y tế"
          width={800}
          height={400}
          className="rounded-md object-cover border mt-4"
        />
      </section>

      {/* Lưu ý từ bác sĩ */}
      {appt.notes && (
        <section className="bg-white p-6 rounded-lg shadow border space-y-2">
          <h3 className="text-lg font-semibold text-slate-800">Lưu ý từ bác sĩ</h3>
          <p className="text-sm text-slate-600">{appt.notes}</p>
        </section>
      )}

      {/* Cảnh báo quan trọng */}
      {appt.alerts.length > 0 && (
        <section className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-md shadow-sm">
          <h4 className="text-sm font-semibold text-yellow-700 flex items-center gap-2 mb-2">
            <Info className="w-4 h-4" /> Cảnh báo y tế
          </h4>
          <ul className="list-disc pl-5 text-sm text-yellow-800 space-y-1">
            {appt.alerts.map((alert, idx) => (
              <li key={idx}>{alert}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Tài liệu đính kèm */}
      {(appt.resultFile || appt.prescriptionFile) && (
        <section className="bg-white p-6 rounded-lg shadow border space-y-3">
          <h3 className="text-lg font-semibold text-slate-800">Tài liệu đính kèm</h3>
          <div className="flex flex-wrap gap-4">
            {appt.resultFile && (
              <Link href={appt.resultFile} target="_blank">
                <Button variant="secondary" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Kết quả khám
                </Button>
              </Link>
            )}
            {appt.prescriptionFile && (
              <Link href={appt.prescriptionFile} target="_blank">
                <Button variant="secondary" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Đơn thuốc
                </Button>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Hành động cuối */}
      <section className="pt-6 flex flex-wrap justify-end gap-4 border-t">
        {appt.allowCancel && (
          <Button variant="destructive">Huỷ lịch khám</Button>
        )}
        {appt.allowCheckIn && (
          <Button className="bg-green-600 text-white hover:bg-green-700">
            Check-in ngay
          </Button>
        )}
        <Link href={`/danh-gia?apptId=${appt.id}`}>
          <Button variant="outline">Đánh giá bác sĩ</Button>
        </Link>
      </section>
    </main>
  )
}
