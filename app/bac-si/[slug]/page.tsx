"use client";
import Image from "next/image";
import { MapPin, Briefcase, Phone, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import DoctorReviews from "@/components/doctor-page/detail/doctor-reviews";
import DoctorAbout from "@/components/doctor-page/detail/doctor-about";
import { useParams, useSearchParams } from "next/navigation";
import DoctorExperience from "@/components/doctor-page/detail/doctor-experience";
import { useEffect, useState } from "react";
import http from "@/helper/axios";
import { handleApiError } from "@/helper/toast-utils";
import DoctorSchedule from "@/components/doctor-page/detail/doctor-schedule";
import HospitalInfo from "@/components/doctor-page/detail/hospital-info";
import { getFullURL } from "@/helper/url";

export default function DoctorDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  // https://localhost:3000/bac-si/nguyen-van-an-000001?rating=1
  const [doctor, setDoctor] = useState<any | null>();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const ratingQuery = searchParams.get("rating");
  const [tab, setTab] = useState(ratingQuery ? "reviews" : "about");
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await http.get<any | null>(`/doctor-site/doctor/${slug}`);
        console.log("chi tiết bác sĩ\n", res);
        setDoctor(res);
      } catch (err) {
        handleApiError(err, "Lấy chi tiết bác sĩ thất bại.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <section className="my-10">
        <div className="container justify-center mx-auto w-11/12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Doctor Info Card */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative w-40 h-40 mx-auto md:mx-0 rounded-lg overflow-hidden border">
                        <Image
                          src={
                            getFullURL(doctor?.img) ||
                            `/placeholder.svg?height=300&width=300`
                          }
                          alt={doctor?.name ?? "bac si"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h1 className="text-2xl font-bold">{doctor?.name}</h1>
                      <p className="text-muted-foreground">{}</p>

                      <div className="flex items-center gap-1 mt-2 justify-center md:justify-start">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor?.rating}</span>
                        <span className="text-muted-foreground">
                          ({doctor?.reviews} đánh giá)
                        </span>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-start gap-2 justify-center md:justify-start">
                          <Briefcase className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>
                            {doctor?.specialty?.name ?? "Bác sĩ tổng hợp"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 justify-center md:justify-start">
                          <MapPin className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>
                            {doctor?.hospital?.address ??
                              doctor?.address ??
                              "không có thông tin"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 justify-center md:justify-start">
                          <Phone className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>Hotline: {doctor?.phone}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                        {doctor?.technique.slice(0, 3).map((i: any) => (
                          <Badge
                            key={i.id}
                            variant="outline"
                            className="bg-teal-50 text-teal-700 hover:bg-teal-100">
                            {i.name}
                          </Badge>
                        ))}
                        {doctor && doctor.technique.length > 3 && (
                          <Badge variant="outline" className="bg-slate-50">
                            +{doctor.technique.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs Section */}
              <Tabs value={tab} onValueChange={setTab} className="mb-8">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="about">Giới thiệu</TabsTrigger>
                  <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
                  <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
                  {/* <TabsTrigger value="faq">Câu hỏi</TabsTrigger> */}
                </TabsList>
                <TabsContent value="about" className="space-y-6">
                  <DoctorAbout doctor={doctor} />
                </TabsContent>
                <TabsContent value="experience" className="space-y-6">
                  <DoctorExperience doctor={doctor} />
                </TabsContent>
                <TabsContent value="reviews">
                  <DoctorReviews slug={slug} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              <DoctorSchedule slug={slug} />
              <HospitalInfo  slug={slug} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
