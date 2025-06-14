"use client";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search, Users, Filter, Star, MapPin, Clock, GraduationCap, Stethoscope, Phone, Mail, Save,
  Briefcase,
  CodeXml,
} from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getIconByName } from "@/helper/icon-map";
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils";
import http from "@/helper/axios";
import { getFullURL } from "@/helper/url";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface Doctor {
  id: number;
  code: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  img: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  certifications: string[];
  availability: string;
  isSelected?: boolean;
}



export default function EditDoctorsComponent() {
  const params = useParams()
  const id = params?.id as string
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctors, setSeletedDoctor] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const initParms = new URLSearchParams(searchParams.toString());
  const [search, setSearch] = useState(initParms.get("search") ?? "");
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [specialtySelected, setSpecialtySelected] = useState(
    initParms.get("specialty") ?? "all"
  );

  const [page, setPage] = useState(
    Math.max(Number(initParms.get("page")) || 1, 1)
  );
  const [total, setTotal] = useState(1);
  const handleToggleSelect = (doctorId: number) => {
    const isSelected = selectedDoctors.includes(doctorId);
    const updatedDoctors = isSelected
      ? selectedDoctors.filter((id) => id !== doctorId)
      : [...selectedDoctors, doctorId];
    setSeletedDoctor(updatedDoctors);
  };



  const handleSave = async() => {
    // Handle saving selected doctors
    console.log("Selected doctors:", selectedDoctors);
    try {
      const rs = await http.post(`/admin-hospital/basic-hospital/${id}/doctors`, { doctors : selectedDoctors})
      if(rs){
        handleApiSuccess("Bạn đã lưu thông tin bác sĩ tại cơ sở ý tế thành công")
      }

    }catch(err){

    }
  };


  const getDoctor = async () => {
    const params = new URLSearchParams(searchParams.toString());
    const setIfExists = (key: string, value: any) => {
      if ((key === "specialty" || key === "hospital") && value === "all") {
        params.delete(key);
      } else {
        value ? params.set(key, value.toString()) : params.delete(key);
      }
    };
    setIfExists("page", page);
    setIfExists("search", searchTerm);
    setIfExists("specialty", specialtySelected);
    router.push(`?${params.toString()}`);
    const queryString = params.toString();
    try {
      const rs = await http.get<any | null>(
        `/admin-hospital/basic-hospital/${id}/doctors${queryString ? `?${queryString}` : ""}`
      );
      console.log("doctor", rs);
      if (rs) {
        setDoctors(rs.doctos);
        setTotal(rs.total);
      }
    } catch (err) {
      console.log(err);
      handleApiError(err)
    } finally {
    }
  }


  useEffect(() => {
    const loadBase = async () => {
      try {
        const base = await http.get<any | null>(`/admin-hospital/basic-hospital/${id}/doctors/base`);
        console.log("base", base);
        if (base) {
          setSpecialties(base.specialties);
          setSeletedDoctor(base.doctor);
        }
      } catch (err) {
      } finally {
      }
    };
    loadBase();
  }, []);

  useEffect(() => {
    getDoctor();
  }, [specialtySelected, searchTerm, page]);



  const renderDoctorCard = (doctor: Doctor) => {
    const isSeclected = selectedDoctors.includes(doctor.id)
    return (
      <Card
        key={doctor.id}
        onClick={() => handleToggleSelect(doctor.id)}
        className={`transition-all cursor-pointer duration-200 hover:shadow-md ${isSeclected ? "ring-2 ring-teal-500 bg-teal-50" : ""
          }`}>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Checkbox
                checked={isSeclected}
                onCheckedChange={() => handleToggleSelect(doctor.id)}
                className="absolute -top-2 -left-2 z-10 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
              />
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={getFullURL(doctor.img)}
                  alt={doctor.name}
                />
                <AvatarFallback className="bg-teal-100 text-teal-600 font-semibold">
                  {doctor.name
                    .split(" ")
                    .slice(-2)
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {doctor.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      variant="secondary"
                      className="bg-teal-100 text-teal-700">
                      <Stethoscope className="w-3 h-3 mr-1" />
                      {doctor.specialty}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {doctor.rating}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <CodeXml className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{doctor.code} </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{doctor.address}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="truncate">{doctor.email}</span>
                </div>
              </div>


            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 p-6  mx-auto">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        {/* Filters and Search */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <Filter className="w-5 h-5 mr-2 text-teal-600" />
              Bộ lọc và tìm kiếm
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm bác sĩ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <Select
                value={specialtySelected}
                onValueChange={(value) => {
                  setSpecialtySelected(value);
                  setPage(1);
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="Chuyên khoa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-3">
                      <div>
                        <Briefcase className="w-5 h-5 text-teal-600" />
                      </div>
                      Tất cả chuyên khoa
                    </div>
                  </SelectItem>
                  {specialties?.map((i: any) => {
                    const Icon = getIconByName(i.icon);
                    return (
                      <SelectItem value={String(i.id)} key={i.id}>
                        <div className="flex items-center gap-3">
                          <div>
                            <Icon className="w-5 h-5 text-teal-600" />
                          </div>
                          {i.name}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>


            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Hiển thị {(page - 1) * 6 + 1}-{Math.min(page * 6, total)} trong tổng số{" "}
          {total} bác sĩ
        </span>


        {selectedDoctors.length > 0 && (
          <span className="text-teal-600 font-medium">
            {selectedDoctors.length} bác sĩ đã được chọn
          </span>
        )}
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="bg-teal-100 text-teal-700">
            {selectedDoctors.length} đã chọn
          </Badge>
          <Button
            onClick={handleSave}
            // disabled={selectedDoctors.length === 0}
            className="bg-teal-600 hover:bg-teal-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            Lưu ({selectedDoctors.length})
          </Button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {doctors.map((doctor) => renderDoctorCard(doctor))}
      </div>

      {doctors.length === 0 && (
        <Card>
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <Users className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Không tìm thấy bác sĩ
              </h3>
              <p className="text-gray-500 max-w-md">
                Không có bác sĩ nào phù hợp với tiêu chí tìm kiếm. Hãy thử điều
                chỉnh bộ lọc.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cn(
                page === 1 ? "cursor-not-allowed":"cursor-pointer"
              )}
              onClick={() => {
                if (page > 1)
                  setPage(page - 1)

              }}
              isActive={page === 1}
            />
          </PaginationItem>

          {Array.from(
            { length: Math.ceil(total / 6) },
            (_, i) => i + 1
          ).map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
              className={cn(
                pageNum === page ? "cursor-not-allowed":"cursor-pointer"
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
              page === Math.ceil(total / 6) ? "cursor-not-allowed":"cursor-pointer"
            )}
              onClick={() => {
                if (page < Math.ceil(total / 6))
                  setPage(page + 1)

              }}
              isActive={page === Math.ceil(total / 6)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
