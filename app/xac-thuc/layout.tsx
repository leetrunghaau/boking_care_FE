'use client'
import type React from "react"
import Link from "next/link"
import { Stethoscope } from "lucide-react"
import useAuthStore from "@/store/auth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { role, hasHydrated } = useAuthStore()
  const router = useRouter()
  useEffect(() => {
    if (!hasHydrated) return;
    if (role == "patient") {
      router.push("/");
    } else if (role == "doctor") {
      router.push("/doctor/schedule");
    } else if (role == "admin") {
      router.push("/admin/facilities");
    }
  }, [role, hasHydrated])

  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
        <div className="container ">
          <Link href="/" className="flex items-center gap-2 ml-10">
            <Stethoscope className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold text-teal-600">Med+</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground mx-auto">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Med+. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  )
}
