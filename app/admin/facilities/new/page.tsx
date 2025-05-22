"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function NewFacilityPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [facility, setFacility] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    openingHours: "",
    license: "",
  })

  const handleSave = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      router.push("/admin/facilities")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Thêm cơ sở y tế mới</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Hủy
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lưu ý</AlertTitle>
        <AlertDescription>
          Vui lòng điền đầy đủ thông tin cơ bản. Bạn có thể bổ sung thêm thông tin chi tiết sau khi tạo cơ sở y tế.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
          <CardDescription>Thông tin chung về cơ sở y tế</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Tên cơ sở y tế <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={facility.name}
                onChange={(e) => setFacility({ ...facility, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Mô tả <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                rows={4}
                value={facility.description}
                onChange={(e) => setFacility({ ...facility, description: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                Địa chỉ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                value={facility.address}
                onChange={(e) => setFacility({ ...facility, address: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={facility.phone}
                  onChange={(e) => setFacility({ ...facility, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">
                  Giấy phép hoạt động <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="license"
                  value={facility.license}
                  onChange={(e) => setFacility({ ...facility, license: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="openingHours">
                Giờ làm việc <span className="text-red-500">*</span>
              </Label>
              <Input
                id="openingHours"
                value={facility.openingHours}
                onChange={(e) => setFacility({ ...facility, openingHours: e.target.value })}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.back()}>
          Hủy
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu"}
        </Button>
      </div>
    </div>
  )
}
