"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle, XCircle } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className={`border-l-4 p-4 shadow-md rounded-md ${props.variant === "success"
              ? "bg-green-50 border-green-500 text-green-800"
              : props.variant === "error"
                ? "bg-red-50 border-red-500 text-red-800"
                : "bg-white border-gray-300"
            }`}>
            <div className="flex items-start gap-3">
              {props.variant === "success" && <CheckCircle className="w-5 h-5 text-green-600 mt-1" />}
              {props.variant === "error" && <XCircle className="w-5 h-5 text-red-600 mt-1" />}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>

        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
