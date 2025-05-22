"use client"
// app/auth/forgot-password/page.tsx
import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setError("")
  }

  const validateForm = () => {
    if (!email.trim()) {
      setError("Vui lòng nhập email")
      return false
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Email không hợp lệ")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)

      toast({
        title: "Yêu cầu đã được gửi",
        description: "Vui lòng kiểm tra email của bạn để đặt lại mật khẩu",
      })
    } catch (error) {
      toast({
        title: "Yêu cầu thất bại",
        description: "Có lỗi xảy ra, vui lòng thử lại sau",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Quên mật khẩu</CardTitle>
        <CardDescription className="text-center">Nhập email của bạn để nhận liên kết đặt lại mật khẩu</CardDescription>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={handleChange}
                disabled={isLoading}
                className={error ? "border-red-500" : ""}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử lý...
                </>
              ) : (
                "Gửi liên kết đặt lại"
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="bg-green-50 text-green-700 p-4 rounded-md">
              <p>Chúng tôi đã gửi email với hướng dẫn đặt lại mật khẩu đến {email}.</p>
              <p className="mt-2">Vui lòng kiểm tra hộp thư đến của bạn.</p>
            </div>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setEmail("")
              }}
              variant="outline"
              className="mt-4"
            >
              Thử với email khác
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          <Link href="/xac-thuc/dang-nhap" className="text-teal-600 hover:text-teal-700 font-medium">
            Quay lại đăng nhập
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
