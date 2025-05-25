export interface Patient {
    name: string
    phone: string
    email: string
    dob: Date
    gender: string
    address: string
    reason: string
    bloodType: string
    height: number
    weight: number
    chronicDiseases: string[]
    allergies: string[]
    medicalHistory: string[]
    vaccinations: string[]
}

export interface Doctor {
    id: number
    img: string
    name: string
    title: string
    rating: number
    sumRating: number
    experience: string
    availableToday: boolean
    room?: string
    price: number
    hospital: Hospital
}

export interface Hospital {
    id: number
    name: string
    address: string
    img: string
    slug: string
    phone: string
    times: {
        weekend: number
        timeStart: number
        timeEnd: number
    }[]
}

export interface Specialty {
    id: number
    name: string
    description: string
    icon: string
    symptoms: string[]
}

export interface DoctorTime {
    time: number,
    available: boolean
}


export interface BookingData {
    specialty: Specialty | null;
    doctor: Doctor | null;
    date: Date | null;
    time: number | null;
    patient: Patient;
}