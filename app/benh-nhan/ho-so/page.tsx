"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFullURL } from "@/helper/url";
import http from "@/helper/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ViewProfilePage() {
  const router = useRouter();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get<any>("/patient/my-info");
        if (res && res.status) {
          setForm(res.info);
          setRelative(res.relative);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const Field = ({ label, value }: { label: string; value?: string }) => (
    <div className="space-y-1">
      <p className="text-sm font-semibold text-gray-600">{label}</p>
      <p className="text-base text-gray-800">{value || "—"}</p>
    </div>
  );

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Hồ sơ cá nhân</h1>
        <Button onClick={() => router.push("/benh-nhan/ho-so/chinh-sua")}>
          Chỉnh sửa hồ sơ
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Ảnh đại diện</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            {form.img ? (
              <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                <Image
                  src={getFullURL(form.img) ?? "/placeholder.svg"}
                  alt="Avatar"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-[150px] h-[150px] bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                Không có ảnh
              </div>
            )}

          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Họ và tên" value={form.name} />
            <Field label="Ngày sinh" value={form.dob} />
            <Field label="Giới tính" value={form.gender} />
            <Field label="Số điện thoại" value={form.phone} />
            <Field label="Email" value={form.email} />
            <Field label="Địa chỉ" value={form.address} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin người thân liên lạc khi cần</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Họ và tên người thân" value={relative?.name || ""} />
          <Field label="Mối quan hệ" value={relative?.relationship || ""} />
          <Field label="Số điện thoại người thân" value={relative?.phone || ""} />
          <Field label="Địa chỉ người thân" value={relative?.address || ""} />
        </CardContent>
      </Card>
    </main>
  );
}
