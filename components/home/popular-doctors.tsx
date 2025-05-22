"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import http from "@/helper/axios"
import { ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Doctor {
    id: number
    name: string
    img: string
    slug: string
    specialty: string
    rating: number
    sumRating: number
}
export default function PopularDoctors() {
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<Doctor[]>("/home/doctors")
        setDoctors(res);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [])
    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800">Bác sĩ nổi bật</h2>
                <Link href="/bac-si" className="text-teal-600 hover:text-teal-700 flex items-center gap-1">
                    Xem thêm <ChevronRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {doctors.map((doctor) => (
                    <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-square relative">
                            <Image
                                src={doctor.img ?? "/placeholder.svg"}
                                alt={`Bác sĩ ${doctor.name}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg mb-1">Bác sĩ {doctor.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
                            <div className="flex items-center gap-1 mb-3">
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.round(doctor.rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                <span className="text-sm text-muted-foreground">({doctor.sumRating})</span>
                            </div>
                            <Link href={`/bac-si/${doctor.slug}`}>
                                <Button className="w-full bg-teal-600 hover:bg-teal-700">Đặt lịch khám</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}