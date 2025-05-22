"use client"

import { Card, CardContent } from "@/components/ui/card"
import http from "@/helper/axios"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Doctor {
    id: number
    name: string
    image: string
    specialty: string
}

interface DoctorCardGridProps {
    slug: string
}
export const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "BS. Nguyễn Văn A",
    image: "/images/doctors/doctor-1.jpg",
    specialty: "Nội tổng quát",
  },
  {
    id: 2,
    name: "BS. Trần Thị B",
    image: "/images/doctors/doctor-2.jpg",
    specialty: "Tim mạch",
  },
  {
    id: 3,
    name: "BS. Lê Văn C",
    image: "/images/doctors/doctor-3.jpg",
    specialty: "Tai - Mũi - Họng",
  },
  {
    id: 4,
    name: "BS. Phạm Thị D",
    image: "/images/doctors/doctor-4.jpg",
    specialty: "Nhi khoa",
  },
  {
    id: 5,
    name: "BS. Nguyễn Văn E",
    image: "/images/doctors/doctor-5.jpg",
    specialty: "Da liễu",
  },
  {
    id: 6,
    name: "BS. Đỗ Thị F",
    image: "/placeholder.svg",
    specialty: "Thần kinh",
  },
]


export default function DoctorList({ slug }: DoctorCardGridProps) {

    const [doctors, setDoctor] = useState<Doctor[]>([])
      const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const res = await http.get<Doctor[]>(`/hospital/${slug}/doctors`)
                setDoctor(mockDoctors)
            } catch (err) {
                console.error("Failed to load images:", err)
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchData()
        }
    }, [slug])
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {doctors.map((doc) => (
                <Card key={doc.id}>
                    <div className="relative h-[200px] w-full">
                        <Image
                            src={doc.image ?? "/placeholder.svg"}
                            alt={doc.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
