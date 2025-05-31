"use client";

import { useEffect, useState } from "react";
import { InfoIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import http from "@/helper/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { handleApiError } from "@/helper/handle-error";

export default function PatientInformation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const symptomsQuery = searchParams.get("symptoms");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: null as string | null,
    gender: "male",
    address: "",
  });

  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (!formData.name || !formData.phone) {
      setError("Vui lòng nhập đầy đủ Họ tên và Số điện thoại.");
      return;
    }
    if (!agree) {
      setError("Bạn phải đồng ý với điều khoản.");
      return;
    }
    setError("");
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("curStep", "4");
    queryParams.set("name", formData.name);
    queryParams.set("phone", formData.phone ?? "");
    queryParams.set("dob", formData.dob ?? "");
    queryParams.set("email", formData.email);
    queryParams.set("gender", formData.gender);
    queryParams.set("address", formData.address);
    const queryString = queryParams.toString();
    router.push(`/dat-lich-kham${queryString ? `?${queryString}` : ""}`);
  };
  const handleBackStep = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("curStep", "2");
    const queryString = currentParams.toString();
    router.push(`/dat-lich-kham${queryString ? `?${queryString}` : ""}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const rs = await http.get<any | null>("/booking/info");
        if (rs) {
          const queryParams = new URLSearchParams(searchParams.toString());
          queryParams.set("curStep", "4");
          queryParams.set("patientId", rs.id.toString());
          const queryString = queryParams.toString();
          router.push(`/dat-lich-kham${queryString ? `?${queryString}` : ""}`);
        }
      } catch (err) {
        handleApiError(
          err,
          "Có lỗi xảy ra, vui lòng thử lại sau",
          "Lấy thông tin bệnh nhân thất bại"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
              value={formData.name}
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
              value={formData.phone}
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
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Nhập email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Ngày sinh</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob ?? ""}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2 lg:col-span-4">
            <Label>Giới tính</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleChange("gender", value)}
              className="flex space-x-4">
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
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Nhập địa chỉ"
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
            className="text-sm font-normal leading-snug text-gray-700">
            Tôi đồng ý với các điều khoản dịch vụ và chính sách bảo mật
          </Label>
        </div>
      </div>

      {/* THÔNG BÁO LỖI & NÚT TIẾP */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-between col-span-3 pb-10">
        <button
          onClick={handleBackStep}
          className="text-gray-600 px-4 py-2 disabled:opacity-50">
          Quay lại
        </button>
        <button
          onClick={handleNextStep}
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed">
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
