"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Pencil, User, ShieldCheck, BriefcaseMedical, Heart, Airplay } from "lucide-react"
import Link from "next/link"

// Mock data for patient profile
const mockPatientProfile = {
  avatar: "/avatar-patient.jpg",
  name: "Nguyễn Văn A",
  dob: "1990-05-01",
  gender: "Nam",
  phone: "0909 123 456",
  email: "nguyenvana@gmail.com",
  address: "123 Nguyễn Trãi, Quận 5, TP.HCM",
  insurance: {
    code: "BHYT-0123456789",
    provider: "Bảo hiểm Y tế Quốc gia",
    validUntil: "2026-12-31"
  },
  medicalInfo: {
    bloodType: "O+",
    height: 172,
    weight: 68,
    chronicDiseases: ["Tăng huyết áp", "Tiểu đường type 2"],
    allergies: ["Penicillin"],
    medicalHistory: ["Phẫu thuật ruột thừa năm 2015", "Mổ khớp gối năm 2018"],
    vaccinations: ["Phòng ngừa cúm hàng năm", "Tiêm phòng viêm gan B"]
  }
}

export default function PatientProfilePage() {
  const profile = mockPatientProfile

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <section className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 rounded-full ring-4 ring-teal-500 overflow-hidden">
            <Image src={profile.avatar} alt="Avatar" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{profile.name}</h1>
            <p className="text-sm text-muted-foreground">Chào bạn, hãy cập nhật thông tin nếu có thay đổi.</p>
          </div>
        </div>
        <Link href="/benh-nhan/ho-so/chinh-sua">
          <Button className="flex items-center gap-2 text-sm">
            <Pencil className="w-4 h-4" /> Chỉnh sửa hồ sơ
          </Button>
        </Link>
      </section>

      {/* Thông tin cá nhân */}
      <section className="bg-white shadow rounded-lg p-8 space-y-6 border border-slate-100">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-slate-800">
          <User className="w-5 h-5 text-teal-600" />
          Thông tin cá nhân
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
          <div><strong>Ngày sinh:</strong> {profile.dob}</div>
          <div><strong>Giới tính:</strong> {profile.gender}</div>
          <div><strong>Số điện thoại:</strong> {profile.phone}</div>
          <div><strong>Email:</strong> {profile.email}</div>
          <div><strong>Địa chỉ:</strong> {profile.address}</div>
        </div>
      </section>

      {/* Thẻ bảo hiểm */}
      <section className="bg-white shadow rounded-lg p-8 space-y-6 border border-slate-100">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-slate-800">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          Thông tin bảo hiểm y tế
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
          <div><strong>Số thẻ:</strong> {profile.insurance.code}</div>
          <div><strong>Nhà cung cấp:</strong> {profile.insurance.provider}</div>
          <div><strong>Hiệu lực đến:</strong> {profile.insurance.validUntil}</div>
        </div>
      </section>

      {/* Thông tin y tế */}
      <section className="bg-white shadow rounded-lg p-8 space-y-6 border border-slate-100">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-slate-800">
          <BriefcaseMedical className="w-5 h-5 text-red-600" />
          Thông tin y tế
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
          <div><strong>Nhóm máu:</strong> {profile.medicalInfo.bloodType}</div>
          <div><strong>Chiều cao:</strong> {profile.medicalInfo.height} cm</div>
          <div><strong>Cân nặng:</strong> {profile.medicalInfo.weight} kg</div>
          <div><strong>Bệnh nền:</strong> {profile.medicalInfo.chronicDiseases.join(", ")}</div>
          <div><strong>Dị ứng:</strong> {profile.medicalInfo.allergies.join(", ")}</div>
          <div><strong>Tiền sử bệnh:</strong> {profile.medicalInfo.medicalHistory.join(", ")}</div>
          <div><strong>Vắc-xin đã tiêm:</strong> {profile.medicalInfo.vaccinations.join(", ")}</div>
        </div>
      </section>

      {/* Lịch sử khám */}
      <section className="bg-white shadow rounded-lg p-8 space-y-6 border border-slate-100">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-slate-800">
          <Heart className="w-5 h-5 text-teal-600" />
          Lịch sử khám
        </h2>
        <div className="space-y-4 text-sm text-slate-700">
          <div>
            <strong>Lần khám gần nhất:</strong> Khám tại Bệnh viện Đại học Y Dược TP.HCM, bác sĩ: TS.BS. Nguyễn Văn A
            <br />
            <strong>Chẩn đoán:</strong> Tăng huyết áp, yêu cầu theo dõi định kỳ.
            <br />
            <strong>Ngày khám:</strong> 2025-04-15
          </div>
          <Link href="/lich-su-kham">
            <Button variant="outline" className="w-full text-sm">Xem chi tiết lịch sử khám</Button>
          </Link>
        </div>
      </section>

      {/* Tải hồ sơ y tế */}
      <section className="bg-white shadow rounded-lg p-8 space-y-6 border border-slate-100">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-slate-800">
          <Airplay className="w-5 h-5 text-teal-600" />
          Tải hồ sơ y tế
        </h2>
        <div className="space-y-4">
          <Button variant="outline" className="w-full text-sm">
            Tải Hồ sơ y tế dưới dạng PDF
          </Button>
        </div>
      </section>
    </main>
  )
}
