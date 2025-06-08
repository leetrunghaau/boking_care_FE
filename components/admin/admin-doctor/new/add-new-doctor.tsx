"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { AddDoctorModal } from "./add-new-doctor-modal";

export default function AddDoctor() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (newDoctor: any) => {
    console.log("New doctor added:", newDoctor);
    // You can add logic here if needed
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
