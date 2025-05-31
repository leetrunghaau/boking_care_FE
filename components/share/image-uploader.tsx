"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Upload, X, FileImage, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "document";
  uploadProgress: number;
  uploaded: boolean;
}

interface MedicalImageUploaderProps {
  onUpload?: (files: File[]) => Promise<void>;
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  className?: string;
}

export function ImageUploader({
  onUpload,
  onFilesChange,
  maxFiles = 10,
  maxSizeMB = 10,
  className,
}: MedicalImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    if (!acceptedTypes.includes(file.type)) {
      setError(`Loại file không được hỗ trợ: ${file.name}`);
      return false;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File ${file.name} vượt quá giới hạn ${maxSizeMB}MB`);
      return false;
    }

    if (uploadedFiles.length >= maxFiles) {
      setError(`Chỉ có thể tải lên tối đa ${maxFiles} files`);
      return false;
    }

    return true;
  };

  const processFiles = (files: FileList) => {
    setError(null);
    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (validateFile(file)) {
        validFiles.push(file);
      }
    });

    if (validFiles.length === 0) return;

    validFiles.forEach((file) => {
      const fileId = Math.random().toString(36).substr(2, 9);
      const isImage = file.type.startsWith("image/");
      const newFile: UploadedFile = {
        id: fileId,
        file,
        preview: "",
        type: isImage ? "image" : "document",
        uploadProgress: 0,
        uploaded: false,
      };

      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? { ...f, preview: e.target?.result as string }
                : f
            )
          );
        };
        reader.readAsDataURL(file);
      }

      setUploadedFiles((prev) => [...prev, newFile]);

      // Notify parent about the new files
      if (onFilesChange) {
        onFilesChange(validFiles);
      }

      // Simulate upload progress
      simulateUpload(fileId);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.uploadProgress < 100) {
            const newProgress = Math.min(file.uploadProgress + 10, 100);
            return {
              ...file,
              uploadProgress: newProgress,
              uploaded: newProgress === 100,
            };
          }
          return file;
        })
      );
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const getFileIcon = (file: UploadedFile) => {
    if (file.type === "image") {
      return <FileImage className="w-5 h-5 text-blue-500" />;
    }
    return <FileImage className="w-5 h-5 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Tải lên hình ảnh y tế</h3>
        <p className="text-xs text-gray-600">
          Tải lên kết quả xét nghiệm, X-quang, đơn thuốc hoặc tài liệu y tế khác
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors mb-4",
          isDragging
            ? "border-teal-500 bg-teal-50"
            : "border-gray-300 hover:border-teal-400 hover:bg-gray-50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}>
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-full bg-gray-100">
            <Upload className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="font-medium text-gray-700">
              Kéo thả file hoặc click để chọn
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Hỗ trợ: JPG, PNG, PDF, DOC (tối đa {maxSizeMB}MB mỗi file)
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              Files đã tải lên ({uploadedFiles.length})
            </h4>
            <Badge variant="secondary" className="text-xs">
              {uploadedFiles.filter((f) => f.uploaded).length}/
              {uploadedFiles.length} hoàn thành
            </Badge>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                {/* File Preview/Icon */}
                <div className="flex-shrink-0">
                  {file.type === "image" && file.preview ? (
                    <img
                      src={file.preview || "/placeholder.svg"}
                      alt={file.file.name}
                      className="w-12 h-12 object-cover rounded border"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-white rounded border flex items-center justify-center">
                      {getFileIcon(file)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {file.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.file.size)}
                  </p>

                  {/* Progress Bar */}
                  {!file.uploaded && (
                    <div className="mt-2">
                      <Progress value={file.uploadProgress} className="h-1" />
                      <p className="text-xs text-gray-500 mt-1">
                        {file.uploadProgress}%
                      </p>
                    </div>
                  )}

                  {file.uploaded && (
                    <Badge
                      variant="default"
                      className="mt-1 text-xs bg-green-100 text-green-700">
                      Đã tải lên
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  {file.uploaded && file.type === "image" && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Preview functionality
                        window.open(file.preview, "_blank");
                      }}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload All Button */}
      {uploadedFiles.length > 0 && onUpload && (
        <div className="mt-4 pt-4 border-t">
          <Button
            onClick={() => {
              const filesToUpload = uploadedFiles
                .filter((f) => f.uploaded)
                .map((f) => f.file);
              if (filesToUpload.length > 0) {
                onUpload(filesToUpload);
              }
            }}
            className="w-full bg-teal-600 hover:bg-teal-700"
            disabled={uploadedFiles.filter((f) => f.uploaded).length === 0}>
            <Upload className="w-4 h-4 mr-2" />
            Lưu tất cả files ({uploadedFiles.filter((f) => f.uploaded).length})
          </Button>
        </div>
      )}
    </div>
  );
}
