'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CalendarClock, Clock, DollarSign, Mail, MapPin, MessageSquare, Phone, Stethoscope, User } from "lucide-react"
import PatientRecordModal from '@/components/doctor/doctor-appointments/patient-record-modal';
import { useEffect, useState } from "react"
import http from "@/helper/axios"

interface Pops {
    bookingId: number |string| null
}
export default function BookingInfoCard({ bookingId }: Pops) {
    const [booking, setBooking] = useState<any | null>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!bookingId) return
        const fetchPatient = async () => {
            try {
                setLoading(true)
                const res = await http.get<any>(`/doctor-appointment/booking-info/${bookingId}`);
                setBooking(res);
            } catch (err) {
                console.error("Failed to fetch appointment detail:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPatient()
    }, [bookingId])
    return (
        <>
            {
                booking && (
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CalendarClock className="h-5 w-5 text-teal-600" />
                                Thông tin lịch hẹn
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm font-medium">Ngày khám:</span>
                                    </div>
                                    <span className="text-sm">
                                        {booking.date}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm font-medium">Giờ khám:</span>
                                    </div>
                                    <span className="text-sm">
                                        {booking.time}
                                    </span>
                                </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm font-medium">Thời gian khám:</span>
                                    </div>
                                    <span className="text-sm">
                                        {booking.duration}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm font-medium">Giá khám:</span>
                                    </div>
                                    <span className="text-sm">
                                        {booking.price}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm font-medium">Địa điểm:</span>
                                    </div>
                                    <span className="text-sm">{booking.address}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Stethoscope className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm font-medium"> Triệu chứng:</span>
                                    </div>
                                    <span className="text-sm"> {booking.symptoms}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            } </>
    )
}