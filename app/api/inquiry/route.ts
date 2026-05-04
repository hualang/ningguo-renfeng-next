import { NextResponse } from "next/server";
import { Resend } from "resend";

import { inquiryPayloadSchema, type InquiryPayload } from "@/lib/inquiry/inquiry-payload-schema";
import { postInquiryToFeishu } from "@/lib/inquiry/feishu-webhook";

function buildBody(data: InquiryPayload, lang: "zh" | "en"): { text: string; html: string } {
  const lines =
    lang === "zh"
      ? [
          `姓名：${data.name}`,
          `公司：${data.company || "—"}`,
          `邮箱：${data.email}`,
          `电话：${data.phone || "—"}`,
          `国家/地区：${data.country || "—"}`,
          "",
          "需求说明：",
          data.message,
          "",
          `来源语言：${data.locale}`,
        ]
      : [
          `Name: ${data.name}`,
          `Company: ${data.company || "—"}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || "—"}`,
          `Country/Region: ${data.country || "—"}`,
          "",
          "Message:",
          data.message,
          "",
          `Locale: ${data.locale}`,
        ];
  const text = lines.join("\n");
  const html = `<pre style="font-family:sans-serif;white-space:pre-wrap">${lines
    .map((l) => l.replace(/</g, "&lt;"))
    .join("\n")}</pre>`;
  return { text, html };
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL?.trim();
  if (!key || !to) {
    return NextResponse.json(
      {
        ok: false,
        error: "server_config",
        message: "Inquiry email is not configured (RESEND_API_KEY / INQUIRY_TO_EMAIL).",
      },
      { status: 503 },
    );
  }

  let json: Record<string, unknown>;
  try {
    json = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const hp = typeof json.hp === "string" ? json.hp : "";
  if (hp.length > 0) {
    return NextResponse.json({ ok: true });
  }
  delete json.hp;

  const parsed = inquiryPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const from =
    process.env.INQUIRY_FROM_EMAIL?.trim() ||
    "Renfeng Web <onboarding@resend.dev>";
  const lang = data.locale === "en" ? "en" : "zh";
  const { text, html } = buildBody(data, lang);
  const subject =
    lang === "zh"
      ? `[官网询盘] ${data.name} · ${data.company || "未填公司"}`
      : `[Web inquiry] ${data.name} · ${data.company || "No company"}`;

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: to.split(",").map((s) => s.trim()),
    replyTo: data.email,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("[inquiry] Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "send_failed", message: error.message },
      { status: 502 },
    );
  }

  const feishu = await postInquiryToFeishu({
    name: data.name,
    company: data.company,
    email: data.email,
    phone: data.phone,
    country: data.country,
    message: data.message,
    locale: data.locale,
  });
  if (!feishu.skipped && !feishu.ok) {
    console.warn(
      "[inquiry] Email sent but Feishu webhook failed; check server logs and FEISHU_BITABLE_WEBHOOK_URL",
    );
  }

  return NextResponse.json({ ok: true });
}
