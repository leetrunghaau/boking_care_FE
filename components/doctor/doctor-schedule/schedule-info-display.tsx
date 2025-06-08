"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, DollarSign, Coffee, Timer } from "lucide-react"
import http from "@/helper/axios"
import { handleApiError } from '@/helper/toast-utils';

interface WorkSchedule {
  workingDays: string[]
  defaultDuration: string
  defaultPrice: string
  workingHours: {
    start: string
    end: string
  }
  breakTime: {
    enabled: boolean
    start: string
    end: string
  }
}

export function ScheduleInfoDisplay() {
  const [workSchedule, setWorkSchedule] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const allDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]

  useEffect(() => {
  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const res = await http.get<any | null>(`/doctor-schedule/info`);
      console.log("Lịch làm việc", res);
      setWorkSchedule(res);
    } catch (err) {
      handleApiError(err, "Lấy thông tin lịch làm việc thất bại.");
    } finally {
      setLoading(false);
    }
  };

  fetchSchedule();
}, []);


  if (loading) {
    return <p className="text-sm text-slate-500">Đang tải lịch làm việc...</p>
  }

  if (error || !workSchedule) {
    return <p className="text-sm text-red-500">Lỗi: {error || "Không có dữ liệu"}</p>
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-teal-600" />
          Lịch làm việc hiện tại
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Working Days */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-600" />
            <span className="font-medium text-sm">Ngày làm việc trong tuần</span>
          </div>
          <div className="flex flex-wrap gap-2 ml-6">
            {allDays.map((day) => (
              <Badge
                key={day}
                variant={workSchedule.workingDays.includes(day) ? "default" : "outline"}
                className={workSchedule.workingDays.includes(day) ? "bg-teal-600 hover:bg-teal-700" : "text-slate-400"}
              >
                {day}
              </Badge>
            ))}
          </div>
        </div>

        {/* Working Hours */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-600" />
            <span className="font-medium text-sm">Giờ làm việc</span>
          </div>
          <div className="ml-6">
            <div className="inline-flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg">
              <span className="text-lg font-semibold text-teal-600">{workSchedule.workingHours.start}</span>
              <span className="text-slate-400">-</span>
              <span className="text-lg font-semibold text-teal-600">{workSchedule.workingHours.end}</span>
            </div>
          </div>
        </div>

        {/* Break Time */}
        {workSchedule.breakTime.enabled && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Coffee className="h-4 w-4 text-slate-600" />
              <span className="font-medium text-sm">Nghỉ trưa</span>
            </div>
            <div className="ml-6">
              <div className="inline-flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
                <span className="text-lg font-semibold text-orange-600">{workSchedule.breakTime.start}</span>
                <span className="text-slate-400">-</span>
                <span className="text-lg font-semibold text-orange-600">{workSchedule.breakTime.end}</span>
              </div>
            </div>
          </div>
        )}

        {/* Default Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-slate-600" />
              <span className="font-medium text-sm">Thời gian khám mặc định</span>
            </div>
            <div className="ml-6">
              <Badge variant="secondary" className="text-base px-3 py-1">
                {workSchedule.defaultDuration}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-slate-600" />
              <span className="font-medium text-sm">Giá khám mặc định</span>
            </div>
            <div className="ml-6">
              <Badge variant="secondary" className="text-base px-3 py-1 bg-green-50 text-green-700">
                {workSchedule.defaultPrice}
              </Badge>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-teal-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <Clock className="h-4 w-4 text-teal-600" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-teal-800">Tóm tắt lịch làm việc</p>
              <p className="text-sm text-teal-600">
                Làm việc {workSchedule.workingDays.length} ngày/tuần từ {workSchedule.workingHours.start} -{" "}
                {workSchedule.workingHours.end}
                {workSchedule.breakTime.enabled && (
                  <span>
                    , nghỉ trưa {workSchedule.breakTime.start} - {workSchedule.breakTime.end}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
