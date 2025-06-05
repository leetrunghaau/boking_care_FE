"use client";

// React & Next
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

// UI & Icons
import {
  ArrowLeft,
  CircleDashed,
  Clock,
  Trash,
  Slice,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Components
import PatientCrad from "@/components/doctor/doctor-appointments/detail/patient-card";
import BookingInfoCard from "@/components/doctor/doctor-appointments/detail/booking-info-card";
import ExaminationTab from "@/components/doctor/doctor-appointments/detail/examination-tab";
import { PrescriptionForm } from "@/components/doctor/doctor-prescriptions/prescription-form";
import { PrescriptionPreview } from "@/components/doctor/doctor-prescriptions/prescription-preview";
import { RecordHistoryList } from "@/components/doctor/doctor-appointments/detail/record-history-list";
// Utils
import http from "@/helper/axios";

export default function AppointmentDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [showReview, setShowReview] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const buttonElement = useRef<HTMLButtonElement>(null);
  const formatStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "cancelled":
        return "Đã hủy";
      case "completed":
        return "Hoàn thành";
      default:
        return status;
    }
  };
  type Status = "pending" | "confirmed" | "cancelled" | "completed";
  const fetchAppointmentStatus = async () => {
    setLoading(true);
    try {
      const res = await http.get<any>(
        `/doctor-appointment/${params.id}/status`
      );
      console.log("Appointment status:", res);
      setStatus(res);
    } catch (err) {
      console.error("Failed to fetch appointment status:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAppointmentStatus();
  }, [params.id]);

  const handleUpdateStatus = async (newStatus: string) => {
    console.log("Updating status to:", newStatus);
    setStatus(newStatus);
    setLoading(true);
    try {
      await http.post(`/doctor-appointment/${params.id}/status`, {
        status: newStatus,
      });
      await fetchAppointmentStatus();
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonFocus = () => {
    buttonElement.current?.focus();
  };

  return (
    <div className="container mx-auto my-8 px-4 space-y-6 w-11/12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-800">
            Chi tiết lịch hẹn
          </h1>
          <Badge variant={status as Status}>
            <Clock className="w-4 h-4 mr-2" />
            {formatStatus(status)}
          </Badge>
        </div>
      </div>

      {status === "pending" ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 rounded-full">
              <CircleDashed className="w-6 h-6 text-teal-600" />
            </div>
            <h2
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                handleButtonFocus();
              }}
              className="cursor-pointer text-lg font-bold text-center bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
              Vui lòng xác nhận lịch hẹn trước khi hoàn thành khám. Bấm để xác
              nhận lịch hẹn
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="destructiveOutline"
              onClick={() => handleUpdateStatus("cancelled")}>
              <Trash className="h-4 w-4 mr-1" />
              Hủy lịch hẹn
            </Button>
            <Button
              ref={buttonElement}
              variant="confirm"
              size="sm"
              onClick={() => handleUpdateStatus("confirmed")}>
              <Slice className="h-5 w-5" />
              Xác nhận khám
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-4">
          {status === "confirmed" ? (
            <>
              <Button
                variant="destructiveOutline"
                onClick={() => handleUpdateStatus("cancelled")}>
                <Trash className="h-4 w-4 mr-1" />
                Hủy lịch hẹn
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => handleUpdateStatus("completed")}>
                <Check className="h-4 w-4 mr-1" />
                Hoàn thành khám
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <PatientCrad bookingId={params.id} />
          <BookingInfoCard bookingId={params.id} />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <Tabs defaultValue="details" className="w-full">
              <CardHeader className="pb-2">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="details">Khám bệnh</TabsTrigger>
                  <TabsTrigger value="prescription">Kê đơn thuốc</TabsTrigger>
                  <TabsTrigger value="history">Lịch sử khám</TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent className="pt-6">
                <TabsContent value="details" className="space-y-6 mt-0">
                  <ExaminationTab
                    bookingId={params.id}
                    disabled={status !== "confirmed"}
                  />
                </TabsContent>

                <TabsContent value="prescription" className="mt-0">
                  {!showReview ? (
                    <PrescriptionForm
                      bookingId={params.id}
                      onPreview={() => setShowReview(true)}
                      disabled={status !== "confirmed"}
                    />
                  ) : (
                    <PrescriptionPreview
                      bookingId={params.id}
                      onBack={() => setShowReview(false)}
                    />
                  )}
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                  <RecordHistoryList bookingId={params.id} />
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
