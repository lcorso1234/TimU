"use client";

import { useCallback } from "react";

const companyWebsite = "https://www.gtmechanical.com/";
const phoneNumber = "+17088780840";

const vcardContents = `BEGIN:VCARD
VERSION:3.0
N:Uher;Tim;;;
FN:Tim “Bubbles” Uher
ORG:GT Mechanical
TEL;TYPE=CELL:${phoneNumber}
URL:${companyWebsite}
END:VCARD`;

export default function Home() {
  const handleSaveContact = useCallback(() => {
    const blob = new Blob([vcardContents], {
      type: "text/vcard;charset=utf-8",
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "tim-uher.vcf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);

    const smsBody =
      "Hi Tim “Bubbles”, I’m reaching out after grabbing your card — let’s connect.";
    const encodedBody = encodeURIComponent(smsBody);
    const ua = navigator.userAgent || "";
    const isiOS = /iPad|iPhone|iPod/.test(ua);
    const smsLink = isiOS
      ? `sms:${phoneNumber}&body=${encodedBody}`
      : `sms:${phoneNumber}?body=${encodedBody}`;

    setTimeout(() => {
      window.location.href = smsLink;
    }, 400);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <article className="relative overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-b from-[#30363c] to-[#15191c] p-7 text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
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
                className="animate-jiggle flex w-full items-center justify-center gap-2 rounded-2xl bg-[#39ff14] py-4 text-lg font-semibold text-slate-900 shadow-[0_15px_40px_rgba(57,255,20,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(57,255,20,0.55)]"
              >
                Save contact &amp; text Tim
                <span aria-hidden="true" className="text-2xl">
                  ↗
                </span>
              </button>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-slate-300">
                Tap the neon button to download Tim&apos;s contact card and open
                a ready-to-send message. Works seamlessly on Android and iOS.
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
