import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, DollarSign, Languages } from "lucide-react"

interface DoctorProfileInfoProps {
  doctorDetails: {
    fullName: string
    email: string
    phone: string
    address: string
    bio: string
    workingHours: string
    consultationFee: number
  }
  isEditing: boolean
}

export function DoctorProfileInfo({ doctorDetails, isEditing }: DoctorProfileInfoProps) {
  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
          <CardDescription>Cập nhật thông tin cá nhân và liên hệ của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input id="fullName" defaultValue={doctorDetails.fullName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Giới tính</Label>
              <Select defaultValue="male">
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={doctorDetails.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" defaultValue={doctorDetails.phone} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Input id="address" defaultValue={doctorDetails.address} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Giới thiệu</Label>
              <Textarea id="bio" rows={4} defaultValue={doctorDetails.bio} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workingHours">Giờ làm việc</Label>
              <Input id="workingHours" defaultValue={doctorDetails.workingHours} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consultationFee">Phí tư vấn (VNĐ)</Label>
              <Input id="consultationFee" type="number" defaultValue={doctorDetails.consultationFee} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="languages">Ngôn ngữ</Label>
              <Select defaultValue="vi">
                <SelectTrigger id="languages">
                  <SelectValue placeholder="Chọn ngôn ngữ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">Tiếng Anh</SelectItem>
                  <SelectItem value="fr">Tiếng Pháp</SelectItem>
                  <SelectItem value="zh">Tiếng Trung</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin cá nhân</CardTitle>
        <CardDescription>Thông tin cá nhân và liên hệ của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-500">Giới thiệu</h3>
          <p className="text-sm text-slate-700">{doctorDetails.bio}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Mail className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Email</h4>
              <p className="text-sm text-slate-700">{doctorDetails.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Phone className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Số điện thoại</h4>
              <p className="text-sm text-slate-700">{doctorDetails.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <MapPin className="h-4 w-4 text-red-700" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Địa chỉ</h4>
              <p className="text-sm text-slate-700">{doctorDetails.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Clock className="h-4 w-4 text-purple-700" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Giờ làm việc</h4>
              <p className="text-sm text-slate-700">{doctorDetails.workingHours}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-yellow-100 p-2 rounded-full">
              <DollarSign className="h-4 w-4 text-yellow-700" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Phí tư vấn</h4>
              <p className="text-sm text-slate-700">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  maximumFractionDigits: 0,
                }).format(doctorDetails.consultationFee)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <Languages className="h-4 w-4 text-teal-700" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Ngôn ngữ</h4>
              <p className="text-sm text-slate-700">Tiếng Việt, Tiếng Anh</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
