import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Download, Home } from 'lucide-react'

export default function BookingConfirmationPage() {
  // In a real application, you would fetch the booking details from the server
  // or pass them through URL parameters or context
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">Đặt lịch thành công!</h1>
        <p className="text-gray-600 mt-2">
          Cảm ơn bạn đã đặt lịch khám tại hệ thống của chúng tôi
        </p>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Thông tin lịch hẹn</CardTitle>
          <CardDescription>
            Mã đặt lịch: <span className="font-medium">BK-20230615-001</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Bệnh nhân</p>
              <p className="font-medium">Nguyễn Văn A</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Số điện thoại</p>
              <p className="font-medium">0912 345 678</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Chuyên khoa</p>
              <p className="font-medium">Thần kinh</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Bác sĩ</p>
              <p className="font-medium">BS. Nguyễn Văn A</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Ngày khám</p>
              <p className="font-medium">Thứ Hai, 15/06/2023</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Giờ khám</p>
              <p className="font-medium">09:30</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Cơ sở y tế</p>
              <p className="font-medium">Phòng khám Đa khoa An Tâm</p>
              <p className="text-sm text-gray-500">123 Nguyễn Văn Cừ, Quận 5, TP.HCM</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Trạng thái</p>
              <p className="font-medium text-green-600">Đã xác nhận</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-blue-800 text-sm">
              <strong>Lưu ý:</strong> Chúng tôi đã gửi thông tin lịch hẹn qua email và tin nhắn SMS. Vui lòng đến trước giờ hẹn 15 phút để hoàn tất thủ tục.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between">
          <Button variant="outline" className="w-full sm:w-auto">
            <Calendar className="mr-2 h-4 w-4" />
            Thêm vào lịch
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Tải phiếu hẹn
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Về trang chủ
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
