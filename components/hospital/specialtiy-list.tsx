"use client"

import http from "@/helper/axios"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Specialty {
  id: number
  name: string
}

interface ImgListProps {
  slug: string
}

export const mockSpecialties: Specialty[] = [
  { id: 1, name: "Nội tổng quát" },
  { id: 2, name: "Tim mạch" },
  { id: 3, name: "Tai - Mũi - Họng" },
  { id: 4, name: "Da liễu" },
  { id: 5, name: "Nhi khoa" },
  { id: 6, name: "Thần kinh" },
  { id: 7, name: "Tiêu hóa" },
  { id: 8, name: "Chấn thương chỉnh hình" },
  { id: 9, name: "Mắt" },
  { id: 10, name: "Sản - Phụ khoa" },
]

export default function SpecialtiyList({ slug }: ImgListProps) {
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImgs = async () => {
      try {
        // const res = await http.get<Img[]>(`/hospital/${slug}/imgs`)
        setSpecialties(mockSpecialties)
      } catch (err) {
        console.error("Failed to load images:", err)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchImgs()
    }
  }, [slug])

  if (loading) return <p className="text-center text-sm text-muted-foreground">Đang tải...</p>

  return (
    <div className="flex flex-wrap gap-3">
      {specialties.map((sp) => (
        <span key={sp.id} className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium">
          {sp.name}
        </span>
      ))}
    </div>
  )
}
