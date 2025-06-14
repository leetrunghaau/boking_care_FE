"use client";

import { useEffect, useState } from "react";
import http from "@/helper/axios";
import SubHeader from "@/components/sub-header";
import DoctorCard from "@/components/doctor-page/docter-card";
import DoctorSearchFilter from "@/components/doctor-page/search-filter";
import { handleApiError } from "@/helper/toast-utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MapPin, RefreshCw, Search, TestTubeDiagonal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getIconByName } from "@/helper/icon-map";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { cn } from "@/lib/utils";
import { CardLoading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
export default function DoctorsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initParms = new URLSearchParams(searchParams.toString());
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [address, setAddress] = useState<any[]>([]);


  const [filter, setFilter] = useState({
    search: initParms.get("search") ?? "",
    specialty: "all",
    address: "all"
  });
  const [page, setPage] = useState(Math.max(Number(initParms.get("page")) || 1, 1));
  const [total, setTotal] = useState(1);


  const loadDoctor = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      const setIfExists = (key: string, value: any) => {
        if ((key === "specialty" || key === "address") && value === "all") {
          params.delete(key);
        } else {
          value ? params.set(key, value.toString()) : params.delete(key);
        }
      };
      setIfExists("page", page);
      setIfExists("search", filter.search);
      setIfExists("specialty", filter.specialty);
      setIfExists("address", filter.address);
      router.push(`?${params.toString()}`);
      const queryString = params.toString();
      const res = await http.get<any>(`/doctor-site/doctors${queryString ? `?${queryString}` : ""}`);
      if (res) {
        setDoctors(res.doctors)
        setPage(res.page)
        setTotal(res.total)
      }
    } catch (err) {
      handleApiError(err, "Lấy thông tin bác sĩ thất bại.");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const spts = await http.get<any[]>("/doctor-site/specialties");
        const ars = await http.get<any[]>("/doctor-site/address");
        setSpecialties(spts);
        setAddress(ars);
      } catch (err) {
        console.error("Failed to fetch filters:", err);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    loadDoctor()
  }, [filter, page])



  return (
    <>
      <section className="m-10">
        <div className="container justify-center mx-auto">
          <SubHeader title="Bác sĩ" />
        </div>
      </section>

      <section className="my-10">
        <div className="container justify-center mx-auto w-11/12">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Tìm kiếm bác sĩ</h1>
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Input
                  value={filter.search}
                  onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                  placeholder="Tên bác sĩ"
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>

              <Select value={filter.specialty} onValueChange={(value) => { setFilter({ ...filter, specialty: value }) }}>
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

                      <SelectItem key={item.id} value={String(item.id)}>
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

              <Select value={filter.address} onValueChange={(value) => { setFilter({ ...filter, address: value }) }} >
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
                  {address.map((item: string, index: number) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


          </div>
        </div>
      </section>

      <section className="my-10">
        <div className="container justify-center mx-auto w-11/12">
          <h2 className="text-xl font-semibold mb-4">Kết quả tìm kiếm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ?
              [1, 2, 3].map(i => (
                <CardLoading key={i} />
              )) :
              doctors.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg col-span-3">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Không tìm thấy bác sĩ phù hợp</p>
                  <Button variant="link" onClick={() => { setFilter({search: "", specialty: "all", address:"all"}) }} className="mt-2">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Xóa tìm kiếm
                  </Button>
                </div>
              )
                : (
                  doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))
                )}
          </div>
        </div>
      </section>

      <section className="my-10">
        <div className="container justify-center mx-auto w-11/12">
          <Pagination className="pt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={cn(
                    page === 1 ? "cursor-not-allowed" : "cursor-pointer"
                  )}
                  onClick={() => {
                    if (page > 1)
                      setPage(page - 1)
                  }}
                  isActive={page === 1}
                />
              </PaginationItem>

              {Array.from(
                { length: Math.ceil(total / 9) },
                (_, i) => i + 1
              ).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    className={cn(
                      pageNum === page ? "cursor-not-allowed" : "cursor-pointer"
                    )}
                    isActive={pageNum === page}
                    onClick={() => setPage(pageNum)}>
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  className={cn(
                    page === Math.ceil(total / 9) ? "cursor-not-allowed" : "cursor-pointer"
                  )}
                  onClick={() => {
                    if (page < Math.ceil(total / 9))
                      setPage(page + 1)

                  }}
                  isActive={page === Math.ceil(total / 9)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </>
  );
}
