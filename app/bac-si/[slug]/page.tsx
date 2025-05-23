'use client'
import Link from "next/link"
import Image from "next/image"
// import type { Metadata } from "next"
import {
  MapPin,
  Clock,
  Star,
  Award,
  BookOpen,
  Briefcase,
  Heart,
  Share2,
  MessageSquare,
  ChevronRight,
  CheckCircle,
  Phone,
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

// export const metadata: Metadata = {
//   title: `Bác sĩ Nguyễn Văn A - Chuyên khoa Tim mạch | BookingCare`,
//   description:
//     "Đặt lịch khám với Bác sĩ Nguyễn Văn A, chuyên gia Tim mạch với hơn 15 năm kinh nghiệm tại Bệnh viện Đại học Y Hà Nội",
// }

export default function DoctorDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const doctor = {
    id: params.id,
    name: "Bác sĩ Nguyễn Văn A",
    title: "Tiến sĩ, Bác sĩ chuyên khoa II",
    specialty: "Tim mạch",
    hospital: "Bệnh viện Đại học Y Hà Nội",
    experience: 15,
    rating: 4.9,
    reviewCount: 124,
    price: "350.000 - 500.000",
    address: "1 Tôn Thất Tùng, Đống Đa, Hà Nội",
    languages: ["Tiếng Việt", "Tiếng Anh"],
    education: [
      {
        degree: "Tiến sĩ Y khoa",
        school: "Đại học Y Hà Nội",
        year: "2010",
      },
      {
        degree: "Bác sĩ Chuyên khoa II",
        school: "Đại học Y Hà Nội",
        year: "2005",
      },
      {
        degree: "Bác sĩ Chuyên khoa I",
        school: "Đại học Y Hà Nội",
        year: "2000",
      },
    ],
    experience_detail: [
      {
        position: "Trưởng khoa Tim mạch",
        hospital: "Bệnh viện Đại học Y Hà Nội",
        period: "2015 - Hiện tại",
      },
      {
        position: "Phó khoa Tim mạch",
        hospital: "Bệnh viện Đại học Y Hà Nội",
        period: "2010 - 2015",
      },
      {
        position: "Bác sĩ điều trị",
        hospital: "Bệnh viện Bạch Mai",
        period: "2005 - 2010",
      },
    ],
    specializations: ["Bệnh mạch vành", "Rối loạn nhịp tim", "Suy tim", "Tăng huyết áp", "Bệnh van tim"],
    awards: [
      {
        title: "Thầy thuốc ưu tú",
        year: "2018",
      },
      {
        title: "Bác sĩ xuất sắc Bệnh viện Đại học Y Hà Nội",
        year: "2015",
      },
    ],
    publications: [
      {
        title: "Nghiên cứu về tác động của chế độ ăn đến bệnh tim mạch ở người Việt Nam",
        journal: "Tạp chí Y học Việt Nam",
        year: "2019",
      },
      {
        title: "Đánh giá hiệu quả điều trị tăng huyết áp bằng phương pháp kết hợp",
        journal: "Tạp chí Tim mạch học Việt Nam",
        year: "2017",
      },
    ],
    about:
      "Tiến sĩ, Bác sĩ chuyên khoa II Nguyễn Văn A là chuyên gia đầu ngành về Tim mạch với hơn 15 năm kinh nghiệm. Bác sĩ đã điều trị thành công cho hàng nghìn bệnh nhân mắc các bệnh lý tim mạch phức tạp. Với kiến thức chuyên môn sâu rộng và kỹ năng lâm sàng xuất sắc, bác sĩ luôn được đồng nghiệp và bệnh nhân đánh giá cao về chuyên môn và thái độ phục vụ tận tâm.",
  }

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
                          src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(doctor.name)}`}
                          alt={doctor.name}
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
                      <h1 className="text-2xl font-bold">{doctor.name}</h1>
                      <p className="text-muted-foreground">{doctor.title}</p>

                      <div className="flex items-center gap-1 mt-2 justify-center md:justify-start">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor.rating}</span>
                        <span className="text-muted-foreground">({doctor.reviewCount} đánh giá)</span>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-start gap-2 justify-center md:justify-start">
                          <Briefcase className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>
                            Chuyên khoa {doctor.specialty} • {doctor.experience} năm kinh nghiệm
                          </span>
                        </div>
                        <div className="flex items-start gap-2 justify-center md:justify-start">
                          <MapPin className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{doctor.hospital}</span>
                        </div>
                        <div className="flex items-start gap-2 justify-center md:justify-start">
                          <Phone className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>Hotline: 1900 1234</span>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                        {doctor.specializations.slice(0, 3).map((spec, index) => (
                          <Badge key={index} variant="outline" className="bg-teal-50 text-teal-700 hover:bg-teal-100">
                            {spec}
                          </Badge>
                        ))}
                        {doctor.specializations.length > 3 && (
                          <Badge variant="outline" className="bg-slate-50">
                            +{doctor.specializations.length - 3}
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
                  <DoctorAbout slug={slug } />
                </TabsContent>

                <TabsContent value="experience" className="space-y-6">
                  <DoctorExperience slug={slug} />
                </TabsContent>

                <TabsContent value="reviews">
                  <DoctorReviews slug={slug}  />
                </TabsContent>

                <TabsContent value="faq">
                  <DoctorFAQ slug={slug}/>
                </TabsContent>
              </Tabs>

              {/* Similar Doctors */}
              <div className="mb-8">
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
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Booking Card */}
              <Card className="mb-6 sticky top-20">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-4">Đặt lịch khám</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Giá khám:</span>
                      <span className="font-medium">{doctor.price} đ</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Thời gian:</span>
                      <span className="font-medium">30 phút</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Địa điểm:</span>
                      <span className="font-medium">{doctor.hospital}</span>
                    </div>
                  </div>

                  {/* <DoctorSchedule doctorId={doctor.id} /> */}

                  <div className="mt-6">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Đặt lịch khám</Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Miễn phí đặt lịch, không mất phí khi hủy trước 24 giờ
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Hospital Info */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-4">Thông tin cơ sở y tế</h2>

                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-16 h-16 relative rounded overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=100&width=100&text=BV"
                        alt={doctor.hospital}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{doctor.hospital}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.address}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Giờ làm việc</p>
                        <p className="text-sm text-muted-foreground">Thứ 2 - Thứ 6: 7:30 - 17:00</p>
                        <p className="text-sm text-muted-foreground">Thứ 7: 7:30 - 12:00</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Phone className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Liên hệ</p>
                        <p className="text-sm text-muted-foreground">024.3825.5599</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link href={`/hospitals/dai-hoc-y-ha-noi`}>
                      <Button variant="outline" className="w-full">
                        Xem thông tin bệnh viện
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
