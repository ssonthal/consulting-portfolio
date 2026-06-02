"use client";

import { useEffect, useState } from "react";
import { CheckCheck } from "lucide-react";

type Msg = { from: "customer" | "business"; text: string };

const SCRIPT: Msg[] = [
  { from: "customer", text: "What are your consultation fees?" },
  {
    from: "business",
    text: "Packages start around ₹15k/month. Want details for your use case?",
  },
  { from: "customer", text: "We get most leads on WhatsApp" },
  {
    from: "business",
    text: "I can set up an agent there—answers FAQs and captures name & email for follow-up.",
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
      }, 3000);
      return () => clearTimeout(reset);
    }

    const next = SCRIPT[visible];
    if (next?.from === "business") {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setVisible((v) => v + 1);
      }, 900);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setVisible((v) => v + 1), 700);
    return () => clearTimeout(t);
  }, [visible]);

  const shown = SCRIPT.slice(0, visible);

  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Example: WhatsApp</h2>
            <p className="mt-3 text-slate-600">
              Many teams already get enquiries on WhatsApp. A bot can answer common
              questions and pass qualified leads to you.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border-[8px] border-slate-900 bg-slate-900 shadow-lg">
            <div className="bg-[#075e54] px-3 py-2.5">
              <p className="text-sm font-semibold text-white">Business</p>
            </div>
            <div
              className="h-[280px] overflow-y-auto px-2 py-2"
              style={{ backgroundColor: "#e5ddd5" }}
            >
              <div className="space-y-2">
                {shown.map((m, i) => (
                  <div
                    key={i}
                    className={
                      m.from === "customer" ? "flex justify-start" : "flex justify-end"
                    }
                  >
                    <div
                      className={
                        m.from === "customer"
                          ? "max-w-[90%] rounded-lg rounded-tl-sm bg-white px-2.5 py-1.5 text-xs text-slate-900"
                          : "max-w-[90%] rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-1.5 text-xs text-slate-900"
                      }
                    >
                      {m.text}
                      {m.from === "business" && (
                        <CheckCheck className="mt-0.5 ml-auto h-3 w-3 text-sky-500" />
                      )}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-end">
                    <div className="rounded-lg bg-[#d9fdd3] px-3 py-2">
                      <span className="flex gap-0.5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
