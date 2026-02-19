"use client";

import { useCallback, useState } from "react";

const phoneNumber = "+17088780840";

type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
};

export default function Home() {
  const [showSmsForm, setShowSmsForm] = useState(false);
  const [isSavingContact, setIsSavingContact] = useState(false);
  const [formValues, setFormValues] = useState<ContactFormValues>({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleSaveContact = useCallback(() => {
    if (isSavingContact) {
      return;
    }
    setIsSavingContact(true);
    try {
      const link = document.createElement("a");
      link.href = "/tim-uher.vcf";
      link.download = "tim-uher.vcf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setShowSmsForm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSavingContact(false);
    }
  }, [isSavingContact]);

  const handleSendSms = useCallback(() => {
    const trimmedName = formValues.fullName.trim();
    const trimmedEmail = formValues.email.trim();
    const trimmedPhone = formValues.phone.trim();
    const shareableContactUrl = `${window.location.origin}/tim-uher.vcf`;

    const smsBody = `Hi Tim “Bubbles”, I grabbed your card and want to connect.

Name: ${trimmedName || "Not provided"}
Email: ${trimmedEmail || "Not provided"}
Phone: ${trimmedPhone || "Not provided"}

Shareable contact link (tap to import on iPhone or Android):
${shareableContactUrl}`;

    const encodedBody = encodeURIComponent(smsBody);
    const ua = navigator.userAgent || "";
    const isiOS = /iPad|iPhone|iPod/.test(ua);
    const smsLink = isiOS
      ? `sms:${phoneNumber}&body=${encodedBody}`
      : `sms:${phoneNumber}?body=${encodedBody}`;

    setTimeout(() => {
      window.location.href = smsLink;
    }, 400);
  }, [formValues]);

  const onFormChange = (field: keyof ContactFormValues, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#353e43] px-4 py-12">
      <div className="w-full max-w-md">
        <article className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[rgba(53,62,67,0.65)] p-7 text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 via-white/0 to-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
          <div className="relative space-y-6">
            <header className="space-y-2">
              <p className="text-xs uppercase tracking-[0.6em] text-slate-400">
                GT Mechanical
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                Aces in their places
              </h1>
            </header>

            <section className="space-y-4">
              <p className="text-base text-slate-300">
                Tim “Bubbles” Uher keeps GT Mechanical humming. Snag his contact
                card and a ready-made message in one tap—then line up your next
                project with the crew that puts aces in their places.
              </p>

              <button
                type="button"
                onClick={handleSaveContact}
                disabled={isSavingContact}
                className="animate-jiggle flex w-full items-center justify-center gap-2 rounded-2xl bg-[#39ff14] py-4 text-lg font-semibold text-slate-900 shadow-[0_15px_40px_rgba(57,255,20,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(57,255,20,0.55)]"
              >
                {isSavingContact
                  ? "Preparing contact..."
                  : "Save contact & text Tim"}
                <span aria-hidden="true" className="text-2xl">
                  ↗
                </span>
              </button>

              {showSmsForm ? (
                <div className="space-y-3 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-slate-200">
                  <p className="text-sm font-medium text-slate-100">
                    Contact saved. Want to send Tim a text?
                  </p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      inputMode="text"
                      value={formValues.fullName}
                      onChange={(event) =>
                        onFormChange("fullName", event.target.value)
                      }
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-[#39ff14] focus:outline-none"
                    />
                    <input
                      type="email"
                      inputMode="email"
                      value={formValues.email}
                      onChange={(event) =>
                        onFormChange("email", event.target.value)
                      }
                      placeholder="Your email"
                      className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-[#39ff14] focus:outline-none"
                    />
                    <input
                      type="tel"
                      inputMode="tel"
                      value={formValues.phone}
                      onChange={(event) =>
                        onFormChange("phone", event.target.value)
                      }
                      placeholder="Your phone number"
                      className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-[#39ff14] focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleSendSms}
                      className="flex-1 rounded-xl bg-[#39ff14] px-3 py-2 font-semibold text-slate-900 transition hover:brightness-95"
                    >
                      Send text
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSmsForm(false)}
                      className="rounded-xl border border-white/20 px-3 py-2 font-medium text-slate-200 transition hover:bg-white/10"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-slate-300">
                Tap the neon button to save Tim&apos;s contact first, then choose
                whether to send a text with your details. Works on Android and
                iOS.
              </div>
            </section>

            <footer className="pt-2 text-center text-sm text-slate-400">
              <p className="font-semibold text-slate-200">
                Built in America, on earth.
              </p>
              <p className="italic text-slate-400">
                Making relationships built to last, the American Way.
              </p>
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
}
