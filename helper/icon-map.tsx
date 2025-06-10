import {
  Baby, Bone, Brain, Eye, Heart, Stethoscope, HelpCircle, Ear, Users, Activity, UserCheck, Droplet, Sun,
  BrainCircuit, HeartPulse, CloudSnow,
} from "lucide-react";
import { 
  Andrology,
  BabyIcon, BrainIcon, Cardiology, Dentistry, Dermatology, Endocrinology, ENTIcon, EyeIcon, FemaleIcon, Gastroenterology, Gynecology, HeartIcon, HormoneIcon, LeafIcon,
  LungIcon, MaleIcon, Neurology, Ophthalmology, Otolaryngology, Pediatrics, Pulmonology, StomachIcon, ThyroidIcon, Thyroidology, ToothIcon, Traditional, YinYangIcon

} from "@/components/icon/specialty-icon"

export const iconMap: { [key: string]: React.ElementType } = {
  Heart, Brain, Bone, Eye, Ear, Baby, Users, Stethoscope, Activity, HeartPulse, UserCheck, Droplet, Sun, CloudSnow, BrainCircuit,
  Cardiology,// Tim mạch
  Dermatology,// Da liễu
  Endocrinology,// Nội tiết
  Otolaryngology,// (ENT) – Tai Mũi Họng
  Pediatrics,// Nhi khoa
  Dentistry,// Răng Hàm Mặt
  Gastroenterology,// Tiêu hóa
  Pulmonology,// Phổi
  Neurology,// Thần kinh
  Andrology,// Nam khoa
  Gynecology,// Phụ khoa
  Traditional,// Medicine – Y học cổ truyền
  Ophthalmology,// Mắt
  Thyroidology,// Tuyến giáp
};


// Hàm trả về icon component dựa trên tên (string)
export const getIconByName = (name: string): React.ElementType => {
  return iconMap[name] || HelpCircle;
};