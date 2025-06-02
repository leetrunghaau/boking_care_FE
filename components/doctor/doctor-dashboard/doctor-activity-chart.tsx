"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



export function DoctorActivityChart() {
  

  // Dữ liệu mẫu cho biểu đồ
  const chartData =  [
        { time: "T2", completed: 7, upcoming: 1, cancelled: 0 },
        { time: "T3", completed: 6, upcoming: 2, cancelled: 0 },
        { time: "T4", completed: 8, upcoming: 0, cancelled: 1 },
        { time: "T5", completed: 5, upcoming: 2, cancelled: 0 },
        { time: "T6", completed: 7, upcoming: 1, cancelled: 1 },
        { time: "T7", completed: 2, upcoming: 0, cancelled: 0 },
        { time: "CN", completed: 0, upcoming: 1, cancelled: 0 },
      ]

  const currentData = chartData;

  useEffect(() => {
    console.log("Current Data:",currentData);
  }, []);
  return (
    <div className="space-y-4">
      <div className="h-[300px] w-full">
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
       
      </div>

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
    </div>
  );
}
