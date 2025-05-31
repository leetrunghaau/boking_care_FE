"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import http from "@/helper/axios";
import { getReadableTimeRanges } from "@/helper/time";
import { Card, CardContent } from "@/components/ui/card";
import { formatPhoneNumber } from "@/helper/customNumView";
import { handleApiError } from "@/helper/handle-error";

export default function HealthFacilityDetailPage() {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await http.get<any>(`/hospital/${slug}`);
        console.log("thông tin chi tiết bệnh viện", res);
        setData(res);
      } catch (err) {
        handleApiError(
          err,
          "Có lỗi xảy ra, vui lòng thử lại sau",
          "Lấy thông tin cơ sở y tế thất bại"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <p className="text-center py-10">Đang tải dữ liệu...</p>;
  }
  const specsialtiesList = () => {
    return (
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-2xl font-semibold mb-4">Chuyên khoa</h2>
        <div className="flex flex-wrap gap-3">
          {data.specialties.map((sp: any) => (
            <span
              key={sp.id}
              className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium">
              {sp.name}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const doctorList = () => {
    return (
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-2xl font-semibold mb-4">Bác sĩ tại cơ sở</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.doctors.map((doc: any) => (
            <Card key={doc.id}>
              <div className="relative h-[200px] w-full">
                <Image
                  src={doc.img ?? "/placeholder.svg"}
                  alt={doc.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{doc.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {doc.specialty.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  const imgList = () => {
    return (
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-2xl font-semibold mb-4">Hình ảnh cơ sở</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.hospital.img.length > 0 ? (
            data.hospital.img.map((item: string, index: number) => (
              <div key={index} className="rounded overflow-hidden shadow">
                <Image
                  src={item}
                  alt={`Gallery ${item}`}
                  width={400}
                  height={300}
                  className="object-cover w-full h-auto"
                />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-sm text-muted-foreground">
              Không có hình ảnh nào
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="my-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
            {data ? (
              <>
                <Image
                  src={data.hospital.thumbnail}
                  alt={data.hospital.name}
                  fill
                  className="object-cover"
                />
              </>
            ) : (
              <>
                <Image
                  src="/placeholder.svg"
                  alt="null"
                  fill
                  className="object-cover"
                />
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-800/60 to-teal-500/60 flex flex-col justify-end p-6">
              <h1 className="text-4xl text-white font-bold">
                {data.hospital.name}
              </h1>
              <p className="text-white text-lg">{data.hospital.address}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-10">
        <div className="container mx-auto px-6 max-w-5xl space-y-4">
          <h2 className="text-2xl font-semibold">Giới thiệu</h2>
          <p className="text-muted-foreground">{data.hospital.description}</p>
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-slate-700">
            <div>
              <strong>Địa chỉ:</strong> {data.hospital.address}
            </div>
            <div>
              <strong>Điện thoại:</strong>{" "}
              {formatPhoneNumber(data.hospital.phone)}
            </div>
            <div className="flex gap-3 items-start">
              <div>
                <strong>Giờ làm việc:</strong>
              </div>
              <div>
                {getReadableTimeRanges(data.hospital.time).map(
                  (item: string, index: number) => (
                    <p key={index}>{item}</p>
                  )
                )}
              </div>
            </div>
            <div>
              <strong>Giấy phép hoạt động:</strong> {data.hospital.license}
            </div>
          </div>
        </div>
      </section>
      {data?.services?.length > 0 && (
        <section className="my-10">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-2xl font-semibold mb-4">Dịch vụ nổi bật</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-slate-700">
              {data.hospital.services.map((item: any, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="my-10">{specsialtiesList()}</section>
      <section className="my-10">{doctorList()}</section>
      <section className="my-10">{imgList()}</section>
      <section className="my-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-slate-50 rounded-lg p-6 grid grid-cols-2 sm:grid-cols-4 text-center">
            <div>
              <h3 className="text-2xl font-bold text-teal-600">
                {data.hospital.years}+
              </h3>
              <p className="text-sm text-muted-foreground">Năm hoạt động</p>
            </div>
            <div>
              {/* <h3 className="text-2xl font-bold text-teal-600">{facility.patients.toLocaleString()}</h3> */}
              <h3 className="text-2xl font-bold text-teal-600">15</h3>
              <p className="text-sm text-muted-foreground">Bệnh nhân đã khám</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-teal-600">
                {data.hospital.doctors}
              </h3>
              <p className="text-sm text-muted-foreground">Bác sĩ</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-teal-600">
                {data.hospital.rating} ★
              </h3>
              <p className="text-sm text-muted-foreground">
                Đánh giá trung bình
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl font-semibold mb-4">Bản đồ & Vị trí</h2>
          <div className="aspect-video rounded overflow-hidden shadow">
            <iframe
              // src={data.hospital.mapEmbedUrl}
              src={
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6013.462778246118!2d106.76303780139433!3d10.825512230162243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527fef7f0f747%3A0xece160c0c3f39c99!2zSHl1bmRhaSDEkMO0bmcgU8OgaSBHw7JuIC0gxJDhuqFpIEzDvSBYZSAmIFjGsOG7n25nIEThu4tjaCBW4bul!5e1!3m2!1sen!2s!4v1748198149461!5m2!1sen!2s"
              }
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen></iframe>
          </div>
        </div>
      </section>
      <section className="my-10 bg-teal-600 text-white">
        <div className="container mx-auto px-6 max-w-5xl py-10 text-center space-y-4">
          <h2 className="text-3xl font-bold">Bạn cần được khám ngay?</h2>
          <p className="text-lg">
            Chúng tôi sẵn sàng hỗ trợ bạn đặt lịch khám nhanh chóng, tiện lợi.
          </p>
          <Button className="bg-white text-teal-600 hover:bg-slate-100 h-12 px-8 text-base">
            Đặt lịch khám
          </Button>
        </div>
      </section>
    </>
  );
}
