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
import { AlertCircle, Plus, X, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Star } from "lucide-react"
import Link from "next/link"

const mockSpecialtyData = {
  id: "1",
  name: "Thần kinh",
  slug: "than-kinh",
  icon: "Brain",
  description:
    "Chuyên khoa Thần kinh tập trung vào các bệnh liên quan đến não, tủy sống và hệ thần kinh. Đây là lĩnh vực có tính chuyên môn cao, yêu cầu thiết bị hiện đại và đội ngũ bác sĩ nhiều kinh nghiệm.",
  banner: "/placeholder.svg",
  commonDiseases: [
    { name: "Đột quỵ", image: "/placeholder.svg" },
    { name: "Động kinh", image: "/placeholder.svg" },
    { name: "Parkinson", image: "/placeholder.svg" },
    { name: "Rối loạn lo âu", image: "/placeholder.svg" },
    { name: "Rối loạn tiền đình", image: "/placeholder.svg" },
  ],
  advantages: [
    "Hỗ trợ chẩn đoán nhanh chóng",
    "Kết nối với chuyên gia đầu ngành",
    "Tiết kiệm thời gian điều trị",
    "Thiết bị công nghệ cao",
  ],
  doctors: [
    {
      name: "BS. Nguyễn Văn A",
      title: "Chuyên gia Thần kinh - BV Bạch Mai",
      image: "/placeholder.svg",
      rating: 5,
      reviews: 122,
    },
    {
      name: "BS. Trần Thị B",
      title: "Phó khoa Thần kinh - BV 108",
      image: "/placeholder.svg",
      rating: 4,
      reviews: 98,
    },
  ],
  facilities: [
    {
      name: "Bệnh viện Bạch Mai",
      location: "78 Giải Phóng, Đống Đa, Hà Nội",
      image: "/images/facilities/bach-mai.jpg",
    },
    {
      name: "Bệnh viện 108",
      location: "1 Trần Hưng Đạo, Hai Bà Trưng, Hà Nội",
      image: "/images/facilities/bv108.jpg",
    },
  ],
  faqs: [
    {
      question: "Khi nào nên khám chuyên khoa Thần kinh?",
      answer:
        "Khi bạn có dấu hiệu như đau đầu kéo dài, mất ngủ, chóng mặt, co giật, hoặc cảm giác mất thăng bằng thường xuyên.",
    },
    {
      question: "Khám chuyên khoa cần chuẩn bị gì?",
      answer: "Mang theo hồ sơ bệnh án (nếu có), danh sách thuốc đang dùng và ghi lại triệu chứng chi tiết.",
    },
  ],
  status: "active",
}

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

export default function EditSpecialtyPage() {
  const { id } = useParams()
  const router = useRouter()
  const [specialty, setSpecialty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newDisease, setNewDisease] = useState({ name: "", image: "" })
  const [newAdvantage, setNewAdvantage] = useState("")
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSpecialty(mockSpecialtyData)
      setLoading(false)
    }, 500)
  }, [id])

  const handleSave = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      router.push("/admin/specialties")
    }, 1000)
  }

  const handleAddDisease = () => {
    if (newDisease.name.trim()) {
      setSpecialty({
        ...specialty,
        commonDiseases: [
          ...specialty.commonDiseases,
          {
            name: newDisease.name.trim(),
            image: newDisease.image || "/placeholder.svg",
          },
        ],
      })
      setNewDisease({ name: "", image: "" })
    }
  }

  const handleRemoveDisease = (index: number) => {
    const updatedDiseases = [...specialty.commonDiseases]
    updatedDiseases.splice(index, 1)
    setSpecialty({
      ...specialty,
      commonDiseases: updatedDiseases,
    })
  }

  const handleAddAdvantage = () => {
    if (newAdvantage.trim()) {
      setSpecialty({
        ...specialty,
        advantages: [...specialty.advantages, newAdvantage.trim()],
      })
      setNewAdvantage("")
    }
  }

  const handleRemoveAdvantage = (index: number) => {
    const updatedAdvantages = [...specialty.advantages]
    updatedAdvantages.splice(index, 1)
    setSpecialty({
      ...specialty,
      advantages: updatedAdvantages,
    })
  }

  const handleAddFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      setSpecialty({
        ...specialty,
        faqs: [...specialty.faqs, { ...newFaq }],
      })
      setNewFaq({ question: "", answer: "" })
    }
  }

  const handleRemoveFaq = (index: number) => {
    const updatedFaqs = [...specialty.faqs]
    updatedFaqs.splice(index, 1)
    setSpecialty({
      ...specialty,
      faqs: updatedFaqs,
    })
  }

  if (loading) {
    return <p className="text-center py-10">Đang tải dữ liệu...</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Chỉnh sửa chuyên khoa</h1>
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
        <AlertDescription>Thông tin chuyên khoa sẽ được hiển thị công khai sau khi được phê duyệt.</AlertDescription>
      </Alert>

      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="diseases">Bệnh lý phổ biến</TabsTrigger>
          <TabsTrigger value="advantages">Ưu điểm</TabsTrigger>
          <TabsTrigger value="doctors">Bác sĩ & Cơ sở</TabsTrigger>
          <TabsTrigger value="faqs">Câu hỏi thường gặp</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>Thông tin chung về chuyên khoa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên chuyên khoa</Label>
                  <Input
                    id="name"
                    value={specialty.name}
                    onChange={(e) => setSpecialty({ ...specialty, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={specialty.slug}
                    onChange={(e) => setSpecialty({ ...specialty, slug: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">
                    Slug sẽ được sử dụng trong URL, ví dụ: /specialties/than-kinh
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Biểu tượng</Label>
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
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={specialty.description}
                    onChange={(e) => setSpecialty({ ...specialty, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={specialty.status}
                    onValueChange={(value) => setSpecialty({ ...specialty, status: value })}
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
              <CardTitle>Hình ảnh banner</CardTitle>
              <CardDescription>Hình ảnh hiển thị ở đầu trang chi tiết chuyên khoa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex flex-col items-center justify-center">
                  <img
                    src={specialty.banner || "/placeholder.svg"}
                    alt="Banner chuyên khoa"
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
        </TabsContent>

        <TabsContent value="diseases" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bệnh lý phổ biến</CardTitle>
              <CardDescription>Các bệnh lý thường gặp trong chuyên khoa này</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="diseaseName">Tên bệnh lý</Label>
                    <Input
                      id="diseaseName"
                      placeholder="Nhập tên bệnh lý"
                      value={newDisease.name}
                      onChange={(e) => setNewDisease({ ...newDisease, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diseaseImage">Hình ảnh (URL)</Label>
                    <Input
                      id="diseaseImage"
                      placeholder="Nhập URL hình ảnh"
                      value={newDisease.image}
                      onChange={(e) => setNewDisease({ ...newDisease, image: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleAddDisease}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm bệnh lý
                </Button>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                  {specialty.commonDiseases.map((disease: any, index: number) => (
                    <div key={index} className="relative group">
                      <div className="text-center">
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow">
                          <img
                            src={disease.image || "/placeholder.svg"}
                            alt={disease.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <p className="mt-2 font-medium">{disease.name}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveDisease(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advantages" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ưu điểm</CardTitle>
              <CardDescription>Lý do nên chọn chuyên khoa này</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Thêm ưu điểm mới"
                    value={newAdvantage}
                    onChange={(e) => setNewAdvantage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddAdvantage()}
                  />
                  <Button onClick={handleAddAdvantage}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {specialty.advantages.map((advantage: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <span>{advantage}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveAdvantage(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bác sĩ chuyên khoa</CardTitle>
              <CardDescription>Danh sách bác sĩ chuyên về lĩnh vực này</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Bác sĩ đã liên kết</h3>
                  <Button variant="outline" asChild>
                    <Link href="/admin/doctors">Quản lý bác sĩ</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {specialty.doctors.map((doctor: any, index: number) => (
                    <div key={index} className="border rounded-md p-4 flex gap-3">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                        <img
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{doctor.name}</h4>
                        <p className="text-sm text-muted-foreground">{doctor.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {Array(doctor.rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            ))}
                          <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cơ sở y tế hỗ trợ</CardTitle>
              <CardDescription>Danh sách cơ sở y tế có chuyên khoa này</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Cơ sở y tế đã liên kết</h3>
                  <Button variant="outline" asChild>
                    <Link href="/admin/facilities">Quản lý cơ sở y tế</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specialty.facilities.map((facility: any, index: number) => (
                    <div key={index} className="border rounded-md p-4 flex gap-3">
                      <div className="relative w-20 h-16 rounded-md overflow-hidden shrink-0">
                        <img
                          src={facility.image || "/placeholder.svg"}
                          alt={facility.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{facility.name}</h4>
                        <p className="text-sm text-muted-foreground">{facility.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Câu hỏi thường gặp</CardTitle>
              <CardDescription>Các câu hỏi và trả lời thường gặp về chuyên khoa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="faqQuestion">Câu hỏi</Label>
                    <Input
                      id="faqQuestion"
                      placeholder="Nhập câu hỏi"
                      value={newFaq.question}
                      onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="faqAnswer">Câu trả lời</Label>
                    <Textarea
                      id="faqAnswer"
                      placeholder="Nhập câu trả lời"
                      rows={3}
                      value={newFaq.answer}
                      onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleAddFaq}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm câu hỏi
                </Button>

                <div className="space-y-4 mt-4">
                  {specialty.faqs.map((faq: any, index: number) => (
                    <div key={index} className="border p-4 rounded-md bg-slate-50 relative group">
                      <h4 className="font-medium text-slate-700 mb-2">{faq.question}</h4>
                      <p className="text-muted-foreground">{faq.answer}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
                        onClick={() => handleRemoveFaq(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
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
