"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, Mail, Phone, Search, UserPlus } from "lucide-react"

interface AdminSupportTeamProps {
  team: any[]
}

export function AdminSupportTeam({ team }: AdminSupportTeamProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("list")

  // Lọc thành viên
  const filteredTeam = team.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Định dạng trạng thái
  const statusConfig = {
    online: { label: "Trực tuyến", color: "bg-green-100 text-green-700" },
    away: { label: "Vắng mặt", color: "bg-yellow-100 text-yellow-700" },
    offline: { label: "Ngoại tuyến", color: "bg-slate-100 text-slate-700" },
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Đội ngũ hỗ trợ</CardTitle>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <UserPlus className="h-4 w-4 mr-1" />
            Thêm thành viên
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="list">Danh sách</TabsTrigger>
            <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
            <TabsTrigger value="schedule">Lịch trực</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Tìm kiếm thành viên..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <TabsContent value="list" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thành viên</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Bộ phận</TableHead>
                      <TableHead>Liên hệ</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeam.map((member) => {
                      const status = statusConfig[member.status as keyof typeof statusConfig]

                      return (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{member.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{member.role}</TableCell>
                          <TableCell>{member.department}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={status.color}>{status.label}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Xem chi tiết
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thành viên</TableHead>
                      <TableHead>Yêu cầu đang xử lý</TableHead>
                      <TableHead>Đã giải quyết</TableHead>
                      <TableHead>Thời gian phản hồi TB</TableHead>
                      <TableHead>Thời gian giải quyết TB</TableHead>
                      <TableHead>Đánh giá</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeam.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{member.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{member.activeTickets}</TableCell>
                        <TableCell>{member.resolvedTickets}</TableCell>
                        <TableCell>1.5 giờ</TableCell>
                        <TableCell>8.2 giờ</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">4.8</span>
                            <span className="text-yellow-500">★★★★★</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTeam.map((member) => (
                  <Card key={member.id} className="overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-slate-500">{member.role}</p>
                        </div>
                      </div>
                      <Badge className={statusConfig[member.status as keyof typeof statusConfig].color}>
                        {statusConfig[member.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                        <div>T2</div>
                        <div>T3</div>
                        <div>T4</div>
                        <div>T5</div>
                        <div>T6</div>
                        <div>T7</div>
                        <div>CN</div>
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 7 }).map((_, index) => {
                          // Giả lập lịch trực
                          const isWorking = index < 5 // Làm việc từ T2-T6
                          return (
                            <div
                              key={index}
                              className={`h-8 rounded flex items-center justify-center ${
                                isWorking ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"
                              }`}
                            >
                              {isWorking && <CheckCircle2 className="h-4 w-4" />}
                            </div>
                          )
                        })}
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        <p>Giờ làm việc: 8:00 - 17:00</p>
                        <p>Nghỉ trưa: 12:00 - 13:30</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
