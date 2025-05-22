"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import DoctorSchedule from "@/components/doctor/detail/doctor-schedule"

type BookingCardProps = {
  doctor: {
    id: string 
    price: number
    hospital: string
  }
}

const BookingCard: React.FC<BookingCardProps> = ({ doctor }) => {
  return (
    <Card className="mb-6 sticky top-20">
      <CardContent className="p-6">
        <h2 className="text-lg font-bold mb-4">Đặt lịch khám</h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Giá khám:</span>
            <span className="font-medium">{doctor.price.toLocaleString()} đ</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Thời gian:</span>
            <span className="font-medium">30 phút</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Địa điểm:</span>
            <span className="font-medium">{doctor.hospital}</span>
          </div>
        </div>

        <DoctorSchedule doctorId={doctor.id} />

        <div className="mt-6">
          <Button className="w-full bg-teal-600 hover:bg-teal-700">Đặt lịch khám</Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Miễn phí đặt lịch, không mất phí khi hủy trước 24 giờ
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingCard
