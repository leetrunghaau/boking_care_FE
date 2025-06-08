"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Plus, X, Trash2, Upload, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { getFullURL } from '@/helper/url';
import EditHospitalBasicCard from "@/components/admin/admin-hospital/edit/basic";


export default function EditFacilityPage() {
 
  return (

    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Chỉnh sửa cơ sở y tế</h1>
        
      </div>

     

      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="services">Dịch vụ & Chuyên khoa</TabsTrigger>
          <TabsTrigger value="doctors">Bác sĩ</TabsTrigger>
          <TabsTrigger value="gallery">Hình ảnh</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
         <EditHospitalBasicCard />
        </TabsContent>

        <TabsContent value="services" className="space-y-4 mt-4">
          
        </TabsContent>

        <TabsContent value="doctors" className="space-y-4 mt-4">
          
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4 mt-4">
          
        </TabsContent>


      </Tabs>
    </div>
  );
}
