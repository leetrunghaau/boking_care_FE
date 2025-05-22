"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stepper } from "@/app/booking/components/stepper"
import { SelectSpecialty } from "@/app/booking/components/select-specialty"
import { SelectDoctor } from "@/app/booking/components/select-doctor"
import { SelectDateTime } from "@/app/booking/components/select-date-time"
import { PatientInformation } from "@/app/booking/components/patient-information"
import { BookingSummary } from "@/app/booking/components/booking-summary"

export default function BookingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [bookingData, setBookingData] = useState({
    specialty: null,
    doctor: null,
    date: null,
    time: null,
    patientInfo: {
      name: "",
      phone: "",
      email: "",
      dob: "",
      gender: "",
      address: "",
      reason: "",
      notes: "",
    },
  })

  const steps = [
    { id: "specialty", title: "Chuyên khoa" },
    { id: "doctor", title: "Bác sĩ" },
    { id: "datetime", title: "Ngày & Giờ" },
    { id: "information", title: "Thông tin" },
    { id: "summary", title: "Xác nhận" },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Simulate API call to submit booking
    console.log("Submitting booking:", bookingData)
    
    // Redirect to confirmation page
    router.push("/booking/confirmation")
  }

  const updateBookingData = (data: any) => {
    setBookingData({ ...bookingData, ...data })
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Đặt lịch khám</h1>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Đặt lịch khám trực tuyến</CardTitle>
          <CardDescription>
            Đặt lịch khám nhanh chóng, tiện lợi và được tư vấn bởi đội ngũ bác sĩ chuyên môn cao
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Stepper steps={steps} currentStep={currentStep} />
          
          <div className="mt-8">
            {currentStep === 0 && (
              <SelectSpecialty 
                selectedSpecialty={bookingData.specialty} 
                onSelect={(specialty) => updateBookingData({ specialty })}
              />
            )}
            
            {currentStep === 1 && (
              <SelectDoctor 
                selectedDoctor={bookingData.doctor}
                specialty={bookingData.specialty}
                onSelect={(doctor) => updateBookingData({ doctor })}
              />
            )}
            
            {currentStep === 2 && (
              <SelectDateTime 
                selectedDate={bookingData.date}
                selectedTime={bookingData.time}
                doctor={bookingData.doctor}
                onSelect={(dateTime) => updateBookingData(dateTime)}
              />
            )}
            
            {currentStep === 3 && (
              <PatientInformation 
                patientInfo={bookingData.patientInfo}
                onChange={(patientInfo) => updateBookingData({ patientInfo })}
              />
            )}
            
            {currentStep === 4 && (
              <BookingSummary bookingData={bookingData} />
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Quay lại
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button 
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !bookingData.specialty) ||
                (currentStep === 1 && !bookingData.doctor) ||
                (currentStep === 2 && (!bookingData.date || !bookingData.time)) ||
                (currentStep === 3 && (!bookingData.patientInfo.name || !bookingData.patientInfo.phone))
              }
            >
              Tiếp tục
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Xác nhận đặt lịch
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
