"use client";
// React core and hooks
import { useState } from "react";

// UI components - Icons
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CalendarDays, CalendarCheck, DollarSign, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [appointmentsToday] = useState(5);
  const [appointmentsThisWeek] = useState(20);
  const [earnings] = useState(12000000);
  const [rating] = useState(4.7);
  const [notifications] = useState([
    "⏰ Cuộc hẹn mới đã được xác nhận.",
    "💬 Một bệnh nhân đã gửi phản hồi.",
    "⚠️ Bạn có 3 lịch khám chưa xác nhận.",
  ]);
  const [upcomingAppointments] = useState([
    {
      id: 1,
      patient: "Nguyễn Văn A",
      time: "09:00 - 09:30",
      service: "Khám da liễu",
    },
    {
      id: 2,
      patient: "Trần Thị B",
      time: "10:00 - 10:30",
      service: "Khám tổng quát",
    },
  ]);

  return (
    <div className="w-11/12 mx-auto my-12 space-y-16">
      {/* Tổng quan nhanh */}
      <section>
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Tổng quan công việc
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg text-center shadow">
            <CalendarDays className="mx-auto text-blue-600 mb-2" />
            <p className="text-sm text-muted-foreground">Lịch hẹn hôm nay</p>
            <p className="text-2xl font-bold text-blue-600">
              {appointmentsToday}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center shadow">
            <CalendarCheck className="mx-auto text-green-600 mb-2" />
            <p className="text-sm text-muted-foreground">Tuần này</p>
            <p className="text-2xl font-bold text-green-600">
              {appointmentsThisWeek}
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg text-center shadow">
            <DollarSign className="mx-auto text-yellow-600 mb-2" />
            <p className="text-sm text-muted-foreground">Thu nhập (VNĐ)</p>
            <p className="text-2xl font-bold text-yellow-600">
              {earnings.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg text-center shadow">
            <Star className="mx-auto text-orange-500 mb-2" />
            <p className="text-sm text-muted-foreground">Đánh giá</p>
            <p className="text-2xl font-bold text-orange-500">{rating} / 5</p>
          </div>
        </div>
      </section>

      {/* Thống kê & hành động */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Lịch khám sắp tới */}
          <Card className="shadow-sm border-teal-600 border-l-4 ">
            <CardHeader>
              <CardTitle className="text-slate-800">
                🗓️ Lịch khám sắp tới
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {upcomingAppointments.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Không có lịch khám sắp tới.
                </p>
              )}
              {upcomingAppointments.map((appt) => (
                <div key={appt.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-slate-800">
                      {appt.patient}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {appt.service}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-600">
                      {appt.time}
                    </p>
                    <Button
                      size="sm"
                      className="mt-1 bg-teal-600 text-white hover:bg-teal-700">
                      Xem hồ sơ
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Thông báo hệ thống */}
          <Card className="shadow-sm border-yellow-500 border-l-4 ">
            <CardHeader>
              <CardTitle className="text-slate-800">
                🔔 Thông báo hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {notifications.map((note, index) => (
                <div
                  key={index}
                  className="bg-yellow-100 px-3 py-2 rounded-md text-sm text-slate-700 shadow-sm">
                  {note}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Biểu đồ lượt khám */}
          <Card className="shadow-sm border-teal-600 border-l-4 ">
            <CardHeader>
              <CardTitle className="text-slate-800">
                📊 Lượt khám theo tuần
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Bar
                data={{
                  labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
                  datasets: [
                    {
                      label: "Lượt khám",
                      data: [12, 18, 22, 28],
                      backgroundColor: "#0d9488",
                      borderRadius: 4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true } },
                }}
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
