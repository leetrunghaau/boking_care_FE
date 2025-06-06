import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  DragEvent,
} from "react";
import { Trash2, Check, X } from "lucide-react";

type AvatarChangeValue =
  | { type: "initial"; value: string }
  | { type: "new"; value: File }
  | { type: "remove" };

interface AvatarUploaderProps {
  onChange?: (change: AvatarChangeValue) => void;
  maxSizeMB?: number;
  className?: string;
  disabled?: boolean;
  initialAvatar?: string | File | null;
}

export function AvatarUploader({
  onChange,
  maxSizeMB = 5,
  className,
  disabled = false,
  initialAvatar,
}: AvatarUploaderProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = ["image/jpeg", "image/png"];

  useEffect(() => {
    if (!initialAvatar) {
      setAvatar(null);
      return;
    }

    if (initialAvatar instanceof File) {
      const url = URL.createObjectURL(initialAvatar);
      setAvatar(url);
      onChange?.({ type: "initial", value: url });
      return () => URL.revokeObjectURL(url);
    }

    setAvatar(initialAvatar);
    onChange?.({ type: "initial", value: initialAvatar });
  }, [initialAvatar, onChange]);

  const handleImageError = () => {
    setAvatar(null);
    setError("Không thể tải ảnh đại diện.");
  };

  const validateAndSetFile = useCallback(
    (file: File) => {
      setError(null);
      setShowRemoveConfirm(false);

      if (!acceptedTypes.includes(file.type)) {
        setError("Chỉ hỗ trợ file ảnh JPG hoặc PNG.");
        return;
      }

      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        setError(`Ảnh vượt quá giới hạn ${maxSizeMB}MB.`);
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
      onChange?.({ type: "new", value: file });
    },
    [maxSizeMB, onChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const confirmRemoveAvatar = () => {
    setAvatar(null);
    setShowRemoveConfirm(false);
    onChange?.({ type: "remove" });
  };

  return (
    <div className={`flex flex-col items-center relative ${className}`}>
      <div
        onClick={() => !disabled && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`w-40 h-40 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden relative transition 
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} 
          border-gray-300 hover:border-teal-400`}
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar Preview"
            className="object-cover w-full h-full"
            onError={handleImageError}
          />
        ) : (
          <span className="text-gray-400 text-sm text-center px-4 text-wrap text-balance">
            Click hoặc kéo ảnh vào đây
          </span>
        )}
      </div>

      {/* 👉 Nút bên ngoài avatar, ôm theo cạnh phải */}
      {!disabled && avatar && (
        <div
           className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 items-center"
    style={{ transform: "translateY(-50%)" }} 
        >
          {showRemoveConfirm ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  confirmRemoveAvatar();
                }}
                className="bg-white text-red-600 hover:bg-red-500 hover:text-white p-1 rounded-full shadow"
                title="Xác nhận xoá"
              >
                <Check size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRemoveConfirm(false);
                }}
                className="bg-white text-gray-600 hover:bg-gray-500 hover:text-white p-1 rounded-full shadow"
                title="Hủy bỏ"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowRemoveConfirm(true);
              }}
              className="bg-white text-red-600 hover:bg-red-500 hover:text-white p-1 rounded-full shadow"
              title="Xoá ảnh"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}

      <input
        type="file"
        accept={acceptedTypes.join(",")}
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled}
      />

      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
