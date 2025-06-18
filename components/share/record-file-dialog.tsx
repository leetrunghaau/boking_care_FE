"use client"

import { useState } from "react"
import { File, Eye, Download, ImageIcon, FileText, Archive, Video, Music, Search, Grid, List } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { getFullURL, isImg } from "@/helper/url"
import { downloadFile } from "@/helper/my-file"

interface FileItem {
  name: string
  type: string
  url: string
  size?: number
  uploadedAt?: string
}

interface RecordFileDialogProps {
  files: FileItem[]
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return ImageIcon
  if (type.startsWith("video/")) return Video
  if (type.startsWith("audio/")) return Music
  if (type.includes("pdf") || type.includes("document")) return FileText
  if (type.includes("zip") || type.includes("rar")) return Archive
  return File
}

function getFileTypeColor(type: string) {
  if (type.startsWith("image/")) return "bg-blue-100 text-blue-800"
  if (type.startsWith("video/")) return "bg-purple-100 text-purple-800"
  if (type.startsWith("audio/")) return "bg-green-100 text-green-800"
  if (type.includes("pdf")) return "bg-red-100 text-red-800"
  if (type.includes("document")) return "bg-indigo-100 text-indigo-800"
  return "bg-gray-100 text-gray-800"
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return "N/A"
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
}



function FilePreview({ file }: { file: FileItem }) {
  const [imageError, setImageError] = useState(false)

  if (isImg(file.type) && !imageError) {
    return (
      <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={getFullURL(file.url)}
          alt={file.name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    )
  }

  const IconComponent = getFileIcon(file.type)
  return (
    <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
      <IconComponent className="w-12 h-12 text-gray-400" />
    </div>
  )
}

function FileGridItem({ file, index }: { file: FileItem; index: number }) {
  return (
    <div className="group border rounded-lg p-4 hover:shadow-md transition-shadow">
      <FilePreview file={file} />
      <div className="mt-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium truncate" title={file.name}>
            {file.name || `File #${index + 1}`}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={`text-xs ${getFileTypeColor(file.type)}`}>
            {file.type.split("/")[1]?.toUpperCase() || "FILE"}
          </Badge>
          {file.size && <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>}
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* {isImg(file.type) && (
            <Button size="sm" variant="ghost" className="h-8 px-2 text-blue-600 hover:text-blue-700" asChild>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <Eye className="w-3 h-3 mr-1" />
                Xem
              </a>
            </Button>
          )} */}

          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2 text-emerald-600 hover:text-emerald-700"
            onClick={() => downloadFile(getFullURL(file.url), file.name || `file-${index + 1}`)}
          >
            <Download className="w-3 h-3 mr-1" />
            Tải
          </Button>
        </div>
      </div>
    </div>
  )
}

function FileListItem({ file, index }: { file: FileItem; index: number }) {
  const IconComponent = getFileIcon(file.type)

  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0">
        {isImg(file.type) ? (
          <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
            <img src={getFullURL(file.url)} alt={file.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-gray-600" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{file.name || `File #${index + 1}`}</h4>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="secondary" className={`text-xs ${getFileTypeColor(file.type)}`}>
            {file.type.split("/")[1]?.toUpperCase() || "FILE"}
          </Badge>
          {file.size && <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>}
          {file.uploadedAt && <span className="text-xs text-gray-500">{file.uploadedAt}</span>}
        </div>
      </div>

      <div className="flex gap-1">
        {/* {isImg(file.type) && (
          <Button size="sm" variant="ghost" className="h-8 px-2 text-blue-600 hover:text-blue-700" asChild>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              <Eye className="w-3 h-3 mr-1" />
              Xem
            </a>
          </Button>
        )} */}

        <Button
          size="sm"
          variant="ghost"
          className="h-8 px-2 text-emerald-600 hover:text-emerald-700"
          onClick={() => downloadFile(getFullURL(file.url), file.name || `file-${index + 1}`)}
        >
          <Download className="w-3 h-3 mr-1" />
          Tải
        </Button>
      </div>
    </div>
  )
}

export function RecordFileDialog({ files }: RecordFileDialogProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1.5 hover:bg-gray-50">
          <File className="w-3.5 h-3.5" />
          <span className="text-xs">Xem tài liệu đính kèm</span>
          {files.length > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {files.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Tài liệu cuộc khám</DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-100px)] p-6">
          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <File className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">Không có tài liệu nào được đính kèm.</p>
            </div>
          )  :
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {files.map((file, index) => (
                  <FileGridItem key={index} file={file} index={index} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                  {files.map((file, index) => (
                  <FileListItem key={index} file={file} index={index} />
                ))}
              </div>
            )
          }
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
