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
import http from "@/helper/axios"

// 1. Khai báo interface với icon là string
interface Specialty {
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


export default function PopularSpecialties() {
  const [specialties, setSpecialties] = useState<Specialty[]>([])
      const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<Specialty[]>("/home/specialties")
        setSpecialties(res);
      } catch (err) {
        console.error("Failed to fetch specialties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
