"use client"

import React, { useState } from "react";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Key } from "lucide-react";
import { handleApiError, handleApiSuccess, handleErorr } from "@/helper/toast-utils";
import http from "@/helper/axios";

function SecuritySettings() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const toggleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = async () => {
    if (form.newPassword !== form.confirmPassword) {
      handleErorr( "Mật khẩu xác nhận không khớp!");
      return;
    }
    setLoading(true)

    try {
      const res = await http.post<any>(`/doctor-setting/re-pass`, form)
      console.log("Cài đặt lịch làm việc đã được tải:", res)
      if (res) {
        handleApiSuccess("Bạn đổi mật khẩu thành công.");
      } else {
        handleErorr("Mật cũ không khớp!");

      }

    } catch (err) {
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Đổi mật khẩu</CardTitle>
          <CardDescription>
            Cập nhật mật khẩu của bạn để bảo mật tài khoản
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Mật khẩu hiện tại", id: "currentPassword", field: "current" },
            { label: "Mật khẩu mới", id: "newPassword", field: "new" },
            { label: "Xác nhận mật khẩu mới", id: "confirmPassword", field: "confirm" },
          ].map(({ label, id, field }) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id}>{label}</Label>
              <div className="relative">
                <Input
                  id={id}
                  type={showPassword[field as keyof typeof showPassword] ? "text" : "password"}
                  value={form[id as keyof typeof form]}
                  onChange={(e) => handleChange(id, e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => toggleShowPassword(field as keyof typeof showPassword)}
                  type="button"
                >
                  {showPassword[field as keyof typeof showPassword] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleSubmit}>
            <Key className="h-4 w-4 mr-1" />
            Cập nhật mật khẩu
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SecuritySettings;
