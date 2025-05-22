// data/specialtyData.tsx
import { Brain, Heart, Eye } from "lucide-react"

export const specialtyData: Record<string, any> = {
  "than-kinh": {
    name: "Thần kinh",
    icon: <Brain className="h-10 w-10 text-teal-600" />,
    description:
      "Chuyên khoa Thần kinh tập trung vào chẩn đoán và điều trị các bệnh liên quan đến não, tủy sống, dây thần kinh ngoại biên và cơ.",
    commonDiseases: [
      "Đột quỵ",
      "Động kinh",
      "Parkinson",
      "Rối loạn lo âu",
      "Rối loạn tiền đình",
    ],
    doctors: [
      {
        name: "BS. Nguyễn Văn A",
        title: "Chuyên gia Thần kinh - BV Bạch Mai",
        image: "/bs-nguyen-a.jpg",
        rating: 5,
        reviews: 120,
      },
      {
        name: "BS. Trần Thị B",
        title: "Bác sĩ nội trú - BV Đại học Y Hà Nội",
        image: "/bs-tran-b.jpg",
        rating: 4,
        reviews: 85,
      },
    ],
    facilities: [
      {
        name: "Bệnh viện Bạch Mai",
        location: "Hà Nội",
        slug: "bv-bach-mai",
      },
      {
        name: "Bệnh viện Đại học Y Dược TP.HCM",
        location: "TP. Hồ Chí Minh",
        slug: "bv-dhyd-tphcm",
      },
    ],
  },

  "tim-mach": {
    name: "Tim mạch",
    icon: <Heart className="h-10 w-10 text-teal-600" />,
    description:
      "Chuyên khoa Tim mạch chuyên điều trị các vấn đề về tim và hệ tuần hoàn như tăng huyết áp, suy tim và các rối loạn nhịp tim.",
    commonDiseases: [
      "Tăng huyết áp",
      "Suy tim",
      "Rối loạn nhịp tim",
      "Nhồi máu cơ tim",
      "Hẹp van tim",
    ],
    doctors: [
      {
        name: "BS. Lê Văn C",
        title: "Chuyên gia Tim mạch - Viện Tim TP.HCM",
        image: "/bs-le-c.jpg",
        rating: 5,
        reviews: 200,
      },
      {
        name: "BS. Phạm Thị D",
        title: "Phó khoa Tim mạch - BV TW Huế",
        image: "/bs-pham-d.jpg",
        rating: 4,
        reviews: 150,
      },
    ],
    facilities: [
      {
        name: "Viện Tim TP.HCM",
        location: "TP. Hồ Chí Minh",
        slug: "vien-tim",
      },
      {
        name: "Bệnh viện Trung ương Huế",
        location: "Huế",
        slug: "bv-hue",
      },
    ],
  },

  "mat": {
    name: "Mắt",
    icon: <Eye className="h-10 w-10 text-teal-600" />,
    description:
      "Chuyên khoa Mắt khám và điều trị các bệnh về thị lực như cận thị, viễn thị, đục thủy tinh thể và các vấn đề về võng mạc.",
    commonDiseases: [
      "Cận thị",
      "Loạn thị",
      "Đục thủy tinh thể",
      "Thoái hóa điểm vàng",
      "Viêm kết mạc",
    ],
    doctors: [
      {
        name: "BS. Đỗ Thị E",
        title: "Chuyên gia Nhãn khoa - BV Mắt TW",
        image: "/bs-do-e.jpg",
        rating: 5,
        reviews: 180,
      },
      {
        name: "BS. Nguyễn Văn F",
        title: "Trưởng khoa Mắt - BV Mắt TP.HCM",
        image: "/bs-nguyen-f.jpg",
        rating: 4,
        reviews: 140,
      },
    ],
    facilities: [
      {
        name: "Bệnh viện Mắt Trung ương",
        location: "Hà Nội",
        slug: "mat-trung-uong",
      },
      {
        name: "Bệnh viện Mắt TP.HCM",
        location: "TP. Hồ Chí Minh",
        slug: "mat-tphcm",
      },
    ],
  },
}
