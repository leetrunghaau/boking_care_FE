"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Eye, Plus, Save, Trash } from "lucide-react"

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

interface PrescriptionFormProps {
  onSave: () => void
  onPreview: () => void
}

export function PrescriptionForm({ onSave, onPreview }: PrescriptionFormProps) {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    },
  ])

  const [generalInstructions, setGeneralInstructions] = useState("")

  // Thêm thuốc mới
  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        id: Date.now().toString(),
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ])
  }

  // Xóa thuốc
  const handleRemoveMedication = (id: string) => {
    if (medications.length > 1) {
      setMedications(medications.filter((med) => med.id !== id))
    }
  }

  // Cập nhật thông tin thuốc
  const handleMedicationChange = (id: string, field: keyof Medication, value: string) => {
    setMedications(
      medications.map((med) => {
        if (med.id === id) {
          return { ...med, [field]: value }
        }
        return med
      }),
    )
  }

  // Danh sách thuốc mẫu
  const medicationOptions = [
    "Paracetamol 500mg",
    "Amoxicillin 500mg",
    "Omeprazole 20mg",
    "Loratadine 10mg",
    "Ibuprofen 400mg",
    "Cetirizine 10mg",
    "Metformin 500mg",
    "Atorvastatin 10mg",
    "Losartan 50mg",
    "Metoprolol 25mg",
  ]

  // Danh sách tần suất
  const frequencyOptions = [
    "1 lần/ngày",
    "2 lần/ngày",
    "3 lần/ngày",
    "4 lần/ngày",
    "Mỗi 4-6 giờ",
    "Mỗi 8 giờ",
    "Mỗi 12 giờ",
    "Khi cần",
  ]

  // Danh sách thời gian dùng
  const durationOptions = ["3 ngày", "5 ngày", "7 ngày", "10 ngày", "14 ngày", "1 tháng", "2 tháng", "3 tháng"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Kê đơn thuốc</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPreview}>
            <Eye className="h-4 w-4 mr-1" />
            Xem trước
          </Button>
          <Button onClick={onSave} className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-1" />
            Lưu đơn thuốc
          </Button>
        </div>
      </div>

      {/* Danh sách thuốc */}
      <div className="space-y-6">
        {medications.map((medication, index) => (
          <div key={medication.id} className="p-4 border rounded-md bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Thuốc {index + 1}</h4>
              {medications.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRemoveMedication(medication.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`med-name-${medication.id}`}>Tên thuốc</Label>
                <Select
                  value={medication.name}
                  onValueChange={(value) => handleMedicationChange(medication.id, "name", value)}
                >
                  <SelectTrigger id={`med-name-${medication.id}`}>
                    <SelectValue placeholder="Chọn hoặc nhập tên thuốc" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicationOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`med-dosage-${medication.id}`}>Liều lượng</Label>
                <Input
                  id={`med-dosage-${medication.id}`}
                  placeholder="VD: 1 viên"
                  value={medication.dosage}
                  onChange={(e) => handleMedicationChange(medication.id, "dosage", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`med-frequency-${medication.id}`}>Tần suất</Label>
                <Select
                  value={medication.frequency}
                  onValueChange={(value) => handleMedicationChange(medication.id, "frequency", value)}
                >
                  <SelectTrigger id={`med-frequency-${medication.id}`}>
                    <SelectValue placeholder="Chọn tần suất" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`med-duration-${medication.id}`}>Thời gian dùng</Label>
                <Select
                  value={medication.duration}
                  onValueChange={(value) => handleMedicationChange(medication.id, "duration", value)}
                >
                  <SelectTrigger id={`med-duration-${medication.id}`}>
                    <SelectValue placeholder="Chọn thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`med-instructions-${medication.id}`}>Hướng dẫn sử dụng</Label>
                <Textarea
                  id={`med-instructions-${medication.id}`}
                  placeholder="VD: Uống sau khi ăn"
                  value={medication.instructions}
                  onChange={(e) => handleMedicationChange(medication.id, "instructions", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full" onClick={handleAddMedication}>
          <Plus className="h-4 w-4 mr-1" />
          Thêm thuốc
        </Button>
      </div>

      {/* Hướng dẫn chung */}
      <div className="space-y-2">
        <Label htmlFor="general-instructions">Hướng dẫn chung</Label>
        <Textarea
          id="general-instructions"
          placeholder="Nhập hướng dẫn chung cho bệnh nhân"
          rows={3}
          value={generalInstructions}
          onChange={(e) => setGeneralInstructions(e.target.value)}
        />
      </div>
    </div>
  )
}
