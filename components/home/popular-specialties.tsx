"use client"

import {
  Brain,
  Heart,
  Eye,
  Bone,
  Baby,
  Stethoscope,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

// 1. Khai báo interface với icon là string
interface SpecialtyType {
  icon: string
  name: string
  slug: string
}

const iconMap: { [key: string]: React.ElementType } = {
  Brain,
  Heart,
  Eye,
  Bone,
  Baby,
  Stethoscope,
}

const mock: SpecialtyType[] = [
  { icon: "Brain", name: "Thần kinh", slug: "than-kinh" },
  { icon: "Heart", name: "Tim mạch", slug: "tim-mach" },
  { icon: "Eye", name: "Mắt", slug: "mat" },
  { icon: "Bone", name: "Cơ xương khớp", slug: "co-xuong-khop" },
  { icon: "Baby", name: "Nhi khoa", slug: "nhi-khoa" },
  { icon: "Stethoscope", name: "Tai mũi họng", slug: "tai-mui-hong" },
]

export default function PopularSpecialties() {
  const [specialties, setSpecialties] = useState<SpecialtyType[]>([])

  useEffect(() => {
    setSpecialties(mock)
  }, [])

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800">Chuyên khoa phổ biến</h2>
        <Link
          href="/chuyen-khoa"
          className="text-teal-600 hover:text-teal-700 flex items-center gap-1"
        >
          Xem thêm <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {specialties.map((specialty, index) => {
          const Icon = iconMap[specialty.icon]
          return (
            <Link href={`/chuyen-khoa/${specialty.slug}`} key={index}>
              <Card className="hover:shadow-md transition-shadow text-center h-full">
                <CardContent className="p-6 flex flex-col items-center gap-3">
                  {Icon ? (
                    <Icon className="h-10 w-10 text-teal-600" />
                  ) : (
                    <div className="h-10 w-10 text-red-500">?</div>
                  )}
                  <h3 className="font-medium">{specialty.name}</h3>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
