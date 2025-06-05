"use client";

// React core and hooks
import { useEffect, useState } from "react";

// Components
import { FilterTabs } from "@/components/doctor/doctor-appointments/filter-tabs";
import { SearchFilters } from "@/components/doctor/doctor-appointments/search-filters";
import { AppointmentList } from "@/components/doctor/doctor-appointments/appointment-list";

// Utilities
import http from "@/helper/axios";

export default function Appointments() {
  // Appointment types and states
  const appointmentTypes = ["Hôm nay", "Tuần này", "Lịch sử", "Tất cả"];
  const [currType, setCurrType] = useState(appointmentTypes[0]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Mapping type to endpoint
  const endpointMap: Record<string, string> = {
    "Hôm nay": "/doctor-appointments/by-day",
    "Tuần này": "/doctor-appointments/by-week",
    "Lịch sử": "/doctor-appointments/by-history",
    "Tất cả": "/doctor-appointments/by-all",
  };

  // Fetch data based on selected type
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const endpoint = endpointMap[currType];
        const res = await http.get<any[]>(endpoint);
        setAppointments(res);
        console.log("Fetched appointments:", res);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currType]);

  // Filter appointments by search and status
  const finalAppointments = appointments.filter((appointment) => {
    const patientName = appointment?.patientName ?? "";
    const matchSearch = patientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="container mx-auto my-8 px-4 space-y-8">
      {/* Filter Tabs */}
      <section>
        <FilterTabs currentType={currType} onTypeChange={setCurrType} />
      </section>

      {/* Title and Stats */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Lịch hẹn {currType.toLowerCase()}
        </h1>
        <div className="text-sm text-slate-500">
          {loading
            ? "Đang tải dữ liệu..."
            : `Hiển thị ${finalAppointments.length} lịch hẹn`}
        </div>
      </section>

      {/* Search and Filter */}
      <section>
        <SearchFilters
          onSearch={setSearchQuery}
          onStatusFilter={setStatusFilter}
        />
      </section>

      {/* Appointment List */}
      <section>
        <AppointmentList
          appointments={finalAppointments}
          filterType={currType}
        />
      </section>
    </div>
  );
}
