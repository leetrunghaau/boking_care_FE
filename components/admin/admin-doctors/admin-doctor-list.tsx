"use client";

import { useState, useEffect } from "react";
import http from "@/helper/axios";
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getFullURL } from "@/helper/url";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getIconByName } from "@/helper/icon-map";


interface Pops {
  search: string
  specialty: any
  hospital: any
}
export function AdminDoctorList({ search, specialty, hospital }: Pops) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1)
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([])



  useEffect(() => {
    const fetchPendingDoctors = async () => {
      try {
        const res = await http.get<any>(`/admin-doctor/doctors`);
        if (res) {
          setDoctors(res.doctos)
          setPage(res.page)
          setTotal(res.limit)
        }
        console.log("Fetched pending doctors:", res);
      } catch (err) {
        console.error("Failed to fetch pending doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingDoctors();
  }, [search, specialty, hospital]);
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Bác sĩ</TableHead>
            <TableHead>Chuyên khoa</TableHead>
            <TableHead>Nơi công tác</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => {
            const Icon = getIconByName(doctor.specialtyIcon)
            return (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={getFullURL(doctor.img) || "/placeholder.svg"}
                        alt={doctor.name}
                      />
                      <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-gray-500">{doctor.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div>
                      <Icon className="w-5 h-5 text-teal-600"/>
                    </div>

                  {doctor.specialty}
                  </div>
                  
                  
                  </TableCell>
                <TableCell>{doctor.hospital}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Xem hồ sơ</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-green-500">
                      <CheckCircle className="h-4 w-4" />
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
          Hiển thị 1-5 của 12 bác sĩ chờ duyệt
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}



