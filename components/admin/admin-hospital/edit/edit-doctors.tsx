"use client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Users,
  Filter,
  Star,
  MapPin,
  Clock,
  GraduationCap,
  Stethoscope,
  Phone,
  Mail,
  Save,
} from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  certifications: string[];
  availability: string;
  isSelected?: boolean;
}

// Mock data for doctors
const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "BS. Nguyễn Văn An",
    specialty: "Tim mạch",
    experience: 15,
    rating: 4.8,
    avatar: "/placeholder.svg?height=40&width=40",
    email: "nguyen.van.an@email.com",
    phone: "0123456789",
    location: "Hà Nội",
    education: "Đại học Y Hà Nội",
    certifications: ["Chứng chỉ Tim mạch", "Chứng chỉ Siêu âm tim"],
    availability: "Thứ 2-6, 8:00-17:00",
  },
  {
    id: 2,
    name: "BS. Trần Thị Bình",
    specialty: "Nhi khoa",
    experience: 12,
    rating: 4.9,
    avatar: "/placeholder.svg?height=40&width=40",
    email: "tran.thi.binh@email.com",
    phone: "0987654321",
    location: "TP.HCM",
    education: "Đại học Y Dược TP.HCM",
    certifications: ["Chứng chỉ Nhi khoa", "Chứng chỉ Dinh dưỡng trẻ em"],
    availability: "Thứ 2-7, 7:00-16:00",
  },
  {
    id: 3,
    name: "BS. Lê Minh Cường",
    specialty: "Thần kinh",
    experience: 20,
    rating: 4.7,
    avatar: "/placeholder.svg?height=40&width=40",
    email: "le.minh.cuong@email.com",
    phone: "0369852147",
    location: "Đà Nẵng",
    education: "Đại học Y Huế",
    certifications: ["Chứng chỉ Thần kinh", "Chứng chỉ Phẫu thuật não"],
    availability: "Thứ 2-6, 9:00-18:00",
  },
  {
    id: 4,
    name: "BS. Phạm Thu Dung",
    specialty: "Da liễu",
    experience: 8,
    rating: 4.6,
    avatar: "/placeholder.svg?height=40&width=40",
    email: "pham.thu.dung@email.com",
    phone: "0741852963",
    location: "Hà Nội",
    education: "Đại học Y Hà Nội",
    certifications: ["Chứng chỉ Da liễu", "Chứng chỉ Thẩm mỹ da"],
    availability: "Thứ 3-7, 8:30-17:30",
  },
  {
    id: 5,
    name: "BS. Hoàng Văn Em",
    specialty: "Chấn thương chỉnh hình",
    experience: 18,
    rating: 4.8,
    avatar: "/placeholder.svg?height=40&width=40",
    email: "hoang.van.em@email.com",
    phone: "0258147369",
    location: "TP.HCM",
    education: "Đại học Y Dược TP.HCM",
    certifications: ["Chứng chỉ Chấn thương", "Chứng chỉ Phẫu thuật xương"],
    availability: "Thứ 2-6, 7:30-16:30",
  },
];

const specialties = [
  "Tất cả chuyên khoa",
  "Tim mạch",
  "Nhi khoa",
  "Thần kinh",
  "Da liễu",
  "Chấn thương chỉnh hình",
  "Nội khoa",
  "Ngoại khoa",
  "Sản phụ khoa",
];

function DoctorCard({
  doctor,
  onToggleSelect,
}: {
  doctor: Doctor;
  onToggleSelect: (id: number) => void;
}) {
  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md ${
        doctor.isSelected ? "ring-2 ring-teal-500 bg-teal-50" : ""
      }`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Checkbox
              checked={doctor.isSelected}
              onCheckedChange={() => onToggleSelect(doctor.id)}
              className="absolute -top-2 -left-2 z-10 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
            />
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={doctor.avatar || "/placeholder.svg"}
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
                <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                <span>{doctor.experience} năm kinh nghiệm</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span>{doctor.location}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <span className="truncate">{doctor.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                <span>{doctor.phone}</span>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span>{doctor.availability}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {doctor.certifications.slice(0, 2).map((cert, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))}
                {doctor.certifications.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{doctor.certifications.length - 2} khác
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EditDoctorsComponent() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] =
    useState("Tất cả chuyên khoa");
  const [sortBy, setSortBy] = useState("name");

  const selectedDoctors = doctors.filter((doctor) => doctor.isSelected);

  const filteredAndSortedDoctors = useMemo(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === "Tất cả chuyên khoa" ||
        doctor.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "experience":
          return b.experience - a.experience;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [doctors, searchTerm, selectedSpecialty, sortBy]);

  const handleToggleSelect = (doctorId: number) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === doctorId
          ? { ...doctor, isSelected: !doctor.isSelected }
          : doctor
      )
    );
  };

  const handleSelectAll = () => {
    const allSelected = filteredAndSortedDoctors.every(
      (doctor) => doctor.isSelected
    );
    setDoctors((prev) =>
      prev.map((doctor) => {
        const isInFiltered = filteredAndSortedDoctors.some(
          (filtered) => filtered.id === doctor.id
        );
        return isInFiltered ? { ...doctor, isSelected: !allSelected } : doctor;
      })
    );
  };

  const handleSave = () => {
    // Handle saving selected doctors
    console.log("Selected doctors:", selectedDoctors);
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
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
                value={selectedSpecialty}
                onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="focus:ring-teal-500 focus:border-teal-500">
                  <SelectValue placeholder="Chọn chuyên khoa" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="focus:ring-teal-500 focus:border-teal-500">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Tên A-Z</SelectItem>
                  <SelectItem value="experience">Kinh nghiệm</SelectItem>
                  <SelectItem value="rating">Đánh giá</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={handleSelectAll}
                className="border-teal-300 text-teal-600 hover:bg-teal-50">
                <Users className="w-4 h-4 mr-2" />
                {filteredAndSortedDoctors.every((doctor) => doctor.isSelected)
                  ? "Bỏ chọn tất cả"
                  : "Chọn tất cả"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Hiển thị {filteredAndSortedDoctors.length} trong tổng số{" "}
          {doctors.length} bác sĩ
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
            disabled={selectedDoctors.length === 0}
            className="bg-teal-600 hover:bg-teal-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            Lưu ({selectedDoctors.length})
          </Button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAndSortedDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onToggleSelect={handleToggleSelect}
          />
        ))}
      </div>

      {filteredAndSortedDoctors.length === 0 && (
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
    </div>
  );
}
