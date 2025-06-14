// app/co-so-y-te/page.tsx
"use client";
import HospitalCard, { Hospital } from "@/components/hospital/hospital-card";
import SubHeader from "@/components/sub-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardLoading } from "@/components/ui/loading";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import http from "@/helper/axios";
import { handleApiError } from "@/helper/toast-utils";
import { cn } from "@/lib/utils";
import { MapPin, RefreshCw, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FacilitiesPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initParms = new URLSearchParams(searchParams.toString());
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [address, setAddress] = useState<any[]>([]);

  const [filter, setFilter] = useState({
    search: initParms.get("search") ?? "",
    address: "all"
  });
  const [page, setPage] = useState(Math.max(Number(initParms.get("page")) || 1, 1));
  const [total, setTotal] = useState(1);



  const loadDoctor = async () => {
    setIsLoading(true);
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
      setIfExists("address", filter.address);
      router.push(`?${params.toString()}`);
      const queryString = params.toString();
      const res = await http.get<any>(`/hospitals${queryString ? `?${queryString}` : ""}`);
      if (res) {
        setHospitals(res.hospital)
        setPage(res.page)
        setTotal(res.total)
      }
    } catch (err) {
      handleApiError(err, "Lấy thông tin bác sĩ thất bại.");
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    loadDoctor()
  }, [filter, page])

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const ars = await http.get<any[]>("/doctor-site/address");
        setAddress(ars);
      } catch (err) {
        console.error("Failed to fetch filters:", err);
      }
    };

    fetchFilters();
  }, []);

  return (
    <>
      <section className="my-10">
        <div className="container justify-center mx-auto ">
          <SubHeader
            title="Cơ sở y tế"
          />
        </div>
      </section>
      <section className="my-10">
        <div className="container justify-center mx-auto w-11/12">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Tìm kiếm bác sĩ</h1>
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  value={filter.search}
                  onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                  placeholder="Tên sơ sở y tế"
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>

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
      <section className="container mx-auto py-10 w-11/12">
        <h1 className="text-2xl font-bold mb-6">Danh sách cơ sở y tế</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading ?
            [1, 2, 3].map((i) => (
              <CardLoading key={i}/>
            )) 
            :
            hospitals.length === 0 ? (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg col-span-3">
                <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Không tìm thấy bệnh viện phù hợp</p>
                <Button variant="link" onClick={() => { setFilter({search: "",  address:"all"}) }} className="mt-2">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Xóa tìm kiếm
                </Button>
              </div>
            )
            :
            hospitals.map((hospital) => (
              <HospitalCard hospital={hospital} key={hospital.id} />
            ))
          }
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
};

export default FacilitiesPage;
