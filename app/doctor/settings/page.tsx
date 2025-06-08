"use client";
// React core and hooks
import { useState } from "react";

// UI components - Data display
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Icons
import {
  Bell,
  Calendar,
  Eye,
  EyeOff,
  Globe,
  Key,
  Lock,
  LogOut,
  Moon,
  Save,
  Settings,
  Smartphone,
  Sun,
  User,
} from "lucide-react";

// Doctor components
import { DoctorHeader } from "@/components/doctor/doctor-header";
import AccountSettings from "@/components/doctor/setting/account";
import SecuritySettings from "@/components/doctor/setting/security";
import { handleApiSuccess } from "@/helper/toast-utils";
import useAuthStore from "@/store/auth";

export default function DoctorSettingsPage() {
  //State
  const [activeTab, setActiveTab] = useState("account");
    const { logOut } = useAuthStore();


  const handleLogout = () => {
    logOut();
    handleApiSuccess("Đăng xuất thành công");
  };
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Tiêu đề trang */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Cài đặt
        </h1>
      </div>

      {/* Tabs cài đặt */}
      <Tabs
        defaultValue="account"
        value={activeTab}
        onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <Card className="md:w-64">
            <CardContent className="p-4">
              <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                <TabsTrigger
                  value="account"
                  className="justify-start px-3 data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">
                  <User className="h-4 w-4 mr-2" />
                  Tài khoản
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="justify-start px-3 data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">
                  <Lock className="h-4 w-4 mr-2" />
                  Bảo mật
                </TabsTrigger>
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="justify-start px-3 text-red-500 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </Button>
              </TabsList>
            </CardContent>
          </Card>

          {/* Nội dung tab */}
          <div className="flex-1">
            <TabsContent value="account" className="m-0">
              <AccountSettings />
            </TabsContent>
            <TabsContent value="security" className="m-0">
              <SecuritySettings />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

