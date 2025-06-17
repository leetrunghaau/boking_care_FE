"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import GeneralInfoTab from "@/components/admin/admin-doctor/edit/general-info-tab"
import { ScheduleSettings } from "@/components/admin/admin-doctor/edit/schedule-tab"


export default function EditDoctorPage() {
    const [activeTab, setActiveTab] = useState("general")
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-teal-100 p-3 rounded-lg">
                                <UserCircle className="w-8 h-8 text-teal-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa thông tin bác sĩ</h1>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Tabs */}
                <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-2 w-full">
                        <TabsTrigger value="general">Thông tin chung</TabsTrigger>
                        <TabsTrigger value="schedule">Lịch biểu</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general">
                        <GeneralInfoTab/>
                    </TabsContent>

                    <TabsContent value="schedule">
                        <ScheduleSettings />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
