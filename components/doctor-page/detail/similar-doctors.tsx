"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Doctor = {
  id: string | number
  name: string
  specialty: string
  rating: number
  image?: string
}

type SimilarDoctorsProps = {
  doctors: Doctor[]
}

const SimilarDoctors: React.FC<SimilarDoctorsProps> = ({ doctors }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Bác sĩ tương tự</h2>
        <Link href="/doctors" className="text-teal-600 hover:text-teal-700 flex items-center gap-1 text-sm">
          Xem thêm <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div className="w-24 h-24 relative">
                  <Image
                    src={
                      doctor.image ??
                      `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(doctor.name)}`
                    }
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{doctor.rating.toFixed(1)}</span>
                  </div>
                  <Link
                    href={`/doctors/${doctor.id}`}
                    className="text-xs text-teal-600 hover:text-teal-700 mt-1 inline-block"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SimilarDoctors
