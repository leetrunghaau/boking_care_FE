"use client";
import HealthFacilityDetailDialog from "@/components/admin/admin-specialties/hospital-dialog";
import ConfirmDeleteModal, {
  ConfirmDeleteModalHandle,
} from "@/components/share/confirm-delete-modal";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import http from "@/helper/axios";
import { handleApiSuccess, handleErorr } from "@/helper/toast-utils";
import { getFullURL } from "@/helper/url";
import { cn } from "@/lib/utils";
import { Edit, Eye, Search, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AdminHospitalPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initParms = new URLSearchParams(searchParams.toString());

  const [search, setSearch] = useState(initParms.get("search") ?? "");
  const [page, setPage] = useState(
    Math.max(Number(initParms.get("page")) || 1, 1)
  );
  const [total, setTotal] = useState(1);
  const [loadingHospital, setLoadingHospital] = useState(false);
  const modalRef = useRef<ConfirmDeleteModalHandle>(null);
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  const [hospitals, setHospitals] = useState<any[]>([]);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const loadHospital = async (searchInput?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const setIfExists = (key: string, value: any) => {
      value ? params.set(key, value.toString()) : params.delete(key);
    };
    setIfExists("page", page);
    if (searchInput) {
      setIfExists("search", searchInput);
    } else {
      setIfExists("search", search);
    }
    router.push(`?${params.toString()}`);
    const queryString = params.toString();

    setLoadingHospital(true);
    try {
      const rs = await http.get<any | null>(
        `/admin-hospital/hospitals${queryString ? `?${queryString}` : ""}`
      );
      console.log("Hospital", rs);
      if (rs) {
        setHospitals(rs.hospitals);
        setTotal(rs.total);
      }
    } catch (err) {
      console.log(err);
      handleErorr();
    } finally {
      setLoadingHospital(false);
    }
  };

  const deleteHospital = async (id: number) => {
    setLoadingHospital(true);
    try {
      const rs = await http.delete<any | null>(
        `/admin-hospital/hospital/${id}`
      );
      if (rs) {
        handleApiSuccess("Đã xóa cơ sở y tế thành công");
        setHospitals((prevItems) => prevItems.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.log(err);
      handleErorr();
    } finally {
      setLoadingHospital(false);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, []);
  useEffect(() => {
    loadHospital();
  }, [page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      loadHospital(val);
    }, 1000);
  };

  const handleDelete = (item: any) => {
    modalRef.current?.open({
      title: "Xác nhận xóa ",
      description: `Bạn có chắc chắn muốn xóa bệnh viện ${item.name} không?`,
      onConfirm: () => deleteHospital(item.id),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Quản lý cơ sở y tế
        </h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex gap-4 flex-wrap">
          <div className="relative grow">
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
          <Link href={"/admin/facilities/new"}>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Thêm cơ sở y tế
            </Button>
          </Link>
        </div>


      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Cơ sở y tế</TableHead>
              <TableHead>Diện thoại</TableHead>
              <TableHead>Dịa chỉ</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingHospital ? (
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
                </TableRow>
              </>
            ) : (
              hospitals?.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-20 overflow-hidden rounded-md flex-shrink-0">
                        <img
                          src={getFullURL(hospital.img) || "/placeholder.svg"}
                          alt={hospital.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{hospital.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{hospital.phone}</TableCell>
                  <TableCell>{hospital.address}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        onClick={() => {
                          setSlug(hospital.slug);
                          setOpen(true);
                        }}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-teal-600">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Xem hồ sơ</span>
                      </Button>
                      <Button
                        onClick={() => {
                          router.push(`/admin/facilities/${hospital.id}/edit`);
                        }}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-amber-600">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Chỉnh sửa</span>
                      </Button>
                      <Button
                        onClick={() => {
                          handleDelete(hospital);
                        }}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-destructive">
                        <XCircle className="h-4 w-4" />
                        <span className="sr-only">Xóa</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="text-sm text-muted-foreground">
            Hiển thị {(page - 1) * 5 + 1}-{Math.min(page * 5, total)} của{" "}
            {total} cơ sở y tế
          </div>
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
                { length: Math.ceil(total / 5) },
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
                    page === Math.ceil(total / 5) ? "cursor-not-allowed" : "cursor-pointer"
                  )}
                  onClick={() => {
                    if (page < Math.ceil(total / 5))
                      setPage(page + 1)

                  }}
                  isActive={page === Math.ceil(total / 5)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <ConfirmDeleteModal ref={modalRef} />
        <HealthFacilityDetailDialog
          slug={slug}
          open={open}
          onClose={() => {
            setOpen(false);
            setSlug(null);
          }}
        />
      </div>
    </div>
  );
}
