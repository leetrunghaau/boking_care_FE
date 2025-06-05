import {
  Bell,
  CalendarCheck,
  AlarmClock,
  Tag,
  HelpCircle,
} from "lucide-react";


export const notificationTypeVN = (type: string): string => {
  const typeMap: Record<string, string> = {
    general: "Chung",
    appointment: "Lịch hẹn",
    reminder: "Nhắc nhở",
    promotion: "Khuyến mãi",
  };

  return typeMap[type] || "Không rõ loại";
};


export const getNotificationIcon = (type: string): React.ElementType => {
  const iconMap: Record<string, React.ElementType> = {
    general: Bell,
    appointment: CalendarCheck,
    reminder: AlarmClock,
    promotion: Tag,
  };

  return iconMap[type] || HelpCircle;
};