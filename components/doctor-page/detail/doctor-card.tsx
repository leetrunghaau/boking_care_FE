"use client"

import Image from "next/image"
import { Heart, Share2, Star, Briefcase, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Doctor = {
  name: string
  title: string
  rating: number
  reviewCount: number
  specialty: string
  experience: number
  hospital: string
  phone: string
  specializations: string[]
}

interface DoctorCardProps {
  doctor: Doctor
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image & Buttons */}
          <div className="flex-shrink-0">
            <div className="relative w-40 h-40 mx-auto md:mx-0 rounded-lg overflow-hidden border">
              <Image
                src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(doctor.name)}`}
                alt={doctor.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex justify-center md:justify-start gap-2">
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Yêu thích</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Chia sẻ</span>
              </Button>
            </div>
          </div>

          {/* Doctor Details */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{doctor.name}</h1>
            <p className="text-muted-foreground">{doctor.title}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2 justify-center md:justify-start">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{doctor.rating}</span>
              <span className="text-muted-foreground">({doctor.reviewCount} đánh giá)</span>
            </div>

            {/* Doctor Info */}
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <Briefcase className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  Chuyên khoa {doctor.specialty} • {doctor.experience} năm kinh nghiệm
                </span>
              </div>
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>{doctor.hospital}</span>
              </div>
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <Phone className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>Hotline: {doctor.phone}</span>
              </div>
            </div>

            {/* Specializations */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
              {doctor.specializations.slice(0, 3).map((spec, index) => (
                <Badge key={index} variant="outline" className="bg-teal-50 text-teal-700 hover:bg-teal-100">
                  {spec}
                </Badge>
              ))}
              {doctor.specializations.length > 3 && (
                <Badge variant="outline" className="bg-slate-50">
                  +{doctor.specializations.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DoctorCard
