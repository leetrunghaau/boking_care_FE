export default function SelectScheduleStep({ onNext, onBack }: any) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Chọn thời gian khám</h2>
      <div className="grid grid-cols-3 gap-4">
        {["9:00", "10:30", "13:00", "15:30"].map((time) => (
          <button key={time} className="border rounded-lg p-4 text-center hover:bg-teal-50">
            {time}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="text-gray-600 px-4 py-2">Quay lại</button>
        <button onClick={onNext} className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">
          Tiếp tục
        </button>
      </div>
    </section>
  )
}
