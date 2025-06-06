"use client";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import http from "@/helper/axios";
import DeleteAccountModal from "@/components/share/delete-account-modal";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { handleApiError, handleApiSuccess } from "@/helper/toast-utils";

export default function AccountSettingsPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await http.post<any[]>("/patient/re-password", {
        password: newPassword,
      });

      console.log("Password change", res);
      handleApiSuccess("Bạn đã đổi mật khẩu thành công.");

      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      handleApiError(err, "Không thể thay đổi mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-semibold text-slate-800">
          Cài đặt tài khoản
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Cập nhật mật khẩu */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Cập nhật mật khẩu
          </h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Mật khẩu mới</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu cũ"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className={
                    errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 text-white hover:bg-teal-700"
              disabled={loading}>
              {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
            </Button>
          </form>
        </div>

        {/* Xóa tài khoản */}
        <div className="border border-red-100 rounded-lg p-6 flex flex-col justify-between min-h-52">
          <div className="flex items-center gap-2 text-red-800 mb-4">
            <h2 className="text-2xl font-semibold text-slate-800">
              Xoá tài khoản
            </h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Xóa vĩnh viễn tài khoản và tất cả dữ liệu liên quan.
          </p>
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              Nếu bạn muốn xóa tài khoản của mình, tất cả dữ liệu liên quan sẽ
              bị mất.
            </AlertDescription>
          </Alert>
          <div className="mt-auto">
            <Button
              variant="destructiveOutline"
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full">
              Xóa tài khoản
            </Button>
          </div>
        </div>

        <DeleteAccountModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </div>
    </main>
  );
}
