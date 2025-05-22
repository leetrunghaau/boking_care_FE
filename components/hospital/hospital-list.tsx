// components/Hospital/HospitalList.tsx
import { HospitalShort } from "@/types/hospital";
import Link from "next/link";

interface HospitalListProps {
  hospitals: HospitalShort[];
}

const HospitalList: React.FC<HospitalListProps> = ({ hospitals }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {hospitals.map((hospital) => (
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
      ))}
    </div>
  );
};

export default HospitalList;
