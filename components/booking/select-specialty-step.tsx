"use client"
import { Baby, Bone, Brain, ChevronRight, Eye, Heart, Stethoscope } from "lucide-react"
import SpecialtyCard from '@/components/specialties/SpecialtyCard';
import { Card } from "../ui/card";
import { CardContent } from '@/components/ui/card';
import Link from "next/link";
import { useState } from "react";

const specialties = [
    {
        name: "Thần kinh",
        slug: "than-kinh",
        description: "Chẩn đoán & điều trị các bệnh về hệ thần kinh",
        icon: <Brain className="h-10 w-10 text-teal-600" />,
    },
    {
        name: "Tim mạch",
        slug: "tim-mach",
        description: "Theo dõi, điều trị bệnh lý tim, huyết áp, mạch máu",
        icon: <Heart className="h-10 w-10 text-teal-600" />,
    },
    {
        name: "Mắt",
        slug: "mat",
        description: "Kiểm tra thị lực, đục thủy tinh thể, cận viễn loạn",
        icon: <Eye className="h-10 w-10 text-teal-600" />,
    },
    {
        name: "Cơ xương khớp",
        slug: "co-xuong-khop",
        description: "Đau lưng, khớp gối, loãng xương và phục hồi chức năng",
        icon: <Bone className="h-10 w-10 text-teal-600" />,
    },
    {
        name: "Nhi khoa",
        slug: "nhi-khoa",
        description: "Chăm sóc sức khỏe toàn diện cho trẻ nhỏ",
        icon: <Baby className="h-10 w-10 text-teal-600" />,
    },
    {
        name: "Tai mũi họng",
        slug: "tai-mui-hong",
        description: "Điều trị viêm họng, viêm xoang, dị ứng thời tiết",
        icon: <Stethoscope className="h-10 w-10 text-teal-600" />,
    },
]


export default function SelectSpecialtyStep({ onNext, onBack }: any) {
    const [setlected, setSelected] = useState<String | null>(null)
    return (
        <>
            <section className="my-10">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {specialties.map((item) => (
                            <Card className="h-full transition-shadow hover:shadow-md hover:border-teal-600 hover:cursor-pointer">
                                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-teal-50">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800">{item.name}</h3>
                                    <Link href={`/chuyen-khoa/${item.slug}`} className="group">
                                        <div className="flex items-center gap-1 text-teal-600 text-sm mt-2 group-hover:underline">
                                            Xem chi tiết <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </Link>
                                </CardContent>
                            </Card>

                        ))}
                    </div>
                </div>
            </section>
            <section className="my-10">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex justify-between">
                        <button onClick={onBack} className="text-gray-600 px-4 py-2">Quay lại</button>
                        <button onClick={onNext} className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">
                            Tiếp tục
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
