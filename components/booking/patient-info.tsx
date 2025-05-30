"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { InfoIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Props {
  stepClick: (nextStep: boolean) => void;
}

export default function PatientInformation({ stepClick }: Props) {
  const [patient, setPatient] = useState({
    name: "",
    phone: "",
    email: "",
    dob: null as string | null,
    gender: "male",
    address: "",
    allergies: "",
    medicalHistory: "",
  });

  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const {time, date} = BookingStore()

  const handleChange = (field: keyof typeof patient, value: string) => {
    setPatient((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (!patient.name || !patient.phone) {
      setError("Vui lòng nhập đầy đủ Họ tên và Số điện thoại.");
      return;
    }
    if (!agree) {
      setError("Bạn phải đồng ý với điều khoản.");
      return;
    }
    setError("");
    stepClick(true);
  };

  useEffect(()=>{
console.log("in next ", {time, date})
  }, [])

  return (
    <div className="space-y-6 mx-auto w-10/12 mb-6">
      <h2 className="text-xl font-semibold">Phiếu thông tin</h2>

      <div className="bg-blue-50 p-4 rounded-md flex items-start space-x-3">
        <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5" />
        <div>
          <p className="text-blue-800 text-sm">
            Vui lòng cung cấp thông tin chính xác để đảm bảo quá trình khám chữa
            bệnh diễn ra thuận lợi. Thông tin của bạn sẽ được bảo mật theo quy
            định.
          </p>
        </div>
      </div>

      {/* THÔNG TIN BỆNH NHÂN */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Thông tin bệnh nhân</h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Họ và tên <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={patient.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              value={patient.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={patient.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Nhập email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Ngày sinh</Label>
            <Input
              id="dob"
              type="date"
              value={patient.dob ?? ""}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2 lg:col-span-4">
            <Label>Giới tính</Label>
            <RadioGroup
              value={patient.gender}
              onValueChange={(value) => handleChange("gender", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="cursor-pointer">
                  Nam
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="cursor-pointer">
                  Nữ
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="cursor-pointer">
                  Khác
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2 md:col-span-2 lg:col-span-4">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              value={patient.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Nhập địa chỉ"
            />
          </div>
        </CardContent>
      </Card>

      {/* THÔNG TIN Y TẾ */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Thông tin y tế</h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="space-y-2 md:col-span-6 lg:col-span-3">
            <Label htmlFor="allergies">Dị ứng</Label>
            <Textarea
              id="allergies"
              value={patient.allergies}
              onChange={(e) => handleChange("allergies", e.target.value)}
              placeholder="Dị ứng"
              rows={3}
            />
          </div>
          <div className="space-y-2 md:col-span-6 lg:col-span-3">
            <Label htmlFor="medicalHistory">Tiền sử bệnh</Label>
            <Textarea
              id="medicalHistory"
              value={patient.medicalHistory}
              onChange={(e) => handleChange("medicalHistory", e.target.value)}
              placeholder="Tiền sử bệnh"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* ĐIỀU KHOẢN */}
      <div className="flex items-start space-x-2 pt-4">
        <Checkbox
          id="terms"
          checked={agree}
          onCheckedChange={(checked) => setAgree(!!checked)}
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="terms"
            className="text-sm font-normal leading-snug text-gray-700"
          >
            Tôi đồng ý với các điều khoản dịch vụ và chính sách bảo mật
          </Label>
        </div>
      </div>

      {/* THÔNG BÁO LỖI & NÚT TIẾP */}
      {error && <p className="text-sm text-red-500">{error}</p>}

       <div className="flex justify-between col-span-3">
                <button
                    onClick={() => {
                        stepClick(false)
                    }}
                    className="text-gray-600 px-4 py-2 disabled:opacity-50"
                >
                    Quay lại
                </button>
                <button
                    onClick={handleNextStep}
                    className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Tiếp tục
                </button>
            </div>
    </div>
  );
}
