"use client";

import { useState } from "react";

import type { SiteDictionary } from "@/lib/i18n/copy/types";
import type { Locale } from "@/lib/i18n/config";
import { inquiryPayloadSchema } from "@/lib/inquiry/inquiry-payload-schema";

type Labels = SiteDictionary["inquiry"];

type FieldKey = "name" | "email" | "message" | "company" | "phone" | "country";

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
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>(
    {},
  );
  const [validationBanner, setValidationBanner] = useState<string | null>(null);

  function patchField(
    key: FieldKey,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) {
    setter(value);
    setValidationBanner(null);
    setFieldErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    setValidationBanner(null);
    setErrorDetail(null);

    const payload = {
      name: name.trim(),
      company: company.trim() || undefined,
      email: email.trim(),
      phone: phone.trim() || undefined,
      country: country.trim() || undefined,
      message: message.trim(),
      locale,
    };

    const parsed = inquiryPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const nextErr: Partial<Record<FieldKey, string>> = {};
      if (flat.name?.length) nextErr.name = labels.validationName;
      if (flat.email?.length) nextErr.email = labels.validationEmail;
      if (flat.message?.length) nextErr.message = labels.validationMessageMin;
      let other =
        !!(flat.company?.length || flat.phone?.length || flat.country?.length);
      if (parsed.error.flatten().formErrors?.length)
        other = true;
      setFieldErrors(nextErr);
      setValidationBanner(other ? labels.validationOther : null);

      requestAnimationFrame(() => {
        const firstId = flat.name?.length
          ? "inquiry-name"
          : flat.email?.length
            ? "inquiry-email"
            : flat.message?.length
              ? "inquiry-message"
              : null;
        if (firstId) document.getElementById(firstId)?.focus();
      });
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          hp,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
      };
      if (res.status === 503 && data.error === "server_config") {
        setStatus("error");
        setErrorDetail("config");
        return;
      }
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorDetail("generic");
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
      setErrorDetail("generic");
    }
  }

  const inputBase =
    "mt-1 w-full rounded border bg-white px-3 py-2.5 text-[0.9rem] text-ink outline-none transition focus:ring-1";
  const inputOk = `${inputBase} border-line focus:border-teal focus:ring-teal/30`;
  const inputBad = `${inputBase} border-red-400 focus:border-red-500 focus:ring-red-400/35`;

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
          {validationBanner && (
            <p className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-[0.8rem] text-amber-950">
              {validationBanner}
            </p>
          )}
          <div>
            <label htmlFor="inquiry-name" className="text-[0.78rem] font-semibold text-ink">
              {labels.name} <span className="text-red-600">*</span>
            </label>
            <input
              id="inquiry-name"
              className={fieldErrors.name ? inputBad : inputOk}
              value={name}
              onChange={(e) => patchField("name", e.target.value, setName)}
              maxLength={120}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "inquiry-name-err" : undefined}
            />
            {fieldErrors.name && (
              <p id="inquiry-name-err" className="mt-1 text-[0.78rem] text-red-700">
                {fieldErrors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="inquiry-company" className="text-[0.78rem] font-semibold text-ink">
              {labels.company}
            </label>
            <input
              id="inquiry-company"
              className={fieldErrors.company ? inputBad : inputOk}
              value={company}
              onChange={(e) => patchField("company", e.target.value, setCompany)}
              maxLength={200}
              aria-invalid={!!fieldErrors.company}
              aria-describedby={fieldErrors.company ? "inquiry-company-err" : undefined}
            />
            {fieldErrors.company && (
              <p id="inquiry-company-err" className="mt-1 text-[0.78rem] text-red-700">
                {fieldErrors.company}
              </p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="inquiry-email" className="text-[0.78rem] font-semibold text-ink">
                {labels.email} <span className="text-red-600">*</span>
              </label>
              <input
                id="inquiry-email"
                type="email"
                autoComplete="email"
                className={fieldErrors.email ? inputBad : inputOk}
                value={email}
                onChange={(e) => patchField("email", e.target.value, setEmail)}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "inquiry-email-err" : undefined}
              />
              {fieldErrors.email && (
                <p id="inquiry-email-err" className="mt-1 text-[0.78rem] text-red-700">
                  {fieldErrors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="inquiry-phone" className="text-[0.78rem] font-semibold text-ink">
                {labels.phone}
              </label>
              <input
                id="inquiry-phone"
                type="tel"
                className={fieldErrors.phone ? inputBad : inputOk}
                autoComplete="tel"
                value={phone}
                onChange={(e) => patchField("phone", e.target.value, setPhone)}
                maxLength={40}
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? "inquiry-phone-err" : undefined}
              />
              {fieldErrors.phone && (
                <p id="inquiry-phone-err" className="mt-1 text-[0.78rem] text-red-700">
                  {fieldErrors.phone}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="inquiry-country" className="text-[0.78rem] font-semibold text-ink">
              {labels.country}
            </label>
            <input
              id="inquiry-country"
              className={fieldErrors.country ? inputBad : inputOk}
              value={country}
              onChange={(e) => patchField("country", e.target.value, setCountry)}
              maxLength={120}
              aria-invalid={!!fieldErrors.country}
              aria-describedby={fieldErrors.country ? "inquiry-country-err" : undefined}
            />
            {fieldErrors.country && (
              <p id="inquiry-country-err" className="mt-1 text-[0.78rem] text-red-700">
                {fieldErrors.country}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="inquiry-message" className="text-[0.78rem] font-semibold text-ink">
              {labels.message} <span className="text-red-600">*</span>
            </label>
            <textarea
              id="inquiry-message"
              className={`${fieldErrors.message ? inputBad : inputOk} min-h-[120px] resize-y`}
              value={message}
              onChange={(e) => patchField("message", e.target.value, setMessage)}
              maxLength={8000}
              rows={5}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? "inquiry-message-err" : undefined}
            />
            {fieldErrors.message && (
              <p id="inquiry-message-err" className="mt-1 text-[0.78rem] text-red-700">
                {fieldErrors.message}
              </p>
            )}
          </div>
          {status === "error" && (
            <p className="text-[0.85rem] text-red-700" role="alert">
              {errorDetail === "config" ? labels.errorConfig : labels.error}
            </p>
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
