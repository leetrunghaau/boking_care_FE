
export const bookingStatusVN = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: "Đang chờ xác nhận",
    confirmed: "Đã xác nhận",
    completed: "Đã hoàn thành",
    cancelled: "Đã hủy",
  };

  return statusMap[status] || "Không rõ trạng thái";
};

export const statusBadge = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-teal-100 text-teal-700",
    completed: "bg-gray-100 text-gray-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return statusMap[status] || "bg-gray-100 text-gray-700";
};

export const statusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: "yellow",
    confirmed: "teal",
    completed: "gray",
    cancelled: "red",
  };
  return statusMap[status] || "gray";
};


