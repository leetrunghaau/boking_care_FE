"use client";

import { HospitalImageUploader } from "@/components/share/hospital-image-uploader";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import http from "@/helper/axios";
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils";
import { getFullURL } from "@/helper/url";
import { Download, Eye, FileText, ImageIcon, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Gallery() {

  const params = useParams()
  const id = params?.id as string
  const [serverFile, setServerFile] = useState<any[]>([])
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<any | null>(null)

  const uploadData = async (files: File[]) => {
    let status = false
    try {
      const rs = await http.postFiles<any[]>(`/admin-hospital/basic-hospital/${id}/imgs`, files)
      if (rs?.length > 0) {
        status = true
        setServerFile(rs)
        handleApiSuccess("Bạn đã lưu hình ảnh thành công")
      }


    } catch (err) {
      handleApiError(err)
    } finally {
      return status
    }

  }
  const handleDeteleImg = async (imgId: number) => {
    try {
      const rs = await http.delete(`/admin-hospital/basic-hospital/${imgId}/img`)
      if (rs){
        setServerFile(serverFile.filter(i=>i.id != imgId))
        handleApiSuccess("Bạn đã xóa thành công 1 hình ảnh của bệnh viện")
      }
    } catch (err) {
      handleApiError(err)
    } finally {
    }
  }
  

  useEffect(() => {
    const loadData = async () => {
      try {
        const rs = await http.get<any[]>(`/admin-hospital/img-hospital/hospital/${id}`)
        console.log("tất cả ảnh được tải về", rs)
        setServerFile(rs)
      } catch (err) {
        handleApiError(err)
      }
    }
    loadData()
  }, [])


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <ImageIcon className="w-5 h-5 mr-2 text-teal-600" />
          Thư viện hình ảnh
        </CardTitle>
        <CardDescription>
          Quản lý bộ sưu tập hình ảnh của cơ sở y tế
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6 text-center">
        <div className="space-y-4 w-full">
          <div className="flex gap-3 items-start flex-wrap w-full mb-10">
            {serverFile?.length > 0 ? (
              serverFile.map((file) => (
                <div key={file.id} className="relative group">
                  <div className="w-72 h-32 flex items-center justify-center rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                    <Image
                      src={getFullURL(file.imageUrl)}
                      alt={file.name || "image"}
                      fill
                      className="object-cover"
                    />
                    {/* Overlay với các nút action */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-white hover:bg-teal-50"
                          onClick={() => {
                            setSelectedImage(file)
                            setIsViewerOpen(true)
                          }}
                          title="Xem ảnh"
                        >
                          <Eye className="h-4 w-4 text-teal-600" />
                        </Button>
                      </div>
                    </div>

                  </div>

                  {/* Nút xóa */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        title="Xóa file"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bạn có chắc chắn muốn xóa hình này? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => { handleDeteleImg(file.id) }}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Xóa
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full py-12 border-2 border-dashed border-teal-200 rounded-lg">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-teal-300 mx-auto mb-3" />
                  <span className="text-teal-500 text-sm font-medium">Chưa có hình nào được tải lên</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal xem ảnh */}

        <HospitalImageUploader
          onUpload={uploadData}
          maxFiles={5}
          maxSizeMB={5}
        />

        <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-teal-600">{selectedImage?.name || "Xem ảnh"}</DialogTitle>
            </DialogHeader>

            {selectedImage && (
              <div className="relative flex-1 p-6">
                <div className="relative w-full h-[60vh] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={getFullURL(selectedImage.imageUrl) || "/placeholder.svg"}
                    alt={selectedImage.name || "image"}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{selectedImage.name}</p>
                    <p className="text-xs text-gray-500">{selectedImage.type}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-teal-200 text-teal-600 hover:bg-teal-50"
                    >
                      <Link
                        href={getFullURL(selectedImage.imageUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Tải về
                      </Link>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                          <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa ảnh này? Hành động này không thể hoàn tác.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleDeteleImg(selectedImage.id)
                              setIsViewerOpen(false)
                            }}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Xóa
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
