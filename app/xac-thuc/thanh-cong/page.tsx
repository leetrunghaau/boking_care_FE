"use client"
// app/auth/success/page.tsx
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const action = searchParams.get("action") || "register"
  const router = useRouter()

  const messages = {
    register: {
      title: "Đăng ký thành công!",
      description: "Tài khoản của bạn đã được tạo thành công.",
      message:
        "Chúng tôi đã gửi một email xác nhận đến địa chỉ email của bạn. Vui lòng kiểm tra hộp thư đến và xác nhận email của bạn để hoàn tất quá trình đăng ký.",
      button: "Đăng nhập ngay",
    },
    password_reset: {
      title: "Đặt lại mật khẩu thành công!",
      description: "Mật khẩu của bạn đã được đặt lại thành công.",
      message: "Bạn có thể đăng nhập vào tài khoản của mình bằng mật khẩu mới.",
      button: "Đăng nhập ngay",
    },
  }

  const currentMessage = messages[action as keyof typeof messages] || messages.register

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{currentMessage.title}</CardTitle>
        <CardDescription className="text-center">{currentMessage.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <CheckCircle className="h-16 w-16 text-green-600" />
          <p className="text-muted-foreground max-w-md">{currentMessage.message}</p>
          <Button onClick={() => router.push("/xac-thuc/dang-nhap")} className="mt-4 bg-teal-600 hover:bg-teal-700">
            {currentMessage.button}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Cần hỗ trợ?{" "}
          <Link href="/contact" className="text-teal-600 hover:text-teal-700 font-medium">
            Liên hệ với chúng tôi
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
