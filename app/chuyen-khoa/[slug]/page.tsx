"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Brain, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import http from "@/helper/axios"
import { getIconByName } from "@/helper/icon-map"
import Link from "next/link"



export default function SpecialtyDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [specialty, setSpecialty] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<any>(`/specialty/${slug}`)
        console.log("chuyên khoa chi tết\n", res)
        setSpecialty(res);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [])

  const Icon = getIconByName(specialty ? specialty.icon : "null")

  if (!specialty) return <p className="text-center py-20">Đang tải dữ liệu...</p>

  return (
    <div className="space-y-16">
      {/* Banner */}
      {specialty.specialty.img && (
        <div className="relative h-[300px] w-full">
          <Image
            src={specialty.specialty.img}
            alt="Banner chuyên khoa"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">{specialty.specialty.name}</h1>
          </div>
        </div>
      )}

      {/* Mô tả */}
      <section className="px-6 max-w-5xl mx-auto">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center ">
            <Icon className="h-10 w-10 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-slate-800">{specialty.specialty.name}</h2>
            <p className="text-muted-foreground text-lg">{specialty.specialty.about}</p>
          </div>
        </div>
      </section>

      {/* Bệnh lý phổ biến */}
      <section className="px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Bệnh lý phổ biến</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {specialty.specialty.commonDiseases.map((disease: any, idx: number) => (
            <div key={idx} className="text-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow">
                <Image src={disease.img} alt={disease.name} fill className="object-cover" />
              </div>
              <p className="mt-2 font-medium">{disease.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ưu điểm */}
      <section className="px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Tại sao nên chọn chuyên khoa này?</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-lg">
          {specialty.specialty.advantages.map((adv: string, idx: number) => (
            <li key={idx}>{adv}</li>
          ))}
        </ul>
      </section>

      {/* Bác sĩ */}
      <section className="px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Bác sĩ chuyên khoa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialty.doctors.map((doc: any, idx: number) => (
            <div key={idx} className="bg-white rounded-md shadow-md overflow-hidden">
              <div className="relative w-full h-56">
                <Image src={doc.img} alt={doc.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{doc.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{doc.title}</p>
                <div className="flex items-center gap-1 mb-3">
                  {Array(Math.floor(doc.rating))
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  <span className="text-sm text-muted-foreground">({doc.sumRating})</span>
                </div>
                <Button className="w-full bg-teal-600 text-white hover:bg-teal-700">Đặt lịch khám</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cơ sở y tế */}
      <section className="px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Cơ sở y tế hỗ trợ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specialty.hospitals.map((hop: any, idx: number) => (
            <div key={idx} className="bg-white p-4 rounded-md shadow-md flex gap-4">
              <div className="relative w-28 h-20 shrink-0 rounded-md overflow-hidden">
                <Image src={hop.thumbnail} alt={hop.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-semibold">{hop.name}</h3>
                <p className="text-sm text-muted-foreground">{hop.address}</p>
                <Link href={`/co-so-y-te/${hop.slug}`}>
                  <Button variant="link" className="text-teal-600 px-0 mt-1">Xem chi tiết</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Câu hỏi thường gặp */}
      <section className="px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Câu hỏi thường gặp</h2>
        <div className="space-y-4">
          {specialty.specialty.faqs.map((faq: any, idx: number) => (
            <div key={idx} className="border p-4 rounded-md bg-slate-50">
              <h4 className="font-medium text-slate-700 mb-2">{faq.question}</h4>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA cuối trang */}
      <section className="py-12 bg-teal-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Bạn đang có triệu chứng liên quan?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Đặt lịch khám ngay để được tư vấn, chẩn đoán và điều trị hiệu quả với các bác sĩ hàng đầu.
        </p>
        <Button className="bg-white text-teal-600 hover:bg-slate-100 px-6 h-12 text-base font-medium">
          Đặt lịch khám
        </Button>
      </section>
    </div>
  )
}
