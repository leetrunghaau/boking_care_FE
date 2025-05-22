"use client";

import { useEffect, useState } from "react";
import http from "@/helper/axios";
import SubHeader from "@/components/sub-header";
import DoctorCard, { Doctor } from "@/components/doctor-page/docter-card";
import DoctorSearchFilter from "@/components/doctor-page/search-filter";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await http.get<Doctor[]>(`/doctor-site/doctors`);
        setDoctors(res);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = (query: string) => {
    console.log("query test", query);
  };

  return (
    <>
      <section className="my-10">
        <div className="container justify-center mx-auto">
          <SubHeader
            title="Bác sĩ"
            breadcrumbs={[
              { label: "Trang chủ", href: "/" },
              { label: "Bác sĩ", href: "/bac-si" },
            ]}
          />
        </div>
      </section>

      <section className="my-10">
        <DoctorSearchFilter onSearch={handleSearch} />
      </section>

      <section className="my-10">
        <div className="container justify-center mx-auto w-11/12">
          <h2 className="text-xl font-semibold mb-4">Kết quả tìm kiếm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div>Đang tải...</div>
            ) : (
              doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
