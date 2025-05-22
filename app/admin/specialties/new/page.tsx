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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Danh sách biểu tượng có sẵn
const availableIcons = [
  { name: "Brain", label: "Não" },
  { name: "Heart", label: "Tim" },
  { name: "Baby", label: "Trẻ em" },
  { name: "Stethoscope", label: "Ống nghe" },
  { name: "Eye", label: "Mắt" },
  { name: "Tooth", label: "Răng" },
  { name: "Bone", label: "Xương" },
  { name: "Lungs", label: "Phổi" },
]

export default function NewSpecialtyPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [specialty, setSpecialty] = useState({
    name: "",
    slug: "",
    icon: "",
    description: "",
  })

  const handleSave = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      router.push("/admin/specialties")
    }, 1000)
  }

  const handleNameChange = (name: string) => {
    setSpecialty({
      ...specialty,
      name,
      slug: name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-"),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Thêm chuyên khoa mới</h1>
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
          Vui lòng điền đầy đủ thông tin cơ bản. Bạn có thể bổ sung thêm thông tin chi tiết sau khi tạo chuyên khoa.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
          <CardDescription>Thông tin chung về chuyên khoa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Tên chuyên khoa <span className="text-red-500">*</span>
              </Label>
              <Input id="name" value={specialty.name} onChange={(e) => handleNameChange(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                value={specialty.slug}
                onChange={(e) => setSpecialty({ ...specialty, slug: e.target.value })}
                required
              />
              <p className="text-sm text-muted-foreground">
                Slug sẽ được sử dụng trong URL, ví dụ: /specialties/than-kinh
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">
                Biểu tượng <span className="text-red-500">*</span>
              </Label>
              <Select value={specialty.icon} onValueChange={(value) => setSpecialty({ ...specialty, icon: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn biểu tượng" />
                </SelectTrigger>
                <SelectContent>
                  {availableIcons.map((icon) => (
                    <SelectItem key={icon.name} value={icon.name}>
                      {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Mô tả <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                rows={4}
                value={specialty.description}
                onChange={(e) => setSpecialty({ ...specialty, description: e.target.value })}
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
