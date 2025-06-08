"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import http from "@/helper/axios";
import { handleApiError } from "@/helper/toast-utils";
import { getFullURL } from '@/helper/url';



export function DoctorHeader() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<any | null>("/doctor-helper/header");
        if (res) {
          setData(res);
        }
      } catch (err) {
        handleApiError(err, "Lấy thông tin bác sĩ thất bại");
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
          {data?.img ? (
            <AvatarImage src={getFullURL(data?.img) || "/placeholder.svg"} alt={data?.doctorName} />
          ) : (
            <AvatarFallback className="bg-teal-100 text-teal-700">
              {data?.doctorName ? data?.doctorName.charAt(0).toUpperCase() :"?"}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="text-xl font-bold text-slate-800">{data?.doctorName}</h2>
          <p className="text-sm text-slate-500">
            {data?.specialty} - ID: {data?.doctorId}
          </p>
        </div>
      </div>
    </div>
  );
}
