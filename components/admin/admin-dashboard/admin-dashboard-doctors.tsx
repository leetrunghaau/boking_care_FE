import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function AdminDashboardDoctors() {
  const doctors = [
    {
      id: 1,
      name: "TS. BS. Nguyễn Văn A",
      specialty: "Tim mạch",
      avatar: "/placeholder.svg?height=40&width=40",
      appointments: 45,
      rating: 4.9,
      progress: 90,
    },
    {
      id: 2,
      name: "PGS. TS. Trần Thị B",
      specialty: "Nhi khoa",
      avatar: "/placeholder.svg?height=40&width=40",
      appointments: 38,
      rating: 4.8,
      progress: 85,
    },
    {
      id: 3,
      name: "BS. CKI. Lê Văn C",
      specialty: "Da liễu",
      avatar: "/placeholder.svg?height=40&width=40",
      appointments: 32,
      rating: 4.7,
      progress: 75,
    },
    {
      id: 4,
      name: "BS. CKII. Phạm Thị D",
      specialty: "Thần kinh",
      avatar: "/placeholder.svg?height=40&width=40",
      appointments: 29,
      rating: 4.6,
      progress: 70,
    },
  ]

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
            <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{doctor.name}</p>
              <Badge variant="outline" className="text-xs">
                {doctor.appointments} lịch hẹn
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{doctor.specialty}</span>
              <span className="flex items-center">⭐ {doctor.rating}</span>
            </div>
            <Progress value={doctor.progress} className="h-1.5" />
          </div>
        </div>
      ))}
    </div>
  )
}
