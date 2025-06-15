// app/edit-profile/page.tsx (hoặc đường dẫn tương tự của bạn)
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvatarUploader } from "@/components/share/avata-upload";
import http from "@/helper/axios";
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils";
import { getFullURL } from "@/helper/url";

import PersonalInfoCard from "./PersonalInfoCard";
import RelativeInfoCard from "./RelativeInfoCard";

export default function EditProfilePage() {
  const [form, setForm] = useState({
    img: "",
    name: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
  });
  const [relative, setRelative] = useState({
    name: "",
    relationship: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleRelativeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setRelative((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleGenderChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, gender: value }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get<any>("/patient/my-info");
        if (res?.status && !fetched.current) {
          setForm((prev) => ({ ...prev, ...res.info, gender: res.info.genderEN }));
          setRelative((prev) => ({ ...prev, ...res.relative }));
          fetched.current = true;
        }
      } catch (err) {
        handleApiError(err, "Không thể tải thông tin cá nhân");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const handleSubmit = async () => {
    try {
      const res = await http.post<any>("/patient/info", {
        info: form,
        relative,
      });
      if (res?.status) {
        handleApiSuccess("Thông tin tài khoản được cập nhật thành công.");
      } else {
        handleApiError(res?.mess, "Cập nhật thông tin cá nhân thất bại.");
      }
    } catch (err) {
      handleApiError(err, "Cập nhật thông tin thất bại.");
    }
  };

  const handleAvatarChange = async (change: any) => {
    try {
      if (change.type === "new") {
        const rs = await http.postFile<string | null>("/patient/avatar", change.value);
        if (rs) {
          setForm(prev => ({ ...prev, img: rs }));
        }
      } else if (change.type === "remove") {
        await http.delete("/patient/avatar");
        setForm((prev) => ({ ...prev, img: "" }));
      }
    } catch (err) {
      handleApiError(err, "Không thể xử lý ảnh đại diện");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">
          Chỉnh sửa hồ sơ cá nhân
        </h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Quay lại
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Ảnh đại diện */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Ảnh đại diện</CardTitle>
          </CardHeader>
          <CardContent>
            <AvatarUploader
              initialAvatar={getFullURL(form.img)}
              onChange={handleAvatarChange}
            />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500 text-center w-full">
              Click hoặc kéo thả để chọn ảnh đại diện.
            </p>
          </CardFooter>
        </Card>

        {/* Component Thông tin cá nhân */}
        <PersonalInfoCard
          form={form}
          handleChange={handleChange}
          handleGenderChange={handleGenderChange}
        />
      </div>

      {/* Component Thông tin người thân */}
      <RelativeInfoCard
        relative={relative}
        handleRelativeChange={handleRelativeChange}
      />

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 text-white">
          Lưu thay đổi
        </Button>
      </div>
    </main>
  );
}
