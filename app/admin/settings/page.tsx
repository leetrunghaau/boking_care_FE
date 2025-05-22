import { Metadata } from "next"
import { Save } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminGeneralSettings } from "@/components/admin/admin-settings/admin-general-settings"
import { AdminEmailSettings } from "@/components/admin/admin-settings/admin-email-settings"
import { AdminPaymentSettings } from "@/components/admin/admin-settings/admin-payment-settings"
import { AdminSecuritySettings } from "@/components/admin/admin-settings/admin-security-settings"
import { AdminBackupSettings } from "@/components/admin/admin-settings/admin-backup-settings"

export const metadata: Metadata = {
  title: "Cài đặt Hệ thống",
  description: "Quản lý cài đặt hệ thống",
}

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cài đặt Hệ thống</h1>
          <p className="text-muted-foreground">
            Quản lý cài đặt và cấu hình hệ thống
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Lưu thay đổi
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="payment">Thanh toán</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="backup">Sao lưu & Phục hồi</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-4">
          <AdminGeneralSettings />
        </TabsContent>
        <TabsContent value="email" className="mt-4">
          <AdminEmailSettings />
        </TabsContent>
        <TabsContent value="payment" className="mt-4">
          <AdminPaymentSettings />
        </TabsContent>
        <TabsContent value="security" className="mt-4">
          <AdminSecuritySettings />
        </TabsContent>
        <TabsContent value="backup" className="mt-4">
          <AdminBackupSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}