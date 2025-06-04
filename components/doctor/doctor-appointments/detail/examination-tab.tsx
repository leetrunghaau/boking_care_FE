"use client";

import { useEffect, useState } from "react";
import http from "@/helper/axios";
import { Label } from "@/components/ui/label";
import { InputWithUnit } from "@/components/share/input-with-unit";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/share/image-uploader";
import { Switch } from "@/components/ui/switch";
import moment from "moment";
import { Divider } from "@/components/ui/divider";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Pops {
  bookingId: number | string | null;
}
export default function ExaminationTab({ bookingId }: Pops) {
  const [examination, setExamination] = useState<any>({
    diagnosis: "", //	Chẩn đoán ban đầu hoặc chẩn đoán sơ bộ.
    finalDiagnosis: "", //	Chẩn đoán cuối cùng sau khi có kết quả xét nghiệm, đánh giá chuyên sâu.
    notes: "",
    temperature: "", //nhiệt độ
    pulse: "", //nhip tim
    bloodPressure: "", //huyết áp
    respiratoryRate: "", //nhịp thở
    weight: "",
    height: "",
    folowUp: false,
    folowUpDate: "",
    folowUpTime: "",
    folowUpNote: "",
  });

  const [fileStore, setFileStore] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<any[]>([]);

  const handleChange = (field: any, value: any) => {
    setExamination((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleUpload = async (files: File[]) => {
    console.log("Đã upload:", files);
    // TODO: Gửi files đến server hoặc API tại đây
  };

  const hanhdelSaveExamination = async () => {
    console.log(examination);
    try {
      setLoading(true);
      const res = await http.post<any>(
        `/doctor-appointment/examination/${bookingId}`,
        examination
      );
      console.warn("Lưu thông tin khám bệnh", res);

      // setExamination(res);
    } catch (err) {
      console.error("Failed to fetch appointment detail:", err);
    } finally {
      setLoading(false);
    }
  };

  //lấy data ban đầu
  useEffect(() => {
    if (!bookingId) return;
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const res = await http.get<any>(
          `/doctor-appointment/examination/${bookingId}`
        );
        console.warn("get chi tiết thông tin khám bệnh", res);

        setExamination(res.examination);
        setFileStore(res.files);
      } catch (err) {
        console.error("Failed to fetch appointment detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [bookingId]);

  // cập nhật thời gian khi chọn ngày
  const handleDatePicker = async (date: string) => {
    console.log("follow date", date);
    if (!bookingId) return;
    try {
      setLoading(true);
      const res = await http.get<any>(
        `/doctor-appointment/my-schedule/${date}`
      );
      setSchedule(res);
    } catch (err) {
      console.error("Failed to fetch appointment detail:", err);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     console.log("follow date", examination.folowUpDate);

  //     if (!bookingId) return;
  //     const fetchPatient = async () => {
  //       try {
  //         setLoading(true);
  //         const res = await http.get<any>(
  //           `/doctor-appointment/my-schedule/${examination.folowUpDate}`
  //         );
  //         setSchedule(res);
  //       } catch (err) {
  //         console.error("Failed to fetch appointment detail:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchPatient();
  //   }, [examination.folowUpDate]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Sức khoẻ tổng quát</h3>
        <div className="flex gap-2">
          <Button
            onClick={hanhdelSaveExamination}
            className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-1" />
            Lưu kết quả khám
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-6">
          <InputWithUnit
            id="bloodPressure"
            placeholder="Nhập huyết áp"
            type="number"
            value={examination.bloodPressure}
            label="Huyết áp"
            unit="mmHg"
            onChange={(e) => {
              handleChange("bloodPressure", e.target.value);
            }}
          />
          <InputWithUnit
            id="temperature"
            placeholder="Nhập nhiệt độ"
            type="number"
            value={examination.temperature}
            label="Nhiệt độ"
            unit="°C"
            onChange={(e) => {
              handleChange("temperature", e.target.value);
            }}
          />
          <InputWithUnit
            id="height"
            placeholder="Nhập chiều cao"
            type="number"
            value={examination.height}
            label="Chiều cao"
            unit="cm"
            onChange={(e) => {
              handleChange("height", e.target.value);
            }}
          />
          <InputWithUnit
            id="pulse"
            placeholder="Nhập nhịp tim"
            value={examination.pulse}
            type="number"
            label="Nhịp tim"
            unit="bpm"
            onChange={(e) => {
              handleChange("pulse", e.target.value);
            }}
          />
          <InputWithUnit
            id="weight"
            placeholder="Nhập cân nặng"
            value={examination.weight}
            type="number"
            label="Cân nặng"
            unit="kg"
            onChange={(e) => {
              handleChange("weight", e.target.value);
            }}
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
        <h3 className="text-lg font-medium mt-10">Chẩn đoán ban đầu</h3>
        <Input
          id="diagnosis"
          placeholder="Nhập chẩn đoán ban đầu của bác sĩ"
          value={examination.diagnosis}
          onChange={(e) => handleChange("diagnosis", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="finalDiagnosis">Kết luận</Label>
        <Input
          id="finalDiagnosis"
          placeholder="Nhập kết luận bệnh án của bác sĩ"
          value={examination.finalDiagnosis}
          onChange={(e) => handleChange("finalDiagnosis", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Ghi chú lâm sàng</Label>
        <Textarea
          id="notes"
          placeholder="Nhập ghi chú lâm sàng, kết quả khám và các chỉ định"
          rows={5}
          value={examination.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex gap-4 items-center mt-6">
          <h3 className="text-lg font-medium ">Hẹn tái khám</h3>
          <Switch
            checked={examination.folowUp}
            onCheckedChange={(e) => handleChange("folowUp", e)}
          />
        </div>
        {examination.folowUp && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="date"
                min={moment().format("YYYY-MM-DD")}
                value={examination.folowUpDate}
                onChange={(e) => {
                  handleChange("folowUpDate", e.target.value);
                  handleDatePicker(e.target.value);
                }}
              />
            </div>
            <div>
              <Select
                value={examination.folowUpTime}
                onValueChange={(e) => handleChange("folowUpTime", e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giờ" />
                </SelectTrigger>
                <SelectContent>
                  {schedule.map((item: any) => (
                    <SelectItem key={item.start} value={item.start}>
                      {item.start}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
      {examination.folowUp && (
        <div className="space-y-2">
          <Label htmlFor="followup-notes">Ghi chú tái khám</Label>
          <Textarea
            id="followup-notes"
            placeholder="Nhập hướng dẫn cho bệnh nhân khi tái khám"
            rows={2}
            value={examination.folowUpNote}
            onChange={(e) => handleChange("folowUpNote", e.target.value)}
          />
        </div>
      )}

      <Divider />
      <div className="space-y-2">
        <ImageUploader onUpload={handleUpload} maxFiles={5} maxSizeMB={5} />
        {/* <ImageUploader onFilesChange={handleImageChange} /> */}
      </div>
    </div>
  );
}
