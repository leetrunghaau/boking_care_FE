"use client"

import { Button } from "@/components/ui/button"
import http from "@/helper/axios"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { ArrowLeft, Printer, Send } from "lucide-react"
import { useEffect, useState } from "react"
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
interface PrescriptionPreviewProps {
  bookingId: string | number | null
  onBack: () => void
}

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10, fontSize: 12 },
});
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Xin chào từ React PDF!</Text>
      </View>
    </Page>
  </Document>
);
export function PrescriptionPreview({ bookingId, onBack }: PrescriptionPreviewProps) {
  const [medications, setMedications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<any>({
    patientName: "",
    patientAge: "",
    patientGender: "",
    diagnosis: "",
    doctorName: "",
    doctorSpecialty: "",
    doctorHospital: "",
    prescriptions: "",
    generalInstructions: ""
  });

  useEffect(() => {
    if (!bookingId) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await http.get<any>(
          `/doctor-appointment/prescription-info/${bookingId}`
        );
        console.log("đơn thuốc khi tải mới", res);
        if (res) {
          setMedications(res.prescriptions);
          setInfo(res.info)

        }
      } catch (err) {
        console.error("Failed to fetch appointment detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookingId]);


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Quay lại
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" >
            <Printer className="h-4 w-4 mr-1" />
            In đơn thuốc
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Send className="h-4 w-4 mr-1" />
            Gửi cho bệnh nhân
          </Button>
          
        </div>
      </div>

      {/* Xem trước đơn thuốc */}
      <div className="border rounded-md p-6 bg-white">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold uppercase text-teal-700">Đơn thuốc</h2>
          <p className="text-sm text-slate-500">Ngày kê đơn: {format(new Date, "dd/MM/yyyy", { locale: vi })}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm">
              <span className="font-medium">Họ tên bệnh nhân:</span> {info.patientName}
            </p>
            <p className="text-sm">
              <span className="font-medium">Tuổi:</span> {info.patientAge}
            </p>
            <p className="text-sm">
              <span className="font-medium">Giới tính:</span> {info.patientGender}
            </p>
          </div>
          <div>
            <p className="text-sm">
              <span className="font-medium">Chẩn đoán:</span> {info.diagnosis}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium border-b pb-2 mb-3">Thuốc điều trị</h3>
          <div className="space-y-4">
            {medications.map((med, index) => (
              <div key={index} className="border-b pb-3">
                <div className="flex items-baseline">
                  <span className="font-medium text-teal-700 mr-2">{index + 1}.</span>
                  <div className="flex-1">
                    <p className="font-medium">{med.name}</p>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <p className="text-sm">
                        <span className="text-slate-500">Liều dùng:</span> {med.dosage}
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-500">Tần suất:</span> {med.frequency}
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-500">Thời gian:</span> {med.duration}
                      </p>
                    </div>
                    <p className="text-sm mt-1">
                      <span className="text-slate-500">Hướng dẫn:</span> {med.instructions}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium border-b pb-2 mb-3">Hướng dẫn chung</h3>
          <p className="text-sm">{info.generalInstructions}</p>
        </div>

        <div className="flex justify-end mt-8">
          <div className="text-center">
            <p className="font-medium">{info.doctorName}</p>
            <p className="text-sm">{info.doctorSpecialty}</p>
            {/* <p className="text-sm text-slate-500">Số CCHN: {doctorInfo.license}</p> */}
            <p className="text-sm text-slate-500">{info.doctorHospital}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
