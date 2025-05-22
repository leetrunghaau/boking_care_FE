"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Star, Filter } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for doctors
const doctors = [
  {
    id: "1",
    name: "BS. Nguyễn Văn A",
    specialty: { id: "1", name: "Thần kinh" },
    title: "Chuyên gia Thần kinh - BV Bạch Mai",
    image: "/placeholder.svg?height=300&width=300&text=BS+A",
    rating: 5,
    reviews: 122,
    experience: "15 năm",
    availableToday: true,
  },
  {
    id: "2",
    name: "TS.BS. Trần Thị B",
    specialty: { id: "1", name: "Thần kinh" },
    title: "Phó khoa Thần kinh - BV 108",
    image: "/placeholder.svg?height=300&width=300&text=BS+B",
    rating: 4,
    reviews: 98,
    experience: "12 năm",
    availableToday: true,
  },
  {
    id: "3",
    name: "PGS.TS. Lê Văn C",
    specialty: { id: "1", name: "Thần kinh" },
    title: "Trưởng khoa Thần kinh - BV Việt Đức",
    image: "/placeholder.svg?height=300&width=300&text=BS+C",
    rating: 5,
    reviews: 156,
    experience: "20 năm",
    availableToday: false,
  },
  {
    id: "4",
    name: "BS.CKI. Phạm Thị D",
    specialty: { id: "2", name: "Tim mạch" },
    title: "Bác sĩ Tim mạch - BV Bạch Mai",
    image: "/placeholder.svg?height=300&width=300&text=BS+D",
    rating: 4,
    reviews: 87,
    experience: "10 năm",
    availableToday: true,
  },
]

interface SelectDoctorProps {
  selectedDoctor: any
  specialty: any
  onSelect: (doctor: any) => void
}

export function SelectDoctor({ selectedDoctor, specialty, onSelect }: SelectDoctorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all") // all, available-today, highest-rated

  // Filter doctors by specialty and search term
  const filteredDoctors = doctors
    .filter((doctor) => !specialty || doctor.specialty.id === specialty.id)
    .filter((doctor) => doctor.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((doctor) => {
      if (filter === "available-today") return doctor.availableToday
      if (filter === "highest-rated") return doctor.rating >= 4.5
      return true
    })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Chọn bác sĩ</h2>
      
      {specialty && (
        <div className="bg-teal-50 p-3 rounded-md">
          <p className="text-teal-800">
            Bạn đang chọn bác sĩ cho chuyên khoa: <strong>{specialty.name}</strong>
          </p>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Tìm kiếm bác sĩ..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Lọc" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="available-today">Có lịch hôm nay</SelectItem>
            <SelectItem value="highest-rated">Đánh giá cao nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        {filteredDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedDoctor?.id === doctor.id
                ? "border-2 border-teal-600"
                : "border border-gray-200"
            }`}
            onClick={() => onSelect(doctor)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-32 h-32 rounded-md overflow-hidden">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-gray-600">{doctor.title}</p>
                    </div>
                    
                    {doctor.availableToday && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 self-start md:self-auto mt-2 md:mt-0">
                        Có lịch hôm nay
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-2 flex items-center">
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < doctor.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({doctor.reviews} đánh giá)
                    </span>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-gray-100">
                      {doctor.specialty.name}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100">
                      {doctor.experience} kinh nghiệm
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredDoctors.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            Không tìm thấy bác sĩ phù hợp. Vui lòng thử lại với tiêu chí khác.
          </p>
        )}
      </div>
    </div>
  )
}
