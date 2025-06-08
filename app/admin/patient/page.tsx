"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableLoading, Skeleton } from "@/components/ui/loading";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import http from "@/helper/axios";
import { getIconByName } from "@/helper/icon-map";
import { handleErorr } from "@/helper/toast-utils";
import { getFullURL } from "@/helper/url";
import { Briefcase, CheckCircle, Edit, Eye, Search, Stethoscope, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";



export default function AdminPatientsPage() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const initParms = new URLSearchParams(searchParams.toString())

  const [search, setSearch] = useState(initParms.get('search') ?? '')
  const [page, setPage] = useState(Math.max(Number(initParms.get('page')) || 1, 1))
  const [total, setTotal] = useState(1)
  const [loadingPatient, setLoadingPatient] = useState(false)


  const [patients, setPatients] = useState<any[]>([])

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const loadPatient = async (searchInput?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const setIfExists = (key: string, value: any) => {
      value ? params.set(key, value.toString()) : params.delete(key);
    };
    setIfExists('page', page);
    if (searchInput) {
      setIfExists('search', searchInput);
    } else {
      setIfExists('search', search);
    }
    router.push(`?${params.toString()}`);
    const queryString = params.toString()

    setLoadingPatient(true)
    try {
      const rs = await http.get<any | null>(`/admin-patient/patients${queryString ? `?${queryString}` : ""}`)
      console.log("Patient", rs)
      if (rs) {
        setPatients(rs.patients)
        setTotal(rs.total)
      }
    } catch (err) {
      console.log(err)
      handleErorr()
    } finally {
      setLoadingPatient(false)
    }
  }


  useEffect(() => {
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [])
  useEffect(() => {
    loadPatient()
  }, [ page])


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      loadPatient(val);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý bác sĩ</h1>

      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              placeholder="Tìm kiếm theo tên"
              className="pl-10"
              value={search}
              onChange={(e) => {
                handleSearch(e)
                setPage(1)
              }}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button className="bg-teal-600 hover:bg-teal-700">Thêm bác sĩ</Button>
        </div>
      </div>



      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Bệnh nhân</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Điện thoại</TableHead>
              <TableHead>Ngày sinh</TableHead>
              <TableHead>Giới tính</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              loadingPatient ?
                <>
                  <TableRow>
                    <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                  </TableRow>
                </>
                :
                patients?.map((patient) => {
                  const Icon = getIconByName(patient.specialtyIcon)
                  return (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={getFullURL(patient.img) || "/placeholder.svg"}
                              alt={patient.name}
                            />
                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-gray-500">{patient.code}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>{patient.dob}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.address}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="outline" size="icon" className="h-8 w-8 text-teal-600">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Xem hồ sơ</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-amber-600">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Duyệt</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-destructive">
                            <XCircle className="h-4 w-4" />
                            <span className="sr-only">Từ chối</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}

          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="text-sm text-muted-foreground">
            Hiển thị {(page - 1) * 5 + 1}-{Math.min(page * 5, total)} của {total} bác sĩ
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(page - 1)}
                  isActive={page === 1}
                />
              </PaginationItem>

              {Array.from({ length: Math.ceil(total / 5) }, (_, i) => i + 1).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === page}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext

                  onClick={() => setPage(page + 1)}
                  isActive={page === Math.ceil(total / 5)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

        </div>
      </div>
    </div>
  );
}
