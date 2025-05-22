'use client'

import SpecialtyCard from "@/components/specialties/SpecialtyCard"
import SubHeader from "@/components/sub-header"
import { Brain, Heart, Eye, Bone, Baby, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import http from "@/helper/axios"
import { CardLoading, Loading } from "@/components/ui/loading"

interface Specialty {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export default function SpecialtyListPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<Specialty[]>("/specialties")
        setSpecialties(res);
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
        <div className="container mx-auto px-6 ">
          <SubHeader
            title="Chuyên khoa"
            breadcrumbs={[
              { label: "Trang chủ", href: "/" },
              { label: "Chuyên khoa", href: "/chuyen-khoa" },
            ]}
          />
        </div>
      </section>


      <section className="my-6">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Khám theo chuyên khoa</h2>
          <p className="text-muted-foreground text-lg">
            Lựa chọn chuyên khoa phù hợp để được thăm khám và tư vấn với bác sĩ chuyên môn cao, tiết kiệm thời gian và chi phí.
          </p>
        </div>
      </section>


      <section className="my-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {isLoading ?
              <>
                <CardLoading />
                <CardLoading />
                <CardLoading />
              </>
              : specialties.map((item) => (
                <SpecialtyCard key={item.slug} {...item} />
              ))
            }

          </div>
        </div>
      </section>


      <section className="my-16 bg-teal-50 py-12">
        <div className="container mx-auto px-6 max-w-3xl text-center space-y-4">
          <h3 className="text-2xl font-semibold text-teal-700">Chưa biết nên khám chuyên khoa nào?</h3>
          <p className="text-muted-foreground text-lg">
            Đừng lo, hãy để chúng tôi tư vấn miễn phí cho bạn để lựa chọn đúng chuyên khoa và bác sĩ.
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-12 text-base">
            Nhận tư vấn miễn phí
          </Button>
        </div>
      </section>
    </>
  )
}
