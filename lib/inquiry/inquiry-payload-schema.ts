import { z } from "zod";

/** 询盘 POST 体校验（与 /api/inquiry 一致，不含反爬 hp 字段） */
export const inquiryPayloadSchema = z.object({
  name: z.string().min(1).max(120),
  company: z.string().max(200).optional(),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  country: z.string().max(120).optional(),
  message: z.string().min(5).max(8000),
  locale: z.enum(["zh", "en"]),
});

export type InquiryPayload = z.infer<typeof inquiryPayloadSchema>;
