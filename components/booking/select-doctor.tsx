"use client"
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import http from '@/helper/axios';
import { getIconByName } from '@/helper/icon-map';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Briefcase, ChevronRight, Clock, MapPin, Phone, Star, Stethoscope } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { getReadableTimeRanges } from '@/helper/time';
import { Button } from '@/components/ui/button';
import { formatPhoneNumber } from '@/helper/customNumView';
import BookingStore from '@/store/booking';
import { Select, SelectContent, SelectValue } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select';
import { SelectItem } from '@/components/ui/select';
import { TestTubeDiagonal } from 'lucide-react';


interface Pops {
    stepClick: (nextStep: boolean) => void
}

export function SelectDoctor({ stepClick }: Pops) {
    const { doctorsId, symptoms, isLoaded, setBooking } = BookingStore()
    const [doctors, setDoctors] = useState<any[]>([])
    const [doctor, setDoctor] = useState<any | null>(null)
    const [loading, setLoading] = useState(false);
    const [doctorLoad, setDoctorLoad] = useState<boolean>(false)

    /// search state
    const [specialties, setSpecialties] = useState<any[]>([])
    const [specialty, setSpecialty] = useState<string>("all")
    const [addresses, setAddreses] = useState<any[]>([])
    const [address, setAddres] = useState<string>("all")


    useEffect(() => {
        if (!isLoaded) return;
        updateDoctor(doctorsId)
        const fetchSpecialties = async () => {
            setLoading(true);
            try {
                const query = symptoms.trim() && new URLSearchParams({ symptoms }).toString();
                const rss = await http.get<any[]>(`/booking/specialties${query ? `?${query}` : ""}`);
                const rsa = await http.get<any[]>(`/booking/addresses`);
                setAddreses(rsa);
                setSpecialties(rss);
            } catch (err) {
                console.error("Failed to fetch doctors:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSpecialties();
    }, [isLoaded]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                setBooking({ doctorsId: null })

                const queryParams = new URLSearchParams();
                if (symptoms.trim()) queryParams.set("symptoms", symptoms.trim());
                if (specialty !== "all") queryParams.set("specialty", specialty);
                if (address !== "all") queryParams.set("address", address);
                const queryString = queryParams.toString();
                const url = `/booking/doctors${queryString ? `?${queryString}` : ""}`;
                const rs = await http.get<any[]>(url);
                console.log("url ========>", rs)
                setDoctors(rs);
            } catch (err) {
                console.error("Failed to fetch doctors:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ specialty, address]);



    const updateDoctor = (id: number | null) => {
        const fetchDoctor = async () => {
            setDoctorLoad(true);
            try {
                const rs = await http.get<any>(`/booking/doctor/${id}`);
                setDoctor(rs);
            } catch (err) {
                console.error("Failed to fetch doctors:", err);
            } finally {
                setDoctorLoad(false);
                setBooking({ doctorsId: id })
            }
        };
        if (id) {
            fetchDoctor()
        } else {
            setDoctor(null)
            setBooking({ doctorsId: null })
        }
    }





    const doctorCard = (dt: any) => {
        return (
            <Card
                key={dt.id}
                className={`cursor-pointer transition-all hover:shadow-md ${doctor?.id == dt.id
                    ? "border-2 border-teal-600"
                    : "border border-gray-200"
                    }`}
                onClick={() => { updateDoctor(dt.id) }}
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
                    <Link href={`/co-so-y-te/${hpt?.slug}`}>
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
                    <div className="grid md:grid-cols-2 gap-4  ">
                        <Select value={specialty} onValueChange={(value) => {
                            setSpecialty(value)
                            updateDoctor(null)

                        }} >
                            <SelectTrigger>
                                <SelectValue placeholder="Chuyên khoa" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-teal-50">
                                            <TestTubeDiagonal className="w-5 h-5 text-teal-600" />
                                        </div>
                                        <p className=" text-slate-800">Tất cả chuyên khoa</p>
                                    </div>
                                </SelectItem>
                                {specialties.map((item) => {
                                    const Icon = getIconByName(item.icon)
                                    return (

                                        <SelectItem key={item.slug} value={String(item.id)}>
                                            <div className="flex gap-3 items-center">
                                                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-teal-50">
                                                    <Icon className="w-5 h-5 text-teal-600" />
                                                </div>
                                                <p className=" text-slate-800">{item.name}</p>
                                            </div>
                                        </SelectItem>
                                    )
                                }
                                )}
                            </SelectContent>
                        </Select>

                        <Select value={address} onValueChange={(value) => {
                            setAddres(value)
                            updateDoctor(null)
                        }} >
                            <SelectTrigger>
                                <div className="flex gap-3 items-center">
                                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-teal-50">
                                        <MapPin className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <SelectValue placeholder="Địa điểm" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả địa điểm</SelectItem>
                                {addresses.map((item: string, index: number) => (
                                    <SelectItem key={index} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                        doctor ? (
                            doctor.hospital
                                ? hospitalCard(doctor.hospital)
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
                        doctor ? (
                            doctor.specialty
                                ? specialtyCard(doctor.specialty)
                                : <p className="text-sm text-teal-600  p-3 rounded-md text-center ">Không có thông tin chuyên khoa của bác sĩ.</p>
                        ) : <p className="text-sm text-teal-600  p-3 rounded-md text-center ">Vui lòng chọn bác sĩ để xem thông tin.</p>

                    }
                </CardContent>
            </Card>

            <div className="flex justify-between col-span-3">
                <button
                    onClick={() => {
                        stepClick(false)
                    }}
                    className="text-gray-600 px-4 py-2 disabled:opacity-50"
                >
                    Quay lại
                </button>
                <button
                    disabled={!doctor}
                    onClick={() => { stepClick(true) }}
                    className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Tiếp tục
                </button>
            </div>
        </div>
    )
}