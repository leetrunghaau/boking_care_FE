"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Plus, X, Trash2, Upload, MapPin } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

const fakeFacilityData = {
  id: "123",
  name: "Phòng khám Đa khoa An Tâm",
  description:
    "Phòng khám Đa khoa An Tâm là địa chỉ chăm sóc sức khỏe đáng tin cậy với đội ngũ bác sĩ giàu kinh nghiệm, thiết bị hiện đại và không gian khám chữa bệnh tiện nghi.",
  address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
  phone: "1900 999 888",
  openingHours: "Thứ 2 - Chủ Nhật: 7:00 - 20:00",
  license: "Số 1234/BYT-GPHĐ",
  image: "/placeholder.svg?height=400&width=1200&text=Phòng+khám+An+Tâm",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!....",
  services: [
    "Khám tổng quát",
    "Khám chuyên khoa",
    "Xét nghiệm - Chẩn đoán hình ảnh",
    "Tư vấn trực tuyến",
    "Gói khám doanh nghiệp",
  ],
  specialties: ["Nội tổng quát", "Sản phụ khoa", "Nhi khoa", "Tai mũi họng", "Da liễu", "Tim mạch"],
  doctors: [
    {
      name: "BS. Nguyễn Văn A",
      specialty: "Nội tổng quát",
      image: "/placeholder.svg?height=300&width=300&text=BS+A",
    },
    {
      name: "TS.BS. Trần Thị B",
      specialty: "Sản phụ khoa",
      image: "/placeholder.svg?height=300&width=300&text=BS+B",
    },
  ],
  gallery: [
    "/placeholder.svg?height=300&width=400&text=Hình+1",
    "/placeholder.svg?height=300&width=400&text=Hình+2",
    "/placeholder.svg?height=300&width=400&text=Hình+3",
  ],
  stats: {
    years: 10,
    patients: 100000,
    doctors: 100,
    rating: 4.9,
  },
  status: "active",
}

export default function EditFacilityPage() {
  const { id } = useParams()
  const router = useRouter()
  const [facility, setFacility] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newService, setNewService] = useState("")
  const [newSpecialty, setNewSpecialty] = useState("")
  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "", image: "" })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFacility(fakeFacilityData)
      setLoading(false)
    }, 500)
  }, [id])

  const handleSave = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      router.push("/admin/facilities")
    }, 1000)
  }

  const handleAddService = () => {
    if (newService.trim()) {
      setFacility({
        ...facility,
        services: [...facility.services, newService.trim()],
      })
      setNewService("")
    }
  }

  const handleRemoveService = (index: number) => {
    const updatedServices = [...facility.services]
    updatedServices.splice(index, 1)
    setFacility({
      ...facility,
      services: updatedServices,
    })
  }

  const handleAddSpecialty = () => {
    if (newSpecialty.trim()) {
      setFacility({
        ...facility,
        specialties: [...facility.specialties, newSpecialty.trim()],
      })
      setNewSpecialty("")
    }
  }

  const handleRemoveSpecialty = (index: number) => {
    const updatedSpecialties = [...facility.specialties]
    updatedSpecialties.splice(index, 1)
    setFacility({
      ...facility,
      specialties: updatedSpecialties,
    })
  }

  const handleAddDoctor = () => {
    if (newDoctor.name.trim() && newDoctor.specialty.trim()) {
      setFacility({
        ...facility,
        doctors: [
          ...facility.doctors,
          {
            ...newDoctor,
            image: newDoctor.image || "/placeholder.svg?height=300&width=300&text=BS",
          },
        ],
      })
      setNewDoctor({ name: "", specialty: "", image: "" })
    }
  }

  const handleRemoveDoctor = (index: number) => {
    const updatedDoctors = [...facility.doctors]
    updatedDoctors.splice(index, 1)
    setFacility({
      ...facility,
      doctors: updatedDoctors,
    })
  }

  const handleRemoveGalleryImage = (index: number) => {
    const updatedGallery = [...facility.gallery]
    updatedGallery.splice(index, 1)
    setFacility({
      ...facility,
      gallery: updatedGallery,
    })
  }

  if (loading) {
    return <p className="text-center py-10">Đang tải dữ liệu...</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Chỉnh sửa cơ sở y tế</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Hủy
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lưu ý</AlertTitle>
        <AlertDescription>Thông tin cơ sở y tế sẽ được hiển thị công khai sau khi được phê duyệt.</AlertDescription>
      </Alert>

      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="services">Dịch vụ & Chuyên khoa</TabsTrigger>
          <TabsTrigger value="doctors">Bác sĩ</TabsTrigger>
          <TabsTrigger value="gallery">Hình ảnh</TabsTrigger>
          <TabsTrigger value="stats">Thống kê</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>Thông tin chung về cơ sở y tế</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên cơ sở y tế</Label>
                  <Input
                    id="name"
                    value={facility.name}
                    onChange={(e) => setFacility({ ...facility, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={facility.description}
                    onChange={(e) => setFacility({ ...facility, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    value={facility.address}
                    onChange={(e) => setFacility({ ...facility, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={facility.phone}
                      onChange={(e) => setFacility({ ...facility, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license">Giấy phép hoạt động</Label>
                    <Input
                      id="license"
                      value={facility.license}
                      onChange={(e) => setFacility({ ...facility, license: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="openingHours">Giờ làm việc</Label>
                  <Input
                    id="openingHours"
                    value={facility.openingHours}
                    onChange={(e) => setFacility({ ...facility, openingHours: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={facility.status}
                    onValueChange={(value) => setFacility({ ...facility, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="pending">Đang xét duyệt</SelectItem>
                      <SelectItem value="inactive">Tạm ngưng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh đại diện</CardTitle>
              <CardDescription>Hình ảnh chính hiển thị trên trang chi tiết cơ sở y tế</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex flex-col items-center justify-center">
                  <img
                    src={facility.image || "/placeholder.svg"}
                    alt="Hình ảnh đại diện"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Tải lên hình ảnh mới
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bản đồ</CardTitle>
              <CardDescription>Nhúng bản đồ Google Maps để hiển thị vị trí cơ sở y tế</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mapEmbedUrl">URL nhúng Google Maps</Label>
                  <Input
                    id="mapEmbedUrl"
                    value={facility.mapEmbedUrl}
                    onChange={(e) => setFacility({ ...facility, mapEmbedUrl: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Mở Google Maps, chọn "Chia sẻ" và sao chép mã nhúng
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Dịch vụ nổi bật</CardTitle>
              <CardDescription>Các dịch vụ chính mà cơ sở y tế cung cấp</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Thêm dịch vụ mới"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddService()}
                  />
                  <Button onClick={handleAddService}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {facility.services.map((service: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <span>{service}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveService(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chuyên khoa</CardTitle>
              <CardDescription>Các chuyên khoa mà cơ sở y tế cung cấp</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Thêm chuyên khoa mới"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSpecialty()}
                  />
                  <Button onClick={handleAddSpecialty}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {facility.specialties.map((specialty: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1 bg-teal-50 text-teal-800 hover:bg-teal-100"
                    >
                      {specialty}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                        onClick={() => handleRemoveSpecialty(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bác sĩ</CardTitle>
              <CardDescription>Danh sách bác sĩ làm việc tại cơ sở y tế</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctorName">Tên bác sĩ</Label>
                    <Input
                      id="doctorName"
                      placeholder="Nhập tên bác sĩ"
                      value={newDoctor.name}
                      onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctorSpecialty">Chuyên khoa</Label>
                    <Input
                      id="doctorSpecialty"
                      placeholder="Nhập chuyên khoa"
                      value={newDoctor.specialty}
                      onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctorImage">Hình ảnh (URL)</Label>
                    <Input
                      id="doctorImage"
                      placeholder="Nhập URL hình ảnh"
                      value={newDoctor.image}
                      onChange={(e) => setNewDoctor({ ...newDoctor, image: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleAddDoctor}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm bác sĩ
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {facility.doctors.map((doctor: any, index: number) => (
                    <Card key={index}>
                      <div className="relative">
                        <img
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => handleRemoveDoctor(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Thư viện hình ảnh</CardTitle>
              <CardDescription>Hình ảnh cơ sở vật chất, trang thiết bị, không gian làm việc</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Tải lên hình ảnh mới
                </Button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  {facility.gallery.map((image: string, index: number) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Gallery ${index}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <Button variant="destructive" size="icon" onClick={() => handleRemoveGalleryImage(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê</CardTitle>
              <CardDescription>Các số liệu thống kê về cơ sở y tế</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="years">Số năm hoạt động</Label>
                  <Input
                    id="years"
                    type="number"
                    value={facility.stats.years}
                    onChange={(e) =>
                      setFacility({
                        ...facility,
                        stats: { ...facility.stats, years: Number.parseInt(e.target.value) },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patients">Số bệnh nhân đã khám</Label>
                  <Input
                    id="patients"
                    type="number"
                    value={facility.stats.patients}
                    onChange={(e) =>
                      setFacility({
                        ...facility,
                        stats: { ...facility.stats, patients: Number.parseInt(e.target.value) },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctors">Số lượng bác sĩ</Label>
                  <Input
                    id="doctors"
                    type="number"
                    value={facility.stats.doctors}
                    onChange={(e) =>
                      setFacility({
                        ...facility,
                        stats: { ...facility.stats, doctors: Number.parseInt(e.target.value) },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Đánh giá trung bình</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={facility.stats.rating}
                    onChange={(e) =>
                      setFacility({
                        ...facility,
                        stats: { ...facility.stats, rating: Number.parseFloat(e.target.value) },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.back()}>
          Hủy
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </div>
    </div>
  )
}
