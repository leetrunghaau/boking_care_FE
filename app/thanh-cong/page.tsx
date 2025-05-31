"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SuccessPageProps {
  title?: string;
  description?: string;
  message?: string;
  buttonText?: string;
  link?: string;
}

export default function SuccessPage({
  title,
  description,
  message,
  buttonText,
  link,
}: SuccessPageProps) {
  const searchParams = useSearchParams();
  const action = searchParams.get("action") || "booking";
  const router = useRouter();

  const defaultMessages = {
    register: {
      title: "Đăng ký thành công!",
      description: "Tài khoản của bạn đã được tạo thành công.",
      message:
        "Chúng tôi đã gửi một email xác nhận đến địa chỉ email của bạn. Vui lòng kiểm tra hộp thư đến và xác nhận email của bạn để hoàn tất quá trình đăng ký.",
      button: "Đăng nhập ngay",
      link: "/xac-thuc/dang-nhap",
    },
    booking: {
      title: "Đặt lịch khám thành công",
      description: "Lịch khám của bạn đã được tạo thành công.",
      message:
        "Chúng tôi đã gửi một email xác nhận đến địa chỉ email của bạn. Vui lòng kiểm tra hộp thư đến và xác nhận email của bạn để hoàn tất quá trình đăng ký.",
      button: "Xem lịch khám",
      link: "/benh-nhan/lich-kham",
    },
    password_reset: {
      title: "Đặt lại mật khẩu thành công!",
      description: "Mật khẩu của bạn đã được đặt lại thành công.",
      message: "Bạn có thể đăng nhập vào tài khoản của mình bằng mật khẩu mới.",
      button: "Đăng nhập ngay",
      link: "/xac-thuc/dang-nhap",
    },
  };

  const current =
    defaultMessages[action as keyof typeof defaultMessages] ||
    defaultMessages.register;

  const displayTitle = title || current.title;
  const displayDescription = description || current.description;
  const displayMessage = message || current.message;
  const displayButtonText = buttonText || current.button;
  const displayLink = link || current.link;

  return (
    <Card className="w-full  shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {displayTitle}
        </CardTitle>
        <CardDescription className="text-center">
          {displayDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <CheckCircle className="h-16 w-16 text-green-600" />
          <p className="text-muted-foreground max-w-md">{displayMessage}</p>
          <Button
            onClick={() => router.push(displayLink)}
            className="mt-4 bg-teal-600 hover:bg-teal-700">
            {displayButtonText}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Cần hỗ trợ?{" "}
          <Link
            href="/contact"
            className="text-teal-600 hover:text-teal-700 font-medium">
            Liên hệ với chúng tôi
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
