"use client"

import Link from "next/link"
import { Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { UserCircle, LogOut } from "lucide-react"
import UserDropdown from "./user-dropdown"

export default function AdminHeader() {
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
          <Link href="/" className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold text-teal-600">BookingCare</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <Link href="/chuyen-khoa" className="text-md font-medium hover:text-teal-600 transition-colors">
            Chuyên khoa
          </Link>
          <Link href="/co-so-y-te" className="text-md font-medium hover:text-teal-600 transition-colors">
            Cơ sở y tế
          </Link>
          <Link href="/bac-si" className="text-md font-medium hover:text-teal-600 transition-colors">
            Bác sĩ
          </Link>
          <Link href="/dat-lich-kham" className="text-md font-medium hover:text-teal-600 transition-colors">
            Đặt lịch khám
          </Link>
          <Link href="/huong-dan" className="text-md font-medium hover:text-teal-600 transition-colors">
            Hướng dẫn
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <>
          <Link
                  href="/benh-nhan"
                  className="text-sm font-medium hover:text-teal-600 transition-colors hidden sm:inline-flex"
                >
                  Hỗ trợ
                </Link>
            {isLoggedIn ? (
              <UserDropdown user={userInfo} />
            ) : (
              <>
                
                <Link
                  href="/xac-thuc/dang-nhap">
                  <Button variant="outline" className="hidden md:inline-flex">
                    Đăng nhập
                  </Button>
                </Link>
                <Link
                  href="/xac-thuc/dang-ky">
                  <Button className="bg-teal-600 hover:bg-teal-700">Đăng ký</Button>
                </Link>
              </>
            )}

          </>
        </div>
      </div>
    </header>
  )
}
