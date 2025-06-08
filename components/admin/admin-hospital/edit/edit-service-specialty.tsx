"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

export default function EditServiceAndSpecailtyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Stethoscope className="w-5 h-5 mr-2 text-teal-600" />
          Dịch vụ & Chuyên khoa
        </CardTitle>
        <CardDescription>
          Quản lý các dịch vụ y tế và chuyên khoa
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
          <Stethoscope className="w-10 h-10 text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Dịch vụ & Chuyên khoa
        </h2>
        <p className="text-gray-600 max-w-md mb-6">
          Quản lý các dịch vụ y tế và chuyên khoa được cung cấp tại cơ sở này.
          Thêm, sửa hoặc xóa các dịch vụ.
        </p>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
          Bắt đầu thiết lập
        </Button>
      </CardContent>
    </Card>
  );
}
