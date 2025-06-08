// components/profile/RelativeInfoCard.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import FieldWrapper from "./FieldWrapper"; // Import component FieldWrapper

interface RelativeInfoCardProps {
  relative: {
    name: string;
    relationship: string;
    phone: string;
    address: string;
  };
  handleRelativeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RelativeInfoCard: React.FC<RelativeInfoCardProps> = React.memo(
  ({ relative, handleRelativeChange }) => {
    // console.log("Rendering RelativeInfoCard"); // Bỏ comment để debug xem khi nào component này re-render

    return (
      <Card>
        <CardHeader>
          <CardTitle>Thông tin người thân liên lạc khi cần</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper label="Họ và tên người thân">
            <Input
              name="name"
              value={relative.name}
              onChange={handleRelativeChange}
            />
          </FieldWrapper>
          <FieldWrapper label="Mối quan hệ">
            <Input
              name="relationship"
              value={relative.relationship}
              onChange={handleRelativeChange}
            />
          </FieldWrapper>
          <FieldWrapper label="Số điện thoại người thân">
            <Input
              name="phone"
              value={relative.phone}
              onChange={handleRelativeChange}
            />
          </FieldWrapper>
          <FieldWrapper label="Địa chỉ người thân">
            <Input
              name="address"
              value={relative.address}
              onChange={handleRelativeChange}
            />
          </FieldWrapper>
        </CardContent>
      </Card>
    );
  }
);

export default RelativeInfoCard;
