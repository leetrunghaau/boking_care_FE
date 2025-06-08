"use client";
import AddDoctor from "@/components/admin/admin-doctor/new/add-new-doctor";
import DoctorDetailDialog from "@/components/admin/admin-doctors/doctor-dialog";
import ConfirmDeleteModal, {
  ConfirmDeleteModalHandle,
} from "@/components/share/confirm-delete-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import http from "@/helper/axios";
import { getIconByName } from "@/helper/icon-map";
import {
  handleApiError,
  handleApiSuccess,
  handleErorr,
} from "@/helper/toast-utils";
import { getFullURL } from "@/helper/url";
import { Briefcase, Edit, Eye, Search, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AdminDoctorsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initParms = new URLSearchParams(searchParams.toString());
  const [search, setSearch] = useState(initParms.get("search") ?? "");
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [specialtySelected, setSpecialtySelected] = useState(
    initParms.get("specialty") ?? "all"
  );
  const [hospitals, setHospials] = useState<any[]>([]);
  const [hospitalSelected, setHopialSelected] = useState(
    initParms.get("hospital") ?? "all"
  );
  const [page, setPage] = useState(
    Math.max(Number(initParms.get("page")) || 1, 1)
  );
  const [total, setTotal] = useState(1);
  const [loadingDoctor, setLoadingDoctor] = useState(false);
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const loadDoctor = async (searchInput?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const setIfExists = (key: string, value: any) => {
      if ((key === "specialty" || key === "hospital") && value === "all") {
        params.delete(key);
      } else {
        value ? params.set(key, value.toString()) : params.delete(key);
      }
    };
    setIfExists("page", page);
    if (searchInput) {
      setIfExists("search", searchInput);
    } else {
      setIfExists("search", search);
    }
    setIfExists("specialty", specialtySelected);
    setIfExists("hospital", hospitalSelected);
    router.push(`?${params.toString()}`);
    const queryString = params.toString();
    setLoadingDoctor(true);
    try {
      const rs = await http.get<any | null>(
        `/admin-doctor/doctors${queryString ? `?${queryString}` : ""}`
      );
      console.log("doctor", rs);
      if (rs) {
        setDoctors(rs.doctos);
        setTotal(rs.total);
      }
    } catch (err) {
      console.log(err);
      handleErorr();
    } finally {
      setLoadingDoctor(false);
    }
  };

  useEffect(() => {
    const loadBase = async () => {
      try {
        const base = await http.get<any | null>("/admin-doctor/base");
        console.log("base", base);
        if (base) {
          setSpecialties(base.specialties);
          setHospials(base.hospitals);
        }
      } catch (err) {
      } finally {
      }
    };
    loadBase();
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, []);
  useEffect(() => {
    loadDoctor();
  }, [specialtySelected, hospitalSelected, page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      loadDoctor(val);
    }, 1000);
  };

  const modalRef = useRef<ConfirmDeleteModalHandle>(null);

  const deleteDoctor = async (id: number) => {
    setLoadingDoctor(true);
    try {
      const rs = await http.delete<any | null>(`/admin-doctor/doctors/${id}`);
      if (rs) {
        handleApiSuccess("Đã xóa bác sĩ thành công");
        setDoctors((prevItems) => prevItems.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.log(err);
      handleApiError(err, "Xóa bác sĩ thất bại");
    } finally {
      setLoadingDoctor(false);
    }
  };
  const handleDelete = (item: any) => {
    modalRef.current?.open({
      title: "Xác nhận xóa ",
      description: `Bạn có chắc chắn muốn xóa bác sĩ ${item.name} không?`,
      onConfirm: () => deleteDoctor(item.id),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý bác sĩ</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              placeholder="Tìm kiếm theo tên"
              className="pl-10"
              value={search}
              onChange={(e) => {
                handleSearch(e);
                setPage(1);
              }}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <Select
            value={specialtySelected}
            onValueChange={(value) => {
              setSpecialtySelected(value);
              setPage(1);
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Chuyên khoa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-3">
                  <div>
                    <Briefcase className="w-5 h-5 text-teal-600" />
                  </div>
                  Tất cả chuyên khoa
                </div>
              </SelectItem>
              {specialties?.map((i: any) => {
                const Icon = getIconByName(i.icon);
                return (
                  <SelectItem value={String(i.id)} key={i.id}>
                    <div className="flex items-center gap-3">
                      <div>
                        <Icon className="w-5 h-5 text-teal-600" />
                      </div>
                      {i.name}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select
            value={hospitalSelected}
            onValueChange={(value) => {
              setHopialSelected(value);
              setPage(1);
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Cơ sở y tế" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả cơ y tế</SelectItem>
              {hospitals?.map((i: any) => (
                <SelectItem value={String(i.id)} key={i.id}>
                  {i.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end ">
        <AddDoctor />
        {/* <Button className="bg-teal-600 hover:bg-teal-700">Thêm bác sĩ</Button> */}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Bác sĩ</TableHead>
              <TableHead>Chuyên khoa</TableHead>
              <TableHead>Điện thoại</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Nơi công tác</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingDoctor ? (
              <>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                </TableRow>
              </>
            ) : (
              doctors?.map((doctor) => {
                const Icon = getIconByName(doctor.specialtyIcon);
                return (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={getFullURL(doctor.img) || "/placeholder.svg"}
                            alt={doctor.name}
                          />
                          <AvatarFallback>
                            {doctor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{doctor.name}</p>
                          <p className="text-sm text-gray-500">{doctor.code}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <Icon className="w-5 h-5 text-teal-600" />
                        </div>

                        {doctor.specialty}
                      </div>
                    </TableCell>
                    <TableCell>{doctor.phone}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.hospital}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          onClick={() => {
                            setSlug(doctor.slug);
                            setOpen(true);
                          }}
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-teal-600">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Xem hồ sơ</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-amber-600">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Chỉnh sửa</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => {
                            handleDelete(doctor);
                          }}>
                          <XCircle className="h-4 w-4" />
                          <span className="sr-only">Xoá</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="text-sm text-muted-foreground">
            Hiển thị {(page - 1) * 5 + 1}-{Math.min(page * 5, total)} của{" "}
            {total} bác sĩ
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(page - 1)}
                  isActive={page === 1}
                />
              </PaginationItem>

              {Array.from(
                { length: Math.ceil(total / 5) },
                (_, i) => i + 1
              ).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === page}
                    onClick={() => setPage(pageNum)}>
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
        <ConfirmDeleteModal ref={modalRef} />

        <DoctorDetailDialog
          open={open}
          onClose={() => {
            setOpen(false);
            setSlug(null);
          }}
          slug={slug}
        />
      </div>
    </div>
  );
}
