import { CheckCircle2 } from 'lucide-react'
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className="relative">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2",
                  index < currentStep
                    ? "bg-teal-600 border-teal-600 text-white"
                    : index === currentStep
                    ? "border-teal-600 text-teal-600"
                    : "border-gray-300 text-gray-300"
                )}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-1/2 w-[calc(100%-2.5rem)] h-0.5 -right-1/2",
                    index < currentStep ? "bg-teal-600" : "bg-gray-300"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-2 text-center",
                index <= currentStep ? "text-teal-600 font-medium" : "text-gray-500"
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
