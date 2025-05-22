"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarDays, MapPin, Stethoscope, FileText, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const medicalHistory = [
  {
    id: 1,
    date: "2025-04-10",
    time: "10:00",
    doctor: "TS.BS. Nguyễn Văn A",
    specialty: "Tim mạch",
    facility: "BV Đại học Y Dược TP.HCM",
    facilityAddress: "215 Hồng Bàng, Quận 5, TP.HCM",
    resultFile: "/files/ket-qua-kham-1.pdf",
    prescriptionFile: "/files/don-thuoc-1.pdf",
    status: "Đã khám",
    reviewStatus: "Chưa đánh giá",
    doctorAvatar: "/doctors/bs-a.jpg"
  },
  {
    id: 2,
    date: "2025-03-18",
    time: "15:30",
    doctor: "ThS.BS. Trần Thị B",
    specialty: "Thần kinh",
    facility: "Phòng khám Vinmec",
    facilityAddress: "458 Minh Khai, Hai Bà Trưng, Hà Nội",
    resultFile: "/files/ket-qua-kham-2.pdf",
    prescriptionFile: "/files/don-thuoc-2.pdf",
    status: "Đã khám",
    reviewStatus: "Đã đánh giá",
    doctorAvatar: "/doctors/bs-b.jpg"
  },
  {
    id: 3,
    date: "2025-02-25",
    time: "08:00",
    doctor: "PGS.TS. Lê Văn C",
    specialty: "Da liễu",
    facility: "BV Da Liễu Trung Ương",
    facilityAddress: "15A Phương Mai, Đống Đa, Hà Nội",
    resultFile: "/files/ket-qua-kham-3.pdf",
    prescriptionFile: "/files/don-thuoc-3.pdf",
    status: "Đã khám",
    reviewStatus: "Chưa đánh giá",
    doctorAvatar: "/doctors/bs-c.jpg"
  }
]

export default function LichSuKhamPage() {
  return (
    <main className="max-w-7xl mx-auto px-8 py-12 space-y-12">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
          <CalendarDays className="text-teal-600 w-7 h-7" />
          Lịch sử khám bệnh
        </h1>
        <Link href="/dat-lich-kham">
          <Button className="bg-teal-600 text-white hover:bg-teal-700">+ Đặt lịch mới</Button>
        </Link>
      </header>

      {medicalHistory.length === 0 ? (
        <div className="text-center text-muted-foreground text-lg">Bạn chưa có lịch sử khám bệnh nào.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {medicalHistory.map((appt) => (
            <div
              key={appt.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
            >
              {/* Doctor Avatar and Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-teal-600">
                  <Image
                    src={appt.doctorAvatar || "/default-avatar.jpg"}
                    alt="Ảnh bác sĩ"
                    layout="fill"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">{appt.doctor}</h3>
                  <p className="text-sm text-teal-500">{appt.specialty}</p>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {appt.facility} - {appt.facilityAddress}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> {appt.date} lúc {appt.time}
                </p>

                {/* Result and Prescription Links */}
                <div className="flex space-x-4 mt-4">
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

                {/* Review Section */}
                <div className="mt-4">
                  {appt.reviewStatus === "Chưa đánh giá" ? (
                    <Link href={`/danh-gia?apptId=${appt.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Star className="w-4 h-4" /> Đánh giá bác sĩ
                      </Button>
                    </Link>
                  ) : (
                    <span className="text-green-600 text-sm font-medium">Đã đánh giá</span>
                  )}
                </div>

                {/* Status Badge */}
                <div className="mt-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge(appt.status)}`}>
                    {appt.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

function statusBadge(status: string) {
  switch (status) {
    case "Đã khám":
      return "bg-green-100 text-green-700"
    case "Chờ xác nhận":
      return "bg-yellow-100 text-yellow-700"
    case "Đã hủy":
      return "bg-red-100 text-red-700"
    default:
      return "bg-slate-100 text-slate-700"
  }
}
