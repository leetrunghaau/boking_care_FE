// components/Hospital/HospitalDetail.tsx
import { Hospital } from "@/types/hospital";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

interface HospitalDetailProps {
  hospital: Hospital;
}

const HospitalDetail: React.FC<HospitalDetailProps> = ({ hospital }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-6 mb-6">
        <img
          src={hospital.logoUrl}
          alt={hospital.name}
          className="w-24 h-24 object-cover rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{hospital.name}</h1>
          <p className="text-xl text-gray-600">{hospital.slogan}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Giới thiệu</h2>
        <p>{hospital.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Lịch sử hình thành và phát triển</h2>
        <p>{hospital.history}</p>
        <ul className="list-disc pl-5">
          {hospital.awards.map((award, index) => (
            <li key={index}>{award}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Dịch vụ y tế cung cấp</h2>
        <ul className="list-disc pl-5">
          {hospital.services.map((service) => (
            <li key={service.id}>
              <strong>{service.name}:</strong> {service.description} -{" "}
              <span className="text-green-600">{service.price} VND</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Đội ngũ bác sĩ và nhân viên y tế</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospital.team.map((member) => (
            <div key={member.id} className="text-center">
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
              />
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
              <p className="text-gray-500">{member.qualifications}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Cơ sở vật chất và trang thiết bị</h2>
        <ul className="list-disc pl-5">
          {hospital.facilities.map((facility, index) => (
            <li key={index}>{facility}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Tin tức và sự kiện</h2>
        <div className="space-y-4">
          {hospital.news.map((newsItem) => (
            <div key={newsItem.id}>
              <h3 className="text-xl font-semibold">{newsItem.title}</h3>
              <p>{newsItem.content}</p>
              <p className="text-sm text-gray-500">{newsItem.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Đánh giá và phản hồi</h2>
        <div className="space-y-4">
          {hospital.reviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <p className="font-semibold">{review.author}</p>
              <p className="text-yellow-500">{"★".repeat(review.rating)}</p>
              <p>{review.comment}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Liên hệ và hỗ trợ</h2>
        <div className="space-y
::contentReference[oaicite:0]{index=0}
 
