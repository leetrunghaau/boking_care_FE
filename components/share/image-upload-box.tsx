"use client"

import React, { useState, useRef, DragEvent, ChangeEvent, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getFullURL } from '@/helper/url';

type ImageUploadBoxProps = {
  initImg?: string |null;
  onChange: (file: File | null) => void; // null khi xóa ảnh
};

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({ initImg, onChange }) => {
  const [preview, setPreview] = useState<string | null>( null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };


  useEffect(() => {
    if (initImg) {
      setPreview(getFullURL(initImg));
    }
  }, [initImg]);
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
  };

  return (
    <div
      className={cn(
        'relative h-60 w-full overflow-hidden',
        'border-2 border-dashed border-gray-300',
        'rounded-lg p-6',
        'flex items-center justify-center',
        'bg-gray-50 hover:bg-gray-100',
        'transition-colors cursor-pointer'
      )}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        ref={fileInputRef}
        onChange={handleChange}
      />

      {preview ? (
        <>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded shadow"
          />
          <button
            type="button"
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
            onClick={(e) => {
              e.stopPropagation(); 
              handleRemove();
            }}
          >
            <X className="h-4 w-4 text-red-500" />
          </button>
        </>
      ) : (
        <div className="text-center pointer-events-none">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4 flex text-sm text-gray-600 justify-center">
            <span className="font-medium text-teal-600 hover:text-teal-500">Nhấp để tải lên</span>
            <p className="pl-1">hoặc kéo thả</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG hoặc GIF (MAX. 800x400px)
              {preview}
              {initImg}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadBox;
