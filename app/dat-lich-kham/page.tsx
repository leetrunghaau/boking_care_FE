"use client";

import { useEffect, useState } from "react";
import Stepper from "@/components/booking/stepper";
import SubHeader from "@/components/sub-header";
import Summary from "@/components/booking/summary";
import SelectTime from "@/components/booking/select-time";
import { BookingData } from "@/components/booking/type";
import SelectSpecialty from "@/components/booking/symptom-input";
import { SelectDoctor } from "@/components/booking/select-doctor";
import PatientInformation from "@/components/booking/patient-info";
import BookingStore from "@/store/booking";

export default function BookingPage() {
  const [step, setStep] = useState<number>(0);
  const { isLoaded, stepStore, setBooking } = BookingStore()
  useEffect(() => {
    setStep(stepStore)
  }, [isLoaded]);

  const stepClick = (nextStep: boolean) => {
    if (nextStep) {
      if (step < 4) {
        const newStep = step + 1
        setStep(newStep)
        setBooking({ stepStore: newStep })
      };
    } else {
      if (step > 0) {
         const newStep = step - 1
        setStep(newStep)
        setBooking({ stepStore: newStep })
      };
    }
  }
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <SelectSpecialty stepClick={stepClick} />
        );
      case 1:
        return (
          <SelectDoctor stepClick={stepClick} />
        )
          ;
      case 2:
        return (
          <SelectTime stepClick={stepClick} />
        );
      case 3:
        return (
          <PatientInformation stepClick={stepClick} />
        );
      case 4:
        // return <Summary stepClick={stepClick} />
        <></>
      default:
        return null;
    }
  };

  return (
    <>

      <section className="mt-10">
        <Stepper currentStep={step} stepClick={(i) => setStep(i)} />
      </section>

      <section className="w-11/12 mx-auto min-h-[500px]">
        <div>{renderStepContent()}</div>
      </section>
    </>
  );
}
