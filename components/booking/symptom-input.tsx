"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import http from "@/helper/axios";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import BookingStore from "@/store/booking";

interface Pops {
    stepClick: (step: boolean) => void
}
export default function SymptomInput({ stepClick }: Pops) {
    const [symptomList, setSymptomList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { symptoms, setBooking, isLoaded } = BookingStore();
    const [symptom, setSymptom] = useState<string>('');

    useEffect(() => {
        const fetchSpecialties = async () => {
            setLoading(true);
            try {
                const rs = await http.get<any | null>(`/booking/symptoms`);
                if (rs) {
                    setSymptomList(rs);
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

        fetchSpecialties();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setSymptom(symptoms); 
        }
    }, [isLoaded, symptoms]);

    const handleAddDisease = (disease: string) => {
        const normalized = symptom
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

        if (normalized.includes(disease)) return;
        const newSymptom = [...normalized, disease].join(", ");
        setSymptom(newSymptom);
        setSymptomList((prev) => prev.filter((item) => item !== disease));
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
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
            />


            {/* Triệu chứng phổ biến */}
            <div className="md:max-w-[600px] lg:max-w-[900px] mx-auto">
                <h3 className="text-lg font-semibold mb-3">Triệu chứng phổ biến</h3>
                <div className="flex flex-wrap gap-2">
                    {symptomList?.slice(0, 12).map((item: string, i: number) => (
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
                    onClick={() => {
                        setBooking({ symptoms: symptom })
                        stepClick(true)
                    }}
                    className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"

                >
                    Tiếp tục
                </button>
            </div>
        </div>
    );
}
