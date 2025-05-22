"use client"

import { useState } from "react"
import { Eye, MoreHorizontal, Receipt } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Dữ liệu mẫu cho thanh toán
const payments = [
    {
        id: "INV-001-2023",
        patient: "Nguyễn Văn A",
        doctor: "BS. Trần Thị B",
        amount: 500000,
        date: "2023-12-15T08:30:00",
        method: "VNPAY",
        status: "completed",
    },
    {
        id: "INV-002-2023",
        patient: "Trần Văn C",
        doctor: "BS. Lê Thị D",
        amount: 750000,
        date: "2023-12-15T09:15:00",
        method: "MoMo",
        status: "completed",
    },
    {
        id: "INV-003-2023",
        patient: "Phạm Thị E",
        doctor: "BS. Hoàng Văn F",
        amount: 650000,
        date: "2023-12-15T10:00:00",
        method: "Thẻ tín dụng",
        status: "completed",
    },
    {
        id: "INV-004-2023",
        patient: "Lê Văn G",
        doctor: "BS. Nguyễn Thị H",
        amount: 850000,
        date: "2023-12-15T11:30:00",
        method: "VNPAY",
        status: "pending",
    },
    {
        id: "INV-005-2023",
        patient: "Hoàng Thị I",
        doctor: "BS. Trần Văn K",
        amount: 550000,
        date: "2023-12-15T13:00:00",
        method: "MoMo",
        status: "failed",
    },
    {
        id: "INV-006-2023",
        patient: "Nguyễn Văn L",
        doctor: "BS. Phạm Thị M",
        amount: 700000,
        date: "2023-12-15T14:30:00",
        method: "Thẻ tín dụng",
        status: "refunded",
    },
    {
        id: "INV-007-2023",
        patient: "Trần Thị N",
        doctor: "BS. Lê Văn O",
        amount: 600000,
        date: "2023-12-15T15:45:00",
        method: "VNPAY",
        status: "completed",
    },
    {
        id: "INV-008-2023",
        patient: "Phạm Văn P",
        doctor: "BS. Hoàng Thị Q",
        amount: 900000,
        date: "2023-12-15T16:30:00",
        method: "MoMo",
        status: "completed",
    },
]

// Format tiền VND
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(value)
}

// Format ngày giờ
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Hiển thị trạng thái thanh toán
const getStatusBadge = (status: string) => {
    switch (status) {
        case "completed":
            return <Badge className="bg-emerald-500">Thành công</Badge>
        case "pending":
            return <Badge variant="outline" className="text-amber-500 border-amber-500">Chờ thanh toán</Badge>
        case "failed":
            return <Badge variant="destructive">Thất bại</Badge>
        case "refunded":
            return <Badge variant="secondary">Hoàn tiền</Badge>
        default:
            return <Badge variant="outline">Không xác định</Badge>
    }
}

type AdminPaymentListProps = {
    status?: string
}

export function AdminPaymentList({ status }: AdminPaymentListProps) {
    const filteredPayments = status
        ? payments.filter(payment => payment.status === status)
        : payments

    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mã giao dịch</TableHead>
                            <TableHead>Bệnh nhân</TableHead>
                            <TableHead className="hidden md:table-cell">Bác sĩ</TableHead>
                            <TableHead>Số tiền</TableHead>
                            <TableHead className="hidden md:table-cell">Thời gian</TableHead>
                            <TableHead className="hidden md:table-cell">Phương thức</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPayments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell className="font-medium">{payment.id}</TableCell>
                                <TableCell>{payment.patient}</TableCell>
                                <TableCell className="hidden md:table-cell">{payment.doctor}</TableCell>
                                <TableCell>{formatCurrency(payment.amount)}</TableCell>
                                <TableCell className="hidden md:table-cell">{formatDate(payment.date)}</TableCell>
                                <TableCell className="hidden md:table-cell">{payment.method}</TableCell>
                                <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                                                <Eye className="mr-2 h-4 w-4" />
                                                Xem chi tiết
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Receipt className="mr-2 h-4 w-4" />
                                                Xuất hóa đơn
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
    )
}