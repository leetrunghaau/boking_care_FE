import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AdminPaymentStats() {
  // Format tiền VND
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Tổng doanh thu</CardDescription>
          <CardTitle className="text-2xl">{formatCurrency(282300000)}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500">+12.5%</span> so với tháng trước
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Giao dịch thành công</CardDescription>
          <CardTitle className="text-2xl">3,245</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500">+8.2%</span> so với tháng trước
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Giao dịch đang chờ</CardDescription>
          <CardTitle className="text-2xl">42</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500">+15.1%</span> so với tháng trước
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Tỷ lệ thành công</CardDescription>
          <CardTitle className="text-2xl">96.8%</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500">+1.2%</span> so với tháng trước
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
