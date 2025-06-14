"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { AddDoctorModal } from "./add-new-doctor-modal";
import http from "@/helper/axios";
import { handleApiError, handleApiSuccess, handleErorr } from "@/helper/toast-utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddDoctor() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSave = async (newDoctor: any, file: File) => {
    
  };

  return (
    <div>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-teal-600 hover:bg-teal-700">
        <UserPlus className="w-4 h-4 mr-2" />
        Thêm bác sĩ
      </Button>

      <AddDoctorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
