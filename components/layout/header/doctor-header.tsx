"use client"

import Link from "next/link"
import { Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { UserCircle, LogOut } from "lucide-react"
import DoctorDropdown from "./doctor-dropdown"

export default function DoctorHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Giả sử trạng thái đăng nhập
  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Văn A", // Tên người dùng
    avatar: "/placeholder.svg", // Ảnh đại diện mặc định
  })

  const handleLogout = () => {
    // Xử lý đăng xuất (ví dụ xóa token, hoặc session)
    setIsLoggedIn(false)
    alert("Đã đăng xuất!")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/doctor" className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold text-teal-600">BookingCare</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <Link href="/doctor/schedule" className="text-md font-medium hover:text-teal-600 transition-colors">
            Lịch làm việc
          </Link>
          <Link href="/doctor/appointments" className="text-md font-medium hover:text-teal-600 transition-colors">
            Lịch hẹn
          </Link>
          <Link href="/doctor/ratings" className="text-md font-medium hover:text-teal-600 transition-colors">
            Đánh giá
          </Link>
          <Link href="/doctor/FAQ" className="text-md font-medium hover:text-teal-600 transition-colors">
            FAQ
          </Link>
          <Link href="/doctor/support" className="text-md font-medium hover:text-teal-600 transition-colors">
            Hổ trợ
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <>
            <DoctorDropdown user={userInfo} />

          </>
        </div>
      </div>
    </header>
  )
}
