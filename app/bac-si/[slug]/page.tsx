'use client'
import Image from "next/image"
import {
  MapPin,
  Briefcase,
  Heart,
  Share2,
  Phone,
  Star,
  CheckCircle,
  BookOpen,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import DoctorReviews from "@/components/doctor-page/detail/doctor-reviews"
import DoctorSchedule from "@/components/doctor-page/detail/doctor-schedule"
import DoctorAbout from "@/components/doctor-page/detail/doctor-about"
import { useParams } from "next/navigation"
import DoctorExperience from "@/components/doctor-page/detail/doctor-experience"
import DoctorFAQ from "@/components/doctor-page/detail/doctor-FAQ"
import HospitalInfo from "@/components/doctor-page/detail/hospital-info"
import { useEffect, useState } from "react"
import http from "@/helper/axios"



export default function DoctorDetailPage() {
  const params = useParams()
  const slug = params?.slug as string


  const [doctor, setDoctor] = useState<any | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await http.get<any | null>(`/doctor-site/doctor/${slug}`);
        console.log("chi tiết bác sĩ\n", res)
        setDoctor(res);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
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
                          src={doctor?.img ?? `/placeholder.svg?height=300&width=300`}
                          alt={doctor?.name ?? "bac si"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-4 flex justify-center md:justify-start gap-2">
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                          <Heart className="h-4 w-4" />
                          <span className="sr-only">Yêu thích</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                          <Share2 className="h-4 w-4" />
                          <span className="sr-only">Chia sẻ</span>
                        </Button>
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h1 className="text-2xl font-bold">{doctor?.name}</h1>
                      <p className="text-muted-foreground">{ }</p>

                      <div className="flex items-center gap-1 mt-2 justify-center md:justify-start">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor?.rating}</span>
                        <span className="text-muted-foreground">({doctor?.reviewCount} đánh giá)</span>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-start gap-2 justify-center md:justify-start">
                          <Briefcase className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>
                            Chuyên khoa {doctor?.specialty?.name}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 justify-center md:justify-start">
                          <MapPin className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{doctor?.hospital?.name}</span>
                        </div>
                        <div className="flex items-start gap-2 justify-center md:justify-start">
                          <Phone className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>Hotline: 1900 1234</span>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                        {doctor?.technique.slice(0, 3).map((spec: string, index: number) => (
                          <Badge key={index} variant="outline" className="bg-teal-50 text-teal-700 hover:bg-teal-100">
                            {spec}
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
              <Tabs defaultValue="about" className="mb-8">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="about">Giới thiệu</TabsTrigger>
                  <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
                  <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
                  <TabsTrigger value="faq">Câu hỏi</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  <DoctorAbout doctor={doctor}/>
                </TabsContent>

                <TabsContent value="experience" className="space-y-6">
                  <DoctorExperience doctor={doctor} />

                </TabsContent>

                <TabsContent value="reviews">
                  <DoctorReviews slug={slug} />
                </TabsContent>

                <TabsContent value="faq">
                  <DoctorFAQ slug={slug} />
                </TabsContent>
              </Tabs>

              {/* Similar Doctors */}
              {/* <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Bác sĩ tương tự</h2>
                  <Link href="/doctors" className="text-teal-600 hover:text-teal-700 flex items-center gap-1">
                    Xem thêm <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="w-24 h-24 relative">
                            <Image
                              src={`/placeholder.svg?height=100&width=100&text=BS${i}`}
                              alt={`Bác sĩ ${i}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium">Bác sĩ Nguyễn Văn {String.fromCharCode(65 + i)}</h3>
                            <p className="text-sm text-muted-foreground">Chuyên khoa Tim mạch</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">4.{8 + i}</span>
                            </div>
                            <Link
                              href={`/doctors/${i}`}
                              className="text-xs text-teal-600 hover:text-teal-700 mt-1 inline-block"
                            >
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div> */}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              <Card >
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-4">Đặt lịch khám</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Giá khám:</span>
                      <span className="font-medium">{doctor?.price} đ</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Thời gian:</span>
                      <span className="font-medium">30 phút</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Địa điểm:</span>
                      <span className="font-medium">{doctor?.hospital?.name}</span>
                    </div>
                  </div>

                  {/* <DoctorSchedule slug={slug} /> */}

                  <div className="mt-6">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Đặt lịch khám</Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Miễn phí đặt lịch, không mất phí khi hủy trước 24 giờ
                    </p>
                  </div>
                </CardContent>
              </Card>

              <HospitalInfo slug={slug} />

            </div>
          </div>
        </div>
      </section>

    </>
  )
}
