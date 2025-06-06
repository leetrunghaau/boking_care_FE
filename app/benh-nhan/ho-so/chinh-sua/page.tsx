"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvatarUploader } from "@/components/share/avata-upload";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import http from "@/helper/axios";
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils";
import { getFullURL } from "@/helper/url";

export default function EditProfilePage() {
  const [form, setForm] = useState({
    img: null,
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRelativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRelative({ ...relative, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get<any>("/patient/my-info");
        console.log("jaf", res);
        if (res && res.status) {
          setForm(res.info);
          setRelative(res.relative);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async () => {
    try {
      const info = await http.post<any>("/patient/info", {
        info: form,
        relative: relative,
      });

      if (info && info.status) {
        setForm(info.info);
        setRelative(info.relative);
      } else {
        handleApiError(info?.mess, "Cập nhật thông tin cá nhân thất bại.");

        return;
      }

      handleApiSuccess("Thông tin tài khoản được cập nhật thành công.");
    } catch (err) {
      handleApiError(err, "Cập nhật thông tin thất bại.");
    } finally {
    }
  };

  const Field = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      {children}
    </div>
  );

  const handleAvatarChange = async (change: any) => {
    if (change.type === "new") {
      try {
        await http.postFile("/patient/avatar", change.value);
      } catch (err) {
        handleApiError(err, "Không thể tải lên ảnh đại diện");
      }
    }
    if (change.type === "remove") {
      try {
        await http.delete("/patient/avatar");
      } catch (err) {
        handleApiError(err, "Không thể xoá avatar");
      }
    }
  };

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
              Click hoặt kéo thả để chọn ảnh đại điện.
            </p>
          </CardFooter>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Họ và tên">
              <Input name="name" value={form.name} onChange={handleChange} />
            </Field>
            <Field label="Ngày sinh">
              <Input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
              />
            </Field>
            <Field label="Giới tính">
              <Select
                value={form.gender}
                onValueChange={(v) => setForm({ ...form, gender: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Số điện thoại">
              <Input name="phone" value={form.phone} onChange={handleChange} />
            </Field>
            <Field label="Email">
              <Input name="email" value={form.email} onChange={handleChange} />
            </Field>
            <Field label="Địa chỉ">
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </Field>
          </CardContent>
        </Card>
      </div>

      {/* Người thân */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin người thân liên lạc khi cần</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Họ và tên người thân">
            <Input
              name="name"
              value={relative?.name ?? ""}
              onChange={handleRelativeChange}
            />
          </Field>
          <Field label="Mối quan hệ">
            <Input
              name="relationship"
              value={relative?.relationship ?? ""}
              onChange={handleRelativeChange}
            />
          </Field>
          <Field label="Số điện thoại người thân">
            <Input
              name="phone"
              value={relative?.phone ?? ""}
              onChange={handleRelativeChange}
            />
          </Field>
          <Field label="Địa chỉ người thân">
            <Input
              name="address"
              value={relative?.address ?? ""}
              onChange={handleRelativeChange}
            />
          </Field>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 text-white">
          Lưu thay đổi
        </Button>
      </div>
    </main>
  );
}
