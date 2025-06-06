"use client";
import http from "@/helper/axios";
import { useState } from "react";

import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
}: DeleteAccountModalProps) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await http.delete<any[]>("/patient/user");

      console.log("Password change", res);

      handleApiSuccess("Xoá tài khoản thành công.");
    } catch (err) {
      console.error(err);
      handleApiError(err, "Không thể xoá tài khoản");
    } finally {
      setLoading(false);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-red-200 p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-red-50 to-red-100 p-6 border-b border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                Xóa tài khoản
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              Nếu bạn muốn xóa tài khoản của mình, tất cả dữ liệu liên quan sẽ
              bị mất.
            </AlertDescription>
          </Alert>

          <div className="bg-white p-4 rounded-lg border border-red-100">
            <h3 className="font-semibold text-slate-800 mb-3">
              Điều này sẽ xóa vĩnh viễn:
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                Thông tin cá nhân và hồ sơ
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                Lịch sử khám bệnh và kết quả
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                Các cuộc hẹn đã đặt
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                Đơn thuốc và tài liệu y tế
              </li>
            </ul>
          </div>

          <p className="text-xs text-slate-500 text-center leading-relaxed">
            Hành động này không thể hoàn tác. Vui lòng cân nhắc kỹ trước khi
            thực hiện.
          </p>
        </div>

        <DialogFooter className="bg-slate-50 p-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50">
              Hủy bỏ
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200">
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa tài khoản vĩnh viễn
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
