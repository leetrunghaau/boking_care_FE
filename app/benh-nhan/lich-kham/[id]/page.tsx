"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  Clock,
  FileText,
  MapPin,
  Stethoscope,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFullURL } from "@/helper/url";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import http from "@/helper/axios";
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils";


export default function AppointmentDetailPage() {
  const { id } = useParams();

  const [appt, setAppt] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      setLoading(true);
      try {
        const res = await http.get<any | null>(`/patient-booking/${id}`);
        setAppt(res);
      } catch (err) {
        console.error("Error fetching appointment:", err);
        handleApiError(err, "Lấy chi tiết lịch khám thất bại.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);


const handleCancel = async () => {
  try {
    const rs =  await http.delete(`/patient-booking/${id}/cancel`);
    if(rs){
      handleApiSuccess("Bạn đã hũy lịch hẹn thành công")
      setAppt((prev: any) => ({ ...prev, status: "cancelled", allowCancel: false }));
    }
  } catch (err) {
    handleApiError(err, "Huỷ lịch khám thất bại.");
  }
};
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      <header className="border-b pb-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-1">
              Chi tiết lịch khám
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {appt?.status && (() => {
              const config = getStatusConfig(appt.status);
              return (
                <span className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded ${config.color}`}>
                  {config.icon}
                  {config.text}
                </span>
              );
            })()}
          </div>
        </div>
      </header>

      {/* Thông tin bác sĩ */}
      <section className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow border">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border shadow-sm shrink-0">
          <Image
            src={getFullURL(appt?.doctor?.avatar) || "/default-avatar.png"}
            alt="Avatar bác sĩ"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-800">
            {appt?.doctor?.name}
          </h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-teal-600" />{" "}
            {appt?.doctor?.specialty}
          </p>
          <p className="text-sm text-slate-600">{appt?.doctor?.position}</p>
          <p className="text-sm text-slate-600">{appt?.doctor?.experience}</p>
          <p className="text-sm text-slate-600">
            <strong>Cơ sở:</strong> {appt?.doctor?.workplace}
          </p>
          <Link href={`/bac-si/${appt?.doctor?.slug}`}>
            <Button variant="outline" size="sm" className="mt-3">
              Xem hồ sơ bác sĩ
            </Button>
          </Link>
        </div>
      </section>

      {/* Chi tiết lịch hẹn */}
      <section className="bg-white p-6 rounded-lg shadow border space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Thông tin lịch khám
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p className="flex items-center gap-2 text-slate-700">
            <CalendarDays className="w-5 h-5 text-teal-600" />
            Ngày khám: <span className="font-medium">{appt?.date}</span>
          </p>
          <p className="flex items-center gap-2 text-slate-700">
            <Clock className="w-5 h-5 text-teal-600" />
            Giờ khám: <span className="font-medium">{appt?.time}</span>
          </p>
          <p className="flex items-center gap-2 text-slate-700 col-span-full">
            <MapPin className="w-5 h-5 text-teal-600" />
            Địa điểm:{" "}
            <span className="font-medium">
              {appt?.facility?.name} – {appt?.facility?.address}
            </span>
          </p>
        </div>
        <Image
          src={getFullURL(appt?.facility?.image) || "/placeholder.svg"}
          alt="Cơ sở y tế"
          width={800}
          height={400}
          className="rounded-md object-cover border mt-4"
        />
      </section>

      {/* {appt?.notes && (
        <section className="bg-white p-6 rounded-lg shadow border space-y-2">
          <h3 className="text-lg font-semibold text-slate-800">
            Lưu ý từ bác sĩ
          </h3>
          <p className="text-sm text-slate-600">{appt?.notes?? ""}</p>
        </section>
      )} */}


      <section className="pt-6 flex flex-wrap justify-end gap-4 ">
        {appt?.allowCancel && (
          <Button variant="destructiveOutline" onClick={handleCancel}>
  Huỷ lịch khám
</Button>
        )}
        <Link href={`/bac-si/${appt?.doctor?.slug}?rating=u`}>
          <Button variant="confirm">Đánh giá bác sĩ</Button>
        </Link>
      </section>
    </main>
  );
}
const getStatusConfig = (status: string) => {
  switch (status) {
    case "confirmed":
      return {
        color: "bg-teal-600 text-white",
        icon: <CheckCircle2 className="h-4 w-4" />,
        text: "Đã xác nhận",
      }
    case "pending":
      return {
        color: "bg-amber-500 text-white",
        icon: <Clock className="h-4 w-4" />,
        text: "Chờ xác nhận",
      }
    case "completed":
      return {
        color: "bg-emerald-600 text-white",
        icon: <CheckCircle2 className="h-4 w-4" />,
        text: "Hoàn thành",
      }
    case "cancelled":
      return {
        color: "bg-red-500 text-white",
        icon: <AlertCircle className="h-4 w-4" />,
        text: "Đã hủy",
      }
    default:
      return {
        color: "bg-gray-500 text-white",
        icon: <AlertCircle className="h-4 w-4" />,
        text: status,
      }
  }
}