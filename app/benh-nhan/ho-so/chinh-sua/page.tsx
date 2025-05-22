"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"

import Image from "next/image"
import { format } from "date-fns"

export default function EditProfilePage() {
  const [form, setForm] = useState({
    avatar: "/avatar-patient.jpg",
    name: "Nguyễn Văn A",
    dob: "1990-05-01",
    gender: "Nam",
    phone: "0909123456",
    email: "nguyenvana@gmail.com",
    address: "123 Nguyễn Trãi, Quận 5, TP.HCM",
    insuranceCode: "BHYT-0123456789",
    insuranceProvider: "Bảo hiểm Y tế Quốc gia",
    insuranceValidUntil: "2026-12-31",
    bloodType: "O+",
    height: 172,
    weight: 68,
    chronicDiseases: "Tăng huyết áp, Tiểu đường type 2",
    allergies: "Penicillin",
    medicalHistory: "Phẫu thuật ruột thừa năm 2015, Mổ khớp gối 2018",
    vaccinations: "Cúm, Viêm gan B"
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // Call API or save to backend
    console.log("Saving:", form)
    alert("Thông tin đã được cập nhật thành công.")
  }
  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      {children}
    </div>
  )
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-slate-800">Chỉnh sửa hồ sơ cá nhân</h1>
        <Button variant="outline" onClick={() => window.history.back()}>Quay lại</Button>
      </header>

      {/* Avatar + Basic Info */}
      <section className="bg-white p-6 rounded-lg shadow space-y-6">
        <div className="flex gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border border-teal-600">
            <Image src={form.avatar} alt="avatar" fill className="object-cover" />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Họ và tên">
              <Input name="name" value={form.name} onChange={handleChange} />
            </Field>
            <Field label="Ngày sinh">
              <Input name="dob" value={form.dob} type="date" onChange={handleChange} />
            </Field>
            <Field label="Giới tính">

              <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nam">Nam</SelectItem>
                  <SelectItem value="Nữ">Nữ</SelectItem>
                  <SelectItem value="Khác">Khác</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Số điện thoại">
              <Input name="phone" value={form.phone} onChange={handleChange} />
            </Field>
            <Field label="Email" >
              <Input name="email" value={form.email} onChange={handleChange} />
            </Field>
            <Field label="Địa chỉ">
              <Input name="address" value={form.address} onChange={handleChange} />
            </Field>
          </div>
        </div>
      </section>

      {/* Bảo hiểm y tế */}
      <section className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold text-slate-800">Thông tin bảo hiểm y tế</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Mã thẻ BHYT">
            <Input name="insuranceCode" value={form.insuranceCode} onChange={handleChange} />
          </Field>
          <Field label="Nhà cung cấp">
            <Input name="insuranceProvider" value={form.insuranceProvider} onChange={handleChange} />
          </Field>

          <Field label="Hạn sử dụng thẻ">
            <Input name="insuranceValidUntil" type="date" value={form.insuranceValidUntil} onChange={handleChange} />
          </Field>
        </div>
      </section>

      {/* Thông tin y tế */}
      <section className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold text-slate-800">Thông tin y tế</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Nhóm máu">
            <Input name="bloodType" value={form.bloodType} onChange={handleChange} />
          </Field>
          <Field label="Chiều cao (cm)">
            <Input name="height" value={form.height} onChange={handleChange} />
          </Field>
          <Field label="Cân nặng (kg)">
            <Input name="weight" value={form.weight} onChange={handleChange} />
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Field label="Bệnh nền">
            <Textarea name="chronicDiseases" value={form.chronicDiseases} onChange={handleChange} />
          </Field>
          <Field label="Dị ứng">
            <Textarea name="allergies" value={form.allergies} onChange={handleChange} />
          </Field>
          <Field label="Tiền sử bệnh">
            <Textarea name="medicalHistory" value={form.medicalHistory} onChange={handleChange} />
          </Field>
          <Field label="Lịch sử tiêm chủng">
            <Textarea name="vaccinations" value={form.vaccinations} onChange={handleChange} />
          </Field>
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="bg-teal-600 text-white hover:bg-teal-700">
          Lưu thay đổi
        </Button>
      </div>
    </main>
  )
}
