"use client"

import { useEffect, useState } from "react"
import { isToday, isThisWeek, isBefore, isAfter, parseISO } from "date-fns"
import { AppointmentData } from "@/components/doctor/doctor-appointments/appointment-card"
import { FilterTabs } from "@/components/doctor/doctor-appointments/filter-tabs"
import { SearchFilters } from "@/components/doctor/doctor-appointments/search-filters"
import { AppointmentList } from "@/components/doctor/doctor-appointments/appointment-list"

// Dữ liệu mẫu cho lịch hẹn
const sampleAppointments: AppointmentData[] = [
  {
    id: "1",
    patientName: "Nguyễn Văn A",
    patientPhone: "0987654321",
    date: new Date().toISOString(),
    time: "09:00",
    duration: 30,
    price: 300000,
    status: "confirmed",
    symptoms: "Đau đầu, sốt nhẹ, mệt mỏi kéo dài 2 ngày",
    address: "Phòng khám số 3, Tầng 2, Tòa nhà Y",
  },
  {
    id: "2",
    patientName: "Trần Thị B",
    patientPhone: "0912345678",
    date: new Date().toISOString(),
    time: "10:30",
    duration: 45,
    price: 450000,
    status: "pending",
    symptoms: "Đau bụng, buồn nôn",
    isOnline: true,
  },
  {
    id: "3",
    patientName: "Lê Văn C",
    patientAvatar: "/placeholder.svg?height=48&width=48&text=LVC",
    patientPhone: "0909123456",
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    time: "14:00",
    duration: 30,
    price: 300000,
    status: "confirmed",
    address: "Phòng khám số 3, Tầng 2, Tòa nhà Y",
  },
  {
    id: "4",
    patientName: "Phạm Thị D",
    patientPhone: "0978123456",
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    time: "15:30",
    duration: 60,
    price: 500000,
    status: "completed",
    symptoms: "Khám sức khỏe định kỳ",
    address: "Phòng khám số 3, Tầng 2, Tòa nhà Y",
  },
  {
    id: "5",
    patientName: "Hoàng Văn E",
    patientPhone: "0918765432",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    time: "08:00",
    duration: 30,
    price: 300000,
    status: "cancelled",
    symptoms: "Ho, sốt cao",
    isOnline: true,
  },
  {
    id: "6",
    patientName: "Vũ Thị F",
    patientPhone: "0965432109",
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    time: "11:00",
    duration: 45,
    price: 450000,
    status: "confirmed",
    address: "Phòng khám số 3, Tầng 2, Tòa nhà Y",
  },
]

const appointmentTypes = ["Hôm nay", "Tuần này", "Lịch sử", "Tương lai"]

export default function Appointments() {
  const [currType, setCurrType] = useState(appointmentTypes[0])
  const [appointments, setAppointments] = useState<AppointmentData[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Giả lập gọi API để lấy dữ liệu
  useEffect(() => {
    // Trong thực tế, đây sẽ là một API call
    const fetchAppointments = () => {
      // Giả lập delay của API
      setTimeout(() => {
        setAppointments(sampleAppointments)
      }, 300)
    }

    fetchAppointments()
  }, [])

  // Lọc lịch hẹn dựa trên loại đã chọn
  useEffect(() => {
    if (!appointments.length) return

    let filtered = [...appointments]

    // Lọc theo loại lịch hẹn
    filtered = filtered.filter((appointment) => {
      const appointmentDate = parseISO(appointment.date)

      switch (currType) {
        case "Hôm nay":
          return isToday(appointmentDate)
        case "Tuần này":
          return isThisWeek(appointmentDate)
        case "Lịch sử":
          return isBefore(appointmentDate, new Date()) && !isToday(appointmentDate)
        case "Tương lai":
          return isAfter(appointmentDate, new Date()) && !isToday(appointmentDate)
        default:
          return true
      }
    })

    // Lọc theo tìm kiếm
    if (searchQuery) {
      filtered = filtered.filter((appointment) =>
        appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Lọc theo trạng thái
    if (statusFilter !== "all") {
      filtered = filtered.filter((appointment) => appointment.status === statusFilter)
    }

    setFilteredAppointments(filtered)
  }, [appointments, currType, searchQuery, statusFilter])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
  }

  return (
    <div className="container mx-auto my-8 px-4 space-y-8">
      {/* Tabs lọc */}
      <section>
        <FilterTabs currentType={currType} onTypeChange={setCurrType} />
      </section>

      {/* Tiêu đề */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Lịch hẹn {currType.toLowerCase()}</h1>
        <div className="text-sm text-slate-500">Hiển thị {filteredAppointments.length} lịch hẹn</div>
      </section>

      {/* Tìm kiếm và lọc */}
      <section>
        <SearchFilters onSearch={handleSearch} onStatusFilter={handleStatusFilter} />
      </section>

      {/* Danh sách lịch hẹn */}
      <section>
        <AppointmentList appointments={filteredAppointments} filterType={currType} />
      </section>
    </div>
  )
}
