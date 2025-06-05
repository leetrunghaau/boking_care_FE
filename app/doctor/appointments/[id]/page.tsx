"use client";

// React core and hooks
import { useEffect, useState, useRef } from "react";

// Next hooks
import { useRouter, useParams } from "next/navigation";

// UI and icons
import { ArrowLeft, Check, Clock, Trash, CircleDashed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrescriptionForm } from "@/components/doctor/doctor-prescriptions/prescription-form";
import { PrescriptionPreview } from "@/components/doctor/doctor-prescriptions/prescription-preview";
// Utilities
import http from "@/helper/axios";
import PatientCrad from "@/components/doctor/doctor-appointments/detail/patient-card";
import BookingInfoCard from "@/components/doctor/doctor-appointments/detail/booking-info-card";
import ExaminationTab from "@/components/doctor/doctor-appointments/detail/examination-tab";

export default function AppointmentDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [showReview, setShowReview] = useState(false)

  return (
    <div className="container mx-auto my-8 px-4 space-y-6 w-11/12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-800">
            Chi tiết lịch hẹn
          </h1>
        </div>
       
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <PatientCrad bookingId={params.id} />
          <BookingInfoCard bookingId={params.id} />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <Tabs
              defaultValue="details"
              className="w-full"
              // onValueChange={setActiveTab}
              >
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
                  {!showReview ? (
                    <PrescriptionForm
                      bookingId={params.id}
                      onPreview={() => setShowReview(true)}
                    />
                  ) : (
                    <PrescriptionPreview
                     bookingId={params.id}
                      onBack={() => setShowReview(false)}
                      // onPrint={handlePrintPrescription}
                      // onSend={handleSendPrescription}
                    />
                  )}
                </TabsContent>

                {/* Tab lịch sử khám */}
                {/* <TabsContent value="history" className="mt-0">
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
                </TabsContent> */}
              </CardContent>
            </Tabs>
            {/* <CardFooter>
              <div className="w-full flex justify-between  border-t pt-4">
                  <Button variant="destructiveOutline">
                    <Trash className="h-4 w-4 mr-1" />
                    Hủy lịch hẹn
                  </Button>
                  <Button
                    // onClick={}
                    className="bg-teal-600 hover:bg-teal-700">
                    <Check className="h-4 w-4 mr-1" />
                    Hoàn thành khám
                  </Button>
                </div>
            </CardFooter> */}
          </Card>
        </div>
      </div>
    </div>
  );
}
