"use client"

import { Badge } from "@/components/ui/badge"
import http from "@/helper/axios"
import { useEffect, useState } from "react"

type Doctor = {
  details: {
    period: string
    position: string
    hospital: string
  }[]
  languages: string[]
}

interface Pops {
  slug: string
}

export default function DoctorExperience({ slug }: Pops) {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<Doctor>(`/doctor-site/doctor/${slug}/experience`)
        setDoctor(res);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [])


  return (
    <div className="space-y-8">
      {/* Kinh nghiệm làm việc */}
      <div>
        <h2 className="text-xl font-bold mb-4">Kinh nghiệm làm việc</h2>
        <ul className="space-y-6">
          {doctor?.details.map((exp, index) => (
            <li
              key={index}
              className="relative pl-8 pb-6 border-l-2 border-teal-200 last:border-l-0 last:pb-0"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-teal-600"></div>
              <div className="mb-1">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded">
                  {exp.period}
                </span>
              </div>
              <h3 className="text-lg font-bold">{exp.position}</h3>
              <p className="text-muted-foreground">{exp.hospital}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Ngôn ngữ */}
      <div>
        <h3 className="text-lg font-bold mb-3">Ngôn ngữ</h3>
        <div className="flex flex-wrap gap-2">
          {doctor?.languages.map((lang, index) => (
            <Badge key={index} variant="outline" className="bg-slate-50">
              {lang}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

