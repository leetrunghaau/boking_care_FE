"use client";
import { toast } from "@/hooks/use-toast";

export function handleApiError(
  error: unknown,
  fallbackMessage = "Đã xảy ra lỗi",
  title: string
) {
  console.error(error);

  const message =
    typeof error === "object" && error !== null && "message" in error
      ? (error as any).message
      : fallbackMessage;

  toast({
    title,
    description: message,
    variant: "destructive",
    duration: 2000,
  });
}
