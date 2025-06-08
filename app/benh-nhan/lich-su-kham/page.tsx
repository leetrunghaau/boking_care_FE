"use client";
import { useEffect, useState } from "react";
import http from "@/helper/axios";
import { Calendar, MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleApiError } from "@/helper/toast-utils";
import { PrescriptionPreviewStatic } from "@/components/share/prescription-preview-static";
import { RecordHistoryDialog } from "@/components/share/record-history-dialog";
import { useRouter } from "next/navigation";
import { getFullURL } from "@/helper/url";

export default function LichSuKhamPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const formatStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "cancelled":
        return "Đã hủy";
      case "completed":
        return "Đã khám";
      default:
        return status;
    }
  };
  type Status = "pending" | "confirmed" | "cancelled" | "completed";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get<any[]>("/patient/records");
        setAppointments(res);

        console.log("Fetched appointments:", res);
      } catch (err) {
        console.error(err);
        handleApiError(err, "Không thể tải lịch sử khám.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                  <AvatarImage src={getFullURL(appointment.avatar) ||  "/placeholder.svg"} alt="Doctor photo" />
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
                    <Badge variant={appointment.status as Status}>
                      <Clock className="w-3 h-3 mr-1" />
                      {formatStatus(appointment.status)}
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
                        {appointment.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {appointment.prescriptionsInfo &&
                        appointment.prescriptions && (
                          <PrescriptionPreviewStatic
                            info={appointment.prescriptionsInfo}
                            medications={appointment.prescriptions}
                          />
                        )}
                      {appointment.result && (
                        <RecordHistoryDialog record={appointment.result} />
                      )}

                      <Button
                        variant="confirmSecondary"
                        size="sm"
                        onClick={() => {
                          router.push(
                            `/bac-si/${appointment.doctorSlug}?rating=1`
                          );
                        }}>
                        <Star className="w-3.5 h-3.5" />
                        <span className="text-xs">Đánh giá</span>
                      </Button>
                    </div>
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
