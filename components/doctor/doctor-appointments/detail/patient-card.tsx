'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, MessageSquare, Phone, User } from "lucide-react"
import PatientRecordModal from '@/components/doctor/doctor-appointments/patient-record-modal';
import { useEffect, useState } from "react"
import http from "@/helper/axios"

interface Pops {
    bookingId: number | string | null
}
export default function PatientCard({ bookingId }: Pops) {
    const [patient, setPatient] = useState<any | null>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // if (!bookingId) return
        const fetchPatient = async () => {
            try {
                setLoading(true)
                const res = await http.get<any>(`/doctor-appointment/patient/booking/${bookingId}`);
                setPatient(res);
            } catch (err) {
                console.error("Failed to fetch appointment detail:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPatient()
    }, [])
    return (
        <>
            {
                patient && (
                    <Card >
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="h-5 w-5 text-teal-600" />
                                Thông tin bệnh nhân
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center text-center mb-4">
                                <Avatar className="h-20 w-20 mb-3">
                                    <AvatarImage
                                        src={patient.img || "/placeholder.svg"}
                                    />
                                    <AvatarFallback className="bg-slate-100 text-lg">
                                        {patient.name
                                            ? patient.name.charAt(0)
                                            : "?"}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-bold text-slate-800">
                                    {patient.name}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    {patient.age} •{" "}
                                    {patient.gender}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-slate-500" />
                                    <span className="text-sm">
                                        {patient.phone}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-slate-500" />
                                    <span className="text-sm">
                                        {patient.email}
                                    </span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
                                    <span className="text-sm">
                                        {patient.address}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <MessageSquare className="h-4 w-4 mr-1" />
                                    Nhắn tin
                                </Button>
                                <PatientRecordModal patientId={patient.id}/>
                            </div>
                        </CardContent>
                    </ Card >
                )
            } </>
    )
}