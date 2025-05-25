"use client";

import { useState, useEffect } from "react";
import http from "@/helper/axios";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
}

type LogStatus = "success" | "warning" | "error";

interface ActivityLogs {
  id: number;
  user: UserInfo;
  action: string;
  target: string;
  timestamp: string;
  ip: string;
  status: LogStatus;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

// Hiển thị trạng thái
const getStatusBadge = (status: string) => {
  switch (status) {
    case "success":
      return <Badge className="bg-emerald-500">Thành công</Badge>;
    case "warning":
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-500">
          Cảnh báo
        </Badge>
      );
    case "error":
      return <Badge variant="destructive">Lỗi</Badge>;
    default:
      return <Badge variant="outline">Không xác định</Badge>;
  }
};

export function AdminActivityLog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activityLogs, setActivityLogs] = useState<ActivityLogs[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllActivities = async () => {
      try {
        const res = await http.get<ActivityLogs[]>(
          `/admin-activity/activities`
        );
        setActivityLogs(res);
        console.log("Fetched Activities:", res);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllActivities();
  }, []);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm nhật ký..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Loại hoạt động" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="login">Đăng nhập</SelectItem>
            <SelectItem value="update">Cập nhật</SelectItem>
            <SelectItem value="create">Tạo mới</SelectItem>
            <SelectItem value="delete">Xóa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Người dùng</TableHead>
                <TableHead>Hành động</TableHead>
                <TableHead className="hidden md:table-cell">
                  Đối tượng
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Thời gian
                </TableHead>
                <TableHead className="hidden md:table-cell">IP</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={log.user.avatar || "/placeholder.svg"}
                          alt={log.user.name}
                        />
                        <AvatarFallback>
                          {log.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {log.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {log.user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {log.target}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(log.timestamp)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {log.ip}
                  </TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
