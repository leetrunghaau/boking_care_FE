"use client";

import { useState } from "react";
import Stepper from "@/components/booking/stepper";
import SubHeader from "@/components/sub-header";
import Summary from "@/components/booking/summary";
import SelectTime from "@/components/booking/select-time";
import { BookingData } from "@/components/booking/type";
import SelectSpecialty from "@/components/booking/select-specialty";
import { SelectDoctor } from "@/components/booking/select-doctor";
import PatientInformation from "@/components/booking/patient-info";

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({
    specialty: null,
    doctor: null,
    date: new Date(),
    time: null,
    patient: {
      name: "Nguyễn Văn A",
      phone: "0912345678",
      email: "nguyenvana@example.com",
      dob: new Date("1990-05-15"),
      gender: "male",
      address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
      reason: "Khám định kỳ",

      allergies: ["Phấn hoa", "Penicillin"],
      medicalHistory: [
        "Phẫu thuật ruột thừa năm 2015",
        "Chấn thương đầu gối năm 2018",
      ],
    },
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return bookingData.specialty !== null;
      case 1:
        return bookingData.doctor !== null;
      case 2:
        return bookingData.time !== null && bookingData.date !== null;
      case 3:
        return (
          bookingData.patient.name.trim() !== "" &&
          bookingData.patient.phone.trim() !== "" &&
          bookingData.patient.email.trim() !== ""
        );
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <SelectSpecialty
            selectedSpecialty={bookingData.specialty}
            onSpecialtySelect={(specialty) => updateBookingData({ specialty })}
          />
        );
      case 1:
        return (
          <SelectDoctor
            specialty={bookingData.specialty}
            selectedDoctor={bookingData.doctor}
            onDoctorSelect={(doctor) => updateBookingData({ doctor })}
          />
        );
      case 2:
        return (
          <SelectTime
            doctor={bookingData.doctor}
            specialty={bookingData.specialty}
            selectedDate={bookingData.date}
            selectedTime={bookingData.time}
            timeChange={(time) => updateBookingData({ time })}
            dateChange={(date) => updateBookingData({ date })}
          />
        );
      case 3:
        return (
          <PatientInformation
            patientInfo={bookingData.patient}
            patientChange={(patient) => updateBookingData({ patient })}
          />
        );
      case 4:
        return <Summary bookingData={bookingData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <section className="my-10">
        <div className="container mx-auto px-6">
          <SubHeader
            title="Đặt lịch khám trực tuyến"
            breadcrumbs={[
              { label: "Trang chủ", href: "/" },
              { label: "Đặt lịch khám", href: "/dat-lich-kham" },
            ]}
          />
        </div>
      </section>

      <section>
        <Stepper currentStep={step} stepClick={(i) => setStep(i)} />
      </section>

      <section className="w-11/12 mx-auto min-h-[500px]">
        <div>{renderStepContent()}</div>
      </section>

      <section className="w-11/12 mx-auto mb-10">
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="text-gray-600 px-4 py-2 disabled:opacity-50"
            disabled={step === 0}>
            Quay lại
          </button>
          <button
            onClick={handleNext}
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canProceed()}>
            {step === 4 ? "Hoàn thành" : "Tiếp tục"}
          </button>
        </div>
      </section>
    </>
  );
}
