"use client";
import { useState, useEffect } from "react";
import http from "@/helper/axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface Specialty {
  id: string;
  name: string;
  slug: string;
  doctorsCount: number;
  diseasesCount: number;
  status: "active" | "pending" | "inactive";
  updatedAt: string;
}

export default function SpecialtiesPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllFacilities = async () => {
      try {
        const res = await http.get<Specialty[]>(`/admin-specialties`);
        setSpecialties(res);
        console.log("Fetched specialties:", res);
      } catch (err) {
        console.error("Failed to fetch specialties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFacilities();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý chuyên khoa</h1>
        <Button asChild>
          <Link href="/admin/specialties/new">
            <Plus className="mr-2 h-4 w-4" />
            Thêm chuyên khoa mới
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách chuyên khoa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm..."
                className="w-full pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Lọc
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên chuyên khoa</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Số bác sĩ</TableHead>
                <TableHead>Số bệnh lý</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Cập nhật</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specialties.map((specialty) => (
                <TableRow key={specialty.id}>
                  <TableCell className="font-medium">
                    {specialty.name}
                  </TableCell>
                  <TableCell>{specialty.slug}</TableCell>
                  <TableCell>{specialty.doctorsCount}</TableCell>
                  <TableCell>{specialty.diseasesCount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        specialty.status === "active"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : specialty.status === "pending"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                      {specialty.status === "active"
                        ? "Hoạt động"
                        : specialty.status === "pending"
                        ? "Đang xét duyệt"
                        : "Tạm ngưng"}
                    </span>
                  </TableCell>
                  <TableCell>{specialty.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/specialties/${specialty.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Xem</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/specialties/${specialty.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Sửa</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Xóa</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
