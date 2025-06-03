'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Mail, MapPin, MessageSquare, Phone, User } from "lucide-react"
import PatientRecordModal from '@/components/doctor/doctor-appointments/patient-record-modal';
import { useEffect, useState } from "react"
import http from "@/helper/axios"
import { Label } from "@/components/ui/label"
import { InputWithUnit } from "@/components/share/input-with-unit"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUploader } from "@/components/share/image-uploader"
import { Switch } from "@/components/ui/switch"

interface Pops {
    bookingId: number | string | null
}
export default function ExaminationTab({ bookingId }: Pops) {
    const [examination, setExamination] = useState<any>({

        // reason: //	Lý do bệnh nhân đến khám hoặc nhập viện (ví dụ: đau đầu, sốt, tai nạn...).

        //     symptoms://	Các triệu chứng bệnh nhân mô tả hoặc bác sĩ ghi nhận.
        diagnosis: "",//	Chẩn đoán ban đầu hoặc chẩn đoán sơ bộ.

        //     finalDiagnosis://	Chẩn đoán cuối cùng sau khi có kết quả xét nghiệm, đánh giá chuyên sâu.

        // treatmentPlan: //	Kế hoạch điều trị dự kiến, gồm thuốc, liệu pháp, can thiệp y tế...

        //     progressNotes://	Ghi chú tiến triển bệnh trong quá trình điều trị.
        // result: //	Kết quả cuối cùng của quá trình điều trị (ví dụ: khỏi, ổn định, chuyển viện...).
        notes: "",


        temperature: "",   //nhiệt độ
        pulse: "",     //nhip tim
        bloodPressure: "",     //huyết áp
        respiratoryRate: "",  //nhịp thở
        weight: "",
        height: "",



        //     assessment: // ghi chú đánh giá ban đầu
        // diagnosis: // chẩn đoán
        //     therapyPlan: // kế hoạch điều trị

    })
    const [folowUp, setFolowUp] = useState({
        folowUp: false,
        date: '',
        time: "",
        note: ""
    })
    const [loading, setLoading] = useState(false)
    const handleChange = (field: any, value: any) => {
        setExamination((prev: any) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        if (!bookingId) return
        const fetchPatient = async () => {
            try {
                setLoading(true)
                const res = await http.get<any>(`/doctor-appointment/examination/${bookingId}`);
                // setExamination(res);
            } catch (err) {
                console.error("Failed to fetch appointment detail:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPatient()
    }, [bookingId])
    return (
        <>
            {
                examination && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="diagnosis">Sức khoẻ tổng quát</Label>
                            <div className="grid grid-cols-2 gap-6">
                                <InputWithUnit
                                    id="bloodPressure"
                                    placeholder="Nhập huyết áp"
                                    type="number"
                                    value={examination.bloodPressure}
                                    label="Huyết áp"
                                    unit="mmHg"
                                    onChange={(e) => { handleChange("bloodPressure", e.target.value) }}

                                />
                                <InputWithUnit
                                    id="temperature"
                                    placeholder="Nhập nhiệt độ"
                                    type="number"
                                    value={examination.temperature}
                                    label="Nhiệt độ"
                                    unit="°C"
                                    onChange={(e) => { handleChange("temperature", e.target.value) }}

                                />
                                <InputWithUnit
                                    id="height"
                                    placeholder="Nhập chiều cao"
                                    type="number"
                                    value={examination.height}
                                    label="Chiều cao"
                                    unit="cm"
                                    onChange={(e) => { handleChange("height", e.target.value) }}
                                />
                                <InputWithUnit
                                    id="pulse"
                                    placeholder="Nhập nhịp tim"
                                    value={examination.pulse}
                                    type="number"
                                    label="Nhịp tim"
                                    unit="bpm"
                                    onChange={(e) => { handleChange("pulse", e.target.value) }}

                                />
                                <InputWithUnit
                                    id="weight"
                                    placeholder="Nhập cân nặng"
                                    value={examination.weight}
                                    type="number"
                                    label="Cân nặng"
                                    unit="kg"
                                    onChange={(e) => { handleChange("weight", e.target.value) }}

                                />
                                <InputWithUnit
                                    id="respiratoryRate"
                                    placeholder="Nhập nhịp thở"
                                    type="number"
                                    value={examination.respiratoryRate}
                                    label="Nhịp thở"
                                    unit="bpm"
                                    onChange={(e) => handleChange("respiratoryRate", e.target.value)}

                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="diagnosis">Chẩn đoán</Label>
                            <Input
                                id="diagnosis"
                                placeholder="Nhập chẩn đoán của bác sĩ"
                            // value={diagnosis}
                            // onChange={(e) => setDiagnosis(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="clinical-notes">Ghi chú lâm sàng</Label>
                            <Textarea
                                id="clinical-notes"
                                placeholder="Nhập ghi chú lâm sàng, kết quả khám và các chỉ định"
                                rows={5}
                            // value={clinicalNotes}
                            // onChange={(e) => setClinicalNotes(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex gap-4 items-center">
                                <Label>Hẹn tái khám</Label>
                                <Switch
                                    checked={folowUp.folowUp}
                                    onCheckedChange={(e) => setFolowUp(prev => ({ ...prev, folowUp: e }))}
                                />
                            </div>
                            {folowUp.folowUp && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Input
                                            type="date"
                                            value={folowUp.date}
                                            onChange={(e) => {setFolowUp(prev => ({ ...prev, date: e.target.value }))
                                        console.log(folowUp)}}
                                        />
                                    </div>
                                    <div>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn giờ" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="09:00">09:00</SelectItem>
                                                <SelectItem value="09:30">09:30</SelectItem>
                                                <SelectItem value="10:00">10:00</SelectItem>
                                                <SelectItem value="10:30">10:30</SelectItem>
                                                <SelectItem value="11:00">11:00</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                            )}


                        </div>
                        {
                            folowUp.folowUp && (
                                <div className="space-y-2">
                                    <Label htmlFor="followup-notes">Ghi chú tái khám</Label>
                                    <Textarea
                                        id="followup-notes"
                                        placeholder="Nhập hướng dẫn cho bệnh nhân khi tái khám"
                                        rows={2}
                                    // value={followUpNotes}
                                    // onChange={(e) => setFollowUpNotes(e.target.value)}
                                    />
                                </div>
                            )
                        }

                        <div className="space-y-2">
                            <ImageUploader />
                            {/* <ImageUploader onFilesChange={handleImageChange} /> */}
                            {/* <Button
                                onClick={handleTestSubmit}
                                className="bg-teal-600 hover:bg-teal-700">
                                <Check className="h-4 w-4 mr-1" />
                                Up ảnh Test
                            </Button> */}
                        </div>
                    </div>
                )
            } </>
    )
}