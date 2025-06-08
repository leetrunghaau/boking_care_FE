import { z } from "zod";

export const editHospitalFacilitySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Tên không được để trống"),
  about: z.string().min(1, "Giới thiệu không được để trống"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  phone: z
    .string()
    .regex(/^\d{9,11}$/, "Số điện thoại không hợp lệ (9–11 chữ số)"),
  license: z.string().min(1, "Số giấy phép không được để trống"),
  image: z.string().optional(),
  year: z.number().min(0, "Năm phải lớn hơn 0"),
  mapEmbedUrl: z
    .string()
    .url("URL Google Maps không hợp lệ")
    .optional()
    .or(z.literal("")), // chấp nhận chuỗi rỗng
  times: z
    .array(
      z.object({
        dayOfWeek: z.number().min(1).max(8),
        startTime: z.number().min(0).max(1440),
        endTime: z.number().min(0).max(1440),
      })
    )
    .optional(),
});
