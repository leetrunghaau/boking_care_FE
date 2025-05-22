"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Camera, Lock, Edit, Key, UserCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function AccountSettingsPage() {
    const { toast } = useToast()
    const [userInfo, setUserInfo] = useState({
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        avatar: "/default-avatar.jpg",
    })
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Handle password change
    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            // alert("Mật khẩu không khớp")
            toast({
                
                title: "Thành công!",
                description: "Bạn đã lưu thông tin thành công.",
                action: (
                    <Button variant="ghost" className="text-sm text-blue-600 hover:underline">
                        Hoàn tác
                    </Button>
                ),
                variant: "success",
                 duration: 2000, 

            })
            return
        }
        // Add password update logic here
        alert("Đổi mật khẩu thành công")
    }

    return (
        <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
            <header className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-semibold text-slate-800">Cài đặt tài khoản</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Thông tin cá nhân */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-6">Thông tin cá nhân</h2>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-teal-600">
                            <Image src={userInfo.avatar} alt="Ảnh đại diện" fill className="object-cover" />
                        </div>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Camera className="w-5 h-5" /> Thay đổi ảnh
                        </Button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Họ và tên</label>
                            <Input
                                id="name"
                                value={userInfo.name}
                                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                            <Input
                                id="email"
                                value={userInfo.email}
                                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Cập nhật mật khẩu */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-6">Cập nhật mật khẩu</h2>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-slate-700">Mật khẩu mới</label>
                            <Input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700">Xác nhận mật khẩu</label>
                            <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-2"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-teal-600 text-white hover:bg-teal-700">
                            Đổi mật khẩu
                        </Button>
                    </form>
                </div>
            </div>

            {/* Cài đặt bảo mật */}
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">Cài đặt bảo mật</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-700">Xác minh hai yếu tố (2FA)</p>
                        <Button variant="outline" className="bg-teal-600 text-white">
                            Bật
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-700">Thông báo bảo mật</p>
                        <Button variant="outline" className="bg-teal-600 text-white">
                            Bật
                        </Button>
                    </div>
                </div>
            </div>



            {/* Xóa tài khoản */}
            <div className="bg-white p-8 rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">Xóa tài khoản</h2>
                <p className="text-sm text-red-600 mb-4">Nếu bạn muốn xóa tài khoản của mình, tất cả dữ liệu liên quan sẽ bị mất.</p>
                <Button variant="destructive" className="w-full">
                    Xóa tài khoản
                </Button>
            </div>
        </main>
    )
}
