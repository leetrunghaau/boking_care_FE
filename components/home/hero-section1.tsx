"use client";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Users, Shield, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection1() {
  const router = useRouter();
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100">
      {/* SVG Background Pattern */}
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full opacity-10"
          viewBox="0 0 1600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          {/* Medical Cross Pattern */}
          <g fill="currentColor" className="text-teal-600">
            {/* Large medical crosses */}
            <path d="M200 100h40v40h40v40h-40v40h-40v-40h-40v-40h40v-40z" />
            <path d="M1200 150h30v30h30v30h-30v30h-30v-30h-30v-30h30v-30z" />
            <path d="M400 350h35v35h35v35h-35v35h-35v-35h-35v-35h35v-35z" />
            <path d="M1000 400h25v25h25v25h-25v25h-25v-25h-25v-25h25v-25z" />

            {/* Stethoscope shapes */}
            <circle cx="600" cy="120" r="15" />
            <path
              d="M600 135v80"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <circle cx="580" cy="215" r="12" />
            <circle cx="620" cy="215" r="12" />

            <circle cx="1400" cy="300" r="12" />
            <path
              d="M1400 312v60"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="1385" cy="372" r="10" />
            <circle cx="1415" cy="372" r="10" />

            {/* Heart rate line pattern */}
            <path
              d="M100 300h50l10-30 20 60 20-90 20 120 20-60 10 30h50"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M900 200h40l8-25 15 50 15-70 15 90 15-45 8 25h40"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />

            {/* DNA helix pattern */}
            <path
              d="M1300 100c20 0 20 20 0 20s-20 20 0 20 20 20 0 20-20 20 0 20 20 20 0 20"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M1320 100c-20 0-20 20 0 20s20 20 0 20-20 20 0 20 20 20 0 20-20 20 0 20"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />

            {/* Medical pills */}
            <ellipse cx="300" cy="500" rx="20" ry="12" />
            <ellipse cx="800" cy="80" rx="15" ry="10" />
            <ellipse cx="1100" cy="520" rx="18" ry="11" />

            {/* Molecules */}
            <circle cx="150" cy="450" r="8" />
            <circle cx="170" cy="470" r="6" />
            <circle cx="130" cy="470" r="6" />
            <line
              x1="150"
              y1="450"
              x2="170"
              y2="470"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="150"
              y1="450"
              x2="130"
              y2="470"
              stroke="currentColor"
              strokeWidth="2"
            />

            <circle cx="1450" cy="180" r="6" />
            <circle cx="1465" cy="195" r="5" />
            <circle cx="1435" cy="195" r="5" />
            <line
              x1="1450"
              y1="180"
              x2="1465"
              y2="195"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="1450"
              y1="180"
              x2="1435"
              y2="195"
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              RA TRƯỜNG LÀ TIÊN QUYẾT
              <span className="block text-teal-600">Còn code là còn bug</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
              Đặt lịch nhanh chóng - tấm bằng trong tầm tay
            </p>
          </div>

          {/* Primary CTA */}
          <div className="space-y-4">
            <Button
              onClick={() => {
                router.push("/dat-lich-kham");
              }}
              size="lg"
              className="h-16 px-12 text-xl font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-xl transform hover:scale-105 transition-all duration-200">
              <Calendar className="mr-3 h-6 w-6" />
              Đặt lịch khám ngay
            </Button>

            {/* Secondary CTA */}
            <div className="pt-2">
              <Button
                variant="ghost"
                className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 font-medium">
                <Search className="mr-2 h-4 w-4" />
                Tìm bác sĩ theo chuyên khoa
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8">
            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="h-5 w-5 text-teal-600" />
                <span className="font-medium">1000+ bug</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="h-5 w-5 text-teal-600" />
                <span className="font-medium">Không bảo mật</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="h-5 w-5 text-teal-600" />
                <span className="font-medium">Code 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
