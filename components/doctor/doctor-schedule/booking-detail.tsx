"use client"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { forwardRef, useImperativeHandle, useEffect, useState } from "react"
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Stethoscope,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react"
import http from "@/helper/axios"
import { cn } from "@/lib/utils"
import { DialogTitle } from "@radix-ui/react-dialog"

interface BookingDetailDialogRef {
  openDialogWithBooking: (id: string) => void
}
const sampleBookingDetail = {
  appointmentDate: "2025-06-10",
  appointmentTime: "14:30",
  status: "cancelled", 
  reason: "Khám tổng quát định kỳ",
  notes: "Bệnh nhân có tiền sử huyết áp cao",
  createdAt: "2025-06-01T09:15:00Z",
  updatedAt: "2025-06-05T11:30:00Z",

  patient: {
    name: "Nguyễn Văn A",
    gender: "male",
    dateOfBirth: "1985-04-20",
    phone: "0909123456",
    email: "nguyenvana@example.com",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    medicalHistory: "Tiểu đường tuýp 2, dị ứng kháng sinh penicillin",
  },

  doctor: {
    name: "Trần Thị B",
    phone: "0987654321",
    email: "b.tran@example.com",
    specialization: "Nội tổng quát",
  },
}


export const BookingDetailDialog = forwardRef<BookingDetailDialogRef>((_, ref) => {
  const [open, setOpen] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [detail, setDetail] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useImperativeHandle(ref, () => ({
    openDialogWithBooking: (id: string) => {
      setBookingId(id)
      setOpen(true)
    },
  }))

  useEffect(() => {
    if (open && bookingId) {
      fetchBookingDetail()
    }
  }, [open, bookingId])

  const fetchBookingDetail = async () => {
    if (!bookingId) return

    setLoading(true)
    setError(null)

    try {
      const res = await http.get<any | null>(`/doctor-schedule/booking/${bookingId}`)
      setDetail(res)
    } catch (err) {
      console.error("Lỗi khi tải chi tiết booking:", err)
      setError("Không thể tải thông tin cuộc hẹn. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          color: "bg-teal-600 text-white",
          icon: <CheckCircle2 className="h-4 w-4" />,
          text: "Đã xác nhận",
        }
      case "pending":
        return {
          color: "bg-amber-500 text-white",
          icon: <Clock className="h-4 w-4" />,
          text: "Chờ xác nhận",
        }
      case "completed":
        return {
          color: "bg-emerald-600 text-white",
          icon: <CheckCircle2 className="h-4 w-4" />,
          text: "Hoàn thành",
        }
      case "cancelled":
        return {
          color: "bg-red-500 text-white",
          icon: <AlertCircle className="h-4 w-4" />,
          text: "Đã hủy",
        }
      default:
        return {
          color: "bg-gray-500 text-white",
          icon: <AlertCircle className="h-4 w-4" />,
          text: status,
        }
    }
  }

  
  const handleClose = () => {
    setOpen(false)
    setDetail(null)
    setBookingId(null)
    setError(null)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="border-b border-gray-200 p-6 bg-white">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-teal-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Chi tiết lịch hẹn</h2>
            </div>
            {detail && (
              <span
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2",
                  getStatusConfig(detail.status).color,
                )}
              >
                {getStatusConfig(detail.status).icon}
                {getStatusConfig(detail.status).text}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 bg-gray-50">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg">
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                <RefreshCw className="h-6 w-6 text-teal-600 animate-spin" />
              </div>
              <p className="text-gray-600 font-medium">Đang tải thông tin...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-lg">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Không thể tải thông tin</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchBookingDetail}
                className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="h-4 w-4" />
                Thử lại
              </button>
            </div>
          ) : detail ? (
            <div className="space-y-6">
              {/* Date & Time */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Ngày hẹn</p>
                      <p className="text-gray-900 font-semibold">{detail.appointmentDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Giờ hẹn</p>
                      <p className="text-gray-900 font-semibold">{detail.appointmentTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                    <User className="h-4 w-4 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Thông tin bệnh nhân</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium mb-1">Họ và tên</p>
                        <p className="text-lg font-semibold text-gray-900">{detail.patient.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <p className="text-sm text-gray-500 font-medium mb-1">Giới tính</p>
                          <p className="font-medium text-gray-900">{detail.patient.gender === "male" ? "Nam" : "Nữ"}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <p className="text-sm text-gray-500 font-medium mb-1">Ngày sinh</p>
                          <p className="font-medium text-gray-900">
                            {new Date(detail.patient.dateOfBirth).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                          <Phone className="h-4 w-4 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Số điện thoại</p>
                          <p className="font-medium text-gray-900">{detail.patient.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                          <Mail className="h-4 w-4 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Email</p>
                          <p className="font-medium text-gray-900">{detail.patient.email}</p>
                        </div>
                      </div>
                      {detail.patient.address && (
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center mt-0.5">
                            <MapPin className="h-4 w-4 text-teal-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Địa chỉ</p>
                            <p className="font-medium text-gray-900">{detail.patient.address}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {detail.patient.medicalHistory && (
                    <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <h4 className="text-sm font-medium text-teal-700">Tiền sử bệnh</h4>
                      </div>
                      <p className="text-gray-700 ml-8">{detail.patient.medicalHistory}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Doctor Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                    <Stethoscope className="h-4 w-4 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Thông tin bác sĩ</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium mb-1">Họ và tên</p>
                        <p className="text-lg font-semibold text-gray-900">BS. {detail.doctor.name}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium mb-1">Chuyên khoa</p>
                        <p className="font-medium text-gray-900">{detail.doctor.specialization}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                          <Phone className="h-4 w-4 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Số điện thoại</p>
                          <p className="font-medium text-gray-900">{detail.doctor.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                          <Mail className="h-4 w-4 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Email</p>
                          <p className="font-medium text-gray-900">{detail.doctor.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Chi tiết cuộc hẹn</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Lý do khám</h4>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-gray-900">{detail.reason}</p>
                    </div>
                  </div>
                  {detail.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Ghi chú</h4>
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-gray-900">{detail.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

             
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
})

BookingDetailDialog.displayName = "BookingDetailDialog"
