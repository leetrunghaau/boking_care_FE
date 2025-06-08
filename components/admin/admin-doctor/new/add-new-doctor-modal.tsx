"use client";
import { useState } from "react";
import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Save,
  Upload,
  Phone,
  User,
  FileText,
  UserPlus,
  AlertCircle,
  Mail,
  Calendar,
  Users,
  Trash2,
} from "lucide-react";
import { doctorSchema } from "@/schemas/admin-doctor/add-doctor/doctorSchema";
import http from "@/helper/axios";
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils";

interface NewDoctorData {
  name: string;
  phone: string;
  email: string;
  dob: string; // "YYYY-MM-DD"
  gender: "male" | "female" | "other" | "";
  img: string;
  about: string;
}

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (doctor: NewDoctorData) => void;
}

const initialDoctorData: NewDoctorData = {
  name: "",
  phone: "",
  email: "",
  dob: "",
  gender: "",
  img: "",
  about: "",
};

export function AddDoctorModal({
  isOpen,
  onClose,
  onSave,
}: AddDoctorModalProps) {
  const [formData, setFormData] = useState<NewDoctorData>(initialDoctorData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof NewDoctorData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };
  const validateForm = (): boolean => {
    const result = doctorSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path.length) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const data = await http.post<any>("/admin-doctor/doctor", formData);
      onSave(formData);
      if (data) handleImageUpload;
      handleClose();
      handleApiSuccess("Thêm bác sĩ thành công");
    } catch (error) {
      handleApiError(error, "Thêm bác sĩ thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData(initialDoctorData);
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const getInitials = (name: string) => {
    if (!name) return "BS";
    return name
      .split(" ")
      .slice(-2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange("img", result);
        console.log("IMG" + result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    handleInputChange("img", "");
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case "male":
        return "Nam";
      case "female":
        return "Nữ";
      case "other":
        return "Khác";
      default:
        return "Chọn giới tính";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <UserPlus className="w-5 h-5 mr-2 text-teal-600" />
            Thêm bác sĩ mới
          </DialogTitle>
          <DialogDescription>
            Nhập thông tin chi tiết để thêm bác sĩ mới vào hệ thống
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <User className="w-5 h-5 mr-2 text-teal-600" />
              Thông tin bác sĩ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={formData.img || "/placeholder.svg"}
                  alt={formData.name || "Bác sĩ mới"}
                />
                <AvatarFallback className="bg-teal-100 text-teal-600 text-lg font-semibold">
                  {getInitials(formData.name)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="avatar-upload" className="text-sm font-medium">
                  Ảnh đại diện
                </Label>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Tải lên ảnh
                    </label>
                  </Button>
                  {formData.img && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeImage}
                      className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xóa
                    </Button>
                  )}
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500">PNG, JPG (tối đa 2MB)</p>
              </div>
            </div>

            {/* Basic Info Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="VD: BS. Nguyễn Văn An"
                  className={`focus:ring-teal-500 focus:border-teal-500 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">
                  Giới tính <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger
                    className={`focus:ring-teal-500 focus:border-teal-500 ${
                      errors.gender ? "border-red-500" : ""
                    }`}>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        Nam
                      </div>
                    </SelectItem>
                    <SelectItem value="female">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-pink-500" />
                        Nữ
                      </div>
                    </SelectItem>
                    <SelectItem value="other">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-500" />
                        Khác
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-red-500">{errors.gender}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="w-4 h-4 mr-1 text-gray-500" />
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="VD: 0973286451"
                  className={`focus:ring-teal-500 focus:border-teal-500 ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="w-4 h-4 mr-1 text-gray-500" />
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="VD: doctor@example.com"
                  className={`focus:ring-teal-500 focus:border-teal-500 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob" className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                Ngày sinh <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                min={
                  new Date(new Date().getFullYear() - 100, 0, 1)
                    .toISOString()
                    .split("T")[0]
                }
                className={`focus:ring-teal-500 focus:border-teal-500 ${
                  errors.dob
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />
              {errors.dob && (
                <p className="text-sm text-red-500">{errors.dob}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="about" className="flex items-center">
                <FileText className="w-4 h-4 mr-1 text-gray-500" />
                Giới thiệu về bác sĩ <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="about"
                value={formData.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                placeholder="Viết giới thiệu về kinh nghiệm, chuyên môn và thành tích của bác sĩ..."
                rows={4}
                className={`focus:ring-teal-500 focus:border-teal-500 ${
                  errors.about
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />
              {errors.about && (
                <p className="text-sm text-red-500">{errors.about}</p>
              )}
              <p className="text-xs text-gray-500">
                Tối thiểu 50 ký tự ({formData.about.length}/50)
              </p>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Thông tin bác sĩ sẽ được hiển thị công khai cho bệnh nhân. Vui
                lòng đảm bảo thông tin chính xác và đầy đủ.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <DialogFooter className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}>
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSubmitting}
            className="bg-teal-600 hover:bg-teal-700">
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Thêm bác sĩ
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
