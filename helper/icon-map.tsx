import {
  Baby,
  Bone,
  Brain,
  Eye,
  Heart,
  Stethoscope,
  HelpCircle,
} from "lucide-react";

export const iconMap: { [key: string]: React.ElementType } = {
  Brain,
  Heart,
  Eye,
  Bone,
  Baby,
  Stethoscope,
};

// Hàm trả về icon component dựa trên tên (string)
export const getIconByName = (name: string): React.ElementType => {
  return iconMap[name] || HelpCircle;
};