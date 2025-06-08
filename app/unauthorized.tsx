"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  useEffect(() => {
    if (countdown === 0) {
      router.push("/xac-thuc/dang-nhap");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <main className="min-h-screen ">
      <div className="max-w-md mx-auto pt-16 px-4">
        {/* Header section */}
        <div className="text-center mb-8 space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
              401 - Truy cập bị từ chối
            </h1>
            <p className="text-gray-700">
              Vui lòng đăng nhập để truy cập trang này.
            </p>
            <p className="text-sm text-gray-500">
              Tự động chuyển hướng sau {countdown} giây...
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="bg-white border border-teal-200 rounded-lg p-6 text-center shadow-lg">
          <p className="text-gray-700 mb-6">
            Bạn cần đăng nhập để xem nội dung này. Vui lòng đăng nhập hoặc liên
            hệ với quản trị viên nếu bạn cho rằng đây là lỗi.
          </p>

          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700"
              onClick={() => router.push("/xac-thuc/dang-nhap")}>
              Đăng nhập{" "}
            </Button>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:text-white hover:bg-black "
              onClick={() => router.push("/")}>
              Về trang chủ
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
