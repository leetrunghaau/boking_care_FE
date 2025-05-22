// components/Hospital/HospitalList.tsx
import { HospitalShort } from "@/types/hospital";
import Link from "next/link";


 export interface Hospital {
  id: number;
  slug: string;
  name: string;
  address: string;
  thumbnail: string;
}
interface HospitalCardProps {
  hospital: Hospital
}

export default function HospitalCard({
 hospital
}: HospitalCardProps) {
  return (
    <div key={hospital.id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
      <div className="relative h-40 w-full">
        <img
          src={hospital.thumbnail}
          alt={hospital.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{hospital.name}</h3>
        <p className="text-sm text-muted-foreground">{hospital.address}</p>
        <Link
          href={`/co-so-y-te/${hospital.slug}`}
          className="text-teal-600 text-sm mt-2 inline-block hover:underline"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  )
}
