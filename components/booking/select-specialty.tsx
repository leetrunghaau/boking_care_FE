"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Heart, Brain, Bone, Eye, Ear, Baby, Users, Stethoscope, Activity, UserCheck } from "lucide-react"
import { getIconByName } from '@/helper/icon-map';
import http from "@/helper/axios"
import { cn } from "@/lib/utils"
import { Specialty } from "./type"



interface SelectSpecialtyProps {
    onSpecialtySelect: (specialty: Specialty) => void
    selectedSpecialty?: Specialty | null
}



export default function SelectSpecialty({ onSpecialtySelect, selectedSpecialty }: SelectSpecialtyProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
    const [specialties, setSpecialties] = useState<Specialty[]>([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSpecialties = async () => {
            setLoading(true);
            try {
                const resSpecialty = await http.get<Specialty[]>(`/booking/spesialties`);
                setSpecialties(resSpecialty);
            } catch (err) {
                console.error("Failed to fetch doctors:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSpecialties();
    }, []);

    const filteredSpecialties = specialties.filter(
        (specialty) =>
            specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            specialty.symptoms.some((symptom) => symptom.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    const handleSymptomClick = (symptom: string) => {
        setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
    }
    const getAllSymptoms = () => {
        const allSymptoms = specialties.flatMap((s) => s.symptoms)
        return [...new Set(allSymptoms)]
    }

    const specialtyCard = (spt: Specialty) => {

        const Icon = getIconByName(spt.icon);
        return (
            <Card
                key={spt.id}
                className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedSpecialty?.id == spt.id
                        ? "ring-2 ring-teal-500 bg-teal-50"
                        : "hover:bg-gray-50"
                )}
                onClick={() => onSpecialtySelect(spt)}
            >

                <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                        <div
                            className={cn(
                                "p-2 rounded-lg",
                                selectedSpecialty?.id == spt.id
                                    ? "bg-teal-600 text-white"
                                    : "bg-gray-100 text-gray-600"
                            )}
                        >
                            <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{spt.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{spt.description}</p>
                            <div className="flex flex-wrap gap-1">
                                {spt.symptoms.slice(0, 3).map((symptom) => (
                                    <Badge key={symptom} variant="outline" className="text-xs">
                                        {symptom}
                                    </Badge>
                                ))}
                                {spt.symptoms.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                        +{spt.symptoms.length - 3}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card >
        )
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Bạn đang gặp vấn đề gì?</h2>
                <p className="text-gray-600">Chọn triệu chứng hoặc chuyên khoa phù hợp để được tư vấn tốt nhất</p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    type="text"
                    placeholder="Tìm kiếm triệu chứng hoặc chuyên khoa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Common Symptoms */}
            {!searchTerm && (
                <div>
                    <h3 className="text-lg font-semibold mb-3">Triệu chứng phổ biến</h3>
                    <div className="flex flex-wrap gap-2">
                        {getAllSymptoms()
                            .slice(0, 12)
                            .map((symptom) => (
                                <Badge
                                    key={symptom}
                                    variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                                    className="cursor-pointer hover:bg-teal-100 hover:text-teal-700"
                                    onClick={() => handleSymptomClick(symptom)}
                                >
                                    {symptom}
                                </Badge>
                            ))}
                    </div>
                </div>
            )}

            {/* Selected Symptoms */}
            {selectedSymptoms.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-3">Triệu chứng đã chọn</h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedSymptoms.map((symptom) => (
                            <Badge
                                key={symptom}
                                variant="default"
                                className="bg-teal-600 hover:bg-teal-700 cursor-pointer"
                                onClick={() => handleSymptomClick(symptom)}
                            >
                                {symptom} ×
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Specialties Grid */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Chuyên khoa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSpecialties.map((specialty) => specialtyCard(specialty))}
                </div>
            </div>

            {filteredSpecialties.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">Không tìm thấy chuyên khoa phù hợp. Vui lòng thử từ khóa khác.</p>
                </div>
            )}
        </div>
    )
}
