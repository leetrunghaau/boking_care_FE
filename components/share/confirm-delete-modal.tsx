"use client";

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
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

interface ConfirmDeleteModalProps {}

interface ConfirmDeleteModalState {
  title: string;
  description: string;
  onConfirm: () => Promise<void> | void;
}

export interface ConfirmDeleteModalHandle {
  open: (params: ConfirmDeleteModalState) => void;
}

const ConfirmDeleteModal = forwardRef<ConfirmDeleteModalHandle, ConfirmDeleteModalProps>(
  (_, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState<ConfirmDeleteModalState | null>(null);

    const open = (params: ConfirmDeleteModalState) => {
      setState(params);
      setIsOpen(true);
    };

    const close = () => setIsOpen(false);

    useImperativeHandle(ref, () => ({
      open,
    }));

    const handleDelete = async () => {
      if (!state?.onConfirm) return;
      try {
        setLoading(true);
        await state.onConfirm();
      } finally {
        setLoading(false);
        close();
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="sm:max-w-md border-red-200 p-0 overflow-hidden">
          <DialogHeader className="bg-gradient-to-r from-red-50 to-red-100 p-6 border-b border-red-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                {state?.title}
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="p-6 space-y-6">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 font-medium">
                {state?.description}
              </AlertDescription>
            </Alert>

            <p className="text-xs text-slate-500 text-center leading-relaxed">
              Hành động này không thể hoàn tác. Vui lòng cân nhắc kỹ trước khi thực hiện.
            </p>
          </div>

          <DialogFooter className="bg-slate-50 p-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                variant="outline"
                onClick={close}
                disabled={loading}
                className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Hủy bỏ
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {loading ? "Đang xóa..." : "Xóa vĩnh viễn"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

ConfirmDeleteModal.displayName = "ConfirmDeleteModal";

export default ConfirmDeleteModal;
