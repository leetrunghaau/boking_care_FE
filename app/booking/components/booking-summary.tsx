import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Calendar, Clock, User, Phone, FileText } from 'lucide-react'

interface BookingSummaryProps {
  bookingData: {
    specialty: any
    doctor: any
    date: Date | null
    time: string | null
    patientInfo: {
      name: string
      phone: string
      email: string
      dob: string
      gender: string
      address: string
      reason: string
      notes: string
    }
  }
}

export function BookingSummary({ bookingData }: BookingSummaryProps) {
  const { specialty, doctor, date, time, patientInfo } = bookingData
  
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
                    {specialty?.icon || null}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Chuyên khoa</p>
                    <p className="font-medium">{specialty?.name || "Chưa chọn"}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 mt-0.5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Bác sĩ</p>
                    <p className="font-medium">{doctor?.name || "Chưa chọn"}</p>
                    {doctor?.title && <p className="text-sm text-gray-500">{doctor.title}</p>}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 mt-0.5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày khám</p>
                    <p className="font-medium">
                      {date ? format(date, "EEEE, dd/MM/yyyy", { locale: vi }) : "Chưa chọn"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 mt-0.5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Giờ khám</p>
                    <p className="font-medium">{time || "Chưa chọn"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-3">Thông tin bệnh nhân</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Họ và tên</p>
                  <p className="font-medium">{patientInfo.name || "Chưa nhập"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium">{patientInfo.phone || "Chưa nhập"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{patientInfo.email || "Không có"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Ngày sinh</p>
                  <p className="font-medium">{patientInfo.dob || "Không có"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Giới tính</p>
                  <p className="font-medium">
                    {patientInfo.gender === "male"
                      ? "Nam"
                      : patientInfo.gender === "female"
                        ? "Nữ"
                        : patientInfo.gender === "other"
                          ? "Khác"
                          : "Không có"}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="font-medium">{patientInfo.address || "Không có"}</p>
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Lý do khám</p>
                  <p className="font-medium">{patientInfo.reason || "Chưa nhập"}</p>
                </div>
                
                {patientInfo.notes && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Ghi chú thêm</p>
                    <p className="font-medium">{patientInfo.notes}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-3">Thông tin thanh toán</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Phí khám</span>
                  <span>350.000 ₫</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Phí đặt lịch</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Tổng cộng</span>
                  <span className="text-teal-600">350.000 ₫</span>
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
