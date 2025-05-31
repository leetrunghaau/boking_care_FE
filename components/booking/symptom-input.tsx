"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import http from "@/helper/axios";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useSearchParams } from "next/navigation";
import { handleApiError } from "@/helper/handle-error";

export default function SymptomInput() {
  const searchParams = useSearchParams();
  const symptomsQuery = searchParams.get("symptoms");
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // local state
  const [userInput, setUserInput] = useState<string>(
    symptomsQuery?.toString() ?? ""
  );

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
        handleApiError(
          err,
          "Có lỗi xảy ra, vui lòng thử lại sau",
          "Lấy thông tin triệu chứng thất bại"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddDisease = (disease: string) => {
    const normalized = (userInput || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (normalized.includes(disease)) return;

    const newSymptom = [...normalized, disease].join(", ");

    setSymptoms((prev) => prev.filter((item) => item !== disease));
    setUserInput(newSymptom);
  };

  const handleNextStep = () => {
    const queryParams = new URLSearchParams();
    if (userInput?.trim()) {
      queryParams.set("symptoms", userInput.trim());
    }
    queryParams.set("curStep", "1");

    const queryString = queryParams.toString();
    router.push(`/dat-lich-kham${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bạn đang cảm thấy không khỏe ở đâu?
        </h2>
        <p className="text-gray-600">
          Hãy chọn triệu chứng hoặc chuyên khoa phù hợp để được tư vấn chính xác
          nhất.
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
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
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
              onClick={() => handleAddDisease(item)}>
              {item}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end md:max-w-[600px] lg:max-w-[900px] mx-auto pb-10">
        <button
          onClick={handleNextStep}
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed">
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
