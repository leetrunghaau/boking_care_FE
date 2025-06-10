"use client";

import { toast } from "@/hooks/use-toast";

// ✅ Thông báo lỗi API
export function handleApiError(
  error: unknown,
  fallbackMessage = "Đã xảy ra lỗi",
  title = "Thất bại"
) {
  console.error(error);

  const message =
    typeof error === "object" && error !== null && "message" in error
      ? (error as any).message
      : fallbackMessage;

  toast({
    title,
    description: message,
    variant: "error",
    duration: 2000,
  });
}

// ✅ Thông báo thành công API
export function handleApiSuccess(
  fallbackMessage = "Thao tác thành công!",
  title = "Thành công"
) {
  toast({
    title,
    description: fallbackMessage,
    variant: "success",
    duration: 2000,
  });
}

export function handleErorr(
  fallbackMessage = "Thao tác thất bại!",
  title = "Thất bại"
) {
  toast({
    title,
    description: fallbackMessage,
    variant: "error",
    duration: 2000,
  });
}

export function handleWarning(
  fallbackMessage = "Lưu ý thao tác!",
  title = "Cảnh báo"
) {
  toast({
    title,
    description: fallbackMessage,
    variant: "warning",
    duration: 2000,
  });
}

