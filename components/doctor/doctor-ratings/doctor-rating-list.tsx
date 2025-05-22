"use client"

import { useState } from "react"

interface DoctorRatingListProps {
  searchQuery: string
  ratingFilter: string
  responseFilter: string
  timeRange: "all" | "month" | "year"
}

export function DoctorRatingList({ searchQuery, ratingFilter, responseFilter, timeRange }: DoctorRatingListProps) {
  // Dữ liệu mẫu cho đánh giá
  const allRatings = [
    {
      id: "R-1001",
      patientName: "Nguyễn Văn X",
      patientAvatar: "/placeholder.svg?height=40&width=40&text=NX",
      rating: 5,
      comment: "Bác sĩ rất tận tâm và chuyên nghiệp. Giải thích bệnh tình rõ ràng và chi tiết. Tôi rất hài lòng với dịch vụ khám bệnh.",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 ngày trước
      response: "Cảm ơn bạn đã tin tưởng và lựa chọn tôi. Rất vui khi được phục vụ bạn!",
      responseDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 ngày trước
      likes: 3,
    },
    {
      id: "R-1002",
      patientName: "Trần Thị Y",
      patientAvatar: "/placeholder.svg?height=40&width=40&text=TY",
      rating: 4,
      comment: "Khám bệnh kỹ lưỡng, giải thích rõ ràng. Tuy nhiên, thời gian chờ đợi hơi lâu.",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 ngày trước
      response: "",
      responseDate: null,
      likes: 1,
    },
    {
      id: "R-1003",
      patientName: "Lê Văn Z",
      patientAvatar: "/placeholder.svg?height=40&width=40&text=LZ",
      rating: 5,
      comment: "Bác sĩ rất nhiệt tình và tận tâm. Đã giúp tôi giải quyết vấn đề sức khỏe một cách hiệu quả.",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 ngày trước
      response: "Cảm ơn bạn đã tin tưởng. Chúc bạn luôn khỏe mạnh!",
      responseDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 ngày trước
      likes: 2,
    },
    {
      id: "R-1004",
      patientName: "Phạm Thị W",
      patientAvatar: "/placeholder.svg?height=40&width=40&text=PW",
      rating: 3,
      comment: "Bác sĩ có chuyên môn tốt nhưng thái độ hơi vội vàng. Mong bác sĩ dành nhiều thời gian hơn cho bệnh nhân.",
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 ngày trước
      response: "Cảm ơn bạn đã góp ý. Tôi sẽ cải thiện vấn đề này trong tương lai.",
      responseDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 ngày trước
      likes: 0,
    },
    {
      id: "R-1005",
      patientName: "Hoàng Văn V",
      patientAvatar: "/placeholder.svg?height=40&width=40&text=HV",
      rating: 2,
      comment: "Thời gian chờ đợi quá lâu, gần 1 tiếng mới được khám. Bác sĩ khám nhanh và không giải thích kỹ.",
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 ngày trước
      response: "Tôi xin lỗi về trải nghiệm không tốt của bạn. Chúng tôi đang cải thiện quy trình để giảm thời gian chờ đợi.",
      responseDate: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), // 19 ngày trước
      likes: 0,
    },
  ]

  // Lọc đánh giá theo các tiêu chí
  const filteredRatings = allRatings.filter((rating) => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch =
      searchQuery === "" ||
      rating.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rating.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rating.response && rating.response.toLowerCase().includes(searchQuery.toLowerCase()))

    // Lọc theo số sao
    const matchesRating = ratingFilter === "all" || rating.rating === Number.parseInt(ratingFilter)

    // Lọc theo trạng thái phản hồi
    const matchesResponse =
      responseFilter === "all" ||
      (responseFilter === "responded" && rating.response) ||
      (responseFilter === "not_responded" && !rating.response)

    // Lọc theo khoảng thời gian
    let matchesTimeRange = true
    if (timeRange === "month") {
      matchesTimeRange = Date.now() - rating.date.getTime() <= 30 * 24 * 60 * 60 * 1000
    } else if (timeRange === "year") {
      matchesTimeRange = Date.now() - rating.date.getTime() <= 365 * 24 * 60 * 60 * 1000
    }

    return matchesSearch && matchesRating && matchesResponse && matchesTimeRange
  })

  // State cho phản hồi mới
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [editingResponse, setEditingResponse] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {filteredRatings.length === 0 ? (
        <div className="text-center text-slate-500 py-8">
          Không tìm thấy đánh giá nào phù hợp với bộ lọc.
        </div>
      ) : (
        filteredRatings.map((rating) => (
          <div key={rating.id} className="border rounded-md p-4 shadow-sm bg-white space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={rating.patientAvatar}
                alt={rating.patientName}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{rating.patientName}</p>
                <p className="text-sm text-slate-500">
                  {rating.date.toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>

            <div>
              <p className="text-yellow-500 text-sm">
                {"★".repeat(rating.rating) + "☆".repeat(5 - rating.rating)}
              </p>
              <p className="mt-1 text-slate-700">{rating.comment}</p>
            </div>

            {rating.response ? (
              <div className="bg-slate-50 p-3 rounded-md text-sm text-slate-600 border-l-4 border-green-500">
                <p className="font-medium text-green-700">Phản hồi từ bác sĩ:</p>
                <p className="mt-1">{rating.response}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {rating.responseDate
                    ? `Phản hồi ngày ${rating.responseDate.toLocaleDateString("vi-VN")}`
                    : ""}
                </p>
              </div>
            ) : (
              <>
                {editingResponse === rating.id ? (
                  <div className="space-y-2 mt-2">
                    <textarea
                      value={responses[rating.id] || ""}
                      onChange={(e) =>
                        setResponses((prev) => ({
                          ...prev,
                          [rating.id]: e.target.value,
                        }))
                      }
                      placeholder="Nhập phản hồi của bạn..."
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          // Lưu phản hồi
                          // (ở đây chỉ cập nhật local, trong thực tế cần gửi API)
                          rating.response = responses[rating.id]
                          rating.responseDate = new Date()
                          setEditingResponse(null)
                        }}
                        className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md"
                      >
                        Gửi phản hồi
                      </button>
                      <button
                        onClick={() => setEditingResponse(null)}
                        className="text-sm text-slate-500 hover:text-slate-700 px-4 py-1.5 rounded-md border"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingResponse(rating.id)}
                    className="text-sm text-blue-600 hover:underline mt-2"
                  >
                    Phản hồi đánh giá
                  </button>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}

