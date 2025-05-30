"use client";

import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import http from "@/helper/axios";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useBookingStore } from "@/store/booking";
import { BookingInfo } from "@/types/booking";

interface Props {
  stepClick: (step: boolean) => void;
}

export default function SymptomInput({ stepClick }: Props) {
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // store
  const { hasHydrated, bookingInfo, setBooking: setBookingStore } = useBookingStore();

  // local state
  const [booking, setBooking] = useState<BookingInfo>({
    currStep: 0,
    symptoms: "",
    doctorId: null,
    date: null,
    time: null,
    name: "",
    phone: "",
    email: "",
    dob: new Date(),
    gender: "",
    address: "",
    allergies: "",
    medicalHistory: "",
  });

  // ref để giữ dữ liệu booking mới nhất
  const latestBooking = useRef<BookingInfo>(booking);

  // cập nhật ref mỗi khi booking thay đổi
  useEffect(() => {
    latestBooking.current = booking;
  }, [booking]);

  // fetch data khi mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const rs = await http.get<any | null>(`/booking/symptoms`);
        if (rs) {
          setSymptoms(rs);
        }
      } catch (err) {
        const e = err as Error;
        toast({
          title: "Lỗi API",
          description: e.message || "Đã có lỗi xảy ra",
          variant: "error",
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setBookingStore({symptoms:latestBooking.current.symptoms});
    };
  }, []);

  // đồng bộ dữ liệu từ store vào local khi đã hydrate
  useEffect(() => {
    if (hasHydrated) {
      setBooking({ ...bookingInfo, currStep: 0 }); // đảm bảo currStep = 0
    }
  }, [hasHydrated]);

  const handleAddDisease = (disease: string) => {
    const normalized = (booking.symptoms || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (normalized.includes(disease)) return;

    const newSymptom = [...normalized, disease].join(", ");

    setBooking((prev) => ({
      ...prev,
      symptoms: newSymptom,
    }));

    setSymptoms((prev) => prev.filter((item) => item !== disease));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bạn đang cảm thấy không khỏe ở đâu?
        </h2>
        <p className="text-gray-600">
          Hãy chọn triệu chứng hoặc chuyên khoa phù hợp để được tư vấn chính xác nhất.
        </p>
      </div>

      {/* Nhập triệu chứng */}
      <Textarea
        placeholder="Mô tả triệu chứng bạn đang gặp phải..."
        className={cn(
          "min-h-[120px] text-base pl-10 resize-none",
          "border-teal-200 focus-visible:ring-teal-500 transition-all duration-300",
          "md:max-w-[600px] lg:max-w-[900px] mx-auto"
        )}
        value={booking.symptoms}
        onChange={(e) =>
          setBooking((prev) => ({
            ...prev,
            symptoms: e.target.value,
          }))
        }
      />

      {/* Triệu chứng phổ biến */}
      <div className="md:max-w-[600px] lg:max-w-[900px] mx-auto">
        <h3 className="text-lg font-semibold mb-3">Triệu chứng phổ biến</h3>
        <div className="flex flex-wrap gap-2">
          {symptoms?.slice(0, 12).map((item: string, i: number) => (
            <Badge
              key={i}
              variant="outline"
              className={cn(
                "cursor-pointer bg-teal-50 hover:bg-teal-600 text-teal-600 hover:text-teal-50"
              )}
              onClick={() => handleAddDisease(item)}
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end md:max-w-[600px] lg:max-w-[900px] mx-auto">
        <button
          onClick={() => stepClick(true)}
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
