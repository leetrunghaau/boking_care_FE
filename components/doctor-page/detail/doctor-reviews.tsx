"use client"

import { useEffect, useState } from "react"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import http from "@/helper/axios"

interface DoctorReviewsProps {
  doctorId: string
  rating: number
  reviewCount: number
}

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  likes: number;
  replies: number;
}

interface Pops {
  slug: string
}
export default function DoctorReviews({ slug }: Pops) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewText, setReviewText] = useState("")
  const [userRating, setUserRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const [reviews, setReviews] = useState<Review[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<Review[]>(`/doctor-site/doctor/${slug}/experience`)
        setReviews(res);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [])

  // Phân bố đánh giá
  const ratingDistribution = [
    { stars: 5, percentage: 75 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 7 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 },
  ]

  const handleSubmitReview = () => {
    // Xử lý gửi đánh giá
    console.log({ rating: userRating, comment: reviewText })
    setShowReviewForm(false)
    setReviewText("")
    setUserRating(0)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Đánh giá từ bệnh nhân</h2>

      {/* Tổng quan đánh giá */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-teal-600">{rating}</div>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">{reviewCount} đánh giá</div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-2">
              <div className="flex items-center gap-1 w-16">
                <span>{item.stars}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
              <Progress value={item.percentage} className="h-2" />
              <span className="text-sm text-muted-foreground w-10">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Form đánh giá */}
      {/* {!showReviewForm ? (
        <div className="text-center">
          <Button onClick={() => setShowReviewForm(true)} className="bg-teal-600 hover:bg-teal-700">
            Viết đánh giá
          </Button>
        </div>
      ) : (
        <div className="border p-4 rounded-lg">
          <h3 className="font-medium mb-3">Đánh giá của bạn</h3>

          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setUserRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoveredRating || userRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {userRating > 0 ? `${userRating} sao` : "Chọn đánh giá"}
            </span>
          </div>

          <Textarea
            placeholder="Chia sẻ trải nghiệm của bạn với bác sĩ..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="mb-4"
            rows={4}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowReviewForm(false)}>
              Hủy
            </Button>
            <Button
              onClick={handleSubmitReview}
              disabled={userRating === 0 || !reviewText.trim()}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Gửi đánh giá
            </Button>
          </div>
        </div>
      )} */}

      {/* Danh sách đánh giá */}
      <div className="space-y-4">
        {reviews?.map((review) => (
          <div key={review.id} className="border-b pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-medium">{review.name}</h4>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>

                <div className="flex items-center gap-1 my-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mt-2">{review.comment}</p>

                <div className="flex items-center gap-4 mt-3">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-teal-600">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Hữu ích ({review.likes})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút xem thêm */}
      <div className="text-center">
        <Button variant="outline">Xem thêm đánh giá</Button>
      </div>
    </div>
  )
}
