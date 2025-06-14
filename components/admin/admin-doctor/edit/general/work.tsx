"use client"

import GenericSearchSelect from "@/components/share/search-input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import http from "@/helper/axios"
import { getIconByName } from "@/helper/icon-map"
import { handleApiError } from "@/helper/toast-utils"
import { getFullURL } from "@/helper/url"
import { Building2, Check, ChevronsUpDown, Command, Stethoscope } from "lucide-react"
import { useEffect, useState } from "react"



interface Pops {
    form: any
    onChange: (field: string, value: any) => void
}

export const WorkCP = ({ form, onChange }: Pops) => {
    const [hospitals, setHospitals] = useState<any[]>([])
    const [specialties, setSpecialties] = useState<any[]>([])


    const [selectedHospital, setSelectedHospital] = useState<number | null>()


    useEffect(() => {
        const getLisst = async () => {
            try {

                const hospitalsAPI = await http.get<any[]>("/admin-doctor/doctor/full-hospital")
                const specialtiesAPI = await http.get<any[]>("/admin-doctor/doctor/full-specialty")
                setHospitals(hospitalsAPI)
                setSpecialties(specialtiesAPI)
            } catch (err) {
                handleApiError(err)
            }

        }
        getLisst()
    }, [])
    

    useEffect(() => {
        console.log("form trong pops", form)
       
    }, [form])

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-teal-600" />
                    Thông tin công việc
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label className="flex items-center">
                        <Building2 className="w-4 h-4 mr-1 text-gray-500" />
                        Bệnh viện <span className="text-red-500">*</span>
                    </Label>
                    <GenericSearchSelect
                        list={hospitals}
                        placeholder="Chọn nơi làm việc của bác sĩ"
                        value={form.hospitalId}
                        onChange={(val) => onChange("hospitalId", val)}
                        label="name"
                        keyProp="id"
                        renderItem={(item) => (
                            <div className="flex items-center gap-3 px-2 py-1  rounded cursor-pointer">
                                <img
                                    src={getFullURL(item.img)}
                                    alt={item.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex flex-col">
                                    <h2 className="text-sm font-semibold text-gray-900">{item.name}</h2>
                                    <span className="text-xs text-gray-500">{item.title}</span>
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="flex items-center">
                        <Stethoscope className="w-4 h-4 mr-1 text-gray-500" />
                        Chuyên khoa <span className="text-red-500">*</span>
                    </Label>
                    <GenericSearchSelect
                        list={specialties}
                        placeholder="Chọn chuyên khoa của bác sĩ"
                        value={form.specialtyId}
                        onChange={(val) => onChange("specialtyId", val)}
                        label="name"
                        keyProp="id"
                        renderItem={(item) => {
                            const Icon = getIconByName(item.icon)
                            return (
                                <div className="flex items-center gap-3 px-2 py-1  rounded cursor-pointer">
                                    <Icon className="h-5 w-5 text-teal-600" />
                                    <div className="flex flex-col">
                                        <h2 className="text-sm font-semibold text-gray-900">{item.name}</h2>
                                        <span className="text-xs text-gray-500">{item.title}</span>
                                    </div>
                                </div>
                            )
                        }
                        }
                    />


                </div>
            </CardContent>
        </Card>
    )

}