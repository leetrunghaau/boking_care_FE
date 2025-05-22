"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { LogOut, User, Calendar, Settings, Bell, CalendarClock, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function DoctorDropdown({
  user,
}: {
  user: { name: string; avatar?: string }
}) {
  const router = useRouter()

  const handleLogout = () => {
    // Xử lý đăng xuất ở đây (xoá token, gọi API, v.v.)
    alert("Đăng xuất thành công")
    router.push("/xac-thuc/dang-nhap")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 p-1 pr-5 hover:bg-teal-100 dark:hover:bg-teal-800 rounded-full"
        >
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-slate-600 dark:text-white" />
          )}
          <span className="hidden md:inline font-medium text-sm text-slate-700 dark:text-white">
            {user.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      
<DropdownMenuContent className="w-56" align="end">
  <DropdownMenuLabel className="text-sm">
    Xin chào, {user.name}
  </DropdownMenuLabel>
  <DropdownMenuSeparator />

  <DropdownMenuItem
    onClick={() => router.push("/doctor/profile")}
    className="hover:cursor-pointer"
  >
    <User className="w-4 h-4 mr-2" />
    Hồ sơ cá nhân
  </DropdownMenuItem>

  <DropdownMenuItem
    onClick={() => router.push("/doctor/notifications")}
    className="hover:cursor-pointer"
  >
    <Bell className="w-4 h-4 mr-2" />
    Thông báo
  </DropdownMenuItem>

  <DropdownMenuItem
    onClick={() => router.push("/doctor/settings")}
    className="hover:cursor-pointer"
  >
    <Settings className="w-4 h-4 mr-2" />
    Cài đặt
  </DropdownMenuItem>

  <DropdownMenuSeparator />

  <DropdownMenuItem
    onClick={handleLogout}
    className="hover:cursor-pointer"
  >
    <LogOut className="w-4 h-4 mr-2 text-red-500" />
    <span className="text-red-500">Đăng xuất</span>
  </DropdownMenuItem>
</DropdownMenuContent>
    </DropdownMenu>
  )
}
