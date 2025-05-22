"use client";

// HTTP helper
import http from "@/helper/axios";

// React core and hooks
import { useEffect, useState } from "react";

// UI components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Doctor rating components
import { DoctorRatingOverview } from "@/components/doctor/doctor-ratings/doctor-rating-overview";
import { DoctorRatingList } from "@/components/doctor/doctor-ratings/doctor-rating-list";
import { DoctorRatingChart } from "@/components/doctor/doctor-ratings/doctor-rating-chart";

// Icons
import { Search, Filter, Download } from "lucide-react";

// Doctor schedule components
import { DoctorHeader } from "@/components/doctor/doctor-schedule/doctor-header";

export default function DoctorRatingsPage() {
  //State
  const [timeRange, setTimeRange] = useState<"all" | "month" | "year">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [responseFilter, setResponseFilter] = useState("all");
  const [ratingData, setRatingData] = useState<RatingData | null>(null);
  const [loading, setLoading] = useState(false);

  // Thông tin bác sĩ
  const doctorInfo = {
    doctorId: "D-123456",
    doctorName: "BS. Nguyễn Văn A",
    specialty: "Nội khoa tổng quát",
    stats: {
      total: 120,
      booked: 15,
      completed: 105,
    },
  };
  type RatingData = {
    average: number;
    total: number;
    distribution: {
      stars: number;
      count: number;
    }[];
    responseRate: number;
    trends: {
      all: number[];
      month: number[];
      year: number[];
    };
  };
  //Effect
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await http.get<RatingData>(`/doctor-rating/ratings`);

        setRatingData(res);
        console.log("Fetched Rating Data:", res);
      } catch (err) {
        console.error("Failed to fetch Rating Data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, []);

  if (!ratingData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto py-6 space-y-6">
      <DoctorHeader
        doctorId={doctorInfo.doctorId}
        doctorName={doctorInfo.doctorName}
        specialty={doctorInfo.specialty}
        stats={doctorInfo.stats}
      />

      {/* Tiêu đề trang */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Đánh giá & Phản hồi
        </h1>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-1" />
          <span>Xuất báo cáo</span>
        </Button>
      </div>

      {/* Tổng quan đánh giá */}
      <DoctorRatingOverview ratingData={ratingData} />

      {/* Tabs chọn khoảng thời gian */}
      <Tabs
        defaultValue="all"
        onValueChange={(value) =>
          setTimeRange(value as "all" | "month" | "year")
        }>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="all">Tất cả thời gian</TabsTrigger>
          <TabsTrigger value="month">30 ngày qua</TabsTrigger>
          <TabsTrigger value="year">12 tháng qua</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <DoctorRatingChart data={ratingData.trends.all} />
        </TabsContent>

        <TabsContent value="month" className="mt-6">
          <DoctorRatingChart data={ratingData.trends.month} />
        </TabsContent>

        <TabsContent value="year" className="mt-6">
          <DoctorRatingChart data={ratingData.trends.year} />
        </TabsContent>
      </Tabs>

      {/* Bộ lọc đánh giá */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm đánh giá..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Số sao" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả đánh giá</SelectItem>
              <SelectItem value="5">5 sao</SelectItem>
              <SelectItem value="4">4 sao</SelectItem>
              <SelectItem value="3">3 sao</SelectItem>
              <SelectItem value="2">2 sao</SelectItem>
              <SelectItem value="1">1 sao</SelectItem>
            </SelectContent>
          </Select>

          <Select value={responseFilter} onValueChange={setResponseFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Trạng thái" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="responded">Đã phản hồi</SelectItem>
              <SelectItem value="not_responded">Chưa phản hồi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Danh sách đánh giá */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đánh giá</CardTitle>
          <CardDescription>
            Đánh giá từ bệnh nhân và phản hồi của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DoctorRatingList
            searchQuery={searchQuery}
            ratingFilter={ratingFilter}
            responseFilter={responseFilter}
            timeRange={timeRange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
