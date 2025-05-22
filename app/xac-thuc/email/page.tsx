"use client"
// app/auth/verify-email/page.tsx

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError("Token không hợp lệ hoặc đã hết hạn")
        setIsLoading(false)
        return
      }

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // For demo purposes, we'll consider the verification successful
        setIsVerified(true)
      } catch (error) {
        setError("Có lỗi xảy ra khi xác thực email của bạn")
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [token])

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Xác thực email</CardTitle>
        <CardDescription className="text-center">Xác thực địa chỉ email của bạn</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-16 w-16 text-teal-600 animate-spin" />
            <p className="text-lg">Đang xác thực email của bạn...</p>
          </div>
        ) : isVerified ? (
          <div className="flex flex-col items-center space-y-4 text-center">
            <CheckCircle className="h-16 w-16 text-green-600" />
            <h3 className="text-xl font-bold">Email đã được xác thực!</h3>
            <p className="text-muted-foreground">
              Cảm ơn bạn đã xác thực email. Bây giờ bạn có thể đăng nhập vào tài khoản của mình.
            </p>
            <Button onClick={() => router.push("/xac-thuc/dang-nhap")} className="mt-4 bg-teal-600 hover:bg-teal-700">
              Đăng nhập
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4 text-center">
            <XCircle className="h-16 w-16 text-red-600" />
            <h3 className="text-xl font-bold">Xác thực thất bại</h3>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => router.push("/xac-thuc/dang-nhap")} variant="outline" className="mt-4">
              Quay lại đăng nhập
            </Button>
          </div>
        )}
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
