import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Calendar,
  CheckCircle,
  Star,
  ChevronRight,
  Stethoscope,
  Brain,
  Heart,
  Eye,
  Bone,
  Baby,
} from "lucide-react"
import MainHeader from "@/components/layout/header/main-header"
import Footer from '../components/layout/footer';
import PopularSpecialties from "@/components/home/popular-specialties"
import PopularDoctors from "@/components/home/popular-doctors"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col w-full justify-center">
      {/* Header */}
      <MainHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-blue-600/90 z-10" />
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Medical background"
            width={1600}
            height={600}
            className="w-full h-[500px] object-cover"
          />
          <div className="container relative z-20 py-20 text-white  mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Nền tảng y tế chăm sóc sức khỏe toàn diện
              </h1>
              <p className="text-lg md:text-xl">Đặt lịch khám bệnh, tư vấn sức khỏe trực tuyến với bác sĩ uy tín</p>

              <div className="bg-white rounded-lg p-4 mt-8 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Tìm bác sĩ, chuyên khoa, bệnh viện..." className="pl-10 h-12 bg-background" />
                  </div>
                  <Button className="h-12 px-8 bg-teal-600 hover:bg-teal-700 text-white">Tìm kiếm</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section className="py-16 bg-slate-50 px-16">
           <PopularSpecialties/>
        </section>

        {/* Featured Doctors */}
        <section className="py-16 px-16">
          <PopularDoctors/>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-slate-50 px-16">
          <div className="container  mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Quy trình đặt lịch khám</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Tìm kiếm</h3>
                <p className="text-muted-foreground">
                  Tìm bác sĩ, chuyên khoa hoặc cơ sở y tế phù hợp với nhu cầu của bạn
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Đặt lịch</h3>
                <p className="text-muted-foreground">Chọn ngày giờ phù hợp và hoàn tất thông tin đặt lịch khám</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Khám bệnh</h3>
                <p className="text-muted-foreground">Đến khám theo lịch hẹn, không cần chờ đợi</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-16 ">
          <div className="container  mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Khách hàng nói gì về chúng tôi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((testimonial) => (
                <Card key={testimonial} className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <p className="mb-6 text-muted-foreground">
                      "Tôi rất hài lòng với dịch vụ đặt lịch khám của BookingCare. Tiết kiệm thời gian và rất thuận
                      tiện."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden relative">
                        <Image
                          src={`/placeholder.svg?height=50&width=50&text=KH${testimonial}`}
                          alt="Avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Nguyễn Văn A</h4>
                        <p className="text-sm text-muted-foreground">Khách hàng</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-teal-600 text-white">
          <div className="container  mx-auto text-center ">
            <h2 className="text-3xl font-bold mb-4">Đặt lịch khám ngay hôm nay</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Chăm sóc sức khỏe chưa bao giờ dễ dàng đến thế. Đặt lịch khám với bác sĩ uy tín ngay bây giờ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-teal-600 hover:bg-slate-100 h-12 px-8 text-base">Đặt lịch khám</Button>
              <Button variant="outline" className="bg-teal-600 border-white text-white hover:bg-teal-700 h-12 px-8 text-base">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}
