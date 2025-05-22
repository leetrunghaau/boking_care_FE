"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Phone, MapPin, Clock, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ImgList from "@/components/hospital/img-list"
import DoctorList from "@/components/hospital/doctor-list"
import SpecialtiyList from "@/components/hospital/specialtiy-list"
import http from "@/helper/axios"


interface MedicalFacility {
    id: string
    name: string
    description: string
    address: string
    phone: string
    openingHours: string
    license: string
    image: string
    mapEmbedUrl: string
    services: string[]
    years: number
    patients: number
    doctors: number
    rating: number
}


export default function HealthFacilityDetailPage() {
    const { slug } = useParams()
    const [facility, setFacility] = useState<MedicalFacility | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await http.get<MedicalFacility>("/specialties")
                setFacility(res);
            } catch (err) {
                console.error("Failed to fetch doctors:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [])

    if (!facility) {
        return <p className="text-center py-10">Đang tải dữ liệu...</p>
    }

    return (
        <>
            <section className="my-10">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                        {facility ? <>
                            <Image src={facility.image} alt={facility.name} fill className="object-cover" />
                        </> :
                            <>
                                <Image src="/placeholder.svg" alt="null" fill className="object-cover" />
                            </>
                        }
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-800/60 to-teal-500/60 flex flex-col justify-end p-6">
                            <h1 className="text-4xl text-white font-bold">{facility.name}</h1>
                            <p className="text-white text-lg">{facility.address}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="my-10">
                <div className="container mx-auto px-6 max-w-5xl space-y-4">
                    <h2 className="text-2xl font-semibold">Giới thiệu</h2>
                    <p className="text-muted-foreground">{facility.description}</p>
                    <div className="grid sm:grid-cols-2 gap-6 text-sm text-slate-700">
                        <div><strong>Địa chỉ:</strong> {facility.address}</div>
                        <div><strong>Điện thoại:</strong> {facility.phone}</div>
                        <div><strong>Giờ làm việc:</strong> {facility.openingHours}</div>
                        <div><strong>Giấy phép hoạt động:</strong> {facility.license}</div>
                    </div>
                </div>
            </section>
            {facility?.services?.length > 0 && (
                <section className="my-10">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-2xl font-semibold mb-4">Dịch vụ nổi bật</h2>
                        <ul className="grid sm:grid-cols-2 gap-3 text-slate-700">
                            {facility.services.map((srv, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-teal-600" /> {srv}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            <section className="my-10">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-2xl font-semibold mb-4">Chuyên khoa</h2>
                    <SpecialtiyList slug={slug as string} />
                </div>
            </section>
            <section className="my-10">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-2xl font-semibold mb-4">Bác sĩ tại cơ sở</h2>
                    <DoctorList slug={slug as string} />
                </div>
            </section>
            <section className="my-10">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-2xl font-semibold mb-4">Hình ảnh cơ sở</h2>
                    <ImgList slug={slug as string} />
                </div>
            </section>
            <section className="my-10">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="bg-slate-50 rounded-lg p-6 grid grid-cols-2 sm:grid-cols-4 text-center">
                        <div>
                            <h3 className="text-2xl font-bold text-teal-600">{facility.years}+</h3>
                            <p className="text-sm text-muted-foreground">Năm hoạt động</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-teal-600">{facility.patients.toLocaleString()}</h3>
                            <p className="text-sm text-muted-foreground">Bệnh nhân đã khám</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-teal-600">{facility.doctors}</h3>
                            <p className="text-sm text-muted-foreground">Bác sĩ</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-teal-600">{facility.rating} ★</h3>
                            <p className="text-sm text-muted-foreground">Đánh giá trung bình</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="my-10">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-2xl font-semibold mb-4">Bản đồ & Vị trí</h2>
                    <div className="aspect-video rounded overflow-hidden shadow">
                        <iframe
                            src={facility.mapEmbedUrl}
                            width="100%"
                            height="100%"
                            loading="lazy"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>
            <section className="my-10 bg-teal-600 text-white">
                <div className="container mx-auto px-6 max-w-5xl py-10 text-center space-y-4">
                    <h2 className="text-3xl font-bold">Bạn cần được khám ngay?</h2>
                    <p className="text-lg">Chúng tôi sẵn sàng hỗ trợ bạn đặt lịch khám nhanh chóng, tiện lợi.</p>
                    <Button className="bg-white text-teal-600 hover:bg-slate-100 h-12 px-8 text-base">Đặt lịch khám</Button>
                </div>
            </section>

        </>
    );
}