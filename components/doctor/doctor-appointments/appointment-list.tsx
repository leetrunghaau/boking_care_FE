import { AppointmentCard, type AppointmentData } from "./appointment-card"
import { EmptyState } from "./empty-state"

interface AppointmentListProps {
  appointments: AppointmentData[]
  filterType: string
}

export function AppointmentList({ appointments, filterType }: AppointmentListProps) {
  if (!appointments || appointments.length === 0) {
    return <EmptyState filterType={filterType} />
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  )
}
