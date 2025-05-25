import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, HelpCircle } from "lucide-react"
import { getIconByName } from "@/helper/icon-map"

interface SpecialtyCardProps {
  name: string
  slug: string
  icon: string 
  title?: string
}


export default function SpecialtyCard({ name, slug, icon, title }: SpecialtyCardProps) {
  const Icon = getIconByName(icon)

  return (
    <Link href={`/chuyen-khoa/${slug}`} className="group">
      <Card className="h-full transition-shadow hover:shadow-md hover:border-teal-600">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-teal-50">
           <Icon className="w-7 h-7 text-teal-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
          {title && <p className="text-sm text-muted-foreground">{title}</p>}
          <div className="flex items-center gap-1 text-teal-600 text-sm mt-2 group-hover:underline">
            Xem chi tiết <ChevronRight className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
