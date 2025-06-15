// components/profile/PersonalInfoCard.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldWrapper from "./FieldWrapper"; // Import component FieldWrapper

interface PersonalInfoCardProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenderChange: (value: string) => void;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = React.memo(
  ({ form, handleChange, handleGenderChange }) => {
    // console.log("Rendering PersonalInfoCard"); // Bỏ comment để debug xem khi nào component này re-render

    return (
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper label="Họ và tên">
            <Input name="name" value={form.name} onChange={handleChange} />
          </FieldWrapper>
          <FieldWrapper label="Ngày sinh">
            <Input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
            />
          </FieldWrapper>
          <FieldWrapper label="Giới tính">
            <Select value={form.gender} onValueChange={handleGenderChange}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </FieldWrapper>
          <FieldWrapper label="Số điện thoại">
            <Input name="phone" value={form.phone} onChange={handleChange} />
          </FieldWrapper>
          <FieldWrapper label="Email">
            <Input name="email" value={form.email} onChange={handleChange} />
          </FieldWrapper>
          <FieldWrapper label="Địa chỉ">
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </FieldWrapper>
        </CardContent>
      </Card>
    );
  }
);

export default PersonalInfoCard;
