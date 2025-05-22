import type React from "react"
import { cn } from "@/lib/utils"
import { Loader2, RefreshCw, Hourglass } from "lucide-react"

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variant of the loading indicator
   * @default "spinner"
   */
  variant?: "spinner" | "dots" | "pulse" | "skeleton" | "circular" | "hourglass" | "refresh"

  /**
   * Size of the loading indicator
   * @default "default"
   */
  size?: "sm" | "default" | "lg" | "xl" | "2xl" | "fullWidth"

  /**
   * Text to display with the loading indicator
   */
  text?: string

  /**
   * Whether to center the loading indicator
   * @default false
   */
  center?: boolean

  /**
   * Whether to show the loading indicator in a full page overlay
   * @default false
   */
  fullPage?: boolean

  /**
   * Color of the loading indicator
   * @default "primary"
   */
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info"
}

const colorVariants = {
  primary: "text-teal-600",
  secondary: "text-gray-600",
  success: "text-green-600",
  warning: "text-yellow-600",
  danger: "text-red-600",
  info: "text-blue-600",
}

const sizeVariants = {
  sm: "h-4 w-4",
  default: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
  "2xl": "h-24 w-24",
  fullWidth: "w-full",
}

export function Loading({
  variant = "spinner",
  size = "default",
  text,
  center = false,
  fullPage = false,
  color = "primary",
  className,
  ...props
}: LoadingProps) {
  const colorClass = colorVariants[color]
  const sizeClass = sizeVariants[size]

  const loadingContent = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        center && "mx-auto",
        fullPage && "fixed inset-0 bg-white/80 z-50",
        className,
      )}
      {...props}
    >
      {variant === "spinner" && (
        <div className={cn("animate-spin rounded-full border-4 border-t-transparent", colorClass, sizeClass)} />
      )}

      {variant === "dots" && (
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "rounded-full animate-pulse",
                colorClass,
                size === "sm"
                  ? "h-2 w-2"
                  : size === "lg"
                    ? "h-4 w-4"
                    : size === "xl"
                      ? "h-5 w-5"
                      : size === "2xl"
                        ? "h-6 w-6"
                        : "h-3 w-3",
              )}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}

      {variant === "pulse" && (
        <div
          className={cn(
            "animate-pulse rounded-md bg-current opacity-70",
            colorClass,
            size === "fullWidth" ? "h-2 w-full" : sizeClass,
          )}
        />
      )}

      {variant === "skeleton" && (
        <div className={cn("animate-pulse rounded-md bg-gray-200", size === "fullWidth" ? "h-4 w-full" : sizeClass)} />
      )}

      {variant === "circular" && (
        <div className="relative">
          <div className={cn("rounded-full border-4 border-gray-200", sizeClass)} />
          <div
            className={cn(
              "absolute top-0 left-0 rounded-full border-4 border-t-transparent animate-spin",
              colorClass,
              sizeClass,
            )}
          />
        </div>
      )}

      {variant === "hourglass" && <Hourglass className={cn("animate-spin", colorClass, sizeClass)} />}

      {variant === "refresh" && <RefreshCw className={cn("animate-spin", colorClass, sizeClass)} />}

      {text && <p className={cn("text-center", colorClass)}>{text}</p>}
    </div>
  )

  return loadingContent
}

/**
 * Skeleton loading component for content placeholders
 */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-gray-200", className)} {...props} />
}

/**
 * Button loading spinner component
 */
export function ButtonLoading({ className }: { className?: string }) {
  return <Loader2 className={cn("mr-2 h-4 w-4 animate-spin", className)} />
}

/**
 * Full page loading overlay
 */
export function PageLoading({ text = "Đang tải..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent" />
        {text && <p className="text-teal-600 font-medium">{text}</p>}
      </div>
    </div>
  )
}

/**
 * Table loading component
 */
export function TableLoading({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
    </div>
  )
}

/**
 * Card loading component
 */
export function CardLoading() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

/**
 * Form loading component
 */
export function FormLoading({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  )
}
