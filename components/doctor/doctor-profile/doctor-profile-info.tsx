"use client"
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, DollarSign, Languages } from "lucide-react";


interface Pops {
  info: any | null
}

export function DoctorProfileInfo({ info }: Pops) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin cá nhân</CardTitle>
        <CardDescription>Thông tin cá nhân và liên hệ của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-500">Giới thiệu</h3>
          <p className="text-sm text-slate-700">{info?.about}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem icon={<Mail className="h-4 w-4 text-blue-700" />} label="Email" value={info?.email} color="blue" />
          <InfoItem icon={<Phone className="h-4 w-4 text-green-700" />} label="Số điện thoại" value={info?.phone} color="green" />
          <InfoItem icon={<MapPin className="h-4 w-4 text-red-700" />} label="Địa chỉ" value={info?.address} color="red" />
          <InfoItem icon={<Clock className="h-4 w-4 text-purple-700" />} label="Giờ làm việc" value={info?.workingHours} color="purple" />
          <InfoItem
            icon={<DollarSign className="h-4 w-4 text-yellow-700" />}
            label="Phí tư vấn"
            value={info?.price}
            color="yellow"
          />
          <InfoItem icon={<Languages className="h-4 w-4 text-teal-700" />} label="Ngôn ngữ" value={info?.languages?.join(", ") || "Không rõ"} color="teal" />
        </div>
      </CardContent>
    </Card>
  );
}

// ✅ Component phụ để hiển thị mỗi dòng thông tin
function InfoItem({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`bg-${color}-100 p-2 rounded-full`}>{icon}</div>
      <div>
        <h4 className="text-sm font-medium">{label}</h4>
        <p className="text-sm text-slate-700">{value}</p>
      </div>
    </div>
  );
}
