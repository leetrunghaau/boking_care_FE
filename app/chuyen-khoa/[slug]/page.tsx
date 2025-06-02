"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import http from "@/helper/axios";
import { getIconByName } from "@/helper/icon-map";
import Link from "next/link";
import { handleApiError } from "@/helper/handle-error";

export default function SpecialtyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [specialty, setSpecialty] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<any>(`/specialty/${slug}`);
        console.log("chuyên khoa chi tết\n", res);
        setSpecialty(res);
      } catch (err) {
        handleApiError(
          err,
          "Có lỗi xảy ra, vui lòng thử lại sau",
          "Lấy thông tin chuyên khoa thất bại"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const Icon = getIconByName(specialty ? specialty.icon : "null");

  if (!specialty)
    return <p className="text-center py-20">Đang tải dữ liệu...</p>;

  const renderCommonDiseases = () => {
    if (!specialty?.disease || specialty.disease.length === 0) {
      return null;
    }

    return (
      <section className="px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Bệnh lý phổ biến
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {specialty.disease.map((disease: any, idx: number) => (
            <div key={idx} className="text-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow">
                <Image
                  src={disease.img || "/placeholder.svg"}
                  alt={disease.name || "Disease"}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-2 font-medium">{disease.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  const renderAdvantages = () => {
    if (!specialty?.advantages || specialty.advantages.length === 0) {
      return null; 
    }

    return (
      <section className="px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Tại sao nên chọn chuyên khoa này?
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-lg">
          {specialty.advantages.map((adv:any) => (
            <li key={adv.id}>{adv.name}</li>
          ))}
        </ul>
      </section>
    );
  };
  const renderSupportedHospitals = () => {
    if (!specialty?.hospitals || specialty.hospitals.length === 0) {
      return (
        <section className="px-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Cơ sở y tế hỗ trợ
          </h2>
          <p className="text-center text-muted-foreground">Không có cơ sở y tế hỗ trợ nào.</p>
        </section>
      );
    }

    return (
      <section className="px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Cơ sở y tế hỗ trợ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specialty.hospitals.map((hop: any) => (
            <div
              key={hop.id || hop.slug}
              className="bg-white p-4 rounded-md shadow-md flex gap-4"
            >
              <div className="relative w-28 h-20 shrink-0 rounded-md overflow-hidden">
                <Image
                  src={hop.thumbnail}
                  alt={hop.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{hop.name}</h3>
                <p className="text-sm text-muted-foreground">{hop.address}</p>
                <Link href={`/co-so-y-te/${hop.slug}`}>
                  <Button variant="link" className="text-teal-600 px-0 mt-1">
                    Xem chi tiết
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSpecialtyDoctors = () => {
    if (!specialty?.doctors || specialty.doctors.length === 0) {
      return (
        <section className="px-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Bác sĩ chuyên khoa
          </h2>
          <p className="text-center text-muted-foreground">Chưa có bác sĩ chuyên khoa nào.</p>
        </section>
      );
    }

    return (
      <section className="px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Bác sĩ chuyên khoa
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialty.doctors.map((doc: any) => {
            const ratingCount = Math.floor(doc.rating) || 0;
            return (
              <div
                key={doc.id || doc.slug}
                className="bg-white rounded-md shadow-md overflow-hidden"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={doc.img ?? "/placeholder.svg"}
                    alt={doc.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{doc.title}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(ratingCount)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">{`${doc.rating} (${doc.sumRating})`}</span>
                  </div>
                  <Button className="w-full bg-teal-600 text-white hover:bg-teal-700">
                    Đặt lịch khám
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };
  const renderSpecialtyFaqs = () => {
    if (!specialty?.faqs || specialty.faqs.length === 0) {
      return (
        <section className="px-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Câu hỏi thường gặp
          </h2>
          <p className="text-center text-muted-foreground">Chưa có câu hỏi thường gặp nào.</p>
        </section>
      );
    }

    return (
      <section className="px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Câu hỏi thường gặp
        </h2>
        <div className="space-y-4">
          {specialty.faqs.map((faq: any) => (
            <div key={faq.id} className="border p-4 rounded-md bg-slate-50">
              <h4 className="font-medium text-slate-700 mb-2">{faq.question}</h4>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };


  return (
    <div className="space-y-16">
      {/* Banner */}
      {specialty.img && (
        <div className="relative h-[300px] w-full">
          <Image
            src={specialty.img}
            alt="Banner chuyên khoa"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">
              {specialty.name}
            </h1>
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
            <h2 className="text-2xl font-bold mb-2 text-slate-800">
              {specialty.name}
            </h2>
            <p className="text-muted-foreground text-lg">
              {specialty.about}
            </p>
          </div>
        </div>
      </section>

      {/* Bệnh lý phổ biến */}

      {renderCommonDiseases()}

      {/* Ưu điểm */}
      {renderAdvantages()}

      {/* Bác sĩ */}
      {renderSpecialtyDoctors()}

      {/* Cơ sở y tế */}
      {renderSupportedHospitals()}
      {/* Câu hỏi thường gặp */}
      {renderSpecialtyFaqs()}

      {/* CTA cuối trang */}
      <section className="py-12 bg-teal-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Bạn đang có triệu chứng liên quan?
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Đặt lịch khám ngay để được tư vấn, chẩn đoán và điều trị hiệu quả với
          các bác sĩ hàng đầu.
        </p>
        <Button className="bg-white text-teal-600 hover:bg-slate-100 px-6 h-12 text-base font-medium">
          Đặt lịch khám
        </Button>
      </section>
    </div>
  );
}
