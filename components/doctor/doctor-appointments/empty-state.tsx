import { Button } from "@/components/ui/button";
import { types } from "@/app/doctor/appointments/page";
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  filterType: keyof typeof types;
}

const emptyStateText = {
  thisDate: {
    title: "Không có lịch hẹn hôm nay",
    description: "Bạn không có lịch hẹn nào vào hôm nay.",
  },
  thisWeek: {
    title: "Không có lịch hẹn trong tuần này",
    description: "Bạn không có lịch hẹn nào trong tuần này.",
  },
  history: {
    title: "Chưa có lịch sử khám",
    description: "Bạn chưa có lịch sử khám bệnh nào.",
  },
  all: {
    title: "Không có lịch hẹn",
    description: "Bạn không có lịch hẹn nào.",
  },
} as const;

export function EmptyState({ filterType }: EmptyStateProps) {
  const typeKey = filterType in types ? filterType : "thisDate";
  const { icon: IconComponent, color } = types[typeKey];
  const { title, description } = emptyStateText[typeKey];
  const txtColor = `text-${color}-200`

  return (
    <div className="text-center py-16 px-4 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
      <div className={cn("flex justify-center mb-4", txtColor)}>
        <IconComponent className="h-12 w-12" />
      </div>
      <h3 className="text-lg font-medium text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 mb-6 max-w-md mx-auto">{description}</p>
      <Button variant="outline">Xem lịch làm việc</Button>
    </div>
  );
}
