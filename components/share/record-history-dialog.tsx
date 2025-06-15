"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

interface RecordHistoryDialogProps {
  record: any;
}

export function RecordHistoryDialog({ record }: RecordHistoryDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          <span className="text-xs">Kết quả</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Chi tiết khám ngày {record.recordDate}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Bác sĩ</p>
              <p className="font-semibold text-base">{record.doctorName}</p>
            </div>
            <Badge variant="secondary">{record.finalDiagnosis}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Triệu chứng:</h4>
              <p className="text-sm text-gray-600">{record.symptoms}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Ghi chú:</h4>
              <p className="text-sm text-gray-600">{record.notes}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Chỉ số sức khỏe:</h4>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Huyết áp:</span>{" "}
                {record.bloodPressure}
              </div>
              <div>
                <span className="text-gray-500">Nhiệt độ:</span>{" "}
                {record.temperature}
              </div>
              <div>
                <span className="text-gray-500">Nhịp tim:</span> {record.pulse}
              </div>
              <div>
                <span className="text-gray-500">Cân nặng:</span> {record.weight}
              </div>
              <div>
                <span className="text-gray-500">BMI:</span> {record.bmi}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
