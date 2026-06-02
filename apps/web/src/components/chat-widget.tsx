"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  FALLBACK_REPLY,
  matchIntent,
  QUICK_REPLIES,
  WELCOME_MESSAGE,
  type ChatMessage,
} from "@/lib/chat-knowledge";

type LeadStep = "idle" | "name" | "email" | "need" | "done";

function newId() {
  return Math.random().toString(36).slice(2);
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [leadStep, setLeadStep] = useState<LeadStep>("idle");
  const [lead, setLead] = useState({ name: "", email: "", need: "" });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const appendAssistant = useCallback((content: string) => {
    setMessages((m) => [
      ...m,
      { id: newId(), role: "assistant", content },
    ]);
  }, []);

  const appendUser = useCallback((content: string) => {
    setMessages((m) => [...m, { id: newId(), role: "user", content }]);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: newId(), role: "assistant", content: WELCOME_MESSAGE }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, leadStep]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, leadStep]);

  const submitLead = async (finalNeed?: string) => {
    const payload = {
      name: lead.name,
      email: lead.email,
      need: finalNeed ?? lead.need,
      transcript: messages
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n"),
    };
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      appendAssistant(
        `Thanks, ${lead.name}. Shubham will reach out at ${lead.email} within 1–2 business days.`,
      );
    } catch {
      appendAssistant(
        "Something went wrong saving your details. Please email us directly from the Contact page.",
      );
    }
    setLeadStep("done");
    setLead({ name: "", email: "", need: "" });
  };

  const startLeadCapture = () => {
    setLeadStep("name");
    appendAssistant("What's your name?");
  };

  const processMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    appendUser(trimmed);
    setInput("");
    setTyping(true);

    if (leadStep === "name") {
      setLead((l) => ({ ...l, name: trimmed }));
      setLeadStep("email");
      setTyping(false);
      appendAssistant("Thanks! What's the best email to reach you?");
      return;
    }
    if (leadStep === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setTyping(false);
        appendAssistant("That doesn't look like a valid email—could you try again?");
        return;
      }
      setLead((l) => ({ ...l, email: trimmed }));
      setLeadStep("need");
      setTyping(false);
      appendAssistant(
        "Last one—what are you looking to automate? (e.g. website FAQs, WhatsApp leads)",
      );
      return;
    }
    if (leadStep === "need") {
      setLead((l) => ({ ...l, need: trimmed }));
      setTyping(false);
      await submitLead(trimmed);
      return;
    }

    const ruleReply = matchIntent(trimmed);
    if (ruleReply === "__LEAD_CAPTURE__") {
      setTyping(false);
      startLeadCapture();
      return;
    }
    if (ruleReply) {
      setTyping(false);
      appendAssistant(ruleReply);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = (await res.json()) as { reply?: string };
      setTyping(false);
      const reply = data.reply ?? FALLBACK_REPLY;
      if (reply === "__LEAD_CAPTURE__") {
        startLeadCapture();
      } else {
        appendAssistant(reply);
      }
    } catch {
      setTyping(false);
      appendAssistant(FALLBACK_REPLY);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void processMessage(input);
  };

  const handleQuickReply = (text: string) => {
    if (text === "Get in touch") {
      if (leadStep === "idle") {
        appendUser(text);
        startLeadCapture();
      }
      return;
    }
    void processMessage(text);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-glow transition-all hover:scale-105",
          open
            ? "bg-slate-700 text-white"
            : "bg-brand-600 text-white hover:bg-brand-500",
        )}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex w-[min(100vw-2rem,400px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          role="dialog"
          aria-label="Chat assistant"
        >
          <header className="mesh-dark flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
              SS
            </div>
            <div>
              <p className="font-semibold text-white">Site assistant</p>
              <p className="text-xs text-slate-400">Preview · not full RAG yet</p>
            </div>
          </header>

          <div className="flex max-h-[min(60vh,420px)] min-h-[320px] flex-1 flex-col">
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-md bg-brand-600 text-white"
                        : "rounded-bl-md bg-slate-100 text-slate-800",
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3">
                    <span className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {leadStep === "idle" && (
              <div className="flex flex-wrap gap-2 border-t border-slate-100 px-3 py-2">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleQuickReply(q)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-brand-300 hover:bg-brand-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex gap-2 border-t border-slate-200 p-3"
            >
              <input
                ref={inputRef}
                type={leadStep === "email" ? "email" : "text"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  leadStep === "name"
                    ? "Your name…"
                    : leadStep === "email"
                      ? "you@company.com"
                      : leadStep === "need"
                        ? "What you want to automate…"
                        : "Type a message…"
                }
                disabled={leadStep === "done"}
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
              <button
                type="submit"
                disabled={leadStep === "done" || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white disabled:opacity-40 hover:bg-brand-500"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
