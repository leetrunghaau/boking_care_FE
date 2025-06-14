"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Building2,
  Save,
  Stethoscope,
  X,
  Search,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Filter,
  RefreshCw,
  Heart,
  Brain,
  Bone,
  Eye,
  Ear,
  TreesIcon as Lungs,
  Baby,
  Pill,
  Thermometer,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { getIconByName } from "@/helper/icon-map"
import http from "@/helper/axios"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

// Types
interface Service {
  id: number
  serviceName: string
}

interface Specialty {
  id: number
  name: string
  icon: string
  title?: string
}


export default function EditServiceAndSpecailtyCard() {
  const params = useParams()
  const id = params?.id as string
  const searchParams = useSearchParams();
  const router = useRouter();
  const initParms = new URLSearchParams(searchParams.toString());
  const [services, setServices] = useState<Service[]>([])
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [selectedSpecialties, setSelectedSpecialties] = useState<Specialty[]>([])
  const [newService, setNewService] = useState("")
  const [searchSpecialty, setSearchSpecialty] = useState("")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [page, setPage] = useState(
    Math.max(Number(initParms.get("page")) || 1, 1)
  );
  const [total, setTotal] = useState(1);
  useEffect(() => {
    const loadData = async () => {
      try {

        const rs = await http.get<any>(`/admin-hospital/specialties-sevices/hospital/${id}`)
        console.log("dât khoier động tả về ", rs)
        if (rs) {
          setServices(rs.services)
          setSpecialties(rs.specialties)
          setSelectedSpecialties(rs.hospitalSpecialties)
          setPage(rs.page)
          setTotal(rs.total)
        }


      } catch (err) {
        handleApiError("Không thể tải dữ liệu. Vui lòng thử lại sau.")
      }
    }

    loadData()
  }, [])
  useEffect(() => {
    const loadData = async () => {
      try {
        const params = new URLSearchParams(searchParams.toString());
        const setIfExists = (key: string, value: any) => {
          if ((key === "specialty" || key === "hospital") && value === "all") {
            params.delete(key);
          } else {
            value ? params.set(key, value.toString()) : params.delete(key);
          }
        };
        setIfExists("page", page);
        setIfExists("search", searchSpecialty);
        router.push(`?${params.toString()}`);
        const queryString = params.toString();
        const rs = await http.get<any>(`/admin-hospital/specialties${queryString ? `?${queryString}` : ""}`)
        console.log("/admin-hospital/specialties", rs)
        if (rs) {
          setSpecialties(rs.specialties)
          setPage(rs.page)
          setTotal(rs.total)
        }
      } catch (err) {
        handleApiError("Không thể tải dữ liệu. Vui lòng thử lại sau.")
      }
    }

    loadData()
  }, [searchSpecialty, page])

  const handleAddService = () => {
    if (!newService.trim()) return
    const serviceToAdd = { id: -new Date, serviceName: newService.trim() }
    setServices([...services, serviceToAdd])
    setNewService("")
  }

  const handleRemoveService = (id: number) => {
    setServices(services.filter((service) => service.id !== id))
  }

  const handleToggleSpecialty = (specialty: Specialty) => {
    const isSelected = selectedSpecialties.some((s) => s.id === specialty.id)
    if (isSelected) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s.id !== specialty.id))
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty])
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const rs = await http.post<any[]>(`/admin-hospital/specialties-sevices/hospital/${id}`, 
        {
          service: services,
          specialties: selectedSpecialties.map(i=>i.id)
        }
      )
      
      if (rs) {
        setServices(rs)
      }
      handleApiSuccess("Bạn đã lưu thông tin thành công")
    } catch (err) {
      handleApiError("Không thể lưu thay đổi. Vui lòng thử lại sau.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-teal-100 p-3 rounded-lg">
                <Building2 className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý dịch vụ và chuyên khoa</h1>
                <p className="text-gray-600">Cập nhật thông tin dịch vụ và chuyên khoa của cơ sở y tế</p>
              </div>
            </div>
            <Button
              onClick={handleSave}
              disabled={saving}
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8"
            >
              {saving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </div>

        <div className=" grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-1">
            <Card className="shadow-sm border-0 shadow-gray-100 h-full">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="text-lg flex items-center text-gray-800">
                  <Stethoscope className="w-5 h-5 mr-2 text-teal-600" />
                  Dịch vụ
                </CardTitle>
                <CardDescription className="text-gray-600">Quản lý các dịch vụ y tế</CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4">{renderServicesContent()}</CardContent>
            </Card>
          </div>

          <div className="col-span-3">
            <Card className="shadow-sm border-0 shadow-gray-100">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-t-lg">
                <CardTitle className="text-xl flex items-center text-gray-800">
                  <Stethoscope className="w-6 h-6 mr-3 text-teal-600" />
                  Chuyên khoa
                </CardTitle>
                <CardDescription className="text-gray-600">Quản lý các chuyên khoa</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">{renderSpecialtiesContent()}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  function renderServicesContent() {
    return (
      <>
        {/* Add new service */}
        <div className="flex space-x-2">
          <Input
            placeholder="Nhập tên dịch vụ mới..."
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            className="h-10"
          />
          <Button
            onClick={handleAddService}
            disabled={!newService.trim()}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm
          </Button>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Danh sách dịch vụ ({services.length})</h3>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              <Stethoscope className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Chưa có dịch vụ nào</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <Badge
                  key={service.id}
                  variant="outline"
                  className="px-3 py-1 bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  {service.serviceName}
                  <button
                    onClick={() => handleRemoveService(service.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </>
    )
  }

  function renderSpecialtiesContent() {
    return (
      <>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm chuyên khoa..."
              value={searchSpecialty}
              onChange={(e) => setSearchSpecialty(e.target.value)}
              className="h-10 px-10"
            />
            {searchSpecialty &&
              <X
                onClick={() => { setSearchSpecialty("") }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-700 w-4 h-4 cursor-pointer"
              />
            }
          </div>

        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2 text-teal-600" />
            Chuyên khoa đã chọn ({selectedSpecialties.length})
          </h3>

          {selectedSpecialties.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <p className="text-sm">Chưa có chuyên khoa nào được chọn</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedSpecialties.map((specialty) => {
                const Icon = getIconByName(specialty.icon)
                return (

                  <Badge
                    key={specialty.id}
                    variant="outline"
                    className="px-3 py-1 bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 transition-colors flex items-center gap-2"
                  >
                    <Icon className="w-5 h-5 text-teal-600" />
                    {specialty.name}
                    <button
                      onClick={() => handleToggleSpecialty(specialty)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )
              })}
            </div>
          )}
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Filter className="w-4 h-4 mr-2 text-gray-600" />
            Hiển thị {(page - 1) * 9 + 1}-{Math.min(page * 9, total)} trong tổng số{" "}
            {total} chuyên khoa
          </h3>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
            </div>
          ) : specialties.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Không tìm thấy chuyên khoa phù hợp</p>
              {searchSpecialty && (
                <Button variant="link" onClick={() => { setSearchSpecialty("") }} className="mt-2">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Xóa tìm kiếm
                </Button>
              )}
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {specialties.map((specialty) => {
                  const isSelected = selectedSpecialties.some((s) => s.id === specialty.id)
                  const Icon = getIconByName(specialty.icon)
                  return (
                    <Card
                      key={specialty.id}
                      onClick={() => handleToggleSpecialty(specialty)}
                      className={cn(
                        "overflow-hidden transition-all cursor-pointer",
                        isSelected ?
                          "ring-2 ring-teal-500 shadow-md" :
                          "hover:shadow-md"

                      )}
                    >
                      <CardHeader className={`py-3 px-4 ${isSelected ? "bg-teal-50" : "bg-white"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${isSelected ? "bg-teal-100" : "bg-gray-100"}`}>
                              <Icon className="w-5 h-5 text-teal-600" />
                            </div>
                            <CardTitle className="text-base font-medium">{specialty.name}</CardTitle>
                          </div>
                          <Checkbox
                            checked={isSelected}
                            className=" data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"

                          />
                        </div>
                      </CardHeader>
                      {specialty.title && (
                        <CardContent className="py-2 px-4 text-sm text-gray-600">{specialty.title}</CardContent>
                      )}


                    </Card>
                  )
                })}

              </div>
              <Pagination className="pt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn(
                        page === 1 ? "cursor-not-allowed" : "cursor-pointer"
                      )}
                      onClick={() => {
                        if (page > 1)
                          setPage(page - 1)

                      }}
                      isActive={page === 1}
                    />
                  </PaginationItem>

                  {Array.from(
                    { length: Math.ceil(total / 9) },
                    (_, i) => i + 1
                  ).map((pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        className={cn(
                          pageNum === page ? "cursor-not-allowed" : "cursor-pointer"
                        )}
                        isActive={pageNum === page}
                        onClick={() => setPage(pageNum)}>
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      className={cn(
                        page === Math.ceil(total / 9) ? "cursor-not-allowed" : "cursor-pointer"
                      )}
                      onClick={() => {
                        if (page < Math.ceil(total / 9))
                          setPage(page + 1)

                      }}
                      isActive={page === Math.ceil(total / 9)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

          )}
        </div>
      </>
    )
  }
}
