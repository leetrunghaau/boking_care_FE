'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import http from "@/helper/axios"
import { getReadableTimeRanges } from "@/helper/time"
import { Clock, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"


interface Hospital {
    id: number
    name: string
    address: string
    img: string
    slug: string
    times: {
        weekend: number
        timeStart: number
        timeEnd: number
    }[]
}

interface Pops {
    slug: string
}

export default function HospitalInfo({ slug }: Pops) {
    const [hospital, setHospital] = useState<Hospital | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await http.get<Hospital>(`/doctor-site/doctor/${slug}/hospital`)
                setHospital(res);
                console.log("fetch Hospital", res)
            } catch (err) {
                console.error("Failed to fetch Hospital:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [])

    return (

        <Card>
            <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">Thông tin cơ sở y tế</h2>

                <div className="flex items-start gap-3 mb-4">
                    <div className="w-16 h-16 relative rounded overflow-hidden">
                        <Image
                            src={hospital?.img ?? "/placeholder.svg?height=100&width=100&text=BV"}
                            alt={hospital?.name ?? "Benh vien"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-medium">{hospital?.name}</h3>
                        <p className="text-sm text-muted-foreground">{hospital?.address}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium">Giờ làm việc</p>
                            {
                                getReadableTimeRanges(hospital?.times ?? []).map((time, i) => (
                                    <p className="text-sm text-muted-foreground" key={i}>{time}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Phone className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium">Liên hệ</p>
                            <p className="text-sm text-muted-foreground">024.3825.5599</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <Link href={`/co-so-y-te/${hospital?.slug}`}>
                        <Button variant="outline" className="w-full">
                            Xem thông tin bệnh viện
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}