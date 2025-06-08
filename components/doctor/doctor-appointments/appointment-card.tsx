import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarClock,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  Slice,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PatientRecordModal from "./patient-record-modal";
import { getFullURL } from "@/helper/url";
export function AppointmentCard({ appointment, showActions = true }: any) {
  const statusConfig = {
    confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-700" },
    completed: { label: "Đã hoàn thành", color: "bg-green-100 text-green-700" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
    pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700" },
  };
  const router = useRouter();
  const status = statusConfig[appointment.status as keyof typeof statusConfig];
  useEffect(() => {
    console.log("appointment:", appointment);
  }, []);

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
                    getFullURL(appointment?.patient?.img) ??
                    `/placeholder.svg?height=48&width=48`
                  }
                />
                <AvatarFallback className="bg-slate-100">
                  {appointment.patient?.name ?? "Không có"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-slate-800">
                    {appointment.patient?.name ?? "Không có"}
                  </h3>

                  <Badge className={status.color}>{status.label}</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{appointment.patient?.phone ?? "Không có"}</span>
                </div>
                {appointment.symptoms && (
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                    <span className="font-medium">Triệu chứng:</span>{" "}
                    {appointment?.notes ?? "Trống"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Thông tin lịch hẹn */}
          <div className="p-4 md:p-5  bg-slate-50">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-teal-600" />
                <div className="text-sm">
                  <span className="font-medium text-slate-700">
                    {new Date(appointment.day).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-teal-600" />
                <div className="text-sm">
                  <span className="font-medium text-slate-700">
                    {appointment.time?.slice(0, 5)} phút
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div className="text-sm">
                  <span className="font-medium text-slate-700">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(500000)}
                  </span>
                </div>
              </div>
              {appointment?.doctor?.hospital?.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-slate-600 mt-0.5" />
                  <div className="text-sm text-slate-600 flex-1">
                    {appointment?.doctor?.hospital?.address ?? "Không có"}
                  </div>
                </div>
              )}
            </div>

            {showActions && (
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`appointments/${appointment.id}`)}>
                  <Slice />
                  Khám
                </Button>
                {/* <Button
                  variant="default"
                  size="sm"
                  className="flex-1 bg-teal-600 hover:bg-teal-700">
                  <User className="h-4 w-4 mr-1" />
                  Hồ sơ
                </Button> */}
                <PatientRecordModal patientId={appointment.patient.id} />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
