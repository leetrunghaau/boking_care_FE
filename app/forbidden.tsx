"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

export default function Forbidden() {
  const [progress, setProgress] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const totalDuration = 3000;
    const intervalDuration = 50;
    const increment = 100 / (totalDuration / intervalDuration);

    const interval = setInterval(() => {
      setProgress((old) => {
        const newProgress = old + increment;
        if (newProgress >= 100) {
          clearInterval(interval);
          setRedirect(true);
          return 100;
        }
        return newProgress;
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (redirect) {
      router.replace("/");
    }
  }, [redirect, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-8 space-y-6">
          {/* icon */}
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">
              Quyền truy cập bị hạn chế
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Tài khoản của bạn không có quyền truy cập vào khu vực này của hệ
              thống y tế. Bạn sẽ được chuyển về trang chủ trong{" "}
              <span className="font-semibold text-blue-600">
                {Math.ceil((3000 - (progress / 100) * 3000) / 1000)} giây
              </span>
              .
            </p>
          </div>

          {/* Progress indicator */}
          <Progress value={progress} />

          {/* Help text */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Nếu bạn cần hỗ trợ, vui lòng liên hệ với bộ phận IT hoặc quản trị
              viên hệ thống.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
