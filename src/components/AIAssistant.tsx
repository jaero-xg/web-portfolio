import { useEffect, useRef, useState } from "react";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  text: string;
}

const GEMINI_MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT = `
You are Amer's personal AI assistant embedded in his portfolio website.
Your job: help visitors learn about Amer in a friendly, concise, and honest way.

About Amer (John Amer Royo):
- BS Information Technology graduate from Romblon State University (2021–2025)
- Frontend Developer, UI/UX Designer, AR Developer, Mobile Dev
- University Lecturer at RSU
- Tech stack: React, Flutter, Unity, C#, PHP, MySQL, Figma
- Projects: Scheduler systems, AR apps, portfolio work
- GitHub: github.com/jaero-xg | Email: royojohnamer@gmail.com

Rules:
- Be concise (2–4 sentences max)
- Never hallucinate facts
`;

const SUGGESTIONS = [
  "What does Amer do?",
  "See his projects",
  "Tech stack?",
  "Is he available?",
];

// FIX #5: Use Vite env variable instead of window.CONFIG
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hey! I'm Amer's assistant. Ask me anything about his work, skills, or availability.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function callGemini(userMessage: string) {
    const body = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        ...messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.text }],
        })),
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error?.message || "API error");
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  }

  async function sendMessage(text: string) {
    const msg = text.trim();
    if (!msg || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const reply = await callGemini(msg);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Error: ${message}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className={`ai-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="ai-trigger-dot" />
        <span className="ai-trigger-label">Ask Amer's AI</span>
      </button>

      <div className={`ai-panel ${open ? "open" : ""}`} role="dialog">
        <div className="ai-header">
          <div className="ai-header-left">
            <div className="ai-avatar">
              <span className="ai-avatar-icon">✦</span>
            </div>
            <div className="ai-header-info">
              <span className="ai-name">Amer's Assistant</span>
              <span className="ai-status">
                <span className="ai-status-dot" />
                Online · Powered by Gemini
              </span>
            </div>
          </div>
          <button className="ai-close" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <div className="ai-messages" ref={messagesRef}>
          {messages.map((m, i) => (
            <div key={i} className={`ai-msg ${m.role}`}>
              <div className="ai-bubble">{m.text}</div>
            </div>
          ))}
          {loading && (
            <div className="ai-msg assistant">
              <div className="ai-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        <div className="ai-suggestions">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className="ai-suggestion"
              onClick={() => sendMessage(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="ai-input-row">
          <textarea
            className="ai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Amer…"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
          />
          <button
            className="ai-send"
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
