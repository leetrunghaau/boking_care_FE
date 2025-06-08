"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getFullURL } from "@/helper/url";
import http from "@/helper/axios";
import { handleErorr } from "@/helper/toast-utils";
import { DoctorProfileInfo } from "@/components/doctor/doctor-profile/doctor-profile-info";
import { DoctorProfileExperience } from "@/components/doctor/doctor-profile/doctor-profile-experience";
import { DoctorProfileEducation } from "@/components/doctor/doctor-profile/doctor-profile-education";
import { DoctorProfileCertificates } from "@/components/doctor/doctor-profile/doctor-profile-certificates";
export default function DoctorProfilePage() {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await http.get<any>("/doctor-profile/profile");
        if (res) {
          setInfo(res);
          console.log("thông tin ", res);
        } else {
          handleErorr(res?.st ?? "Không thể lấy thông tin bác sĩ");
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin bác sĩ:", err);
        handleErorr("Lỗi khi gọi API");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto py-6 space-y-6 w-11/12">
      {/* Tiêu đề trang */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Hồ sơ cá nhân
        </h1>
      </div>

      {/* Thông tin cá nhân */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột bên trái - Ảnh đại diện và thông tin cơ bản */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                  <AvatarImage
                    src={getFullURL(info?.img) || "/placeholder.svg"}
                    alt={info?.name}
                  />
                  <AvatarFallback className="text-3xl">
                    {info?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <h2 className="text-xl font-bold text-slate-800">{info?.name}</h2>
              <p className="text-sm text-slate-500 mt-1">{info?.specialty}</p>

              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                {info?.techniques?.map((t: any) => (
                  <Badge
                    key={t.id}
                    className="bg-teal-100 text-teal-800 hover:bg-teal-200">
                    {t.techniqueName}
                  </Badge>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="w-full space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Giới tính:</span>
                  <span className="text-sm font-medium">{info?.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Ngày sinh:</span>
                  <span className="text-sm font-medium">
                    {info?.dateOfBirth}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Ngôn ngữ:</span>
                  <span className="text-sm font-medium">
                    {info?.languages.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Phí khám bệnh:</span>
                  <span className="text-sm font-medium">{info?.price}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="info">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="info">Thông tin</TabsTrigger>
              <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
              <TabsTrigger value="education">Học vấn</TabsTrigger>
              <TabsTrigger value="certificates">Chứng chỉ</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6">
              <DoctorProfileInfo info={info} />
            </TabsContent>

            <TabsContent value="experience" className="mt-6">
              <DoctorProfileExperience info={info} />
            </TabsContent>

            <TabsContent value="education" className="mt-6">
              <DoctorProfileEducation info={info} />
            </TabsContent>

            <TabsContent value="certificates" className="mt-6">
              <DoctorProfileCertificates info={info} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
