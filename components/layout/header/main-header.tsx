"use client";

import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDropdown from "./user-dropdown";
import useAuthStore from "@/store/auth";
import DoctorDropdown from "./doctor-dropdown";
import { useRouter } from "next/navigation";
import AdminDropdown from "./admin-dropdown";

export default function MainHeader() {
  const { isLoggedIn, role } = useAuthStore();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold text-teal-600">Med+</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <div
            onClick={() => {
              router.push("/chuyen-khoa");
            }}
            className="text-md font-medium hover:text-teal-600 transition-colors hover:cursor-pointer">
            Chuyên khoa
          </div>
          <div
            onClick={() => {
              router.push("/co-so-y-te");
            }}
            className="text-md font-medium hover:text-teal-600 transition-colors hover:cursor-pointer">
            Cơ sở y tế
          </div>
          <div
            onClick={() => {
              router.push("/bac-si");
            }}
            className="text-md font-medium hover:text-teal-600 transition-colors hover:cursor-pointer">
            Bác sĩ
          </div>
          <div
            onClick={() => {
              router.push("/dat-lich-kham");
            }}
            className="text-md font-medium hover:text-teal-600 transition-colors hover:cursor-pointer">
            Đặt lịch khám
          </div>
          <div
            onClick={() => {
              router.push("/huong-dan");
            }}
            className="text-md font-medium hover:text-teal-600 transition-colors hover:cursor-pointer">
            Hướng dẫn
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <>
            <Link
              href="/benh-nhan/ho-tro"
              className="text-sm font-medium hover:text-teal-600 transition-colors hidden sm:inline-flex"
              onClick={() => {
                router.push("/co-so-y-te");
              }}>
              Hỗ trợ
            </Link>
            {isLoggedIn ? (
              role === "patient" ? (
                <UserDropdown />
              ) : role === "doctor" ? (
                <DoctorDropdown />
              ) : role === "admin" ? (
                <AdminDropdown />
              ) : null
            ) : (
              <>
                <Button
                  variant="outline"
                  className="hidden md:inline-flex"
                  onClick={() => {
                    router.push("/xac-thuc/dang-nhap");
                  }}>
                  Đăng nhập
                </Button>
                <Button
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() => {
                    router.push("/xac-thuc/dang-ky");
                  }}>
                  Đăng ký
                </Button>
              </>
            )}

          </>
        </div>
      </div>
    </header>
  );
}
