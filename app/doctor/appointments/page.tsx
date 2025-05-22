"use client";
// React core and hooks
import { useEffect, useState } from "react";

// Date utils
import { isToday, isThisWeek, isBefore, isAfter, parseISO } from "date-fns";

// Components
import { AppointmentData } from "@/components/doctor/doctor-appointments/appointment-card";
import { FilterTabs } from "@/components/doctor/doctor-appointments/filter-tabs";
import { SearchFilters } from "@/components/doctor/doctor-appointments/search-filters";
import { AppointmentList } from "@/components/doctor/doctor-appointments/appointment-list";

// Utilities
import http from "@/helper/axios";

export default function Appointments() {
  //State
  const appointmentTypes = ["Hôm nay", "Tuần này", "Lịch sử", "Tương lai"];
  const [currType, setCurrType] = useState(appointmentTypes[0]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    AppointmentData[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(false);

  //Effect
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await http.get<AppointmentData[]>(
          `/doctor-appointment/appointments`
        );
        setAppointments(res);
        console.log("Fetched Appointments:", res);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (!appointments.length) return;

    let filtered = [...appointments];

    // Lọc theo loại lịch hẹn
    filtered = filtered.filter((appointment) => {
      const appointmentDate = parseISO(appointment.date);
      console.log("Appointment Date:", appointment);
      switch (currType) {
        case "Hôm nay":
          return isToday(appointmentDate);
        case "Tuần này":
          return isThisWeek(appointmentDate);
        case "Lịch sử":
          return (
            isBefore(appointmentDate, new Date()) && !isToday(appointmentDate)
          );
        case "Tương lai":
          return (
            isAfter(appointmentDate, new Date()) && !isToday(appointmentDate)
          );
        default:
          return true;
      }
    });

    // Lọc theo tìm kiếm
    if (searchQuery) {
      filtered = filtered.filter((appointment) =>
        appointment.patientName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    // Lọc theo trạng thái
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.status === statusFilter
      );
    }

    setFilteredAppointments(filtered);
  }, [appointments, currType, searchQuery, statusFilter]);

  //Handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  return (
    <div className="container mx-auto my-8 px-4 space-y-8">
      {/* Tabs lọc */}
      <section>
        <FilterTabs currentType={currType} onTypeChange={setCurrType} />
      </section>

      {/* Tiêu đề */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Lịch hẹn {currType.toLowerCase()}
        </h1>
        <div className="text-sm text-slate-500">
          Hiển thị {filteredAppointments.length} lịch hẹn
        </div>
      </section>

      {/* Tìm kiếm và lọc */}
      <section>
        <SearchFilters
          onSearch={handleSearch}
          onStatusFilter={handleStatusFilter}
        />
      </section>

      {/* Danh sách lịch hẹn */}
      <section>
        <AppointmentList
          appointments={filteredAppointments}
          filterType={currType}
        />
      </section>
    </div>
  );
}
