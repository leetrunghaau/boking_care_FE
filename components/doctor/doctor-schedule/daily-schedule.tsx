"use client";

import http from "@/helper/axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";
import { TimeSlots } from "./time-slots";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils"; // <-- Bạn phải đảm bảo có utils này hoặc thay bằng className logic phù hợp
import { ScheduleInfoDisplay } from './schedule-info-display';

moment.locale("vi");

export function DailySchedule() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [listDates, setListDates] = useState<any[]>([]);


  const onDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    async function fetchInfo() {
      setLoading(true);
      try {
        const res = await http.get<string[]>(`/doctor-schedule/working-days`); // vi dụ: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
        const generatedDates = Array.from({ length: 7 }, (_, i) => {
          const mDate = moment().add(i, "days").locale("vi");
          const dayShort = mDate.format("ddd"); // ví dụ: "T2"
          return {
            date: mDate.toDate(),
            disabled: !res.includes(dayShort),
          };
        });

        setListDates(generatedDates);

        const firstAvailable = generatedDates.find(d => !d.disabled);
        if (firstAvailable) {
          setSelectedDate(firstAvailable.date);
        }

      } catch (error) {
        console.error("Failed to fetch time slots:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchInfo();
  }, []);



  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-teal-600" />
              Chọn ngày
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex overflow-x-auto pb-2 -mx-1">
              {listDates.map((iDay, index) => {
                const mDate = moment(iDay.date);
                return (
                  <button
                    disabled={iDay.disabled}
                    key={index}
                    onClick={() => onDateSelect(iDay.date)}
                    className={cn(
                      "flex flex-col items-center min-w-[4.5rem] mx-1 p-2 rounded-md border transition-colors",
                      moment(selectedDate).isSame(iDay.date, "day")
                        ? "bg-teal-50 border-teal-200 text-teal-700"
                        : "hover:bg-slate-50",
                      iDay.disabled
                        ? "border-slate-200 text-slate-400 cursor-not-allowed"
                        : "border-teal-200"
                    )}
                  >
                    <span className="text-xs font-medium">
                      {mDate.format("ddd")}
                    </span>
                    <span className="text-lg font-bold">
                      {mDate.format("DD")}
                    </span>
                    <span className="text-xs">{mDate.format("MM")}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <ScheduleInfoDisplay />
      </div>

      <div className="md:col-span-2">
        <TimeSlots
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}
