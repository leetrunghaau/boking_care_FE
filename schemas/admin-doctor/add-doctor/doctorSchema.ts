import { z } from "zod";

export const doctorSchema = z.object({
  name: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ (10-11 số)"),
  email: z.string().email("Email không hợp lệ"),
  dob: z.string().refine(
    (val) => {
      const date = new Date(val);
      const today = new Date();
      const min = new Date(today.getFullYear() - 100, 0, 1);
      return date <= today && date >= min;
    },
    { message: "Ngày sinh không hợp lệ" }
  ),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Vui lòng chọn giới tính" }),
  }),
  img: z.string().optional().default(""),
  about: z
    .string()
    .min(50, "Giới thiệu phải có ít nhất 50 ký tự")
    .nonempty("Giới thiệu về bác sĩ là bắt buộc"),
});

type NewDoctorData = z.infer<typeof doctorSchema>;
