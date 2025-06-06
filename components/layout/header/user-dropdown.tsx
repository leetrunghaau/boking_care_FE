"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  LogOut,
  User,
  Settings,
  Bell,
  CalendarClock,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import http from "@/helper/axios";
import { getFullURL } from "@/helper/url";

export default function UserDropdown() {
  const router = useRouter();
  const { logOut } = useAuthStore();
  const { toast } = useToast();
  const [user, setUser] = useState<any | null>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllFacilities = async () => {
      try {
        const res = await http.get<any>(`/sig/info`);
        setUser(res);
      } catch (err) {
        const e = err as Error;
        toast({
          title: "Lỗi",
          description: e.message,
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllFacilities();
  }, []);
  const handleLogout = () => {
    logOut();
    toast({
      title: "Thành công!",
      description: "Bạn đã đăng xuất thành công.",
      variant: "success",
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 p-1 pr-5 hover:bg-teal-100 dark:hover:bg-teal-800 rounded-full">
          {user?.img ? (
            <Image
              src={getFullURL(user.img)!}
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-slate-600 dark:text-white" />
          )}
          <span className="hidden md:inline font-medium text-sm text-slate-700 dark:text-white">
            {user?.name ?? ""}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="text-sm">
          <h2 className="text-sm font-bold bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
            Xin chào, {user?.name ?? ""}
          </h2>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push("/benh-nhan")}
          className="hover:cursor-pointer">
          <User className="w-4 h-4 mr-2" />
          Tài khoản
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/benh-nhan/thong-bao")}
          className="hover:cursor-pointer">
          <Bell className="w-4 h-4 mr-2" />
          Thông báo
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/benh-nhan/lich-kham")}
          className="hover:cursor-pointer">
          <CalendarClock className="w-4 h-4 mr-2" />
          Lịch khám
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/benh-nhan/lich-su-kham")}
          className="hover:cursor-pointer">
          <History className="w-4 h-4 mr-2" />
          Lịch sử khám
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/benh-nhan/tai-khoan")}
          className="hover:cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          Cài đặt
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="hover:cursor-pointer">
          <LogOut className="w-4 h-4 mr-2 text-red-500" />
          <span className="text-red-500">Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
