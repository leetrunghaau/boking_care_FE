// schemas/registerSchema.ts
import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(1, "Vui lòng nhập họ tên"),
    email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
    phone: z
      .string()
      .min(1, "Vui lòng nhập số điện thoại")
      .regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: "Bạn phải đồng ý với điều khoản dịch vụ" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });
