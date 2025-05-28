"use client"
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import http from '@/helper/axios';
import { getIconByName } from '@/helper/icon-map';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Briefcase, ChevronRight, Clock, ListChecks, MapPin, Phone, Star, Stethoscope } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { CardLoading } from '@/components/ui/loading';
import Link from 'next/link';
import { getReadableTimeRanges } from '@/helper/time';
import { Button } from '@/components/ui/button';
import { formatPhoneNumber } from '@/helper/customNumView';
import { Doctor, Hospital, Specialty } from './type';


interface Pops {
    onDoctorSelect: (doctorId: Doctor) => void
    selectedDoctor?: any | null
}

export function SelectDoctor({ onDoctorSelect, selectedDoctor }: Pops) {


    const [hospitals, setHospitals] = useState<any[]>([])
    const [hospital, setHospital] = useState<any | null>(null)
    const [doctors, setDoctors] = useState<any[]>([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSpecialties = async () => {
            setLoading(true);
            try {
                const rs = await http.get<Doctor[]>(`/booking/doctors`);
                console.log(" doctors", rs)
                setDoctors(rs);
            } catch (err) {
                console.error("Failed to fetch doctors:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSpecialties();
    }, []);



    const doctorCard = (dt: any) => {
        return (
            <Card
                key={dt.id}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedDoctor?.id === dt.id
                    ? "border-2 border-teal-600"
                    : "border border-gray-200"
                    }`}
                onClick={() => onDoctorSelect(dt)}
            >
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative w-full md:w-32 h-32 rounded-md overflow-hidden">
                            <Image
                                src={dt.img || "/placeholder.svg"}
                                alt={dt.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <h3 className="font-semibold text-lg">{dt.name}</h3>

                                {dt.availableToday && (
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 self-start md:self-auto mt-2 md:mt-0">
                                        Có lịch hôm nay
                                    </Badge>
                                )}
                            </div>

                            <div className=" flex items-center">
                                <div className="flex">
                                    {Array(5).fill(0).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < dt.rating
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600 ml-2">
                                    ({dt.sumRating} đánh giá)
                                </span>
                            </div>

                            <div className="mt-2">
                                {
                                    dt.specialty &&
                                    <div className="flex items-start gap-2 justify-center md:justify-start mb-1">
                                        <Briefcase className="h-4 w-4 text-teal-600 flex-shrink-0 " />
                                        <span className='text-sm text-gray-600 ml-2'>
                                            Chuyên khoa {dt.specialty.name}
                                        </span>
                                    </div>
                                }
                                {
                                    dt.hospital &&
                                    <div className="flex items-start gap-2 justify-center md:justify-start mb-1">
                                        <Stethoscope className="h-4 w-4 text-teal-600 flex-shrink-0 " />
                                        <span className='text-sm text-gray-600 ml-2'>{dt.hospital.name}</span>
                                    </div>
                                }
                                {
                                    dt?.hospital?.address &&
                                    <div className="flex items-start gap-2 justify-center md:justify-start">
                                        <MapPin className="h-4 w-4 text-teal-600 flex-shrink-0 " />
                                        <span className='text-sm text-gray-600 ml-2'>{dt.hospital.address}</span>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const hospitalCard = (hpt: any) => {
        return (
            <>
                <div className='mb-3'>
                    <h3 className="font-medium">{hpt?.name}</h3>
                    <p className="text-sm text-muted-foreground">{hpt?.address}</p>
                </div>

                <div className="space-y-3">
                    <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium">Giờ làm việc</p>
                            {
                                getReadableTimeRanges(hpt?.time ?? []).map((time, i) => (
                                    <p className="text-sm text-muted-foreground" key={i}>{time}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Phone className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium">Liên hệ</p>
                            <p className="text-sm text-muted-foreground"> {formatPhoneNumber(hpt.phone)}</p>
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
            </>

        )

    }

    const specialtyCard = (spt: any) => {
        const Icon = getIconByName(spt.icon)
        return (
            <div className='flex gap-4 justify-around items-center'>
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-teal-50">
                    <Icon className="w-7 h-7 text-teal-600" />
                </div>
                <div>

                    <h3 className="text-lg font-semibold text-slate-800">{spt.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{spt.title}</p>

                    <div className="flex items-center w-full mx-auto gap-1 text-teal-600 text-sm mt-2 group-hover:underline">
                        Xem chi tiết <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="grid md:grid-col-2 lg:grid-cols-3 mx-auto w-11/12 mb-6  gap-3">
            <Card className="col-span-2 row-span-2">
                <CardHeader >
                    <div className="flex gap-4 justify-around items-center ">
                        <Input className="col-span-2 mb-3" placeholder='Nhập tên bác sĩ' />
                    </div>
                </CardHeader>
                <CardContent >

                    <ScrollArea className="h-96 flex flex-col gap-3">
                        <div className=" flex flex-col gap-4 mr-3">
                            {doctors.map(item => doctorCard(item))}
                        </div>
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>

                </CardContent>
            </Card>


            <Card>
                <CardHeader>
                    <h2 className="text-lg font-bold ">Thông tin cơ sở y tế</h2>
                </CardHeader>
                <CardContent className="px-6 pb-0 gap-3">
                    {
                        selectedDoctor ? (
                            selectedDoctor.hospital
                                ? hospitalCard(selectedDoctor.hospital)
                                : <p className="text-sm text-teal-600  p-3 rounded-md text-center ">Không có thông tin bệnh viện của bác sĩ.</p>
                        ) : <p className="text-sm text-teal-600  p-3 rounded-md text-center ">Vui lòng chọn bác sĩ để xem thông tin.</p>
                    }
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-bold ">Thông tin chuyên khoa</h2>
                </CardHeader>
                <CardContent className="px-6  gap-3">
                    {
                        selectedDoctor ? (
                            selectedDoctor.specialty
                                ? specialtyCard(selectedDoctor.specialty)
                                : <p className="text-sm text-teal-600  p-3 rounded-md text-center ">Không có thông tin chuyên khoa của bác sĩ.</p>
                        ) : <p className="text-sm text-teal-600  p-3 rounded-md text-center ">Vui lòng chọn bác sĩ để xem thông tin.</p>

                    }
                </CardContent>
            </Card>
        </div>
    )
}