"use client"

import { Badge } from "@/components/ui/badge"

type DoctorExperienceProps = {
  doctor: {
    experience_detail: {
      period: string
      position: string
      hospital: string
    }[]
    languages: string[]
  }
}

const DoctorExperience: React.FC<DoctorExperienceProps> = ({ doctor }) => {
  return (
    <div className="space-y-8">
      {/* Kinh nghiệm làm việc */}
      <div>
        <h2 className="text-xl font-bold mb-4">Kinh nghiệm làm việc</h2>
        <ul className="space-y-6">
          {doctor.experience_detail.map((exp, index) => (
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
          {doctor.languages.map((lang, index) => (
            <Badge key={index} variant="outline" className="bg-slate-50">
              {lang}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorExperience
