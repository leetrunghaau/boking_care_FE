"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import http from "@/helper/axios";
import { Card, CardContent } from "@/components/ui/card";
import { handleApiError } from "@/helper/toast-utils";
import { getFullURL } from "@/helper/url";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    slug: string | null;
    open: boolean;
    onClose: () => void;
};

export default function HealthFacilityDetailDialog({ slug, open, onClose }: Props) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!slug || !open) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await http.get<any>(`/hospital/${slug}`);
                setData(res);
            } catch (err) {
                handleApiError(err, "Lấy chi tiết cơ sở y tế thất bại");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [slug, open]);

    const specsialtiesList = () => {
        if (!data?.specialties || data.specialties.length === 0) return null;

        return (
            <>
                <h2 className="text-xl font-semibold mb-2">Chuyên khoa</h2>
                <div className="flex flex-wrap gap-2">
                    {data.specialties.map((sp: any) => (
                        <span key={sp.id} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                            {sp.name}
                        </span>
                    ))}
                </div>
            </>
        );
    };

    const doctorList = () => {
        if (!data?.doctors || data.doctors.length === 0) return null;

        return (
            <>
                <h2 className="text-xl font-semibold my-4">Bác sĩ tại cơ sở</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.doctors.map((doc: any) => (
                        <Card key={doc.id}>
                            <div className="relative h-[150px] w-full">
                                <Image
                                    src={getFullURL(doc.img) || "/placeholder.svg"}
                                    alt={doc.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold">{doc.name}</h3>
                                <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </>
        );
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogTitle>Thông tin cơ sở y tế</DialogTitle>
            <DialogContent className="max-w-[90vh] h-[90vh] overflow-y-auto">
                {isLoading || !data ? (
                    <p className="text-center py-10">Đang tải dữ liệu...</p>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>{data.name}</DialogTitle>
                        </DialogHeader>

                        <div className="relative h-[200px] w-full rounded overflow-hidden my-4">
                            <Image
                                src={getFullURL(data.thumbnail) || "/placeholder.svg"}
                                alt={data.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-800/60 to-teal-500/60 flex flex-col justify-end p-6">
                                <h1 className="text-4xl text-white font-bold">{data.name}</h1>
                                <p className="text-white text-lg">{data.address}</p>
                            </div>
                        </div>

                        <p className="text-muted-foreground mb-4">{data.description}</p>

                        <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-700 mb-6">
                            <div><strong>Địa chỉ:</strong> {data.address}</div>
                            <div><strong>Điện thoại:</strong> {data.phone}</div>
                            <div><strong>Giấy phép hoạt động:</strong> {data.license}</div>
                            <div>
                                <strong>Giờ làm việc:</strong>
                                <ul>
                                    {data.times.map((item: string, idx: number) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {data.services?.length > 0 && (
                            <>
                                <h2 className="text-xl font-semibold my-4">Dịch vụ nổi bật</h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {data.services.map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-2 text-sm">
                                            <CheckCircle className="w-4 h-4 text-teal-600" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        <div className="my-6">{specsialtiesList()}</div>
                        <div className="my-6">{doctorList()}</div>

                        {data.imgs?.length > 0 && (
                            <div className="my-6">
                                <h2 className="text-xl font-semibold mb-2">Hình ảnh cơ sở</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {data.imgs.map((item: string, index: number) => (
                                        <Image
                                            key={index}
                                            src={getFullURL(item) || "/placeholder.svg"}
                                            alt={`Gallery ${index}`}
                                            width={300}
                                            height={200}
                                            className="rounded object-cover"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.mapEmbedUrl && (
                            <div className="my-6">
                                <h2 className="text-xl font-semibold mb-2">Vị trí</h2>
                                <div className="aspect-video rounded overflow-hidden">
                                    <iframe
                                        src={data.mapEmbedUrl}
                                        width="100%"
                                        height="100%"
                                        loading="lazy"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}

                        <div className="my-6 grid sm:grid-cols-3 text-center gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-teal-600">{data.years}</h3>
                                <p className="text-sm text-muted-foreground">Năm hoạt động</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-teal-600">15</h3>
                                <p className="text-sm text-muted-foreground">Bệnh nhân đã khám</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-teal-600">{data.doctors.length}</h3>
                                <p className="text-sm text-muted-foreground">Bác sĩ</p>
                            </div>
                        </div>

                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
