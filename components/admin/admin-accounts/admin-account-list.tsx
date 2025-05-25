"use client";

import { useState, useEffect } from "react";
import { Edit, Key, MoreHorizontal, Trash, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
// Utilities
import http from "@/helper/axios";

interface AdminAccount {
  id: number;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: "active" | "inactive";
  avatar: string;
}

export function AdminAccountList() {
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllAccounts = async () => {
      try {
        const res = await http.get<AdminAccount[]>(`/admin-account/accounts`);
        setAccounts(res);
        console.log("Fetched Accounts:", res);
      } catch (err) {
        console.error("Failed to fetch account:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAccounts();
  }, []);
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead className="hidden md:table-cell">
                Hoạt động cuối
              </TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={account.avatar || "/placeholder.svg"}
                        alt={account.name}
                      />
                      <AvatarFallback>
                        {" "}
                        {account.name ? account.name.charAt(0) : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{account.name ? account.name : "?"}</span>
                  </div>
                </TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.role}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Intl.DateTimeFormat("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(account.lastActive))}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      account.status === "active" ? "default" : "secondary"
                    }>
                    {account.status === "active" ? "Hoạt động" : "Tạm ngưng"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Mở menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCog className="mr-2 h-4 w-4" />
                        Phân quyền
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Key className="mr-2 h-4 w-4" />
                        Đặt lại mật khẩu
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
