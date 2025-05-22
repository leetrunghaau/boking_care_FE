import { cn } from "@/lib/utils"

const steps = ["Thông tin cá nhân", "Chuyên khoa", "Bác sĩ/Cơ sở", "Thời gian", "Xác nhận"]

export default function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex justify-between items-center relative max-w-4xl mx-auto mb-12 px-4">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 text-center relative">
          {/* Line nối giữa các bước */}
          {index < steps.length - 1 && (
            <div className="absolute top-5 left-1/2 right-[-50%] h-0.5 bg-gray-300 z-0" />
          )}

          {/* Hình tròn chứa số */}
          <div
            className={cn(
              "relative z-10 w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium",
              index < currentStep
                ? "bg-teal-600 text-white"
                : index === currentStep
                ? "border-4 border-teal-600 text-teal-600 bg-white"
                : "bg-gray-200 text-gray-600"
            )}
          >
            <span className="leading-none">{index + 1}</span>
          </div>

          {/* Tên bước */}
          <p className={cn(
            "text-sm mt-2",
            index === currentStep ? "font-semibold text-teal-600" : "text-gray-600"
          )}>
            {step}
          </p>
        </div>
      ))}
    </div>
  )
}
