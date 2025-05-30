"use client"
import PatientInformation from "@/components/booking/patient-info";
import { SelectDoctor } from "@/components/booking/select-doctor";
import SelectTime from "@/components/booking/select-time";
import Stepper from "@/components/booking/stepper";
import Summary from "@/components/booking/summary";
import SymptomInput from "@/components/booking/symptom-input";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const curStep = searchParams.get('curStep');
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const stepFromQuery = parseInt(curStep || '0', 10);
    if (!isNaN(stepFromQuery)) {
      setStep(stepFromQuery);
    }
  }, [curStep]);

  const renderStepContent = () => {
    switch (step) {
      case 0: return <SymptomInput />;
      case 1: return <SelectDoctor />;
      case 2: return <SelectTime />;
      case 3: return <PatientInformation />;
      case 4: return <Summary />;
      default: return null;
    }
  };

  return (
    <>
      <section className="mt-10">
        <Stepper currentStep={step} />
      </section>

      <section className="w-11/12 mx-auto min-h-[500px]">
        <div>{renderStepContent()}</div>
      </section>
    </>
  );
}
