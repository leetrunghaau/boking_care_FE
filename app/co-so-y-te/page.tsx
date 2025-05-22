// app/co-so-y-te/page.tsx
"use client"
import HospitalCard, { Hospital } from "@/components/hospital/hospital-card";
import HospitalList from "@/components/hospital/hospital-list";
import SubHeader from "@/components/sub-header";
import http from "@/helper/axios";
import { HospitalSV } from "@/service/hospital";
import { useEffect, useState } from "react";

const fakeData: Hospital[] = [
  {
    id: 1,
    name: "Bệnh viện Đại học Y Hà Nội",
    slug: "dai-hoc-y-ha-noi",
    address: "Số 1 Tôn Thất Tùng, Đống Đa, Hà Nội",
    thumbnail: "/placeholder.svg?text=BV+1",
  },
  {
    id: 2,
    name: "Bệnh viện Bạch Mai",
    slug: "bach-mai",
    address: "78 Giải Phóng, Đống Đa, Hà Nội",
    thumbnail: "/placeholder.svg?text=BV+2",
  },
  {
    id: 3,
    name: "Phòng khám Đa khoa Quốc tế",
    slug: "da-khoa-quoc-te",
    address: "123 Lê Lợi, Quận 1, TP.HCM",
    thumbnail: "/placeholder.svg?text=PK+3",
  },
];

const FacilitiesPage = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const dataRS = await http.get<Hospital[]>("/hospitals")
        console.log(dataRS)
        // setHospitals(dataRS)
      } catch (err) {
        console.error('Failed to load users:', err);
      }
    };

    fetchUsers();
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
        <HospitalList hospitals={fakeData} />
      </section>
    </>
  );
};

export default FacilitiesPage;
