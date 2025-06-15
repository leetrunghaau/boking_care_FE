"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserCircle, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import GeneralInfoTab from "@/components/admin/admin-doctor/edit/general-info-tab"
import CertificatesTab from "@/components/admin/admin-doctor/edit/certificates-tab"
import QualificationsTab from "@/components/admin/admin-doctor/edit/qualifications-tab"
import ExperienceTab from "@/components/admin/admin-doctor/edit/experience-tab"
import { ScheduleSettings } from "@/components/admin/admin-doctor/edit/schedule-tab"

// Types
export interface Doctor {
    id: number
    name: string
    phone: string
    email: string
    dob: string
    gender: "male" | "female" | "other" | ""
    img: string
    about: string
    certificates: Certificate[]
    specialties: Specialty[]
    experiences: Experience[]
    education: Education[]
    languages: Language[]
}

export interface Certificate {
    id: number
    title: string
    publishedAt: string
    journal: string
    description: string
}

export interface Specialty {
    id: number
    name: string
}

export interface Experience {
    id: number
    position: string
    organization: string
    startYear: number
    endYear: number | null
}

export interface Education {
    id: number
    degree: string
    school: string
    year: number
}

export interface Language {
    id: number
    name: string
}

// Mock data
const mockDoctor: Doctor = {
    id: 1,
    name: "Nguyễn Văn A",
    phone: "0912345678",
    email: "doctor@example.com",
    dob: "1980-05-15",
    gender: "male",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    about:
        "Bác sĩ Nguyễn Văn A là chuyên gia với hơn 15 năm kinh nghiệm trong lĩnh vực tim mạch. Ông đã điều trị thành công cho hàng nghìn bệnh nhân và được đánh giá cao về chuyên môn và thái độ phục vụ.",
    certificates: [
        {
            id: 1,
            title: "Chứng chỉ chuyên khoa Tim mạch",
            publishedAt: "2010-06-20",
            journal: "Hiệp hội Tim mạch Việt Nam",
            description: "Chứng nhận hoàn thành khóa đào tạo chuyên sâu về tim mạch",
        },
        {
            id: 2,
            title: "Nghiên cứu về bệnh mạch vành",
            publishedAt: "2015-03-10",
            journal: "Tạp chí Y học Việt Nam",
            description: "Công trình nghiên cứu về phương pháp điều trị mới cho bệnh mạch vành",
        },
    ],
    specialties: [
        { id: 1, name: "Tim mạch" },
        { id: 2, name: "Nội khoa" },
    ],
    experiences: [
        {
            id: 1,
            position: "Bác sĩ nội trú",
            organization: "Bệnh viện Bạch Mai",
            startYear: 2005,
            endYear: 2010,
        },
        {
            id: 2,
            position: "Bác sĩ chuyên khoa",
            organization: "Bệnh viện Việt Đức",
            startYear: 2010,
            endYear: 2018,
        },
        {
            id: 3,
            position: "Trưởng khoa Tim mạch",
            organization: "Bệnh viện Đa khoa Trung ương",
            startYear: 2018,
            endYear: null,
        },
    ],
    education: [
        {
            id: 1,
            degree: "Bác sĩ Y khoa",
            school: "Đại học Y Hà Nội",
            year: 2005,
        },
        {
            id: 2,
            degree: "Thạc sĩ Y học",
            school: "Đại học Y Hà Nội",
            year: 2008,
        },
        {
            id: 3,
            degree: "Tiến sĩ Y học",
            school: "Đại học Y Dược TP.HCM",
            year: 2015,
        },
    ],
    languages: [
        { id: 1, name: "Tiếng Việt" },
        { id: 2, name: "Tiếng Anh" },
        { id: 3, name: "Tiếng Pháp" },
    ],
}

export default function EditDoctorPage() {
    const [doctor, setDoctor] = useState<Doctor | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("general")
    const [globalNotification, setGlobalNotification] = useState<{
        type: "success" | "error" | null
        message: string | null
    }>({ type: null, message: null })

    // Load doctor data
    useEffect(() => {
        const fetchDoctor = async () => {
            setLoading(true)
            try {
                // In a real app, you would fetch the doctor data from an API
                await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate API delay
                setDoctor(mockDoctor)
            } catch (err) {
                setGlobalNotification({
                    type: "error",
                    message: "Không thể tải thông tin bác sĩ. Vui lòng thử lại sau.",
                })
            } finally {
                setLoading(false)
            }
        }

        fetchDoctor()
    }, [])

    // Show global notification
    const showNotification = (type: "success" | "error", message: string) => {
        setGlobalNotification({ type, message })
        setTimeout(() => setGlobalNotification({ type: null, message: null }), 5000)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
            </div>
        )
    }

    if (!doctor) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">Không thể tải thông tin bác sĩ</h2>
                    <p className="text-gray-600 mt-2">Vui lòng thử lại sau hoặc liên hệ quản trị viên.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-teal-100 p-3 rounded-lg">
                                <UserCircle className="w-8 h-8 text-teal-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa thông tin bác sĩ</h1>
                                <p className="text-gray-600">Cập nhật thông tin chi tiết của bác sĩ {doctor.name}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification area */}
                {globalNotification.type && (
                    <Alert
                        variant={globalNotification.type === "error" ? "destructive" : "default"}
                        className={
                            globalNotification.type === "error" ? "border-red-500 bg-red-50" : "border-green-500 bg-green-50"
                        }
                    >
                        {globalNotification.type === "error" ? (
                            <AlertCircle className="h-4 w-4" />
                        ) : (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                        )}
                        <AlertDescription className={globalNotification.type === "error" ? "" : "text-green-600"}>
                            {globalNotification.message}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Tabs */}
                <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                        <TabsTrigger value="general">Thông tin chung</TabsTrigger>
                        <TabsTrigger value="schedule">Lịch biểu</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general">
                        <GeneralInfoTab/>
                    </TabsContent>

                    <TabsContent value="schedule">
                        <ScheduleSettings />
                        {/* <CertificatesTab
                            certificates={doctor.certificates}
                            doctorId={doctor.id}
                            onUpdate={(updatedCertificates) => {
                                setDoctor({ ...doctor, certificates: updatedCertificates })
                            }}
                            onNotification={showNotification}
                        /> */}
                    </TabsContent>

                    {/* <TabsContent value="qualifications">
                        <ScheduleSettings/>
                    </TabsContent>

                    <TabsContent value="experience">
                        <ExperienceTab
                            experiences={doctor.experiences}
                            education={doctor.education}
                            doctorId={doctor.id}
                            onUpdate={(updatedData) => {
                                setDoctor({
                                    ...doctor,
                                    experiences: updatedData.experiences || doctor.experiences,
                                    education: updatedData.education || doctor.education,
                                })
                            }}
                            onNotification={showNotification}
                        />
                    </TabsContent> */}
                </Tabs>
            </div>
        </div>
    )
}
