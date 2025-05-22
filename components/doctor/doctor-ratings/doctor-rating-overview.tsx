import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Star, MessageSquare, ThumbsUp } from "lucide-react"

interface DoctorRatingOverviewProps {
  ratingData: {
    average: number
    total: number
    distribution: Array<{
      stars: number
      count: number
    }>
    responseRate: number
  }
}

export function DoctorRatingOverview({ ratingData }: DoctorRatingOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Điểm đánh giá trung bình */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-500">Điểm trung bình</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-4xl font-bold text-teal-600">{ratingData.average}</div>
                <div className="flex flex-col">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= Math.round(ratingData.average) ? "fill-current" : "fill-none"}`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-slate-500">{ratingData.total} đánh giá</div>
                </div>
              </div>
            </div>
            <div className="h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center">
              <Star className="h-8 w-8 text-teal-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tỷ lệ phản hồi */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-500">Tỷ lệ phản hồi</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-4xl font-bold text-blue-600">{ratingData.responseRate}%</div>
                <div className="flex flex-col">
                  <div className="text-sm text-slate-700">Đã phản hồi</div>
                  <div className="text-xs text-slate-500">
                    {Math.round((ratingData.total * ratingData.responseRate) / 100)} / {ratingData.total}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tỷ lệ hài lòng */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-500">Tỷ lệ hài lòng</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-4xl font-bold text-green-600">
                  {Math.round(
                    ((ratingData.distribution[0].count + ratingData.distribution[1].count) / ratingData.total) * 100,
                  )}
                  %
                </div>
                <div className="flex flex-col">
                  <div className="text-sm text-slate-700">4-5 sao</div>
                  <div className="text-xs text-slate-500">
                    {ratingData.distribution[0].count + ratingData.distribution[1].count} đánh giá
                  </div>
                </div>
              </div>
            </div>
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <ThumbsUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phân bố đánh giá */}
      <Card className="md:col-span-3">
        <CardContent className="p-6">
          <h3 className="text-sm font-medium text-slate-500 mb-4">Phân bố đánh giá</h3>
          <div className="space-y-3">
            {ratingData.distribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="w-10 text-sm font-medium flex items-center gap-1">
                  {item.stars} <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                </div>

                <Progress
                  value={(item.count / ratingData.total) * 100}
                  className={cn(
                    "h-3 flex-1",
                    item.stars >= 4
                      ? "bg-green-500"
                      : item.stars === 3
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  )}
                />
                <div className="w-16 text-sm text-right">
                  <span className="font-medium">{item.count}</span>
                  <span className="text-slate-500 ml-1">({Math.round((item.count / ratingData.total) * 100)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
