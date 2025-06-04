import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, CheckCircle, Star } from "lucide-react";
import MainHeader from "@/components/layout/header/main-header";
import Footer from "../components/layout/footer";
import PopularSpecialties from "@/components/home/popular-specialties";
import PopularDoctors from "@/components/home/popular-doctors";
import HeroSection1 from "@/components/home/hero-section1";
import HeroSection from "@/components/home/hero-section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col w-full justify-center">
      {/* Header */}
      <MainHeader />

      <main className="flex-1">
        <HeroSection />

        <section className="py-16 bg-slate-50 px-16">
          <PopularSpecialties />
        </section>

        <section className="py-16 px-16">
          <PopularDoctors />
        </section>

        <section className="py-16 bg-slate-50 px-16">
          <div className="container  mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
              Quy trình đặt lịch khám
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Tìm kiếm</h3>
                <p className="text-muted-foreground">
                  Tìm bác sĩ, chuyên khoa hoặc cơ sở y tế phù hợp với nhu cầu
                  của bạn
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Đặt lịch</h3>
                <p className="text-muted-foreground">
                  Chọn ngày giờ phù hợp và hoàn tất thông tin đặt lịch khám
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Khám bệnh</h3>
                <p className="text-muted-foreground">
                  Đến khám theo lịch hẹn, không cần chờ đợi
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-16 ">
          <div className="container  mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
              Khách hàng nói gì về chúng tôi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((testimonial) => (
                <Card key={testimonial} className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                    </div>
                    <p className="mb-6 text-muted-foreground">
                      "Tôi rất hài lòng với dịch vụ đặt lịch khám của
                      BookingCare. Tiết kiệm thời gian và rất thuận tiện."
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
                        <p className="text-sm text-muted-foreground">
                          Khách hàng
                        </p>
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
            <h2 className="text-3xl font-bold mb-4">
              Đặt lịch khám ngay hôm nay
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Chăm sóc sức khỏe chưa bao giờ dễ dàng đến thế. Đặt lịch khám với
              bác sĩ uy tín ngay bây giờ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-teal-600 hover:bg-slate-100 h-12 px-8 text-base">
                Đặt lịch khám
              </Button>
              <Button
                variant="outline"
                className="bg-teal-600 border-white text-white hover:bg-teal-700 h-12 px-8 text-base">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
