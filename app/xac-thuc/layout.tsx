import type React from "react"
import Link from "next/link"
import { Stethoscope } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
        <div className="container ">
          <Link href="/" className="flex items-center gap-2 justify-center">
            <Stethoscope className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold text-teal-600">BookingCare</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} BookingCare. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  )
}
