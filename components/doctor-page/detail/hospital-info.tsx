'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import http from "@/helper/axios"
import { getReadableTimeRanges } from "@/helper/time"
import { Clock, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Pops {
    doctor: any
}

export default function HospitalInfo({ doctor }: Pops) {

    return (

        <Card>
            <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">Thông tin cơ sở y tế</h2>

                <div className="flex items-start gap-3 mb-4">
                    <div className="w-16 h-16 relative rounded overflow-hidden">
                        <Image
                            src={doctor?.hospital?.thumbnail ?? "/placeholder.svg?height=100&width=100&text=BV"}
                            alt={doctor?.hospital?.name ?? "Benh vien"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-medium">{doctor?.hospital?.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor?.hospital?.address}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium">Giờ làm việc</p>
                            {
                                getReadableTimeRanges(doctor?.hospital?.time ?? []).map((time, i) => (
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
                    <Link href={`/co-so-y-te/${doctor?.hospital?.slug}`}>
                        <Button variant="outline" className="w-full">
                            Xem thông tin bệnh viện
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}