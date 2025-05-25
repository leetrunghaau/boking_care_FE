"use client";
import { useState, useEffect } from "react";
import http from "@/helper/axios";
import { Eye, MoreHorizontal, Lock, Unlock, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredDate: string;
  lastActive: string;
  appointments: number;
  status: UserStatus;
  avatar: string;
}

export function AdminUserList() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllFacilities = async () => {
      try {
        const res = await http.get<User[]>(`/admin-users/users`);
        setUsers(res);
        console.log("Fetched users:", res);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFacilities();
  }, []);
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Người dùng</TableHead>
            <TableHead>Liên hệ</TableHead>
            <TableHead>Ngày đăng ký</TableHead>
            <TableHead>Hoạt động gần đây</TableHead>
            <TableHead>Lịch hẹn</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ID: {user.id}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <p>{user.email}</p>
                  <p className="text-muted-foreground">{user.phone}</p>
                </div>
              </TableCell>
              <TableCell>{user.registeredDate}</TableCell>
              <TableCell>{user.lastActive}</TableCell>
              <TableCell>{user.appointments}</TableCell>
              <TableCell>
                <Badge
                  variant={user.status === "active" ? "outline" : "secondary"}>
                  {user.status === "active" ? "Hoạt động" : "Đã khóa"}
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
                    <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Xem chi tiết</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Chỉnh sửa</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {user.status === "active" ? (
                      <DropdownMenuItem>
                        <Lock className="mr-2 h-4 w-4" />
                        <span>Khóa tài khoản</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <Unlock className="mr-2 h-4 w-4" />
                        <span>Mở khóa</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Xóa tài khoản</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-sm text-muted-foreground">
          Hiển thị 1-5 của 100 người dùng
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
