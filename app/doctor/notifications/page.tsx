"use client";

// React core and hooks
import type React from "react";
import { useState } from "react";

// UI components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Date-fns utilities and locale
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

// Icons
import {
  Bell,
  Calendar,
  Check,
  CheckCheck,
  MessageSquare,
  Search,
  Settings,
  Star,
  Trash,
  User,
} from "lucide-react";

// Doctor schedule components
import { DoctorHeader } from "@/components/doctor/doctor-schedule/doctor-header";

export default function DoctorNotificationsPage() {
  //State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [notifications, setNotifications] = useState(getNotifications());

  // Thông tin bác sĩ
  const doctorInfo = {
    doctorId: "D-123456",
    doctorName: "BS. Nguyễn Văn A",
    specialty: "Nội khoa tổng quát",
    stats: {
      total: 120,
      booked: 15,
      completed: 105,
    },
  };

  // Lọc thông báo theo tab và từ khóa tìm kiếm
  const filteredNotifications = notifications.filter((notification) => {
    const matchesTab =
      selectedTab === "all" || notification.type === selectedTab;
    const matchesSearch =
      searchQuery === "" ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  //Icon configuration
  // Biểu tượng cho từng loại thông báo
  const notificationIcons = {
    appointment: <Calendar className="h-5 w-5 text-blue-500" />,
    review: <Star className="h-5 w-5 text-yellow-500" />,
    message: <MessageSquare className="h-5 w-5 text-green-500" />,
    system: <Bell className="h-5 w-5 text-purple-500" />,
    user: <User className="h-5 w-5 text-teal-500" />,
  };

  //Handlers
  // Đánh dấu tất cả là đã đọc
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Đánh dấu một thông báo là đã đọc
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Xóa một thông báo
  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // Xóa tất cả thông báo
  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  // Số lượng thông báo chưa đọc
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header với thông tin bác sĩ và thống kê */}
      <DoctorHeader
        doctorId={doctorInfo.doctorId}
        doctorName={doctorInfo.doctorName}
        specialty={doctorInfo.specialty}
        stats={doctorInfo.stats}
      />

      {/* Tiêu đề trang */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Thông báo
          </h1>
          {unreadCount > 0 && (
            <Badge className="bg-red-500">
              {unreadCount} {unreadCount === 1 ? "mới" : "mới"}
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4 mr-1" />
            <span>Đánh dấu tất cả đã đọc</span>
          </Button>
          <Button variant="outline" onClick={deleteAllNotifications}>
            <Trash className="h-4 w-4 mr-1" />
            <span>Xóa tất cả</span>
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-1" />
            <span>Cài đặt thông báo</span>
          </Button>
        </div>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm thông báo..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs và danh sách thông báo */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Danh sách thông báo</CardTitle>
          <CardDescription>
            Tất cả thông báo và cập nhật của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="appointment">Lịch hẹn</TabsTrigger>
              <TabsTrigger value="message">Tin nhắn</TabsTrigger>
              <TabsTrigger value="review">Đánh giá</TabsTrigger>
              <TabsTrigger value="system">Hệ thống</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <NotificationList
                notifications={filteredNotifications}
                icons={notificationIcons}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            </TabsContent>

            <TabsContent value="appointment" className="mt-6">
              <NotificationList
                notifications={filteredNotifications}
                icons={notificationIcons}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            </TabsContent>

            <TabsContent value="message" className="mt-6">
              <NotificationList
                notifications={filteredNotifications}
                icons={notificationIcons}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            </TabsContent>

            <TabsContent value="review" className="mt-6">
              <NotificationList
                notifications={filteredNotifications}
                icons={notificationIcons}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            </TabsContent>

            <TabsContent value="system" className="mt-6">
              <NotificationList
                notifications={filteredNotifications}
                icons={notificationIcons}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

interface Notification {
  id: string;
  type: string;
  message: string;
  time: Date;
  read: boolean;
  link?: string;
}

interface NotificationListProps {
  notifications: Notification[];
  icons: Record<string, React.ReactNode>;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

function NotificationList({
  notifications,
  icons,
  onMarkAsRead,
  onDelete,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-800 mb-2">
          Không có thông báo nào
        </h3>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          Bạn không có thông báo nào trong mục này. Các thông báo mới sẽ xuất
          hiện ở đây.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-4 p-4 rounded-md border ${
            notification.read ? "" : "bg-blue-50"
          }`}>
          <div className="mt-1">{icons[notification.type]}</div>
          <div className="flex-1">
            <p
              className={`${
                notification.read
                  ? "text-slate-700"
                  : "text-slate-900 font-medium"
              }`}>
              {notification.message}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-500">
                {formatDistanceToNow(notification.time, {
                  addSuffix: true,
                  locale: vi,
                })}
              </span>
              {!notification.read && (
                <Badge className="bg-blue-500 h-1.5 w-1.5 rounded-full p-0" />
              )}
            </div>
          </div>
          <div className="flex gap-1">
            {!notification.read && (
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => onMarkAsRead(notification.id)}>
                <Check className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDelete(notification.id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Dữ liệu mẫu cho thông báo
function getNotifications(): Notification[] {
  return [
    {
      id: "N-1",
      type: "appointment",
      message:
        "Bệnh nhân Nguyễn Văn X đã đặt lịch hẹn mới vào ngày 15/05/2023 lúc 09:00.",
      time: new Date(Date.now() - 30 * 60 * 1000), // 30 phút trước
      read: false,
      link: "/appointments/123",
    },
    {
      id: "N-2",
      type: "review",
      message:
        "Bạn nhận được đánh giá 5 sao mới từ bệnh nhân Trần Thị Y: 'Bác sĩ rất tận tâm và chuyên nghiệp.'",
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 giờ trước
      read: false,
      link: "/ratings",
    },
    {
      id: "N-3",
      type: "message",
      message:
        "Bệnh nhân Lê Văn Z đã gửi tin nhắn mới: 'Bác sĩ ơi, tôi có thể hỏi về kết quả xét nghiệm không?'",
      time: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 giờ trước
      read: true,
      link: "/messages/456",
    },
    {
      id: "N-4",
      type: "system",
      message:
        "Hệ thống đã được cập nhật lên phiên bản mới. Xem thêm về các tính năng mới.",
      time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 ngày trước
      read: true,
      link: "/updates",
    },
    {
      id: "N-5",
      type: "appointment",
      message:
        "Nhắc nhở: Bạn có lịch hẹn với bệnh nhân Phạm Thị H vào ngày mai lúc 10:30.",
      time: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000), // 1.5 ngày trước
      read: true,
      link: "/appointments/789",
    },
    {
      id: "N-6",
      type: "system",
      message: "Bạn đã được thêm vào nhóm 'Bác sĩ Nội khoa' trên hệ thống.",
      time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 ngày trước
      read: true,
      link: "/groups",
    },
    {
      id: "N-7",
      type: "message",
      message:
        "Quản trị viên đã gửi tin nhắn mới: 'Mời bác sĩ tham gia buổi hội thảo vào ngày 20/05/2023.'",
      time: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 ngày trước
      read: true,
      link: "/messages/admin",
    },
    {
      id: "N-8",
      type: "review",
      message: "Bạn nhận được đánh giá 4 sao mới từ bệnh nhân Hoàng Văn K.",
      time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 ngày trước
      read: true,
      link: "/ratings",
    },
    {
      id: "N-9",
      type: "appointment",
      message:
        "Bệnh nhân Vũ Thị M đã hủy lịch hẹn vào ngày 10/05/2023 lúc 14:00.",
      time: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 ngày trước
      read: true,
      link: "/appointments/101",
    },
    {
      id: "N-10",
      type: "system",
      message: "Nhắc nhở: Vui lòng cập nhật thông tin hồ sơ cá nhân của bạn.",
      time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 ngày trước
      read: true,
      link: "/profile",
    },
  ];
}
