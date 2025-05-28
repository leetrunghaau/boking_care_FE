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
import { AlertTriangle, Bell, CheckCircle, Flame, Info, XCircle } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} variant={props.variant}>
            <div className="flex items-start gap-3">
              {props.variant === "success" && (
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              )}
              {props.variant === "error" && (
                <XCircle className="w-5 h-5 text-red-600 mt-1" />
              )}
              {props.variant === "warning" && (
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
              )}
              {props.variant === "info" && (
                <Info className="w-5 h-5 text-blue-600 mt-1" />
              )}
              {props.variant === "destructive" && (
                <Flame className="w-5 h-5 text-red-500 mt-1" />
              )}
              {(props.variant === undefined || props.variant === "default") && (
                <Bell className="w-5 h-5 text-gray-500 mt-1" />
              )}
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
