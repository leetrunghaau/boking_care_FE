import { Metadata } from "next"
import { Plus, Search } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminAccountList } from "@/components/admin/admin-accounts/admin-account-list"
import { AdminRoleList } from "@/components/admin/admin-accounts/admin-role-list"
import { AdminActivityLog } from "@/components/admin/admin-accounts/admin-activity-log"

export const metadata: Metadata = {
  title: "Quản lý Tài khoản & Phân quyền",
  description: "Quản lý tài khoản admin và phân quyền trong hệ thống",
}

export default function AdminAccountsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tài khoản & Phân quyền</h1>
          <p className="text-muted-foreground">
            Quản lý tài khoản admin và phân quyền trong hệ thống
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm tài khoản
        </Button>
      </div>

      <Tabs defaultValue="accounts">
        <TabsList>
          <TabsTrigger value="accounts">Tài khoản</TabsTrigger>
          <TabsTrigger value="roles">Vai trò & Quyền</TabsTrigger>
          <TabsTrigger value="logs">Nhật ký hoạt động</TabsTrigger>
        </TabsList>
        <TabsContent value="accounts" className="mt-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm tài khoản..."
                className="pl-8"
              />
            </div>
          </div>
          <AdminAccountList />
        </TabsContent>
        <TabsContent value="roles" className="mt-4">
          <AdminRoleList />
        </TabsContent>
        <TabsContent value="logs" className="mt-4">
          <AdminActivityLog />
        </TabsContent>
      </Tabs>
    </div>
  )
}