import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export interface Doctor {
  id: string
  slug: string
  name: string
  specialty: string
  hospital: string
  location: string
  rating: number
  reviewCount: number
  imageUrl: string
}

interface DoctorCardProps {
  doctor: Doctor
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="bg-blue-50 p-4 flex items-center">
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={doctor.imageUrl || "/placeholder.svg"}
                alt={doctor.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-lg">
                <Link href={`/bac-si/${doctor.slug}`} className="hover:text-blue-600 transition-colors">
                  {doctor.name}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="p-4">
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="text-sm font-medium">{doctor.rating} ({doctor.reviewCount} đánh giá)</span>
            </div>
            
            <div className="text-sm mb-2">
              <span className="font-medium">Bệnh viện:</span> {doctor.hospital}
            </div>
            
            <div className="text-sm">
              <span className="font-medium">Địa điểm:</span> {doctor.location}
            </div>
            
            <div className="mt-4">
              <Link href={`/bac-si/${doctor.slug}`}>
              <Button variant="outline" size="sm" className="mr-2">Xem hồ sơ</Button>
              </Link>
              <Button size="sm">Đặt lịch khám</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}