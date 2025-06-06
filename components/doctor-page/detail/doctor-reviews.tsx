"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import http from "@/helper/axios";
import useAuthStore from "./../../../store/auth";
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils";

interface Pops {
  slug: string;
}
export default function DoctorRating({ slug }: Pops) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [review, setReview] = useState<any | null>(null);
  const [reviews, setReviews] = useState<any>({ max: 0, rvs: [] });
  const [reviewsIndex, setReviewIndex] = useState<number>(2);
  const { isLoggedIn } = useAuthStore();
  const [canRating, setCanRating] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<any | null>(
          `/doctor-site/doctor/${slug}/rating`
        );
        const res1 = await http.get<any | null>(
          `/doctor-site/doctor/${slug}/can-rating`
        );
        console.log("rating info", res);
        setReview(res);
        setCanRating(res1);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<any>(
          `/doctor-site/doctor/${slug}/ratings/${reviewsIndex}`
        );
        setReviews(res);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reviewsIndex, slug]);

  const handleSubmitReview = async () => {
    try {
      // Gửi đánh giá lên server
      const rs = await http.post<any>(`/doctor-site/doctor/${slug}/rating`, {
        rating: userRating,
        comment: reviewText,
        index: reviewsIndex,
      });

      setReview(rs.ratingDistribution);
      setReviews(rs.ratings);
      setShowReviewForm(false);
      setReviewText("");
      setUserRating(0);

      handleApiSuccess(
        "Cảm ơn bạn đã góp ý kiến cho chúng tôi.",
        "Đánh giá bác sĩ thành công"
      );
    } catch (error) {
      console.error("Error submitting review:", error);

      handleApiError(
        error,
        "Gửi đánh giá thất bại. Vui lòng thử lại sau.",
        "Đánh giá thất bại"
      );
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Đánh giá từ bệnh nhân</h2>

      {/* Tổng quan đánh giá */}
      {review && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-teal-600">
              {review?.avgRating}
            </div>
            <div className="flex items-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(review.avgRating ?? 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {review?.sumRating} đánh giá
            </div>
          </div>

          <div className="space-y-2">
            {review.ratingDistribution.map((item: any) => (
              <div key={item.stars} className="flex items-center gap-2">
                <div className="flex items-center gap-1 w-16">
                  <span>{item.stars}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
                <Progress value={item.percentage} className="h-2" />
                <span className="text-sm text-muted-foreground w-10">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form đánh giá */}
      {isLoggedIn &&
        canRating &&
        (!showReviewForm ? (
          <div className="text-center">
            <Button
              onClick={() => setShowReviewForm(true)}
              className="bg-teal-600 hover:bg-teal-700">
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
                  className="focus:outline-none">
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredRating || userRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
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
              <Button
                variant="outline"
                onClick={() => setShowReviewForm(false)}>
                Hủy
              </Button>
              <Button
                onClick={handleSubmitReview}
                disabled={userRating === 0 || !reviewText.trim()}
                className="bg-teal-600 hover:bg-teal-700">
                Gửi đánh giá
              </Button>
            </div>
          </div>
        ))}

      {/* Danh sách đánh giá */}
      {reviews?.rvs?.length > 0 ? (
        reviews.rvs.map((item: any) => (
          <div key={item.id} className="border-b pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={item.patient.img} alt={item.patient.name} />
                <AvatarFallback>
                  {item.patient.name?.charAt(0) ?? "?"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-medium">{item.patient.name}</h4>
                  {/* <span className="text-sm text-muted-foreground">{item.date}</span> */}
                </div>

                <div className="flex items-center gap-1 my-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Number(item.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mt-2">{item.value}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">Chưa có đánh giá nào.</p>
      )}

      {/* Nút xem thêm */}
      {review && reviewsIndex <= reviews.max && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setReviewIndex(reviewsIndex + 2)}>
            Xem thêm đánh giá
          </Button>
        </div>
      )}
    </div>
  );
}
