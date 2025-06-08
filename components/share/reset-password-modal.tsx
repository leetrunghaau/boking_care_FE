"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { Key, RefreshCw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ResetPasswordModalProps = {};

interface ResetPasswordModalState {
  userName: string;
  userEmail: string;
  onConfirm: (newPassword: string) => Promise<void> | void;
}

export interface ResetPasswordModalHandle {
  open: (params: ResetPasswordModalState) => void;
}

const ResetPasswordModal = forwardRef<
  ResetPasswordModalHandle,
  ResetPasswordModalProps
>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<ResetPasswordModalState | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generateRandomPassword = () => {
    const numbers = "0123456789";
    let password = "";
    for (let i = 0; i < 6; i++) {
      password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return password;
  };

  const open = (params: ResetPasswordModalState) => {
    setState(params);
    setNewPassword(generateRandomPassword());
    setIsOpen(true);
    setCopied(false);
  };

  const close = () => {
    setIsOpen(false);
    setNewPassword("");
    setCopied(false);
  };

  useImperativeHandle(ref, () => ({
    open,
  }));

  const handleReset = async () => {
    if (!state?.onConfirm || !newPassword) return;
    try {
      setLoading(true);
      await state.onConfirm(newPassword);
    } finally {
      setLoading(false);
      close();
    }
  };

  const handleGenerateNew = () => {
    setNewPassword(generateRandomPassword());
    setCopied(false);
  };

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(newPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-md border-teal-200 p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 border-b border-teal-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-full">
              <Key className="w-5 h-5 text-teal-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-slate-900">
              Đặt lại mật khẩu
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="space-y-2">
            <div className="text-sm text-slate-600">
              <span className="font-medium">Người dùng:</span> {state?.userName}
            </div>
            <div className="text-sm text-slate-600">
              <span className="font-medium">Email:</span> {state?.userEmail}
            </div>
          </div>

          {/* New Password Section */}
          <div className="space-y-3">
            <Label
              htmlFor="new-password"
              className="text-sm font-medium text-slate-700">
              Mật khẩu mới (6 chữ số)
            </Label>
            <div className="flex gap-2">
              <Input
                id="new-password"
                value={newPassword}
                readOnly
                className="font-mono text-lg text-center tracking-widest bg-slate-50 border-teal-200 focus:border-teal-500"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateNew}
                className="px-3 border-teal-300 text-teal-600 hover:bg-teal-50">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyPassword}
                className={`px-3 transition-colors ${
                  copied
                    ? "border-green-300 text-green-600 bg-green-50"
                    : "border-teal-300 text-teal-600 hover:bg-teal-50"
                }`}>
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <Alert className="border-teal-200 bg-teal-50">
            <Key className="h-4 w-4 text-teal-600" />
            <AlertDescription className="text-teal-800 font-medium">
              Mật khẩu mới sẽ được tạo ngẫu nhiên gồm 6 chữ số. Người dùng có
              thể thay đổi mật khẩu sau khi đăng nhập.
            </AlertDescription>
          </Alert>

          <p className="text-xs text-slate-500 text-center leading-relaxed">
            Hãy đảm bảo thông báo mật khẩu mới cho người dùng một cách an toàn.
          </p>
        </div>

        <DialogFooter className="bg-slate-50 p-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="outline"
              onClick={close}
              disabled={loading}
              className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50">
              Hủy bỏ
            </Button>
            <Button
              onClick={handleReset}
              disabled={loading}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200">
              <Key className="w-4 h-4 mr-2" />
              {loading ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

ResetPasswordModal.displayName = "ResetPasswordModal";

export default ResetPasswordModal;
