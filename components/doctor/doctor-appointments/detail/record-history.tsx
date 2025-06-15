"use client";

// React
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface RecordHistoryCardProps {
  record: any;
}

export function RecordHistoryCard({ record }: RecordHistoryCardProps) {
  return (
    <Card key={record.id}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{record.recordDate}</CardTitle>
            <p className="text-lg font-bold text-black">
              Bác sĩ: {record.doctorName}
            </p>
          </div>
          <Badge variant="secondary">{record.finalDiagnosis}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Triệu chứng:</h4>
            <p className="text-sm text-gray-600">{record.symptoms}</p>
          </div>
          {/* Nếu muốn thêm phần điều trị thì bỏ comment dưới */}
          {/* <div>
            <h4 className="font-medium mb-2">Điều trị:</h4>
            <p className="text-sm text-gray-600">{record.treatment}</p>
          </div> */}
        </div>
        <div>
          <h4 className="font-medium mb-2">Ghi chú:</h4>
          <p className="text-sm text-gray-600">{record.notes}</p>
        </div>
        <Separator />
        <div>
          <h4 className="font-medium mb-2">Sức khoẻ tổng quát:</h4>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Huyết áp:</span> {record.bloodPressure}
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
      </CardContent>
    </Card>
  );
}
