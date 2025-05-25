import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Calendar, Clock, User, Phone, FileText } from 'lucide-react'
import { BookingData } from "./type"
import { getIconByName } from "@/helper/icon-map"
import { formatCurrencyVND } from "@/helper/customNumView"

interface Pops {
  bookingData: BookingData
}

export default function Summary({ bookingData }: Pops) {
  const Icon = getIconByName(bookingData?.specialty?.icon ?? "unKnown")
  return (
    <div className="space-y-6">
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
                    <Icon />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Chuyên khoa</p>
                    <p className="font-medium">{bookingData.specialty?.name || "Chưa chọn"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 mt-0.5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Bác sĩ</p>
                    <p className="font-medium">{bookingData.doctor?.name || "Chưa chọn"}</p>
                    {bookingData.doctor && <p className="text-sm text-gray-500">{bookingData.doctor?.title}</p>}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 mt-0.5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày khám</p>
                    <p className="font-medium">
                      {bookingData.date ? format(bookingData.date, "EEEE, dd/MM/yyyy", { locale: vi }) : "Chưa chọn"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 mt-0.5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Giờ khám</p>
                    <p className="font-medium">{bookingData.time || "Chưa chọn"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-3">Thông tin bệnh nhân</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Họ và tên</p>
                  <p className="font-medium">{bookingData.patient.name || "Chưa nhập"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium">{bookingData.patient.phone || "Chưa nhập"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{bookingData.patient.email || "Không có"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Ngày sinh</p>
                  <p className="font-medium">{bookingData.patient?.dob ? format(bookingData.patient.dob, "dd-MM-yyyy", { locale: vi }) : "Không có"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Giới tính</p>
                  <p className="font-medium">
                    {bookingData.patient.gender == "male"
                      ? "Nam"
                      : bookingData.patient.gender == "female"
                        ? "Nữ"
                        : bookingData.patient.gender == "other"
                          ? "Khác"
                          : "Không có"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="font-medium">{bookingData.patient.address || "Không có"}</p>
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
                  <span>{formatCurrencyVND(bookingData.doctor?.price ?? 0)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Phí đặt lịch</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Tổng cộng</span>
                  <span className="text-teal-600">{formatCurrencyVND( bookingData.doctor?.price || 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-yellow-50 p-4 rounded-md">
        <p className="text-yellow-800 text-sm">
          <strong>Lưu ý:</strong> Vui lòng đến trước giờ hẹn 15 phút để hoàn tất thủ tục. Mang theo giấy tờ tùy thân và thẻ bảo hiểm y tế (nếu có).
        </p>
      </div>
    </div>
  )
}
