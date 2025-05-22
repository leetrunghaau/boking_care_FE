import { Button } from "@/components/ui/button"
import { Headset, Phone } from "lucide-react"

export function SupportHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4 border-b">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <Headset className="h-8 w-8 text-teal-600" />
          Trung tâm hỗ trợ
        </h1>
        <p className="text-slate-500 mt-1">Giải đáp thắc mắc và hỗ trợ kỹ thuật</p>
      </div>
      <Button variant="outline" className="flex items-center gap-2">
        <Phone className="h-4 w-4" />
        <span>Hotline: 1900 1234</span>
      </Button>
    </div>
  )
}
