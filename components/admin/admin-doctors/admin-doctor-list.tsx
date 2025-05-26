"use client";

import { useState, useEffect } from "react";
import http from "@/helper/axios";
import {
  Eye,
  MoreHorizontal,
  PauseCircle,
  PlayCircle,
  Edit,
  Award,
  Star,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type DoctorStatus = "active" | "inactive";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  experience: string; // ví dụ: "15 năm"
  appointments: number; // số lượt khám
  rating: number; // ví dụ: 4.9
  status: DoctorStatus;
  avatar: string;
}

export function AdminDoctorList() {
  const [page, setPage] = useState(1);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAvailableDoctors = async () => {
      try {
        const res = await http.get<Doctor[]>(`/admin-doctor/available`);
        setDoctors(res);
        console.log("Fetched available doctors:", res);
      } catch (err) {
        console.error("Failed to fetch available doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableDoctors();
  }, []);
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Bác sĩ</TableHead>
            <TableHead>Chuyên khoa</TableHead>
            <TableHead>Nơi công tác</TableHead>
            <TableHead>Kinh nghiệm</TableHead>
            <TableHead>Lịch hẹn</TableHead>
            <TableHead>Đánh giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={doctor.avatar || "/placeholder.svg"}
                      alt={doctor.name}
                    />
                    <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ID: {doctor.id}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{doctor.specialty}</TableCell>
              <TableCell>{doctor.hospital}</TableCell>
              <TableCell>{doctor.experience}</TableCell>
              <TableCell>{doctor.appointments}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Star className="mr-1 h-3.5 w-3.5 fill-primary text-primary" />
                  <span>{doctor.rating}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    doctor.status === "active" ? "outline" : "secondary"
                  }>
                  {doctor.status === "active" ? "Hoạt động" : "Tạm ngưng"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Mở menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Xem hồ sơ</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Chỉnh sửa</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Award className="mr-2 h-4 w-4" />
                      <span>Phân quyền</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {doctor.status === "active" ? (
                      <DropdownMenuItem>
                        <PauseCircle className="mr-2 h-4 w-4" />
                        <span>Tạm ngưng</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        <span>Kích hoạt</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-sm text-muted-foreground">
          Hiển thị 1-5 của 50 bác sĩ
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
              <PaginationEllipsis />
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
