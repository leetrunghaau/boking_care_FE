import {
  Baby,
  Bone,
  Brain,
  Eye,
  Heart,
  Stethoscope,
  HelpCircle,
  Ear,
  Users,
  Activity,
  UserCheck,
} from "lucide-react";

export const iconMap: { [key: string]: React.ElementType } = {
  Heart,
  Brain,
  Bone,
  Eye,
  Ear,
  Baby,
  Users,
  Stethoscope,
  Activity,
  UserCheck,
};

// Hàm trả về icon component dựa trên tên (string)
export const getIconByName = (name: string): React.ElementType => {
  return iconMap[name] || HelpCircle;
};