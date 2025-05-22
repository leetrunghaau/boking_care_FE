"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DoctorActivityChartProps {
  dateRange: "today" | "week" | "month";
}

export function DoctorActivityChart({ dateRange }: DoctorActivityChartProps) {
  const [chartType, setChartType] = useState<"appointments" | "revenue">(
    "appointments"
  );

  // Dữ liệu mẫu cho biểu đồ
  const chartData = {
    today: {
      appointments: [
        { time: "08:00", completed: 1, upcoming: 0, cancelled: 0 },
        { time: "09:00", completed: 1, upcoming: 0, cancelled: 0 },
        { time: "10:00", completed: 1, upcoming: 0, cancelled: 0 },
        { time: "11:00", completed: 0, upcoming: 1, cancelled: 0 },
        { time: "13:00", completed: 1, upcoming: 0, cancelled: 0 },
        { time: "14:00", completed: 1, upcoming: 0, cancelled: 0 },
        { time: "15:00", completed: 0, upcoming: 1, cancelled: 0 },
        { time: "16:00", completed: 0, upcoming: 1, cancelled: 0 },
      ],
      revenue: [
        { time: "08:00", amount: 300000 },
        { time: "09:00", amount: 300000 },
        { time: "10:00", amount: 500000 },
        { time: "11:00", amount: 0 },
        { time: "13:00", amount: 300000 },
        { time: "14:00", amount: 500000 },
        { time: "15:00", amount: 0 },
        { time: "16:00", amount: 0 },
      ],
    },
    week: {
      appointments: [
        { time: "T2", completed: 7, upcoming: 1, cancelled: 0 },
        { time: "T3", completed: 6, upcoming: 2, cancelled: 0 },
        { time: "T4", completed: 8, upcoming: 0, cancelled: 1 },
        { time: "T5", completed: 5, upcoming: 2, cancelled: 0 },
        { time: "T6", completed: 7, upcoming: 1, cancelled: 1 },
        { time: "T7", completed: 2, upcoming: 0, cancelled: 0 },
        { time: "CN", completed: 0, upcoming: 1, cancelled: 0 },
      ],
      revenue: [
        { time: "T2", amount: 2100000 },
        { time: "T3", amount: 1800000 },
        { time: "T4", amount: 2400000 },
        { time: "T5", amount: 1500000 },
        { time: "T6", amount: 2100000 },
        { time: "T7", amount: 600000 },
        { time: "CN", amount: 0 },
      ],
    },
    month: {
      appointments: [
        { time: "Tuần 1", completed: 25, upcoming: 5, cancelled: 2 },
        { time: "Tuần 2", completed: 28, upcoming: 3, cancelled: 1 },
        { time: "Tuần 3", completed: 30, upcoming: 2, cancelled: 3 },
        { time: "Tuần 4", completed: 22, upcoming: 5, cancelled: 2 },
      ],
      revenue: [
        { time: "Tuần 1", amount: 7500000 },
        { time: "Tuần 2", amount: 8400000 },
        { time: "Tuần 3", amount: 9000000 },
        { time: "Tuần 4", amount: 6600000 },
      ],
    },
  };

  const currentData = chartData[dateRange][chartType];

  useEffect(() => {
    console.log("Current Data:", chartData[dateRange][chartType]);
  }, []);
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select
          value={chartType}
          onValueChange={(value) =>
            setChartType(value as "appointments" | "revenue")
          }>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Loại biểu đồ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="appointments">Lịch hẹn</SelectItem>
            <SelectItem value="revenue">Doanh thu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[300px] w-full">
        {chartType === "appointments" ? (
          <div className="h-full flex items-end">
            <div className="flex-1 h-full flex items-end">
              {currentData.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full px-1 space-y-1 flex flex-col items-center justify-end">
                    {item.cancelled > 0 && (
                      <div
                        className="w-full bg-red-400 rounded-t-sm"
                        style={{ height: `${item.cancelled * 20}px` }}></div>
                    )}
                    {item.upcoming > 0 && (
                      <div
                        className="w-full bg-blue-400 rounded-t-sm"
                        style={{ height: `${item.upcoming * 20}px` }}></div>
                    )}
                    {item.completed > 0 && (
                      <div
                        className="w-full bg-green-400 rounded-t-sm"
                        style={{ height: `${item.completed * 20}px` }}></div>
                    )}
                  </div>
                  <div className="mt-2 text-xs font-medium">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-end">
            <div className="flex-1 h-full flex items-end">
              {currentData.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className="w-full px-1 bg-teal-400 rounded-t-sm"
                    style={{
                      height: `${(item.amount / 1000000) * 100}px`,
                    }}></div>
                  <div className="mt-2 text-xs font-medium">{item.time}</div>
                  <div className="text-xs text-slate-500">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      maximumFractionDigits: 0,
                    }).format(item.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {chartType === "appointments" && (
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm">Đã hoàn thành</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-sm">Sắp tới</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-sm">Đã hủy</span>
          </div>
        </div>
      )}
    </div>
  );
}
