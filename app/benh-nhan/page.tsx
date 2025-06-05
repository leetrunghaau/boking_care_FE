"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Bell,
  Calendar,
  FileText,
  UserCircle2,
  Lock,
  Stethoscope,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import http from "@/helper/axios"

const upcomingAppointments = [
  {
    id: "A123456",
    date: "2025-05-22",
    time: "14:00",
    status: "Đã xác nhận",
    doctor: "TS.BS. Nguyễn Văn A",
    doctorAvatar: "/placeholder.svg",
    specialty: "Tim mạch",
    facility: "BV Đại học Y Dược TP.HCM",
  },
  {
    id: "A123457",
    date: "2025-05-28",
    time: "09:30",
    status: "Chờ xác nhận",
    doctor: "ThS.BS. Trần Thị B",
    doctorAvatar: "/placeholder.svg",
    specialty: "Thần kinh",
    facility: "PK Quốc tế Vinmec",
  },
]

const notifications = [
  "⏰ Hệ thống bảo trì từ 0h00 - 2h00 ngày 20/05.",
  "🎁 Ưu đãi khám miễn phí định kỳ tháng 5 đang diễn ra!",
]

export default function DashboardPage() {

  const [info, setInfo] =useState<any | null>(null)
const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const res = await http.get<any[]>("/patient/info");
        setInfo(res);
        console.log("Fetched appointments:", res);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <>
      {/* Header / Patient Info */}
      <section className="flex items-center justify-between mx-auto w-11/12 my-12 ">
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 rounded-full ring-2 ring-teal-500 overflow-hidden">
            <Image src="/placeholder.svg" alt="Avatar" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Chào, Nguyễn Văn A</h1>
            {/* <p className="text-muted-foreground text-sm">Mã bệnh nhân: <strong>BN102945</strong></p> */}
            <p className="text-sm text-slate-500">Lượt khám đã thực hiện: <strong>5</strong></p>
          </div>
        </div>
        <Link href="/dat-lich-kham">
          <Button size="lg" className="bg-teal-600 text-white hover:bg-teal-700">
            + Đặt lịch khám mới
          </Button>
        </Link>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto w-11/12 my-12">
        <div className="p-4 bg-teal-50 rounded-lg text-center shadow">
          <p className="text-sm text-muted-foreground">Lịch hẹn sắp tới</p>
          <p className="text-2xl font-bold text-teal-600">2</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg text-center shadow">
          <p className="text-sm text-muted-foreground">Thông báo chưa đọc</p>
          <p className="text-2xl font-bold text-yellow-600">2</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg text-center shadow">
          <p className="text-sm text-muted-foreground">Hồ sơ y tế</p>
          <p className="text-2xl font-bold">Cập nhật</p>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg text-center shadow">
          <p className="text-sm text-muted-foreground">Lịch sử khám</p>
          <p className="text-2xl font-bold">5 lần</p>
        </div>
      </section>

      {/* Upcoming Appointments */}
      <section className="mx-auto w-11/12  my-12">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-teal-600" />
          Lịch khám sắp tới
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingAppointments.map((appt, idx) => (
            <div key={idx} className="p-5 bg-white rounded-lg shadow border-l-4 border-teal-600 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image src={appt.doctorAvatar} alt={appt.doctor} width={48} height={48} />
                </div>
                <div>
                  <h3 className="font-semibold">{appt.doctor}</h3>
                  <p className="text-sm text-muted-foreground">{appt.specialty}</p>
                </div>
              </div>
              <p className="text-sm">🕒 {appt.date} lúc {appt.time}</p>
              <p className="text-sm">🏥 {appt.facility}</p>
              <p className="text-sm text-teal-600 font-medium">Trạng thái: {appt.status}</p>
              <Link href={`/lich-kham/${appt.id}`}>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Xem chi tiết
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section className="mx-auto w-11/12 my-12">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
          <Bell className="h-5 w-5 text-yellow-500" />
          Thông báo mới
        </h2>
        <div className="space-y-2">
          {notifications.map((note, idx) => (
            <div key={idx} className="bg-yellow-50 px-4 py-3 rounded-md text-sm text-slate-800 border border-yellow-100">
              {note}
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="mx-auto w-11/12 my-12">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Liên kết nhanh</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <Link href="/benh-nhan/ho-so">
            <div className="p-4 bg-white hover:bg-slate-50 border rounded-md text-center transition shadow">
              <UserCircle2 className="mx-auto h-6 w-6 text-teal-600" />
              <p className="mt-2 text-sm font-medium">Hồ sơ cá nhân</p>
            </div>
          </Link>
          <Link href="/benh-nhan/lich-kham">
            <div className="p-4 bg-white hover:bg-slate-50 border rounded-md text-center transition shadow">
              <Calendar className="mx-auto h-6 w-6 text-teal-600" />
              <p className="mt-2 text-sm font-medium">Lịch khám</p>
            </div>
          </Link>
          <Link href="/benh-nhan/lich-su-kham">
            <div className="p-4 bg-white hover:bg-slate-50 border rounded-md text-center transition shadow">
              <FileText className="mx-auto h-6 w-6 text-teal-600" />
              <p className="mt-2 text-sm font-medium">Lịch sử khám</p>
            </div>
          </Link>
          <Link href="/benh-nhan/tai-khoan">
            <div className="p-4 bg-white hover:bg-slate-50 border rounded-md text-center transition shadow">
              <Lock className="mx-auto h-6 w-6 text-teal-600" />
              <p className="mt-2 text-sm font-medium">Cài đặt tài khoản</p>
            </div>
          </Link>
        </div>
      </section>
   </>
  )
}
