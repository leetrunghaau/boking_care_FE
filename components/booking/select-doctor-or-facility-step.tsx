export default function SelectDoctorOrFacilityStep({ onNext, onBack }: any) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Chọn bác sĩ hoặc cơ sở y tế</h2>
      {/* Fake Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[1, 2].map((id) => (
          <div key={id} className="border rounded-lg p-4 hover:shadow-md">
            <h3 className="font-semibold">Bác sĩ Nguyễn Văn A</h3>
            <p className="text-sm text-muted-foreground">Chuyên khoa Thần kinh</p>
            <button className="text-teal-600 mt-2">Xem chi tiết</button>
          </div>
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
