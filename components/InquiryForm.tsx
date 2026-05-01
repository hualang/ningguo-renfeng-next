"use client";

import { useState } from "react";

import type { SiteDictionary } from "@/lib/i18n/copy/types";
import type { Locale } from "@/lib/i18n/config";

type Labels = SiteDictionary["inquiry"];

export function InquiryForm({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Labels;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  /** `"config"` = 缺环境变量文案；其余为服务端返回的补充说明（如 Resend 报错） */
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorDetail(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim() || undefined,
          email: email.trim(),
          phone: phone.trim() || undefined,
          country: country.trim() || undefined,
          message: message.trim(),
          locale,
          hp,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        issues?: { fieldErrors?: Record<string, string[]> };
      };
      if (res.status === 503 && data.error === "server_config") {
        setStatus("error");
        setErrorDetail("config");
        return;
      }
      if (!res.ok || !data.ok) {
        setStatus("error");
        let hint =
          typeof data.message === "string" && data.message.trim()
            ? data.message.trim()
            : null;
        if (!hint && data.error === "validation" && data.issues?.fieldErrors) {
          const first = Object.values(data.issues.fieldErrors).find(
            (a) => a?.length,
          );
          if (first?.[0]) hint = first[0];
        }
        setErrorDetail(hint ?? "generic");
        return;
      }
      setStatus("success");
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setCountry("");
      setMessage("");
      setHp("");
    } catch {
      setStatus("error");
      setErrorDetail(
        navigator.onLine === false ? "offline" : "generic",
      );
    }
  }

  const inputClass =
    "mt-1 w-full rounded border border-line bg-white px-3 py-2.5 text-[0.9rem] text-ink outline-none transition focus:border-teal focus:ring-1 focus:ring-teal/30";

  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <h3 className="mb-1 text-lg font-semibold text-ink">{labels.title}</h3>
      <p className="mb-5 text-[0.85rem] leading-relaxed text-ink-muted">
        {labels.subtitle}
      </p>
      {status === "success" ? (
        <p className="rounded border border-teal/40 bg-teal-soft px-4 py-3 text-[0.9rem] font-medium text-teal-dark">
          {labels.success}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="inquiry-hp">Website</label>
            <input
              id="inquiry-hp"
              name="hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="inquiry-name" className="text-[0.78rem] font-semibold text-ink">
              {labels.name} <span className="text-red-600">*</span>
            </label>
            <input
              id="inquiry-name"
              className={inputClass}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={120}
            />
          </div>
          <div>
            <label htmlFor="inquiry-company" className="text-[0.78rem] font-semibold text-ink">
              {labels.company}
            </label>
            <input
              id="inquiry-company"
              className={inputClass}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              maxLength={200}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="inquiry-email" className="text-[0.78rem] font-semibold text-ink">
                {labels.email} <span className="text-red-600">*</span>
              </label>
              <input
                id="inquiry-email"
                type="email"
                className={inputClass}
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="inquiry-phone" className="text-[0.78rem] font-semibold text-ink">
                {labels.phone}
              </label>
              <input
                id="inquiry-phone"
                type="tel"
                className={inputClass}
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={40}
              />
            </div>
          </div>
          <div>
            <label htmlFor="inquiry-country" className="text-[0.78rem] font-semibold text-ink">
              {labels.country}
            </label>
            <input
              id="inquiry-country"
              className={inputClass}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              maxLength={120}
            />
          </div>
          <div>
            <label htmlFor="inquiry-message" className="text-[0.78rem] font-semibold text-ink">
              {labels.message} <span className="text-red-600">*</span>
            </label>
            <textarea
              id="inquiry-message"
              className={`${inputClass} min-h-[120px] resize-y`}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={8000}
              rows={5}
            />
          </div>
          {status === "error" && (
            <div className="space-y-1 text-[0.85rem]" role="alert">
              <p className="text-red-700">
                {errorDetail === "config" ? labels.errorConfig : labels.error}
              </p>
              {errorDetail &&
                errorDetail !== "config" &&
                errorDetail !== "generic" &&
                errorDetail !== "offline" && (
                  <p className="rounded border border-red-200 bg-red-50 px-3 py-2 font-mono text-[0.75rem] leading-relaxed text-red-900">
                    {errorDetail}
                  </p>
                )}
              {errorDetail === "offline" && (
                <p className="text-red-700/90">
                  {locale === "zh"
                    ? "当前网络不可用，请检查连接后重试。"
                    : "You appear offline. Check your connection and try again."}
                </p>
              )}
              {errorDetail === "generic" && (
                <p className="text-ink-muted">
                  {locale === "zh"
                    ? "若在海外访问，可多试几次；仍为失败请到 Vercel → 项目 → Deployments → 对应部署 → Functions / Logs 查看 [inquiry] 日志。"
                    : "Retry in a moment. If it persists, check Vercel → your deployment → Functions / Logs for [inquiry]."}
                </p>
              )}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded bg-teal px-6 py-3 text-[0.8rem] font-semibold text-white transition hover:bg-teal-dark disabled:opacity-60"
            >
              {status === "sending" ? labels.sending : labels.submit}
            </button>
            <span className="text-[0.72rem] text-ink-muted">{labels.privacy}</span>
          </div>
        </form>
      )}
    </div>
  );
}
