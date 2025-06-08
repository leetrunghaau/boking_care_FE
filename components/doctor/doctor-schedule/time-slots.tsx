"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import moment from "moment";
import "moment/locale/vi";
import http from "@/helper/axios";
import { AnyARecord } from "dns";
import { BookingDetailDialog } from "./booking-detail";

interface Props {
  selectedDate: Date;
}

export function TimeSlots({ selectedDate }: Props) {
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ available: 0, booked: 0 });
  const [loading, setLoading] = useState(false)
  const dialogRef = useRef<any>(null);

  const fetchTimeSlots = async () => {
    setLoading(true);
    try {
      const res = await http.get<any[]>(`/doctor-schedule/by-day/${selectedDate}`);
      setTimeSlots(res);
      console.log("Fetched time slots:", res);
      const available = res.filter(slot => slot.available && !slot.booked).length;
      const booked = res.filter(slot => slot.booked).length;
      setStats({ available, booked });
    } catch (error) {
      console.error("Lỗi khi tải timeslots:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, [selectedDate]);

  const toggleAvailability = async (item: any) => {
    try {
      await http.post(`/doctor-schedule/time-slots`, {
        date: moment(selectedDate).format("YYYY-MM-DD"),
        time: item.start,
        toggleOff: item.availableId,
      });
      await fetchTimeSlots();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái slot:", error);
    }
    console.log("Toggle availability for slot:", item);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-teal-600" />
            Lịch làm việc - {moment(selectedDate).locale("vi").format("[ngày] DD, [tháng] MM, [năm] YYYY")}
          </CardTitle>
        </div>
        <CardDescription>
          Nhấp vào ô giờ để bật/tắt trạng thái khả dụng
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              // disabled={slot.booked}
              onClick={() => {
                if (slot.booked) {
                  dialogRef.current?.openDialogWithBooking(slot.bookedId);
                } else {
                  toggleAvailability(slot);
                }
              }}
              className={cn(
                "relative py-3 px-2 text-sm rounded-md border transition-colors",
                // slot.booked && "cursor-not-allowed",
                !slot.available && !slot.booked && "bg-slate-50 border-slate-200 text-slate-400",
                slot.booked
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : slot.available && !slot.booked
                    ? "bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100"
                    : "hover:bg-slate-100"
              )}
            >
              <div className="flex items-center justify-center gap-1">
                <Clock3
                  className={cn(
                    "h-3.5 w-3.5",
                    slot.booked
                      ? "text-blue-600"
                      : slot.available
                        ? "text-teal-600"
                        : "text-slate-400"
                  )}
                />
                {slot.start}
              </div>

              {slot.booked && slot.patient && (
                <div className="mt-1 text-xs font-medium text-blue-700 border-t border-blue-200 pt-1">
                  {slot.patient}
                </div>
              )}

              {slot.booked && (
                <Badge className="absolute -top-2 -right-2 bg-blue-500">Đã đặt</Badge>
              )}
            </button>
          ))}
        </div>
        <BookingDetailDialog ref={dialogRef} />
      </CardContent>

      <CardFooter className="flex justify-between text-sm text-slate-500 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-teal-500" />
          <span>Khả dụng: {stats.available}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span>Đã đặt: {stats.booked}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <span>Không khả dụng</span>
        </div>
      </CardFooter>
    </Card>
  );
}
