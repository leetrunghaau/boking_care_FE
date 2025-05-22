"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/ui/chart"

// Dữ liệu mẫu cho phương thức thanh toán
const paymentMethodData = [
  { name: "VNPAY", Số_lượng: 1250, Tỷ_lệ: 38.5 },
  { name: "MoMo", Số_lượng: 980, Tỷ_lệ: 30.2 },
  { name: "Thẻ tín dụng", Số_lượng: 650, Tỷ_lệ: 20.0 },
  { name: "Tiền mặt", Số_lượng: 365, Tỷ_lệ: 11.3 },
]

export function AdminPaymentMethods() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Phương thức thanh toán</CardTitle>
        <CardDescription>Phân bố giao dịch theo phương thức thanh toán</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          data={paymentMethodData}
          categories={["Số_lượng"]}
          index="name"
          colors={["#0ea5e9"]}
          valueFormatter={(value: number) => `${value} giao dịch`}
          className="h-[300px]"
        />
      </CardContent>
    </Card>
  )
}