"use client"
import { useState } from "react"
import SelectDoctorOrFacilityStep from "@/components/booking/select-doctor-or-facility-step"
import SelectSpecialtyStep from "@/components/booking/select-specialty-step"
import SelectScheduleStep from "@/components/booking/select-schedule-step"
import Stepper from "@/components/booking/stepper"
import PatientInfoStep from "@/components/booking/patient-info-step"
import SubHeader from "@/components/sub-header"

export default function BookingPage() {
  const [step, setStep] = useState(0)

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <PatientInfoStep onNext={handleNext} onBack={handleBack} />
      case 1:
         return <SelectSpecialtyStep onNext={handleNext} onBack={handleBack} />
      case 2:
        return <SelectScheduleStep onNext={handleNext} onBack={handleBack} />
      case 3:
        return <PatientInfoStep onNext={handleNext} onBack={handleBack} />
      case 4:
        return <SelectDoctorOrFacilityStep onNext={handleNext} onBack={handleBack} />
       
      default:
        return null
    }
  }

  return (
    <>
      <section className="my-10">
        <div className="container mx-auto px-6 ">
          <SubHeader
            title="Đặt lịch khám"
            breadcrumbs={[
              { label: "Trang chủ", href: "/" },
              { label: "Đặt lịch khám", href: "/dat-lich-kham" },
            ]}
          />
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <Stepper currentStep={step} />
        <div>{renderStepContent()}</div>
      </div>
    </>
  )
}
