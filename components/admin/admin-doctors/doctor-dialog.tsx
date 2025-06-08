"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Briefcase, Phone, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import DoctorReviews from "@/components/doctor-page/detail/doctor-reviews";
import DoctorAbout from "@/components/doctor-page/detail/doctor-about";
import DoctorExperience from "@/components/doctor-page/detail/doctor-experience";
import DoctorSchedule from "@/components/doctor-page/detail/doctor-schedule";
import HospitalInfo from "@/components/doctor-page/detail/hospital-info";
import { handleApiError } from "@/helper/toast-utils";
import { getFullURL } from "@/helper/url";
import http from "@/helper/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  slug: string | null;
};

export default function DoctorDetailDialog({ open, onClose, slug }: Props) {
  const [doctor, setDoctor] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("about");

  useEffect(() => {
    if (!open || !slug) return;

    const fetchDoctor = async () => {
      setLoading(true);
      try {
        const res = await http.get(`/doctor-site/doctor/${slug}`);
        console.log("thông tin bác sĩ", res)
        setDoctor(res);
      } catch (err) {
        handleApiError(err, "Lấy chi tiết bác sĩ thất bại.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [slug, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thông tin bác sĩ</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="text-center py-10">Đang tải dữ liệu...</div>
        ) : doctor ? (
          <div className="grid grid-cols-1  py-6 px-1">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative w-40 h-40 mx-auto md:mx-0 rounded-lg overflow-hidden border">
                      <Image
                        src={getFullURL(doctor?.img) || `/placeholder.svg`}
                        alt={doctor?.name ?? "bac si"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h1 className="text-2xl font-bold">{doctor?.name}</h1>
                      <div className="flex items-center gap-1 mt-2 justify-center md:justify-start">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor?.rating}</span>
                        <span className="text-muted-foreground">
                          ({doctor?.reviews} đánh giá)
                        </span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-start gap-2 justify-center md:justify-start">
                          <Briefcase className="h-5 w-5 text-teal-600 mt-0.5" />
                          <span>{doctor?.specialty?.name}</span>
                        </div>
                        <div className="flex items-start gap-2 justify-center md:justify-start">
                          <MapPin className="h-5 w-5 text-teal-600 mt-0.5" />
                          <span>{doctor?.address}</span>
                        </div>
                        <div className="flex items-start gap-2 justify-center md:justify-start">
                          <Phone className="h-5 w-5 text-teal-600 mt-0.5" />
                          <span>Hotline: {doctor?.phone}</span>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                        {doctor?.technique?.slice(0, 3).map((i: any) => (
                          <Badge key={i.id} variant="outline" className="bg-teal-50 text-teal-700">
                            {i.name}
                          </Badge>
                        ))}
                        {doctor?.technique?.length > 3 && (
                          <Badge variant="outline" className="bg-slate-50">
                            +{doctor.technique.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs Section */}
              <Tabs value={tab} onValueChange={setTab} className="mb-8">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="about">Giới thiệu</TabsTrigger>
                  <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                  <DoctorAbout doctor={doctor} />
                </TabsContent>
                <TabsContent value="experience">
                  <DoctorExperience doctor={doctor} />
                </TabsContent>
              </Tabs>
            </div>

           
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            Không tìm thấy bác sĩ
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
