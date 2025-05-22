import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import {
  CalendarClock,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  User,
  Search,
} from "lucide-react";
import { vi } from "date-fns/locale";
import { useRouter } from "next/navigation";

export interface AppointmentData {
  id: string;
  patientName: string;
  patientAvatar?: string;
  patientPhone: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: "confirmed" | "completed" | "cancelled" | "pending";
  symptoms?: string;
  address?: string;
  isOnline?: boolean;
}

interface AppointmentCardProps {
  appointment: AppointmentData;
  showActions?: boolean;
}

export function AppointmentCard({
  appointment,
  showActions = true,
}: AppointmentCardProps) {
  const statusConfig = {
    confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-700" },
    completed: { label: "Đã hoàn thành", color: "bg-green-100 text-green-700" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
    pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700" },
  };
  const router = useRouter();

  const status = statusConfig[appointment.status];
  const appointmentDate = new Date(appointment.date);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent>
        <div className="flex flex-col md:flex-row">
          {/* Thông tin bệnh nhân */}
          <div className="p-4 md:p-5 flex-1 border-b md:border-b-0 md:border-r border-slate-100 ">
            <div className="flex items-start gap-3 ">
              <Avatar className="h-12 w-12 border">
                <AvatarImage
                  src={
                    appointment.patientAvatar ||
                    `/placeholder.svg?height=48&width=48`
                  }
                />
                <AvatarFallback className="bg-slate-100">
                  {appointment.patientName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-slate-800">
                    {appointment.patientName}
                  </h3>
                  <Badge className={status.color}>{status.label}</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{appointment.patientPhone}</span>
                </div>
                {appointment.symptoms && (
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                    <span className="font-medium">Triệu chứng:</span>{" "}
                    {appointment.symptoms}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Thông tin lịch hẹn */}
          <div className="p-4 md:p-5 md:w-[280px] bg-slate-50">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-teal-600" />
                <div className="text-sm">
                  <span className="font-medium text-slate-700">
                    {format(appointmentDate, "EEEE, dd/MM/yyyy", {
                      locale: vi,
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-teal-600" />
                <div className="text-sm">
                  <span className="font-medium text-slate-700">
                    {appointment.time} ({appointment.duration} phút)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div className="text-sm">
                  <span className="font-medium text-slate-700">
                    {new Intl.NumberFormat("vi-VN").format(appointment.price)}{" "}
                    VNĐ
                  </span>
                </div>
              </div>
              {appointment.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-slate-600 mt-0.5" />
                  <div className="text-sm text-slate-600 flex-1">
                    {appointment.isOnline
                      ? "Khám trực tuyến"
                      : appointment.address}
                  </div>
                </div>
              )}
            </div>

            {showActions && (
              <div className="flex gap-2 mt-4">
                <div></div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`appointments/${appointment.id}`)}>
                  <Search className="h-4 w-4 mr-1" />
                  Xem chi tiết
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 bg-teal-600 hover:bg-teal-700">
                  <User className="h-4 w-4 mr-1" />
                  Hồ sơ
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
