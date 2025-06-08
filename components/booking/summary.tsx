"use client";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Calendar, Clock, User, MapPin } from "lucide-react";
import { formatCurrencyVND } from "@/helper/customNumView";
import { useEffect, useState } from "react";
import http from "@/helper/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { getIconByName } from "@/helper/icon-map";
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils";
export default function Summary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [doctor, setDoctor] = useState<any | null>(null);
  const [patient, setPatient] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    patientId: Number(searchParams.get("patientId")) || null,
    doctorId: Number(searchParams.get("doctorId")) || null,
    symptoms: searchParams.get("symptoms") || "",
    date: searchParams.get("date") || "",
    time: searchParams.get("time") || "",
    dob: searchParams.get("dob") || "",
    name: searchParams.get("name") || "",
    phone: searchParams.get("phone") || "",
    email: searchParams.get("email") || "",
    gender: searchParams.get("gender") || "",
    address: searchParams.get("address") || "",
  });
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Nếu có thông tin bệnh nhân
        if (formData.patientId) {
          const rs = await http.get<any | null>(`/booking/info`);
          if (rs) {
            setFormData((prev) => ({
              ...prev,
              name: rs.name,
              phone: rs.phone || "",
              email: rs.user?.email || rs.email || "",
              gender: rs.gender || "",
              address: rs.address || "",
              dob: rs.dob || "",
            }));
            setPatient(rs);
          }
        }

        // Nếu có doctorId
        if (formData.doctorId) {
          const rs = await http.get<any | null>(
            `/booking/doctor/${formData.doctorId}`
          );
          setDoctor(rs);
        }
      } catch (err) {
        handleApiError(err, "Lấy thông tin bệnh nhân thất bại.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleBackStep = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("curStep", `${formData.patientId ? "2" : "3"}`);
    const queryString = currentParams.toString();
    router.push(`/dat-lich-kham${queryString ? `?${queryString}` : ""}`);
  };

  const handleNextStep = () => {
    const postData = async () => {
      setIsLoading(true);
      try {
        const rs = await http.post("/booking/up", formData);
        if (rs) {
          router.push(`/thanh-cong?action=booking`);
        }
        handleApiSuccess("Đặt lịch khám thành công!");
      } catch (err) {
        console.log(err);
        handleApiError(err, "Đặt lịch khám thất bại");
      } finally {
        setIsLoading(false);
      }
    };
    postData();
  };

  const Icon = getIconByName(doctor?.specialtyIcon ?? "");
  return (
    <div className="space-y-6 md:max-w-[600px] lg:max-w-[900px] mx-auto">
      <h2 className="text-xl font-semibold">Xác nhận thông tin đặt lịch</h2>

      <div className="bg-green-50 p-4 rounded-md flex items-start space-x-3">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
        <div>
          <p className="text-green-800 text-sm">
            Vui lòng kiểm tra lại thông tin đặt lịch khám trước khi xác nhận.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Thông tin lịch khám</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-0.5 text-teal-600">
                    <Icon className="w-5 h-5 mt-0.5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Chuyên khoa</p>
                    <p className="font-medium">
                      {doctor?.specialtyName || "Chưa chọn"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 mt-0.5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Bác sĩ</p>
                    <p className="font-medium">{doctor?.name || "Chưa chọn"}</p>
                    {doctor && (
                      <p className="text-sm text-gray-500">{doctor?.title}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 mt-0.5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày khám</p>
                    <p className="font-medium">
                      {formData.date
                        ? format(formData.date, "EEEE, dd/MM/yyyy", {
                            locale: vi,
                          })
                        : "Chưa chọn"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 mt-0.5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Giờ khám</p>
                    <p className="font-medium">
                      {formData.time || "Chưa chọn"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 col-span-2">
                  <MapPin className="w-5 h-5 mt-0.5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="font-medium">
                      {doctor?.address || "không có thông tin"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-3">Thông tin bệnh nhân</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Họ và tên</p>
                  <p className="font-medium">{formData.name ?? "Chưa nhập"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium">
                    {formData?.phone ?? "Chưa nhập"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{formData?.email ?? "Không có"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Ngày sinh</p>
                  <p className="font-medium">
                    {formData?.dob
                      ? format(formData.dob, "dd-MM-yyyy", { locale: vi })
                      : "Không có"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Giới tính</p>
                  <p className="font-medium">
                    {formData?.gender == "male"
                      ? "Nam"
                      : patient?.gender == "female"
                      ? "Nữ"
                      : patient?.gender == "other"
                      ? "Khác"
                      : "Không có"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="font-medium">
                    {formData.address ?? "Không có"}
                  </p>
                </div>

                {/* <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Lý do khám</p>
                  <p className="font-medium">{patientInfo.reason || "Chưa nhập"}</p>
                </div> */}

                {/* {patientInfo.notes && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Ghi chú thêm</p>
                    <p className="font-medium">{patientInfo.notes}</p>
                  </div>
                )} */}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-3">Thông tin thanh toán</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Phí khám</span>
                  <span>{formatCurrencyVND(doctor?.price ?? 0)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Phí đặt lịch</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Tổng cộng</span>
                  <span className="text-teal-600">
                    {formatCurrencyVND(doctor?.price || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-yellow-50 p-4 rounded-md">
        <p className="text-yellow-800 text-sm">
          <strong>Lưu ý:</strong> Vui lòng đến trước giờ hẹn 15 phút để hoàn tất
          thủ tục. Mang theo giấy tờ tùy thân và thẻ bảo hiểm y tế (nếu có).
        </p>
      </div>

      <div className="flex justify-between pb-10">
        <button
          onClick={handleBackStep}
          className="text-gray-600 px-4 py-2 disabled:opacity-50">
          Quay lại
        </button>
        <button
          onClick={handleNextStep}
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed">
          Xác nhận
        </button>
      </div>
    </div>
  );
}
