"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Heart, Eye, Bone, Baby, Stethoscope, Pill, Microscope } from 'lucide-react'

// Mock data for specialties
const specialties = [
  { id: "1", name: "Thần kinh", icon: <Brain className="h-8 w-8 text-teal-600" /> },
  { id: "2", name: "Tim mạch", icon: <Heart className="h-8 w-8 text-teal-600" /> },
  { id: "3", name: "Nhãn khoa", icon: <Eye className="h-8 w-8 text-teal-600" /> },
  { id: "4", name: "Cơ xương khớp", icon: <Bone className="h-8 w-8 text-teal-600" /> },
  { id: "5", name: "Nhi khoa", icon: <Baby className="h-8 w-8 text-teal-600" /> },
  { id: "6", name: "Nội tổng quát", icon: <Stethoscope className="h-8 w-8 text-teal-600" /> },
  { id: "7", name: "Da liễu", icon: <Pill className="h-8 w-8 text-teal-600" /> },
  { id: "8", name: "Xét nghiệm", icon: <Microscope className="h-8 w-8 text-teal-600" /> },
]

interface SelectSpecialtyProps {
  selectedSpecialty: any
  onSelect: (specialty: any) => void
}

export function SelectSpecialty({ selectedSpecialty, onSelect }: SelectSpecialtyProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSpecialties = specialties.filter((specialty) =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Chọn chuyên khoa</h2>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Tìm kiếm chuyên khoa..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredSpecialties.map((specialty) => (
          <Card
            key={specialty.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedSpecialty?.id === specialty.id
                ? "border-2 border-teal-600"
                : "border border-gray-200"
            }`}
            onClick={() => onSelect(specialty)}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              {specialty.icon}
              <h3 className="mt-3 font-medium text-center">{specialty.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredSpecialties.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          Không tìm thấy chuyên khoa phù hợp. Vui lòng thử lại với từ khóa khác.
        </p>
      )}
    </div>
  )
}
