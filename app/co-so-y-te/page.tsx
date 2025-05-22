// app/co-so-y-te/page.tsx
"use client"
import HospitalCard, { Hospital } from "@/components/hospital/hospital-card";
import SubHeader from "@/components/sub-header";
import http from "@/helper/axios";
import { useEffect, useState } from "react";



const FacilitiesPage = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<Hospital[]>("/hospitals")
        setHospitals(res);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [])

  return (
    <>
      <section className="my-10">
        <div className="container justify-center mx-auto ">
          <SubHeader
            title="Cơ sở y tế"
            breadcrumbs={[
              { label: "Trang chủ", href: "/" },
              { label: "Chuyên khoa", href: "/cơ sở y tế" }
            ]}
          />
        </div>
      </section>
      <section className="container mx-auto py-10 w-11/12">
        <h1 className="text-2xl font-bold mb-6">Danh sách cơ sở y tế</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <HospitalCard hospital={hospital} />
          ))}

        </div>
      </section>
    </>
  );
};

export default FacilitiesPage;
