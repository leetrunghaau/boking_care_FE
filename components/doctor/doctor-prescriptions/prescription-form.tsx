"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Plus, Save, Trash } from "lucide-react";
import http from "@/helper/axios";
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils";
import QuickSuggest from "@/components/share/quick-search-suggestion";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface Props {
  onPreview: () => void;
  bookingId: number | string | null;
  disabled?: boolean;
}

export function PrescriptionForm({ bookingId, onPreview, disabled }: Props) {
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [medications, setMedications] = useState<any[]>([]);

  const [generalInstructions, setGeneralInstructions] = useState("");


  // Thêm thuốc mới
  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        id: -Number(Date.now().toString()),
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ]);
  };

  useEffect(() => { console.log("medications", medications) }, [medications])
  // Xóa thuốc
  const handleRemoveMedication = (id: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((med) => med.id !== id));
    }
  };

  // Cập nhật thông tin thuốc
  const handleMedicationChange = async (
    id: number,
    field: keyof Medication,
    value: string
  ) => {
    setMedications(
      medications.map((med) => {
        if (med.id === id) {
          return { ...med, [field]: value };
        }
        return med;
      })
    );
    if (field === "name") {
      try {
        const rs = await http.get<any|null>(
          `/medicine-details?search=${encodeURIComponent(value)}`
        );
        if (rs) {

          setMedications((prev) =>
            prev.map((med) =>
              med.id === id ? { ...med, suggestions: rs.data ?? [] } : med
            )
          );
        }
      } catch (err) {
        console.error("Gợi ý thuốc thất bại", err);
      }
    }
  };



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
  ];

  // Danh sách thời gian dùng
  const durationOptions = [
    { label: "3 ngày", value: 3 },
    { label: "5 ngày", value: 5 },
    { label: "7 ngày", value: 7 },
    { label: "10 ngày", value: 10 },
    { label: "14 ngày", value: 14 },
    { label: "1 tháng", value: 30 },
    { label: "2 tháng", value: 60 },
    { label: "3 tháng", value: 90 },
  ];

  // lấy thông tin thuốc cũ
  useEffect(() => {
    if (!bookingId) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await http.get<any>(
          `/doctor-appointment/prescription/${bookingId}`
        );
        console.log("đơn thuốc khi tải mới", res);
        if (res) {
          setMedications(res.prescriptions);
          setGeneralInstructions(res.generalInstructions);
        }
      } catch (err) {
        console.error("Failed to fetch appointment detail:", err);
        handleApiError(err, "Lấy thông tin lịch hẹn thất bại");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookingId]);

  const handleSavePrescription = () => {
    const fetchData = async () => {
      try {
        setSaveLoading(true);
        console.log(medications);
        const res = await http.post<any>(
          `/doctor-appointment/prescription/${bookingId}`,
          {
            prescriptions: medications,
            generalInstructions: generalInstructions,
          }
        );
        console.log("thuốc trả về", res);
        if (res) {
          setMedications(res.prescriptions);
          setGeneralInstructions(res.generalInstructions);
          handleApiSuccess("Lưu đơn thuốc thành công");
        }
      } catch (err) {
        console.error("Failed to fetch appointment detail:", err);
      } finally {
        setSaveLoading(false);
      }
    };
    fetchData();
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Kê đơn thuốc</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPreview}>
            <Eye className="h-4 w-4 mr-1" />
            Xem trước
          </Button>
          <Button
            onClick={handleSavePrescription}
            className="bg-teal-600 hover:bg-teal-700"
            disabled={saveLoading}>
            <Save className="h-4 w-4 mr-1" />
            Lưu đơn thuốc
          </Button>
        </div>
      </div>

      {/* Danh sách thuốc */}
      <div className="space-y-6">
        {medications?.map((medication, index) => (
          <div key={index} className="p-4 border rounded-md bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Thuốc {index + 1}</h4>
              {medications.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRemoveMedication(medication.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`med-name-${medication.id}`}>Tên thuốc</Label>
                <QuickSuggest
                  value={medication.name}
                  list={medication.suggestions ?? []}
                  onInputChange={(val) => {
                    handleMedicationChange(medication.id, "name", val);
                  }}
                  onSelectItem={(val)=>{
                    setMedications((prev) =>
                      prev.map((med) =>
                        med.id === medication.id ? { ...med, name: val } : med
                      )
                    );
                  }}
                  getValue={(item) => item.name}
                  renderItem={(item) => (
                    <div className="">{item.name}</div>
                  )}
                  placeholder="Tìm thuốc..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`med-dosage-${medication.id}`}>
                  Liều lượng
                </Label>
                <Input
                  id={`med-dosage-${medication.id}`}
                  placeholder="VD: 1 viên"
                  value={medication.dosage ?? ""}
                  onChange={(e) =>
                    handleMedicationChange(
                      medication.id,
                      "dosage",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`med-frequency-${medication.id}`}>
                  Tần suất
                </Label>
                <Select
                  value={medication.frequency}
                  onValueChange={(value) =>
                    handleMedicationChange(medication.id, "frequency", value)
                  }>
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
                <Label htmlFor={`med-duration-${medication.id}`}>
                  Thời gian dùng
                </Label>
                <Select
                  value={medication.duration}
                  onValueChange={(value) =>
                    handleMedicationChange(medication.id, "duration", value)
                  }>
                  <SelectTrigger id={`med-duration-${medication.id}`}>
                    <SelectValue placeholder="Chọn thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`med-instructions-${medication.id}`}>
                  Hướng dẫn sử dụng
                </Label>
                <Textarea
                  id={`med-instructions-${medication.id}`}
                  placeholder="VD: Uống sau khi ăn"
                  value={medication.instructions}
                  onChange={(e) =>
                    handleMedicationChange(
                      medication.id,
                      "instructions",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full"
          onClick={handleAddMedication}
          disabled={disabled}>
          <Plus className="h-4 w-4 mr-1" />
          Thêm thuốc
        </Button>
      </div>

      {/* Hướng dẫn chung */}
      <div className="space-y-2">
        <Label htmlFor="general-instructions">Hướng dẫn chung</Label>
        <Textarea
          disabled={disabled}
          id="general-instructions"
          placeholder="Nhập hướng dẫn chung cho bệnh nhân"
          rows={3}
          value={generalInstructions}
          onChange={(e) => setGeneralInstructions(e.target.value)}
        />
      </div>

      {disabled ? (
        <div className="flex flex-col">
          <h1 className="text-lg font-medium text-teal-500 mb-2">
            Không thể thêm đơn thuốc.
          </h1>
          <p className="text-xs text-gray-600">
            Lịch hẹn đang ở trạng thái chưa xác nhận, đã bị huỷ hoặc đã hoàn
            thành
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
