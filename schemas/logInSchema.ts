import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email")
    .refine(
      (val) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) || /^[0-9]{10}$/.test(val),
      {
        message: "Email không hợp lệ",
      }
    ),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
