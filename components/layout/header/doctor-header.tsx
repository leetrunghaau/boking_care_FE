"use client";

import Link from "next/link";
import { Stethoscope } from "lucide-react";
import DoctorDropdown from "./doctor-dropdown";

export default function DoctorHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/doctor/schedule" className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold text-teal-600">
              Doctor.Med+
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {/* <Link
            href="/doctor"
            className="text-md font-medium hover:text-teal-600 transition-colors">
            Tổng quan
          </Link> */}
          <Link
            href="/doctor/schedule"
            className="text-md font-medium hover:text-teal-600 transition-colors">
            Lịch làm việc
          </Link>
          <Link
            href="/doctor/appointments"
            className="text-md font-medium hover:text-teal-600 transition-colors">
            Lịch hẹn
          </Link>
          {/* 
          <Link
            href="/doctor/FAQ"
            className="text-md font-medium hover:text-teal-600 transition-colors">
            FAQ
          </Link> */}
          {/* 
          <Link
            href="/doctor/ratings"
            className="text-md font-medium hover:text-teal-600 transition-colors">
            Đánh giá
          </Link> */}


          {/* <Link
            href="/doctor/ratings"
            className="text-md font-medium hover:text-teal-600 transition-colors">
            Hổ trợ
          </Link> */}
          <Link
            href="/doctor/notifications"
            className="text-md font-medium hover:text-teal-600 transition-colors">
            Thông báo
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <DoctorDropdown />
        </div>
      </div>
    </header>
  );
}
