"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import http from "@/helper/axios";
import {
  handleApiError,
  handleApiSuccess,
  handleErorr,
} from "@/helper/toast-utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  Clock,
  MapPin,
  Phone,
  FileText,
  Plus,
  LinkIcon,
  Save,
} from "lucide-react";
import { editHospitalFacilitySchema } from "@/schemas/admin-hospital/facilities/edit-hospital-schema";

interface Facility {
  id: number;
  name: string;
  about: string;
  address: string;
  phone: string;
  license: string;
  image: string;
  year: number;
  mapEmbedUrl: string;
  times: {
    dayOfWeek: number; // 0 là chủ nhật, 1 là thứ 2, 2 là thứ 3,...
    startTime: number; // hh*60+mm
    endTime: number; // hh*60+mm
  }[];
}

const DAYS_OF_WEEK = [
  { value: 2, label: "Thứ 2" },
  { value: 3, label: "Thứ 3" },
  { value: 4, label: "Thứ 4" },
  { value: 5, label: "Thứ 5" },
  { value: 6, label: "Thứ 6" },
  { value: 7, label: "Thứ 7" },
  { value: 8, label: "Chủ nhật" },
];

export default function EditHospitalBasicCard() {
  const params = useParams();
  const id = params?.id as string;

  const [facility, setFacility] = useState<Facility>({
    id: 0,
    name: "",
    about: "",
    address: "",
    phone: "",
    license: "",
    image: "",
    year: 0,
    mapEmbedUrl: "",
    times: [],
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    // Get default value - you can implement the API call here
    // Example: fetchFacilityData(id)
  }, [id]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      setIsUploading(true);
      const rs = await http.postFile<any | null>(
        `/hospital/${id}/img-update`,
        selectedImage
      );
      if (rs) {
        setFacility({ ...facility, image: rs.data.url });
        setSelectedImage(null);
        setImagePreview("");
        handleApiSuccess("Tải lên hình ảnh thành công");
      }
    } catch (error) {
      console.log(error);
      handleApiError(error, "Không thể tải lên hình ảnh");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const parsed = editHospitalFacilitySchema.safeParse(facility);
      if (!parsed.success) {
        const firstError =
          parsed.error.errors[0]?.message || "Dữ liệu không hợp lệ";
        handleErorr(firstError);
        return;
      }

      setIsSaving(true);
      const rs = await http.put<any | null>("/hospital/", facility);

      if (rs) {
        handleApiSuccess("Cập nhật cơ sở y tế thành công");
      }
    } catch (error) {
      console.log(error);
      handleApiError(error, "Không thể cập nhật cơ sở y tế");
    } finally {
      setIsSaving(false);
    }
  };

  const addOperatingTime = () => {
    setFacility({
      ...facility,
      times: [
        ...facility.times,
        { dayOfWeek: 1, startTime: 480, endTime: 1020 },
      ], // 8:00 - 17:00
    });
  };

  const removeOperatingTime = (index: number) => {
    setFacility({
      ...facility,
      times: facility.times.filter((_, i) => i !== index),
    });
  };

  const updateOperatingTime = (
    index: number,
    field: keyof (typeof facility.times)[0],
    value: number
  ) => {
    const updatedTimes = [...facility.times];
    updatedTimes[index] = { ...updatedTimes[index], [field]: value };
    setFacility({ ...facility, times: updatedTimes });
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  };

  const parseTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  return (
    <div className="space-y-6">
      {/* Thông tin cơ bản */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-baseline justify-between">
            <div className=" flex items-center">
              <FileText className="w-5 h-5 mr-2 text-teal-600" />
              Thông tin cơ bản
            </div>
            <div>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-teal-600 hover:bg-teal-700 text-white ">
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </CardTitle>

          <CardDescription>Thông tin về cơ sở y tế</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="facility-name"
                className="text-sm font-medium text-gray-700">
                Tên cơ sở
              </label>
              <Input
                id="facility-name"
                placeholder="Nhập tên cơ sở y tế"
                value={facility.name}
                className="focus:ring-teal-500 focus:border-teal-500"
                onChange={(e) =>
                  setFacility({ ...facility, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="year"
                className="text-sm font-medium text-gray-700">
                Số năm hoạt động
              </label>
              <Input
                id="year"
                value={facility.year}
                type="number"
                placeholder="2025"
                className="focus:ring-teal-500 focus:border-teal-500"
                onChange={(e) =>
                  setFacility({
                    ...facility,
                    year: parseInt(e.target.value, 10),
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="about"
              className="text-sm font-medium text-gray-700">
              Giới thiệu
            </label>
            <Textarea
              id="about"
              value={facility.about}
              rows={4}
              placeholder="Mô tả về cơ sở y tế..."
              className="focus:ring-teal-500 focus:border-teal-500"
              onChange={(e) =>
                setFacility({ ...facility, about: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 flex items-center">
                <Phone className="w-4 h-4 mr-1 text-gray-500" />
                Số điện thoại
              </label>
              <Input
                id="phone"
                value={facility.phone}
                placeholder="Số điện thoại liên hệ"
                className="focus:ring-teal-500 focus:border-teal-500"
                onChange={(e) =>
                  setFacility({ ...facility, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="license"
                className="text-sm font-medium text-gray-700">
                Giấy phép hoạt động
              </label>
              <Input
                id="license"
                value={facility.license}
                placeholder="Số giấy phép"
                className="focus:ring-teal-500 focus:border-teal-500"
                onChange={(e) =>
                  setFacility({ ...facility, license: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700 flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-gray-500" />
              Địa chỉ
            </label>
            <Input
              id="address"
              value={facility.address}
              placeholder="Nhập địa chỉ đầy đủ"
              className="focus:ring-teal-500 focus:border-teal-500"
              onChange={(e) =>
                setFacility({ ...facility, address: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="mapEmbedUrl"
              className="text-sm font-medium text-gray-700 flex items-center">
              <LinkIcon className="w-4 h-4 mr-1 text-gray-500" />
              URL Google Maps
            </label>
            <Input
              id="mapEmbedUrl"
              value={facility.mapEmbedUrl}
              placeholder="https://maps.google.com/..."
              className="focus:ring-teal-500 focus:border-teal-500"
              onChange={(e) =>
                setFacility({ ...facility, mapEmbedUrl: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Ảnh bìa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Upload className="w-5 h-5 mr-2 text-teal-600" />
            Ảnh bìa cơ sở
          </CardTitle>
          <CardDescription>
            Tải lên hình ảnh đại diện cho cơ sở y tế
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4 flex text-sm text-gray-600">
                <label
                  htmlFor="image"
                  className="relative cursor-pointer rounded-md font-medium text-teal-600 hover:text-teal-500">
                  <span>Nhấp để tải lên</span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={handleImageSelect}
                  />
                </label>
                <p className="pl-1">hoặc kéo thả</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG hoặc GIF (MAX. 800x400px)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Giờ hoạt động */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Clock className="w-5 h-5 mr-2 text-teal-600" />
            Giờ hoạt động
          </CardTitle>
          <CardDescription>
            Thiết lập thời gian hoạt động trong tuần
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <label className="text-sm font-medium text-gray-700">
                  Ngày
                </label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                  <option>Thứ 2</option>
                  <option>Thứ 3</option>
                  <option>Thứ 4</option>
                  <option>Thứ 5</option>
                  <option>Thứ 6</option>
                  <option>Thứ 7</option>
                  <option>Chủ nhật</option>
                </select>
              </div>
              <div className="col-span-3">
                <label className="text-sm font-medium text-gray-700">
                  Giờ mở cửa
                </label>
                <Input type="time" defaultValue="08:00" className="mt-1" />
              </div>
              <div className="col-span-3">
                <label className="text-sm font-medium text-gray-700">
                  Giờ đóng cửa
                </label>
                <Input type="time" defaultValue="17:00" className="mt-1" />
              </div>
              <div className="col-span-3 flex items-end">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700">
                  Xóa
                </Button>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-teal-300 text-teal-600 hover:bg-teal-50"
            onClick={addOperatingTime}
            disabled={isSaving}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm giờ hoạt động
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
