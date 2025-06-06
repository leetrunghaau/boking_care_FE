import {
  Calendar,
  MapPin,
  Star,
  FileText,
  Pill,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const appointments = [
  {
    id: 1,
    doctorName: "TS.BS. Nguyễn Văn A",
    specialty: "Tim mạch",
    hospital: "BV Đại học Y Dược TP.HCM",
    address: "215 Hồng Bàng, Quận 5, TP.HCM",
    date: "10 tháng 4, 2025",
    time: "10:00",
    status: "Đã khám",
    statusColor: "green",
    avatar: "NVA",
  },
  {
    id: 2,
    doctorName: "BS. Trần Thị B",
    specialty: "Da liễu",
    hospital: "BV Chợ Rẫy",
    address: "201B Nguyễn Chí Thanh, Quận 5, TP.HCM",
    date: "12 tháng 4, 2025",
    time: "14:30",
    status: "Sắp tới",
    statusColor: "blue",
    avatar: "TTB",
  },
  {
    id: 3,
    doctorName: "PGS.TS. Lê Văn C",
    specialty: "Nội khoa",
    hospital: "BV Bình Dân",
    address: "371 Điện Biên Phủ, Quận 3, TP.HCM",
    date: "15 tháng 4, 2025",
    time: "09:15",
    status: "Đã đặt",
    statusColor: "orange",
    avatar: "LVC",
  },
  {
    id: 4,
    doctorName: "BS. Phạm Thị D",
    specialty: "Sản phụ khoa",
    hospital: "BV Từ Dũ",
    address: "284 Cống Quỳnh, Quận 1, TP.HCM",
    date: "18 tháng 4, 2025",
    time: "16:00",
    status: "Đã hủy",
    statusColor: "gray",
    avatar: "PTD",
  },
];

const getStatusColor = (color: string) => {
  switch (color) {
    case "green":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "blue":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "orange":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    case "gray":
      return "bg-gray-100 text-gray-600 hover:bg-gray-100";
    default:
      return "bg-gray-100 text-gray-600 hover:bg-gray-100";
  }
};

export default function LichSuKhamPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Lịch sử khám bệnh
        </h1>
        <p className="text-gray-600">Lịch khám đã hoàn tất</p>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card
            key={appointment.id}
            className="hover:shadow-md transition-shadow duration-200 border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-14 h-14 border-2 border-teal-100 flex-shrink-0">
                  <AvatarImage src="/placeholder.svg" alt="Doctor photo" />
                  <AvatarFallback className="bg-teal-500 text-white font-semibold">
                    {appointment.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {appointment.doctorName}
                      </h3>
                      <p className="text-teal-600 font-medium text-sm mb-2">
                        {appointment.specialty}
                      </p>
                    </div>
                    <Badge className={getStatusColor(appointment.statusColor)}>
                      <Clock className="w-3 h-3 mr-1" />
                      {appointment.status}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-600 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {appointment.hospital}
                        </p>
                        <p className="truncate">{appointment.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-900">
                        {appointment.date} lúc {appointment.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span className="text-xs">Kết quả</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1.5">
                        <Pill className="w-3.5 h-3.5" />
                        <span className="text-xs">Đơn thuốc</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1.5 text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                        <Star className="w-3.5 h-3.5" />
                        <span className="text-xs">Đánh giá</span>
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-gray-600">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6">
          Đặt lịch khám mới
        </Button>
      </div>
    </div>
  );
}
