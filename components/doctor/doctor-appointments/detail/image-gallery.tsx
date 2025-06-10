"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Eye, Download, Trash2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getFullURL } from "@/helper/url"

interface FileItem {
  id: number | null
  name: string
  type: string
  url: string
  uri?: string
}

interface ImageGalleryProps {
  fileStore: FileItem[]
  onDeleteFile: (id: number | null) => void
}

export default function ImageGallery({ fileStore = [], onDeleteFile }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<FileItem | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const handleViewImage = (file: FileItem) => {
    setSelectedImage(file)
    setIsViewerOpen(true)
  }

  const handleDeleteFile = (id: number | null) => {
    onDeleteFile(id)
  }

  const isImageFile = (type: string) => {
    return type.startsWith("image/")
  }

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-teal-600">Danh sách file đính kèm</h3>

        <div className="flex gap-3 items-start flex-wrap">
          {fileStore?.length > 0 ? (
            fileStore.map((file) => (
              <div key={file.id} className="relative group">
                <div className="w-28 h-28 flex items-center justify-center border-2 border-teal-100 rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                  {isImageFile(file.type) ? (
                    <>
                      <Image
                        src={getFullURL(file.url)}
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
                            onClick={() => handleViewImage(file)}
                            title="Xem ảnh"
                          >
                            <Eye className="h-4 w-4 text-teal-600" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full p-2">
                      <FileText className="h-8 w-8 text-teal-500 mb-2" />
                      <span className="text-xs text-gray-600 text-center font-medium truncate w-full">
                        {file.name || "File"}
                      </span>
                      <Link
                        href={getFullURL(file.uri || file.url) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 text-xs mt-1 flex items-center gap-1"
                      >
                        <Download className="h-3 w-3" />
                        Tải về
                      </Link>
                    </div>
                  )}
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
                        Bạn có chắc chắn muốn xóa file "{file.name}"? Hành động này không thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteFile(file.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Tên file hiển thị bên dưới */}
                <p className="text-xs text-gray-600 mt-2 text-center truncate max-w-28">
                  {file.name || "Unnamed file"}
                </p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full py-12 border-2 border-dashed border-teal-200 rounded-lg">
              <div className="text-center">
                <FileText className="h-12 w-12 text-teal-300 mx-auto mb-3" />
                <span className="text-teal-500 text-sm font-medium">Chưa có file nào được tải lên</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal xem ảnh */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-teal-600">{selectedImage?.name || "Xem ảnh"}</DialogTitle>
          </DialogHeader>

          {selectedImage && (
            <div className="relative flex-1 p-6">
              <div className="relative w-full h-[60vh] bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={getFullURL(selectedImage.url) || "/placeholder.svg"}
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
                      href={getFullURL(selectedImage.url)}
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
                          Bạn có chắc chắn muốn xóa ảnh "{selectedImage.name}"? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            handleDeleteFile(selectedImage.id)
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
    </>
  )
}
