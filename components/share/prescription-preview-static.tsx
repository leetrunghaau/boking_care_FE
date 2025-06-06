"use client";
import { Pill } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PrescriptionDialogProps {
  info: any | null;
  medications: any[];
}

export function PrescriptionPreviewStatic({
  info,
  medications,
}: PrescriptionDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5">
          <Pill className="w-3.5 h-3.5" />
          <span className="text-xs">Xem đơn thuốc</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto p-6"
        aria-describedby="đơn thuốc">
        <div className="space-y-6">
          <div className="border rounded-md p-6 bg-white">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold uppercase text-teal-700">
                Đơn thuốc
              </h2>
              <p className="text-sm text-slate-500">
                Ngày kê đơn: {info?.date || "Chưa có thông tin"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm">
                  <span className="font-medium">Họ tên bệnh nhân:</span>{" "}
                  {info?.patientName || "Chưa có thông tin"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Tuổi:</span>{" "}
                  {info?.patientAge || "Chưa có thông tin"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Giới tính:</span>{" "}
                  {info?.patientGender || "Chưa có thông tin"}
                </p>
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Chẩn đoán:</span>{" "}
                  {info?.diagnosis || "Chưa có thông tin"}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium border-b pb-2 mb-3">Thuốc điều trị</h3>
              <div className="space-y-4">
                {medications.map((med, index) => (
                  <div key={index} className="border-b pb-3">
                    <div className="flex items-baseline">
                      <span className="font-medium text-teal-700 mr-2">
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <p className="font-medium">{med.name}</p>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          <p className="text-sm">
                            <span className="text-slate-500">Liều dùng:</span>{" "}
                            {med.dosage}
                          </p>
                          <p className="text-sm">
                            <span className="text-slate-500">Tần suất:</span>{" "}
                            {med.frequency}
                          </p>
                          <p className="text-sm">
                            <span className="text-slate-500">Thời gian:</span>{" "}
                            {med.duration}
                          </p>
                        </div>
                        <p className="text-sm mt-1">
                          <span className="text-slate-500">Hướng dẫn:</span>{" "}
                          {med.instructions}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium border-b pb-2 mb-3">
                Hướng dẫn chung
              </h3>
              <p className="text-sm">{info.generalInstructions}</p>
            </div>

            <div className="flex justify-end mt-8">
              <div className="text-center">
                <p className="font-medium">{info.doctorName}</p>
                <p className="text-sm">{info.doctorSpecialty}</p>
                <p className="text-sm text-slate-500">{info.doctorHospital}</p>
              </div>
            </div>
          </div>
        </div>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
