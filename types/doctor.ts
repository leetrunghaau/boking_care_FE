// types/doctor.ts
export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface Award {
  title: string;
  year: string;
}

export interface Publication {
  title: string;
  journal: string;
  year: string;
}

export interface ExperienceDetail {
  period: string;
  position: string;
  hospital: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  experience: number;
  hospital: string;
  address: string;
  price: string;
  specializations: string[];
  education: Education[];
  awards: Award[];
  publications: Publication[];
  experience_detail: ExperienceDetail[];
  languages: string[];
  about: string;
}
