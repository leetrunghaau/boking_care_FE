"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import http from "@/helper/axios";
import { getIconByName } from "@/helper/icon-map";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Star,
  Stethoscope,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { getReadableTimeRanges } from "@/helper/time";
import { Button } from "@/components/ui/button";
import { formatPhoneNumber } from "@/helper/customNumView";
import { Select, SelectContent, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { TestTubeDiagonal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleApiError } from "@/helper/toast-utils";
import { getFullURL } from "@/helper/url";
export function SelectDoctor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const symptoms = searchParams.get("symptoms");
  const doctorIdQuery = searchParams.get("doctorId");

  const [doctors, setDoctors] = useState<any[]>([]);
  const [doctorIdSelected, setDoctorIdSelected] = useState<number | null>(
    doctorIdQuery ? Number(doctorIdQuery) : null
  );
  const [doctorSelected, setDoctorSelected] = useState<any | null>(null);

  // load
  const [loading, setLoading] = useState(false);
  const [doctorLoad, setDoctorLoad] = useState<boolean>(false);

  /// search state
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [specialtySelected, setSpecialtySelected] = useState<string>("all");
  const [addresses, setAddresses] = useState<any[]>([]);
  const [addressSelected, setAddresSelected] = useState<string>("all");

  useEffect(() => {
    const fetchSpecialties = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (symptoms?.trim()) {
          queryParams.set("symptoms", symptoms.trim());
        }
        const queryString = queryParams.toString();
        const rss = await http.get<any[]>(
          `/booking/specialties${queryString ? `?${queryString}` : ""}`
        );
        const rsa = await http.get<any[]>(`/booking/addresses`);
        setAddresses(rsa);
        setSpecialties(rss);
      } catch (err) {
        handleApiError(err, "Lấy thông tin bác sĩ thất bại");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (symptoms?.trim()) queryParams.set("symptoms", symptoms.trim());
        if (specialtySelected !== "all")
          queryParams.set("specialty", specialtySelected);
        if (addressSelected !== "all")
          queryParams.set("address", addressSelected);
        const queryString = queryParams.toString();
        const url = `/booking/doctors${queryString ? `?${queryString}` : ""}`;
        const rs = await http.get<any[]>(url);
        setDoctors(rs);
        setDoctorSelected(rs.find((item) => item.id == doctorIdSelected));
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [specialtySelected, addressSelected]);

  const handleBackStep = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("curStep", "0");
    const queryString = currentParams.toString();
    router.push(`/dat-lich-kham${queryString ? `?${queryString}` : ""}`);
  };

  const handleNextStep = () => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("curStep", "2");
    if (doctorSelected) {
      queryParams.set("doctorId", doctorSelected.id.toString());
    }
    const queryString = queryParams.toString();
    router.push(`/dat-lich-kham${queryString ? `?${queryString}` : ""}`);
  };

  const doctorCard = (dt: any) => {
    return (
      <Card
        key={dt.id}
        className={`cursor-pointer transition-all hover:shadow-md ${
          doctorIdSelected == dt.id
            ? "border-2 border-teal-600"
            : "border border-gray-200"
        }`}
        onClick={() => {
          setDoctorIdSelected(dt.id);
          setDoctorSelected(dt);
        }}>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-32 h-32 rounded-md overflow-hidden">
              <Image
                src={getFullURL(dt.img) || "/placeholder.svg"}
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
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < dt.rating
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
                {dt.specialty && (
                  <div className="flex items-start gap-2 justify-center md:justify-start mb-1">
                    <Briefcase className="h-4 w-4 text-teal-600 flex-shrink-0 " />
                    <span className="text-sm text-gray-600 ml-2">
                      Chuyên khoa {dt.specialty.name}
                    </span>
                  </div>
                )}
                {dt.hospital && (
                  <div className="flex items-start gap-2 justify-center md:justify-start mb-1">
                    <Stethoscope className="h-4 w-4 text-teal-600 flex-shrink-0 " />
                    <span className="text-sm text-gray-600 ml-2">
                      {dt.hospital.name}
                    </span>
                  </div>
                )}
                {dt?.hospital?.address && (
                  <div className="flex items-start gap-2 justify-center md:justify-start">
                    <MapPin className="h-4 w-4 text-teal-600 flex-shrink-0 " />
                    <span className="text-sm text-gray-600 ml-2">
                      {dt.hospital.address}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const hospitalCard = (hpt: any) => {
    return (
      <>
        <div className="mb-3">
          <h3 className="font-medium">{hpt?.name}</h3>
          <p className="text-sm text-muted-foreground">{hpt?.address}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Giờ làm việc</p>
              {getReadableTimeRanges(hpt?.time ?? []).map((time, i) => (
                <p className="text-sm text-muted-foreground" key={i}>
                  {time}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Phone className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Liên hệ</p>
              <p className="text-sm text-muted-foreground">
                {" "}
                {formatPhoneNumber(hpt.phone)}
              </p>
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
    );
  };

  const specialtyCard = (spt: any) => {
    const Icon = getIconByName(spt.icon);
    return (
      <div className="flex gap-4 justify-around items-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-teal-50">
          <Icon className="w-7 h-7 text-teal-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{spt.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{spt.title}</p>

          <Link href={`/chuyen-khoa/${spt.slug}`} className="flex items-center w-full mx-auto gap-1 text-teal-600 text-sm mt-2 group-hover:underline">
            Link
            Xem chi tiết <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="grid md:grid-col-2 lg:grid-cols-3 mx-auto w-11/12 mb-6  gap-3">
      <Card className="col-span-2 row-span-2">
        <CardHeader>
          <div className="grid md:grid-cols-2 gap-4  ">
            <Select
              value={specialtySelected}
              onValueChange={(value) => {
                setSpecialtySelected(value);
              }}>
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
                  const Icon = getIconByName(item.icon);
                  return (
                    <SelectItem key={item.slug} value={String(item.id)}>
                      <div className="flex gap-3 items-center">
                        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-teal-50">
                          <Icon className="w-5 h-5 text-teal-600" />
                        </div>
                        <p className=" text-slate-800">{item.name}</p>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select
              value={addressSelected}
              onValueChange={(value) => {
                setAddresSelected(value);
              }}>
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
        <CardContent>
          <ScrollArea className="h-96 flex flex-col gap-3">
            <div className=" flex flex-col gap-4 mr-3">
              {doctors.map((item) => doctorCard(item))}
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
          {doctorSelected ? (
            doctorSelected.hospital ? (
              hospitalCard(doctorSelected.hospital)
            ) : (
              <p className="text-sm text-teal-600  p-3 rounded-md text-center ">
                Không có thông tin bệnh viện của bác sĩ.
              </p>
            )
          ) : (
            <p className="text-sm text-teal-600  p-3 rounded-md text-center ">
              Vui lòng chọn bác sĩ để xem thông tin.
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-bold ">Thông tin chuyên khoa</h2>
        </CardHeader>
        <CardContent className="px-6  gap-3">
          {doctorSelected ? (
            doctorSelected.specialty ? (
              specialtyCard(doctorSelected.specialty)
            ) : (
              <p className="text-sm text-teal-600  p-3 rounded-md text-center ">
                Không có thông tin chuyên khoa của bác sĩ.
              </p>
            )
          ) : (
            <p className="text-sm text-teal-600  p-3 rounded-md text-center ">
              Vui lòng chọn bác sĩ để xem thông tin.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between col-span-3 pb-10">
        <button
          onClick={handleBackStep}
          className="text-gray-600 px-4 py-2 disabled:opacity-50">
          Quay lại
        </button>
        <button
          disabled={!doctorSelected}
          onClick={handleNextStep}
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed">
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
