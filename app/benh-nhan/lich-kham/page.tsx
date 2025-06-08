"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { CalendarCheck, MapPin, Clock3, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import http from "@/helper/axios";
import { Badge } from "@/components/ui/badge";
import { getIconByName } from "@/helper/icon-map";
import { getFullURL } from "@/helper/url";

export default function UpcomingAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
    const fetchAppointments = async () => {
      try {
        const res = await http.get<any[]>("/patient-bookings");
        setAppointments(res);
        console.log("Fetched appointments:", res);
      } catch (err) {
        console.error(err);
        setError("Không thể tải lịch khám. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <header className="flex items-center justify-between border-b pb-4 mb-6">
        <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
          <CalendarCheck className="text-teal-600 w-7 h-7" />
          Lịch khám sắp tới
        </h1>
        <Link href="/dat-lich-kham">
          <Button className="bg-teal-600 text-white hover:bg-teal-700">
            + Đặt lịch mới
          </Button>
        </Link>
      </header>

      {loading ? (
        <div className="text-center text-muted-foreground text-lg">
          Đang tải dữ liệu...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg">{error}</div>
      ) : appointments.length === 0 ? (
        <div className="text-center text-muted-foreground text-lg">
          Bạn chưa có lịch khám nào.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {appointments.map((appt) => {
            const Icon = getIconByName(appt.specialtyIcon || "");
            console.log(Icon);

            return (
              <div
                key={appt.id}
                className="bg-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-teal-500 border-l-4 border-teal-600">
                {/* Doctor Avatar */}
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-teal-500 mb-4">
                  <Avatar className="h-26 w-26 border-4 border-white shadow-md">
                    <AvatarImage
                      src={getFullURL(appt.doctorAvatar) || "/placeholder.svg"}
                      alt={appt.doctor}
                    />
                    <AvatarFallback className="text-3xl">
                      {appt?.doctor.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Appointment Information */}
                <div className="space-y-2 text-center">
                  <h2 className="text-xl font-semibold text-slate-800">
                    {appt.doctor}
                  </h2>
                  <p className="text-sm text-teal-500 flex items-center justify-center gap-2">
                    {<Icon className="w-4 h-4" />} {appt.specialty}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 inline" /> {appt.facility} -{" "}
                    {appt.facilityAddress}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center">
                    <Clock3 className="w-4 h-4" /> {appt.date} lúc {appt.time}
                  </p>

                  {/* Status */}
                  <div className="mt-3">
                    <Badge variant={appt.status as Status}>
                      {formatStatus(appt.status)}
                    </Badge>
                  </div>

                  {/* Appointment Actions */}
                  <div className="my-6 flex justify-center gap-4">
                    <Link href={`/benh-nhan/lich-kham/${appt.id}`}>
                      <Button variant="confirm" size="sm">
                        Xem chi tiết
                      </Button>
                    </Link>
                    {appt.status === "Chờ xác nhận" && (
                      <Button variant="destructive" size="sm">
                        <XCircle className="w-4 h-4 mr-1" /> Hủy lịch
                      </Button>
                    )}
                    {appt.status === "Đã xác nhận" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white">
                        Đến khám
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

// Trạng thái badge màu
function statusBadge(status: string) {
  switch (status) {
    case "Đã xác nhận":
      return "bg-green-100 text-green-700";
    case "Chờ xác nhận":
      return "bg-yellow-100 text-yellow-700";
    case "Đã khám":
      return "bg-gray-100 text-gray-700";
    case "Bị hủy":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
