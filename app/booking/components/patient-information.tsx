"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { InfoIcon } from 'lucide-react'

interface PatientInformationProps {
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
  onChange: (patientInfo: any) => void
}

export function PatientInformation({ patientInfo, onChange }: PatientInformationProps) {
  const handleChange = (field: string, value: string) => {
    onChange({ ...patientInfo, [field]: value })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Thông tin bệnh nhân</h2>
      
      <div className="bg-blue-50 p-4 rounded-md flex items-start space-x-3">
        <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5" />
        <div>
          <p className="text-blue-800 text-sm">
            Vui lòng cung cấp thông tin chính xác để đảm bảo quá trình khám chữa bệnh diễn ra thuận lợi.
            Thông tin của bạn sẽ được bảo mật theo quy định.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">
            Họ và tên <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={patientInfo.name}
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
            value={patientInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Nhập số điện thoại"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={patientInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Nhập email"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dob">
            Ngày sinh
          </Label>
          <Input
            id="dob"
            type="date"
            value={patientInfo.dob}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label>Giới tính</Label>
          <RadioGroup
            value={patientInfo.gender}
            onValueChange={(value) => handleChange("gender", value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="cursor-pointer">Nam</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="cursor-pointer">Nữ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="cursor-pointer">Khác</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">
            Địa chỉ
          </Label>
          <Input
            id="address"
            value={patientInfo.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Nhập địa chỉ"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="reason">
            Lý do khám <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="reason"
            value={patientInfo.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            placeholder="Mô tả triệu chứng hoặc lý do khám"
            rows={3}
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">
            Ghi chú thêm
          </Label>
          <Textarea
            id="notes"
            value={patientInfo.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Thông tin thêm về tình trạng sức khỏe, tiền sử bệnh, thuốc đang sử dụng..."
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex items-start space-x-2 pt-4">
        <Checkbox id="terms" />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="terms"
            className="text-sm font-normal leading-snug text-gray-700"
          >
            Tôi đồng ý với các điều khoản dịch vụ và chính sách bảo mật
          </Label>
        </div>
      </div>
    </div>
  )
}
