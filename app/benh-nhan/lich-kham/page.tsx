"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarCheck, MapPin, Stethoscope, Clock3, XCircle, CheckCircle, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const appointments = [
  {
    id: 1,
    code: "APPT-20250522-001",
    date: "2025-05-22",
    time: "14:00",
    doctor: "TS.BS. Nguyễn Văn A",
    specialty: "Tim mạch",
    facility: "BV Đại học Y Dược TP.HCM",
    facilityAddress: "215 Hồng Bàng, Quận 5, TP.HCM",
    doctorAvatar: "/doctors/bs-a.jpg",
    status: "Đã xác nhận"
  },
  {
    id: 2,
    code: "APPT-20250525-002",
    date: "2025-05-25",
    time: "09:30",
    doctor: "ThS.BS. Trần Thị B",
    specialty: "Thần kinh",
    facility: "Phòng khám Vinmec Times City",
    facilityAddress: "458 Minh Khai, Hai Bà Trưng, Hà Nội",
    doctorAvatar: "/doctors/bs-b.jpg",
    status: "Chờ xác nhận"
  },
  {
    id: 3,
    code: "APPT-20250515-003",
    date: "2025-05-15",
    time: "08:00",
    doctor: "PGS.TS. Lê Văn C",
    specialty: "Da liễu",
    facility: "BV Da Liễu Trung Ương",
    facilityAddress: "15A Phương Mai, Đống Đa, Hà Nội",
    doctorAvatar: "/doctors/bs-c.jpg",
    status: "Đã khám"
  }
  ,
  {
    id: 4,
    code: "APPT-20250515-003",
    date: "2025-05-15",
    time: "08:00",
    doctor: "PGS.TS. Lê Văn C",
    specialty: "Da liễu",
    facility: "BV Da Liễu Trung Ương",
    facilityAddress: "15A Phương Mai, Đống Đa, Hà Nội",
    doctorAvatar: "/doctors/bs-c.jpg",
    status: "Đã khám"
  }
]

export default function UpcomingAppointmentsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <header className="flex items-center justify-between border-b pb-4 mb-6">
        <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
          <CalendarCheck className="text-teal-600 w-7 h-7" />
          Lịch khám sắp tới
        </h1>
        <Link href="/dat-lich-kham">
          <Button className="bg-teal-600 text-white hover:bg-teal-700">+ Đặt lịch mới</Button>
        </Link>
      </header>

      {appointments.length === 0 ? (
        <div className="text-center text-muted-foreground text-lg">
          Bạn chưa có lịch khám nào.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-teal-500 border-l-4 border-teal-600"
            >
              {/* Doctor Avatar */}
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-teal-500 mb-4">
                <Image
                  src={appt.doctorAvatar}
                  alt="Ảnh bác sĩ"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Appointment Information */}
              <div className="space-y-2 text-center">
                <h2 className="text-xl font-semibold text-slate-800">{appt.doctor}</h2>
                <p className="text-sm text-teal-500 flex items-center justify-center gap-2">
                  <Stethoscope className="w-4 h-4" /> {appt.specialty}
                </p>
                <p className="text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 inline" /> {appt.facility} - {appt.facilityAddress}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center">
                  <Clock3 className="w-4 h-4" /> {appt.date} lúc {appt.time}
                </p>

                {/* Status */}
                <div className="mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(appt.status)}`}>
                    {appt.status}
                  </span>
                </div>

                {/* Appointment Actions */}
                <div className="mt-4 flex justify-center gap-4">
                  <Link href={`/benh-nhan/lich-kham/${appt.id}`}>
                    <Button variant="outline" size="sm">Xem chi tiết</Button>
                  </Link>
                  {appt.status === "Chờ xác nhận" && (
                    <Button variant="destructive" size="sm">
                      <XCircle className="w-4 h-4 mr-1" /> Hủy lịch
                    </Button>
                  )}
                  {appt.status === "Đã xác nhận" && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Đến khám
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

// Trạng thái badge màu
function statusBadge(status: string) {
  switch (status) {
    case "Đã xác nhận":
      return "bg-green-100 text-green-700"
    case "Chờ xác nhận":
      return "bg-yellow-100 text-yellow-700"
    case "Đã khám":
      return "bg-gray-100 text-gray-700"
    case "Bị hủy":
      return "bg-red-100 text-red-700"
    default:
      return "bg-slate-100 text-slate-700"
  }
}
