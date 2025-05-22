"use client"

interface DoctorRatingChartProps {
  data: number[]
}

export function DoctorRatingChart({ data }: DoctorRatingChartProps) {
  // Tính toán giá trị tối đa và tối thiểu để hiển thị trục y
  const maxValue = Math.max(...data) + 0.2
  const minValue = Math.max(Math.min(...data) - 0.2, 0)

  // Tạo các nhãn cho trục x
  const labels = ["T1", "T2", "T3", "T4", "T5", "T6"]

  // Tính toán chiều cao của mỗi điểm dữ liệu
  const calculateHeight = (value: number) => {
    const range = maxValue - minValue
    const normalizedValue = value - minValue
    return (normalizedValue / range) * 100
  }

  return (
    <div className="h-[300px] w-full">
      <div className="h-full flex flex-col">
        <div className="flex-1 relative">
          {/* Trục Y */}
          <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-slate-500">
            <div>{maxValue.toFixed(1)}</div>
            <div>{((maxValue + minValue) / 2).toFixed(1)}</div>
            <div>{minValue.toFixed(1)}</div>
          </div>

          {/* Đường kẻ ngang */}
          <div className="absolute left-10 right-0 top-0 bottom-0 flex flex-col justify-between">
            <div className="border-t border-dashed border-slate-200 w-full"></div>
            <div className="border-t border-dashed border-slate-200 w-full"></div>
            <div className="border-t border-dashed border-slate-200 w-full"></div>
          </div>

          {/* Biểu đồ */}
          <div className="absolute left-10 right-0 top-0 bottom-0 flex items-end">
            <div className="flex-1 h-full flex items-end">
              {data.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-4 bg-teal-500 rounded-t-sm" style={{ height: `${calculateHeight(value)}%` }}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Đường kết nối */}
          <svg className="absolute left-10 right-0 top-0 bottom-0 h-full w-[calc(100%-40px)]">
            <polyline
              points={data
                .map((value, index) => {
                  const x = (index / (data.length - 1)) * 100
                  const y = 100 - calculateHeight(value)
                  return `${x}% ${y}%`
                })
                .join(" ")}
              fill="none"
              stroke="#14b8a6"
              strokeWidth="2"
            />
            {data.map((value, index) => {
              const x = (index / (data.length - 1)) * 100
              const y = 100 - calculateHeight(value)
              return (
                <circle key={index} cx={`${x}%`} cy={`${y}%`} r="4" fill="#14b8a6" stroke="white" strokeWidth="2" />
              )
            })}
          </svg>
        </div>

        {/* Trục X */}
        <div className="h-8 ml-10 flex">
          {labels.map((label, index) => (
            <div key={index} className="flex-1 text-center text-xs text-slate-500">
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
