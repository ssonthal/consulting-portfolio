"use client";

import { useEffect, useState } from "react";
import { CheckCheck, Phone, Video } from "lucide-react";

type Msg = { from: "customer" | "business"; text: string };

const SCRIPT: Msg[] = [
  { from: "customer", text: "Hi, do you build WhatsApp chatbots for sales?" },
  {
    from: "business",
    text: "Yes! We set up AI agents on WhatsApp Business that answer FAQs and capture qualified leads 24/7.",
  },
  { from: "customer", text: "What’s the pricing like?" },
  {
    from: "business",
    text: "Depends on your flow—most pilots start with FAQ + lead capture. Want me to note your details for a quick call?",
  },
  { from: "customer", text: "Sure — we get 30–40 enquiries a week on WA" },
  {
    from: "business",
    text: "Perfect fit. What’s your name and email? I’ll have the team reach out within a few hours.",
  },
  { from: "customer", text: "Rahul, rahul@acme.co" },
  {
    from: "business",
    text: "Thanks Rahul ✓ You’re in our queue. We’ve saved this chat for your sales rep.",
  },
];

export function WhatsAppDemo() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (visible >= SCRIPT.length) {
      const reset = setTimeout(() => {
        setVisible(0);
        setTyping(false);
      }, 4000);
      return () => clearTimeout(reset);
    }

    const next = SCRIPT[visible];
    const isBusiness = next?.from === "business";

    if (isBusiness) {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setVisible((v) => v + 1);
      }, 1200);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setVisible((v) => v + 1), 800);
    return () => clearTimeout(t);
  }, [visible]);

  const shown = SCRIPT.slice(0, visible);

  return (
    <section
      id="whatsapp-demo"
      className="scroll-mt-20 border-b border-slate-200 bg-slate-50 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              Live-style preview
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Inbound queries, handled on WhatsApp
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Most businesses already get leads on WhatsApp. Your agent answers
              instantly, qualifies intent, and hands off warm conversations—with
              full context attached.
            </p>
            <ul className="mt-6 space-y-2 text-slate-700">
              <li>· Instant replies to pricing and service questions</li>
              <li>· Structured lead capture in the same thread</li>
              <li>· Seamless escalation to your sales team</li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[320px]">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-400/20 to-brand-600/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border-[10px] border-slate-900 bg-slate-900 shadow-2xl">
              <div className="bg-[#075e54] px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                    FD
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-semibold text-white">
                      FlowDesk Sales
                    </p>
                    <p className="text-xs text-emerald-100">Business account</p>
                  </div>
                  <Video className="h-5 w-5 text-white/80" />
                  <Phone className="h-5 w-5 text-white/80" />
                </div>
              </div>

              <div
                className="h-[420px] overflow-y-auto px-2 py-3"
                style={{
                  backgroundColor: "#e5ddd5",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8c4bc' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              >
                <div className="mb-3 flex justify-center">
                  <span className="rounded-lg bg-white/90 px-2 py-1 text-[10px] text-slate-600 shadow-sm">
                    Today
                  </span>
                </div>
                <div className="space-y-2">
                  {shown.map((m, i) => (
                    <div
                      key={i}
                      className={
                        m.from === "customer"
                          ? "flex justify-start"
                          : "flex justify-end"
                      }
                    >
                      <div
                        className={
                          m.from === "customer"
                            ? "max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
                            : "max-w-[85%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-3 py-2 text-sm text-slate-900 shadow-sm"
                        }
                      >
                        {m.text}
                        <div className="mt-0.5 flex justify-end gap-0.5 text-[10px] text-slate-400">
                          <span>
                            {String(10 + i).padStart(2, "0")}:
                            {String((i * 3 + 12) % 60).padStart(2, "0")}
                          </span>
                          {m.from === "business" && (
                            <CheckCheck className="h-3 w-3 text-sky-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="flex justify-end">
                      <div className="rounded-lg rounded-tr-none bg-[#d9fdd3] px-4 py-3 shadow-sm">
                        <span className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500/50 [animation-delay:0ms]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500/50 [animation-delay:150ms]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500/50 [animation-delay:300ms]" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#f0f2f5] px-2 py-2">
                <div className="flex-1 rounded-full bg-white px-4 py-2 text-xs text-slate-400">
                  Type a message
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">
              Simulated conversation · loops automatically
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
