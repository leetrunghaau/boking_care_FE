"use client";

import { useState, useEffect } from "react";
import http from "@/helper/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  FileText,
  Heart,
  Phone,
  MapPin,
  User,
  Activity,
  Thermometer,
  Weight,
  Download,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getFullURL } from '@/helper/url';

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  avatar: string;
  medicalHistory: MedicalVisit[];
  vitals: VitalSigns;
  allergies: string[];
  medications: Medication[];
  documents: MedicalDocument[];
}

interface MedicalVisit {
  id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  symptoms: string;
  treatment: string;
  notes: string;
  vitals: VitalSigns;
}

interface VitalSigns {
  bloodPressure: string;
  temperature: string;
  heartRate: string;
  respiratoryRate: string;
  height: string;
  weight: string;
  bmi: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
}

interface MedicalDocument {
  id: string;
  name: string;
  type: string;
  date: string;
  url: string;
}

interface Pops {
  patientId: number | string | null
}
export default function PatientRecordModal({ patientId }: Pops) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patientRecord, setPatientRecord] = useState<any | null>(null);
  useEffect(() => {
    if (!patientId) return
    if (!open) return
    setLoading(true);
    const fetchPatientRecord = async () => {
      try {
        const res = await http.get<any>(
          `/doctor-appointment/patient/record/${patientId}`
        );
        setPatientRecord(res);
        console.log("Fetched patient record:", res);
      } catch (err) {
        console.error("Failed to fetch patient record:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientRecord();
  }, [patientId, open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" bg-teal-600 hover:bg-teal-700 text-white">
          <FileText />
          Hồ sơ bệnh nhân
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Hồ sơ bệnh án {patientRecord ? ` - ${patientRecord.name}` : ""}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-100px)]">
          {patientRecord &&
            <div className="space-y-6">
              {/* Patient Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Thông tin cá nhân
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={getFullURL(patientRecord.img) || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {patientRecord.name ? patientRecord.name.charAt(0) : "?"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Họ tên:</span>
                          <span>{patientRecord.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Tuổi:</span>
                          <span>
                            {patientRecord.age} • {patientRecord.gender}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Điện thoại:</span>
                          <span>{patientRecord.phone}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                          <div>
                            <span className="font-medium">Địa chỉ:</span>
                            <p className="text-sm text-gray-600 mt-1">
                              {patientRecord.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Vitals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Chỉ số sức khỏe gần nhất
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                      <Heart className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-sm text-gray-600">Huyết áp</p>
                        <p className="font-semibold">
                          {patientRecord.bloodPressure}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                      <Thermometer className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-600">Nhiệt độ</p>
                        <p className="font-semibold">
                          {patientRecord.temperature}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <Activity className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Nhịp tim</p>
                        <p className="font-semibold">
                          {patientRecord.pulse}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <Weight className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-600">BMI</p>
                        <p className="font-semibold">
                          {patientRecord.bmi}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Information Tabs */}
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="history">Lịch sử khám</TabsTrigger>
                  <TabsTrigger value="medications">Thuốc đang dùng</TabsTrigger>
                  <TabsTrigger value="allergies">Dị ứng</TabsTrigger>
                  <TabsTrigger value="documents">Tài liệu</TabsTrigger>
                </TabsList>

                <TabsContent value="history" className="space-y-4">
                  {patientRecord.records.map((visit:any) => (
                    <Card key={visit.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              {visit.visitDate}
                            </CardTitle>
                            <p className="text-sm text-gray-600">
                              Bác sĩ: {visit.doctorName}
                            </p>
                          </div>
                          <Badge variant="outline">{visit.finalDiagnosis}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Triệu chứng:</h4>
                            <p className="text-sm text-gray-600">
                              {visit.symptoms}
                            </p>
                          </div>
                          {/* <div>
                            <h4 className="font-medium mb-2">Điều trị:</h4>
                            <p className="text-sm text-gray-600">
                              {visit.treatment}
                            </p>
                          </div> */}
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Ghi chú:</h4>
                          <p className="text-sm text-gray-600">{visit.notes}</p>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-medium mb-2">Chỉ số sinh hiệu:</h4>
                          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-sm">
                            <div>
                              <span className="text-gray-500">HA:</span>{" "}
                              {visit.bloodPressure}
                            </div>
                            <div>
                              <span className="text-gray-500">Nhiệt độ:</span>{" "}
                              {visit.temperature}
                            </div>
                            <div>
                              <span className="text-gray-500">Nhịp tim:</span>{" "}
                              {visit.pulse}
                            </div>
                            <div>
                              <span className="text-gray-500">Cân nặng:</span>{" "}
                              {visit.weight}
                            </div>
                            <div>
                              <span className="text-gray-500">BMI:</span>{" "}
                              {visit.bmi}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="medications" className="space-y-4">
                  {patientRecord.prescriptions.map((medication:any) => (
                    <Card key={medication.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-medium text-lg">
                              {medication.name}
                            </h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>
                                <span className="font-medium">Liều dùng:</span>{" "}
                                {medication.dosage}
                              </p>
                              <p>
                                <span className="font-medium">Tần suất:</span>{" "}
                                {medication.usage}
                              </p>
                              <p>
                                <span className="font-medium">Bắt đầu:</span>{" "}
                                {medication.start}
                              </p>
                              {medication.endDate && (
                                <p>
                                  <span className="font-medium">Kết thúc:</span>{" "}
                                  {medication.end}
                                </p>
                              )}
                            </div>
                          </div>
                          {
                            medication.isUser && <Badge variant="secondary">Đang sử dụng</Badge>
                          }
                          
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="allergies" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Danh sách dị ứng</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {patientRecord.allergens.map((allergy: string, index: number) => (
                          <Badge
                            key={index}
                            variant="destructive"
                            className="text-sm">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  {patientRecord.files.map((document: any) => (
                    <Card key={document.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-blue-500" />
                            <div>
                              <h4 className="font-medium">{document.name}</h4>
                              <p className="text-sm text-gray-600">
                                {document.type} • {document.day}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Xem
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Tải về
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          }
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
