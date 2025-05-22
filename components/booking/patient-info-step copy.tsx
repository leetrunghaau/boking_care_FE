export default function PatientInfoStep({ onBack }: any) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Thông tin bệnh nhân & xác nhận</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input placeholder="Họ và tên" className="border rounded p-2" />
        <input placeholder="Số điện thoại" className="border rounded p-2" />
        <input placeholder="Email" className="border rounded p-2" />
        <input placeholder="Ngày sinh" className="border rounded p-2" />
        <textarea placeholder="Triệu chứng hiện tại..." className="col-span-2 border rounded p-2 min-h-[100px]" />
      </form>
      <div className="flex justify-between">
        <button onClick={onBack} className="text-gray-600 px-4 py-2">Quay lại</button>
        <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">Xác nhận đặt lịch</button>
      </div>
    </section>
  )
}
