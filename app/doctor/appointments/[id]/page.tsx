"use client";

// React core and hooks
import { useEffect, useState, useRef } from "react";

// Next hooks
import { useRouter, useParams } from "next/navigation";

// UI and icons
import {
  ArrowLeft,
  Calendar,
  CalendarClock,
  Check,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  Stethoscope,
  Trash,
  User,
  Mail,
  MessageSquare,
  CircleDashed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PrescriptionForm } from "@/components/doctor/doctor-prescriptions/prescription-form";
import { PrescriptionPreview } from "@/components/doctor/doctor-prescriptions/prescription-preview";
import { ImageUploader } from "@/components/share/image-uploader";
import { InputWithUnit } from "@/components/share/input-with-unit";
import PatientRecordModal from "@/components/doctor/doctor-appointments/patient-record-modal";
// Utilities
import http from "@/helper/axios";
import PatientCrad from '@/components/doctor/doctor-appointments/detail/patient-card';
import BookingInfoCard from "@/components/doctor/doctor-appointments/detail/booking-info-card";
import ExaminationTab from "@/components/doctor/doctor-appointments/detail/examination-tab";
import ReviewFile from "@/components/share/review-file";

export default function AppointmentDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();


   const [selectedFile, setSelectedFile] = useState<File>();
  // State
  const [loading, setLoading] = useState(false);
  const [appointmentDetail, setAppointmentDetail] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [hasPrescription, setHasPrescription] = useState(false);
  const [showPrescriptionPreview, setShowPrescriptionPreview] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const buttonElement = useRef<HTMLButtonElement>(null);
  const [updatedStatus, setUpdatedStatus] = useState<string | null>(null);
  // Form inputs
  const [diagnosis, setDiagnosis] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpNotes, setFollowUpNotes] = useState("");
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [vitalSigns, setVitalSigns] = useState({
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    respiratoryRate: "",
    weight: "",
    height: "",
  });

  //Effects
  useEffect(() => {
    setLoading(true);

    const fetchAppointmentDetail = async () => {
      try {
        const res = await http.get<any>(
          `/doctor-appointment/appointment/${params.id}`
        );
        setAppointmentDetail(res);
        setVitalSigns(res.vitalSigns);
        console.log("Appointment Detail:", res);
      } catch (err) {
        console.error("Failed to fetch appointment detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetail();
  }, [params.id]);

  // Handlers

  //Xử lý cập nhật status

  const handleUpdateStatus = async (newStatus: string) => {
    setUpdatedStatus(newStatus);
    setLoading(true);
    try {
      const res = await http.post<any>(
        `/doctor-appointment/${params.id}/status`,
        { status: newStatus }
      );
      if (res)
        setAppointmentDetail((prev: any) => ({
          ...prev,
          status: newStatus,
        }));
      console.log("New status:", res);
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý hoàn thành lịch hẹn
  const handleCompleteAppointment = () => {
    alert("Lịch hẹn đã được đánh dấu là hoàn thành!");
  };
  const handleTestSubmit = async () => {
    const formData = new FormData();

    // Add uploaded images only
    uploadedImages.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      const response = await http.post(
        `/doctor-appointment/appointments/${params.id}/test-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Add form fields
    formData.append("diagnosis", diagnosis);
    formData.append("clinicalNotes", clinicalNotes);
    formData.append("followUpDate", followUpDate);
    formData.append("followUpNotes", followUpNotes);

    // Add uploaded images
    uploadedImages.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      const response = await http.post(
        `/doctor-appointment/appointments/${params.id}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    }
  };

  const handleButtonFocus = () => {
    buttonElement.current?.focus();
  };
  //Xử lý thông tin sức khoẻ
  const handleVitalChange = (key: keyof typeof vitalSigns, value: string) => {
    setVitalSigns((prev) => ({ ...prev, [key]: value }));
    console.log("Vital signs updated:", {
      ...vitalSigns,
      [key]: value,
    });
  };

  // Xử lý lưu đơn thuốc
  const handleSavePrescription = () => {
    setHasPrescription(true);
    alert("Đơn thuốc đã được lưu thành công!");
  };

  // Xử lý in đơn thuốc
  const handlePrintPrescription = () => {
    alert("Đang chuẩn bị in đơn thuốc...");
  };

  // Xử lý gửi đơn thuốc
  const handleSendPrescription = () => {
    alert("Đơn thuốc đã được gửi cho bệnh nhân!");
  };
  if (!appointmentDetail) {
    return <div>Loading...</div>;
  }

  const handleImageChange = (files: File[]) => {
    setUploadedImages(files);
  };

  // Status config
  const statusConfig = {
    confirmed: {
      label: "Đã xác nhận",
      color: "bg-blue-100 text-blue-700  text-sm",
    },
    completed: {
      label: "Đã hoàn thành",
      color: "bg-green-100 text-green-700  text-sm",
    },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700  text-sm" },
    pending: {
      label: "Chờ xác nhận",
      color:
        "bg-amber-100 text-amber-800 border-amber-200 px-4 py-2 text-sm font-medium",
    },
  };

  const status = statusConfig[
    appointmentDetail.status as keyof typeof statusConfig
  ] || {
    label: "Lỗi trạng thái",
    color: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="container mx-auto my-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-800">
            Chi tiết lịch hẹn
          </h1>
        </div>
        {appointmentDetail.status !== "pending" && (
          <Badge className={`cursor-pointer ${status.color}`}>
            {status.label}
          </Badge>
        )}
        {appointmentDetail.status === "pending" && (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-100 rounded-full">
                <CircleDashed className="w-6 h-6 text-teal-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Xác nhận khám cho bệnh nhân
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className={`${status.color}`}>
                <Clock className="w-4 h-4 mr-2" />
                {status.label}
              </Badge>
              <Button
                ref={buttonElement}
                variant="confirm"
                size="sm"
                onClick={() => handleUpdateStatus("confirmed")}>
                Xác nhận
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Thông tin chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột thông tin bệnh nhân */}
        <div className="space-y-6">
          {/* Thẻ thông tin bệnh nhân */}
          <PatientCrad bookingId={params.id}  />
          
          {/* Thẻ thông tin lịch hẹn */}
          <BookingInfoCard bookingId={params.id} />
        </div>

        {/* Cột chính - Tabs */}
        <div className="lg:col-span-2">
          <Card>
            <Tabs
              defaultValue="details"
              className="w-full"
              onValueChange={setActiveTab}>
              <CardHeader className="pb-2">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="details">Khám bệnh</TabsTrigger>
                  <TabsTrigger value="prescription">Kê đơn thuốc</TabsTrigger>
                  <TabsTrigger value="history">Lịch sử khám</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Tab khám bệnh */}
                <TabsContent value="details" className="space-y-6 mt-0">
                  <ExaminationTab bookingId={params.id} />
                </TabsContent>

                {/* Tab kê đơn thuốc */}
                <TabsContent value="prescription" className="mt-0">
                  {!showPrescriptionPreview ? (
                    <PrescriptionForm
                      bookingId={params.id}

                    />
                  ) : (
                    <PrescriptionPreview
                      patientName={appointmentDetail.patientName}
                      patientAge={appointmentDetail.patientAge}
                      patientGender={appointmentDetail.patientGender}
                      diagnosis={diagnosis}
                      date={new Date()}
                      onBack={() => setShowPrescriptionPreview(false)}
                      onPrint={handlePrintPrescription}
                      onSend={handleSendPrescription}
                    />
                  )}
                </TabsContent>

                {/* Tab lịch sử khám */}
                <TabsContent value="history" className="mt-0">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-slate-500">
                      Lịch sử khám bệnh gần đây
                    </h3>
                    {appointmentDetail.medicalHistory &&
                      appointmentDetail.medicalHistory.length > 0 ? (
                      <div className="space-y-3">
                        {appointmentDetail.medicalHistory.map(
                          (record: any, index: any) => (
                            <div
                              key={index}
                              className="p-3 border rounded-md hover:bg-slate-50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">
                                    {record.diagnosis}
                                  </p>
                                  <p className="text-sm text-slate-500">
                                    {record.doctor}
                                  </p>
                                </div>
                                <Badge variant="outline">{record.date}</Badge>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">
                        Không có lịch sử khám bệnh.
                      </p>
                    )}
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
            <CardFooter>
              {appointmentDetail.status === "pending" ? (
                <div className="flex justify-center border-t pt-4">
                  <h2
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      handleButtonFocus();
                    }}
                    className=" cursor-pointer text-lg font-bold text-center bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
                    Vui lòng xác nhận lịch hẹn trước khi hoàn thành khám. Bấm để
                    xác nhận lịch hẹn
                  </h2>
                </div>
              ) : (
                <div className="w-full flex justify-between  border-t pt-4">
                  <Button variant="destructiveOutline">
                    <Trash className="h-4 w-4 mr-1" />
                    Hủy lịch hẹn
                  </Button>
                  <Button
                    onClick={handleCompleteAppointment}
                    className="bg-teal-600 hover:bg-teal-700">
                    <Check className="h-4 w-4 mr-1" />
                    Hoàn thành khám
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
