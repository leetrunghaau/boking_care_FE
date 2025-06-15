import { AppointmentCard } from "./appointment-card";
import { EmptyState } from "./empty-state";
import { types } from "@/app/doctor/appointments/page";

export function AppointmentList({
  appointments,
  currentType,
}: AppointmentListProps) {
  if (!appointments || appointments.length === 0) {
    return <EmptyState filterType={currentType} />;
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}
interface AppointmentListProps {
  appointments: any[];
  currentType:  keyof typeof types;
}
