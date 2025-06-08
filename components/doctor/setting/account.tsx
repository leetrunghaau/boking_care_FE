"use client"

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { handleApiSuccess, handleErorr } from "@/helper/toast-utils";
import http from "@/helper/axios";

function AccountSettings() {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Gọi API khi component được mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const res = await http.get<any>(`/doctor-setting/info`)
        if (res) {
          setUserData(res)
        }else{
          handleErorr(res?.st ?? "Cập nhật không thành công")
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    };
    fetchUserData();
  }, []);

   const hanhdleSubmit = async () => {
      setLoading(true)
      try {
        const res = await http.post<any>(`/doctor-setting/info`, userData)
        if (res?.data) {
          setUserData(res?.data)
          handleApiSuccess("Bạn đã cập nhật thon tin thành công")
        } else{
          handleErorr(res?.st ?? "Cập nhật không thành công")
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin tài khoản</CardTitle>
          <CardDescription>
            Cập nhật thông tin tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                value={userData.fullName}
                onChange={(e) =>
                  setUserData({ ...userData, fullName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={hanhdleSubmit}>
            <Save className="h-4 w-4 mr-1" />
            Lưu thay đổi
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AccountSettings;
