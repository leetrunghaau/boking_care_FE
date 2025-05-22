import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"

export function DoctorRatingSummary() {
  // Dữ liệu mẫu cho đánh giá
  const ratingData = {
    average: 4.7,
    total: 120,
    distribution: [
      { stars: 5, count: 90 },
      { stars: 4, count: 20 },
      { stars: 3, count: 7 },
      { stars: 2, count: 2 },
      { stars: 1, count: 1 },
    ],
    recentReviews: [
      {
        patientName: "Nguyễn Văn X",
        rating: 5,
        comment: "Bác sĩ rất tận tâm và chuyên nghiệp.",
      },
      {
        patientName: "Trần Thị Y",
        rating: 4,
        comment: "Khám bệnh kỹ lưỡng, giải thích rõ ràng.",
      },
    ],
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-teal-600">{ratingData.average}</div>
          <div className="flex items-center justify-center text-yellow-400 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${star <= Math.round(ratingData.average) ? "fill-current" : "fill-none"}`}
              />
            ))}
          </div>
          <div className="text-xs text-slate-500 mt-1">{ratingData.total} đánh giá</div>
        </div>

        <div className="flex-1 space-y-1">
          {ratingData.distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-2">
              <div className="text-xs w-6">{item.stars}</div>
              <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
              <Progress
                value={(item.count / ratingData.total) * 100}
                className="h-2 flex-1 bg-teal-500"
                // indicatorClassName="bg-teal-500"
              />
              <div className="text-xs w-8 text-right">{item.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Đánh giá gần đây</h4>
        {ratingData.recentReviews.map((review, index) => (
          <div key={index} className="p-2 border rounded-md">
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">{review.patientName}</div>
              <div className="flex items-center text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`h-3.5 w-3.5 ${star <= review.rating ? "fill-current" : "fill-none"}`} />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-1">{review.comment}</p>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        Xem tất cả đánh giá
      </Button>
    </div>
  )
}
