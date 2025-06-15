"use client";

// React core and hooks
import { useEffect, useRef, useState } from "react";

// Components
import { FilterTabs } from "@/components/doctor/doctor-appointments/filter-tabs";
import { AppointmentList } from "@/components/doctor/doctor-appointments/appointment-list";

// Utilities
import http from "@/helper/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, CalendarCheck, Clock, Filter, FolderClock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export const types = {
  thisDate: { label: "Hôm nay", icon: Calendar, color: "blue" },
  thisWeek: { label: "Tuần này", icon: CalendarCheck, color: "green" },
  history: { label: "Lịch sử", icon: FolderClock, color: "yellow" },
  all: { label: "Tất cả", icon: Clock, color: "teal" },
} as const;

const typeName = (key: keyof typeof types): string => {
  return types[key].label.toLowerCase();
}
export default function Appointments() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initParms = new URLSearchParams(searchParams.toString());
  const currTypeParam = initParms.get("currType");
  const currType = (currTypeParam && currTypeParam in types ? currTypeParam : "thisDate") as keyof typeof types;
  const [total , setTotal] = useState(0)
  const [filter, setFilter] = useState({
    search: initParms.get("search") ?? "",
    status: "all",
    currType: currType,
    page: Math.max(Number(initParms.get("page")) || 1, 1),
  });

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  const prevFilter = useRef(filter);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  function updateFilter(updates: Partial<typeof filter>) {
    const { page, ...rest } = updates;
    setFilter(prev => ({
      ...prev,
      ...rest,
      page: page ?? 1,
    }));
  }

  const loadData = async (fil: typeof filter) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (fil.search) params.set("search", fil.search);
      if (fil.status !== "all") params.set("status", fil.status);
      if (fil.currType) params.set("currType", fil.currType);
      if (fil.page) params.set("page", fil.page.toString());

      const newQuery = params.toString();
      if (newQuery !== searchParams.toString()) {
        router.push(`?${newQuery}`, { scroll: false });
      }

      const res = await http.get<any>(`/doctor-appointments?${params.toString()}`);
      if (res) {
        setAppointments(res.appointments);
        setTotal(res.total)
        
      }
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      loadData(filter);
    }, 500);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [filter.search]);

  useEffect(() => {
    loadData(filter);
  }, [filter.status, filter.currType, filter.page]);

  return (
    <div className="container mx-auto my-8 px-4 space-y-8">
      {/* Filter Tabs */}
      <section>
        <FilterTabs currentType={filter.currType} onTypeChange={updateFilter} />
      </section>

      {/* Title and Stats */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Lịch hẹn {typeName(filter.currType)}
        </h1>
        <div className="text-sm text-slate-500">
          {loading
            ? "Đang tải dữ liệu..."
            : `Hiển thị ${(filter.page - 1) * 5 + 1}-${Math.min(filter.page * 5, total)} của ${total} lịch hẹn`}
        </div>
        
      </section>

      {/* Search and Filter */}
      <section>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm kiếm theo tên bệnh nhân..."
              className="pl-9"
              value={filter.search}
              onChange={(e) => updateFilter({ search: e.target.value })}
            />
          </div>
          <div className="flex gap-3">
            <Select onValueChange={val => setFilter({ ...filter, status: val })} value={filter.status}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Trạng thái" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="completed">Đã hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
              </SelectContent>
            </Select>
           
          </div>
        </div>
      </section>

      {/* Appointment List */}
      <section>
        <AppointmentList
          appointments={appointments}
          currentType={filter.currType}
        />
      </section>
      <>
        <Pagination className="pt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={cn(
                  filter.page === 1 ? "cursor-not-allowed" : "cursor-pointer"
                )}
                onClick={() => {
                  if (filter.page > 1)
                    updateFilter({page : filter.page-1})
                }}
                isActive={filter.page === 1}
              />
            </PaginationItem>

            {Array.from(
              { length: Math.ceil(total / 9) },
              (_, i) => i + 1
            ).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  className={cn(
                    pageNum === filter.page ? "cursor-not-allowed" : "cursor-pointer"
                  )}
                  isActive={pageNum === filter.page}
                  onClick={() => updateFilter({ page: pageNum })}>
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                className={cn(
                  filter.page === Math.ceil(total / 9) ? "cursor-not-allowed" : "cursor-pointer"
                )}
                onClick={() => {
                  if (filter.page < Math.ceil(total / 9))
                    updateFilter({ page: filter.page + 1 })

                }}
                isActive={filter.page === Math.ceil(total / 9)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        </>
    </div>
  );
}
