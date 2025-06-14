"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditHospitalBasicCard from "@/components/admin/admin-hospital/edit/edit-hospital-basic-card";
import EditDoctorsComponent from "@/components/admin/admin-hospital/edit/edit-doctors";
import EditServiceAndSpecailtyCard from "@/components/admin/admin-hospital/edit/edit-service-specialty";
import Gallery from "@/components/admin/admin-hospital/edit/gallery";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditFacilityPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start">
      <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/admin/facilities")}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
        <h1 className="text-3xl font-bold">Chỉnh sửa cơ sở y tế</h1>
      </div>

      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="doctors">Bác sĩ</TabsTrigger>
          <TabsTrigger value="services">Dịch vụ & Chuyên khoa</TabsTrigger>
          <TabsTrigger value="gallery">Hình ảnh</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <EditHospitalBasicCard />
        </TabsContent>
        <TabsContent value="doctors" className="space-y-4 mt-4">
          <EditDoctorsComponent />
        </TabsContent>
        <TabsContent value="services" className="space-y-4 mt-4">
          <EditServiceAndSpecailtyCard />
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4 mt-4">
          <Gallery />
        </TabsContent>
      </Tabs>
    </div>
  );
}
