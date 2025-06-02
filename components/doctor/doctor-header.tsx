'use client'
import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import http from "@/helper/axios";
import { handleApiError } from "@/helper/handle-error";

interface DoctorHeader {
  doctorId: string;
  doctorName: string;
  specialty: string;
  img?: string
}

export function DoctorHeader() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<DoctorHeader>({
    doctorId: "00000",
    doctorName: "A",
    specialty: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<DoctorHeader>("/doctor-helper/hearder");
        if (res) setData(res);
      } catch (err) {
        handleApiError(
          err,
          "Có lỗi xảy ra, vui lòng thử lại sau",
          "Lấy thông tin bác sĩ"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-teal-100">
          <AvatarImage
            src={data.img}
            alt={data.doctorName}
          />
          <AvatarFallback className="bg-teal-100 text-teal-700">
            {data.doctorName.split(" ").pop()?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold text-slate-800">{data.doctorName}</h2>
          <p className="text-sm text-slate-500">
            {data.specialty} - ID: {data.doctorId}
          </p>
        </div>
      </div>
    </div>
  );
}

