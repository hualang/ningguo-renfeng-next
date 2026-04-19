/**
 * 飞书多维表格「自动化 → Webhook 触发」生成的地址。
 * 在自动化里把请求体字段映射到表格列即可（字段名见 postInquiryToFeishu 的 payload）。
 */
export async function postInquiryToFeishu(payload: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  message: string;
  locale: string;
}): Promise<{ skipped: boolean; ok: boolean }> {
  const url = process.env.FEISHU_BITABLE_WEBHOOK_URL?.trim();
  if (!url) {
    return { skipped: true, ok: true };
  }

  const body = {
    name: payload.name,
    company: payload.company ?? "",
    email: payload.email,
    phone: payload.phone ?? "",
    country: payload.country ?? "",
    message: payload.message,
    locale: payload.locale,
    submittedAt: new Date().toISOString(),
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text();
      console.error(
        "[inquiry] Feishu webhook HTTP",
        res.status,
        text.slice(0, 800),
      );
      return { skipped: false, ok: false };
    }
    return { skipped: false, ok: true };
  } catch (e) {
    clearTimeout(timeout);
    console.error("[inquiry] Feishu webhook error:", e);
    return { skipped: false, ok: false };
  }
}
