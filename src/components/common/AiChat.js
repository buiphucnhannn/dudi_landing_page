"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Check,
  Copy,
  ExternalLink,
  Maximize2,
  Minimize2,
  RotateCcw,
  Send,
  Square,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";

// Danh mục gợi ý chuẩn theo mẫu AI_CHATBOX
const SUGGESTIONS = [
  "Tư vấn dịch vụ website & app",
  "Truy xuất 400+ dự án thực tế",
  "Yêu cầu báo giá phần mềm",
  "Quy trình làm việc & bảo hành",
];

// Lời chào chuẩn theo mẫu AI_CHATBOX (ChatWindow.tsx)
const WELCOME_MESSAGE = {
  id: "welcome",
  role: "ai",
  text: "Xin chào! Tôi là **Trợ lý AI DUDI SOFTWARE**.\n\nTôi có thể giúp bạn giải đáp mọi thắc mắc về dịch vụ phần mềm, thiết kế website, ứng dụng di động, báo giá tham khảo và hơn 400+ dự án thực tế của DUDI Software. Bạn cần hỗ trợ thông tin gì hôm nay?",
  time: "",
};

const SESSION_KEY = "dudi_ai_chat_session_id";
const ERROR_FALLBACK =
  "Mất kết nối tới máy chủ AI. Bạn vui lòng bấm thử lại, hoặc liên hệ Hotline (+84) 909 163 821 để chuyên viên hỗ trợ ngay nhé!";

function nowTime() {
  const d = new Date();
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function withTime(msg) {
  return { ...msg, time: msg.time || nowTime() };
}

function getSessionId() {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `sess_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `sess_${Date.now()}`;
  }
}

// ==========================================
// RENDER MARKDOWN (Headers, Tables, Lists, Links, Bold)
// ==========================================
function renderInline(text) {
  const parts = String(text || "").split(
    /(\[.+?\]\(.+?\)|https?:\/\/[^\s)\]]+|\*\*.+?\*\*)/g
  );

  return parts.filter(Boolean).map((part, i) => {
    const mdLink = part.match(/^\[(.+?)\]\((.+?)\)$/);
    if (mdLink) {
      return (
        <a
          key={i}
          href={mdLink[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-[#D92D20] hover:text-[#b01e14] underline underline-offset-2 font-bold break-all transition-colors"
        >
          <span>{mdLink[1]}</span>
          <ExternalLink className="w-3 h-3 inline-block shrink-0 opacity-70" />
        </a>
      );
    }
    if (/^https?:\/\//.test(part)) {
      const short = part.replace(/^https?:\/\//, "").replace(/\/$/, "").slice(0, 36);
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-[#D92D20] hover:text-[#b01e14] underline underline-offset-2 font-bold break-all transition-colors"
        >
          <span>{short}</span>
          <ExternalLink className="w-3 h-3 inline-block shrink-0 opacity-70" />
        </a>
      );
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-extrabold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function parseMarkdownTable(tableLines, tableKey) {
  if (tableLines.length < 2) return null;
  const parseRow = (line) =>
    line
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((cell) => cell.trim());

  const headers = parseRow(tableLines[0]);
  const rows = tableLines.slice(2).map(parseRow);

  return (
    <div
      key={tableKey}
      className="my-2.5 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs"
    >
      <table className="w-full text-left text-[12px] border-collapse">
        <thead>
          <tr className="bg-[#FFF4EE] border-b border-slate-200 text-slate-900 font-extrabold">
            {headers.map((h, i) => (
              <th key={i} className="px-2.5 py-1.5 whitespace-nowrap">
                {renderInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-2.5 py-1.5 text-slate-700 leading-snug">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderRichText(text) {
  const lines = String(text || "").split("\n");
  const elements = [];
  let listBuf = [];
  let tableBuf = [];

  const flushList = () => {
    if (!listBuf.length) return;
    elements.push(
      <ul key={`ul-${elements.length}`} className="space-y-1 my-1.5 pl-0.5">
        {listBuf.map((item, i) => (
          <li key={i} className="flex items-start gap-1.5 text-[13px] leading-relaxed">
            {item.isNumber ? (
              <span className="font-bold text-[#E5261E] shrink-0 text-[11.5px] min-w-[18px]">
                {item.num}.
              </span>
            ) : (
              <span className="text-[#E5261E] font-black shrink-0 leading-none mt-1">
                •
              </span>
            )}
            <span className="flex-1 min-w-0">{renderInline(item.text)}</span>
          </li>
        ))}
      </ul>
    );
    listBuf = [];
  };

  const flushTable = () => {
    if (!tableBuf.length) return;
    const tableEl = parseMarkdownTable(tableBuf, `tbl-${elements.length}`);
    if (tableEl) {
      elements.push(tableEl);
    } else {
      tableBuf.forEach((line, i) => {
        elements.push(
          <p
            key={`tbl-fb-${elements.length}-${i}`}
            className="my-0.5 break-words text-[13px] leading-relaxed"
          >
            {renderInline(line)}
          </p>
        );
      });
    }
    tableBuf = [];
  };

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const trimmed = line.trim();

    // 1. Table check
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushList();
      tableBuf.push(trimmed);
      continue;
    } else {
      flushTable();
    }

    // 2. Horizontal divider
    if (/^([-*_]){3,}$/.test(trimmed)) {
      flushList();
      elements.push(
        <hr key={`hr-${idx}`} className="my-2 border-slate-200/80 border-dashed" />
      );
      continue;
    }

    // 3. Headings (### , ## , # )
    const headingMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushList();
      elements.push(
        <div
          key={`h-${idx}`}
          className="font-extrabold text-[13.5px] text-slate-900 mt-2.5 mb-1 flex items-center gap-1.5"
        >
          <span className="w-1.5 h-3.5 rounded-full bg-gradient-to-b from-[#E5261E] to-[#FF5722] shrink-0" />
          <span>{renderInline(headingMatch[2])}</span>
        </div>
      );
      continue;
    }

    // 4. Lists (numbered or bullets)
    const numMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    const bulletMatch = trimmed.match(/^[-*]\s+(.*)$/);

    if (numMatch) {
      listBuf.push({ isNumber: true, num: numMatch[1], text: numMatch[2] });
      continue;
    }
    if (bulletMatch) {
      listBuf.push({ isNumber: false, text: bulletMatch[1] });
      continue;
    }

    // 5. Normal paragraphs
    flushList();
    if (!trimmed) {
      elements.push(<div key={`sp-${idx}`} className="h-1.5" />);
    } else {
      elements.push(
        <p key={`p-${idx}`} className="my-0.5 break-words text-[13px] leading-relaxed">
          {renderInline(line)}
        </p>
      );
    }
  }

  flushList();
  flushTable();
  return elements;
}

// ==========================================
// MAIN COMPONENT: AI CHAT WIDGET
// ==========================================
export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState(() => [withTime(WELCOME_MESSAGE)]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [lastFailed, setLastFailed] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [feedbacks, setFeedbacks] = useState({});
  const [toastMsg, setToastMsg] = useState("");

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const suggestRef = useRef(null);
  const dragState = useRef({ isDown: false, startX: 0, startScroll: 0, moved: false });
  const abortRef = useRef(null);
  const idRef = useRef(0);
  const sessionRef = useRef("");

  useEffect(() => {
    sessionRef.current = getSessionId();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2000);
  };

  const close = useCallback(() => {
    abortRef.current?.abort?.();
    abortRef.current = null;
    setIsTyping(false);
    setOpen(false);
    setIsMaximized(false);
  }, []);

  const toggleMaximize = useCallback(() => {
    setIsMaximized((prev) => !prev);
  }, []);

  const sendToApi = useCallback(async (text, historySnapshot) => {
    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;
    setIsTyping(true);
    setError("");

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: sessionRef.current || "anon",
          history: historySnapshot,
        }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Lỗi ${res.status}`);

      const reply = String(data?.reply || "").trim() || ERROR_FALLBACK;
      idRef.current += 1;
      const msgId = `a-${Date.now()}-${idRef.current}`;

      setMessages((prev) => [
        ...prev,
        {
          id: msgId,
          role: "ai",
          text: reply,
          time: nowTime(),
        },
      ]);
      setLastFailed("");
    } catch (e) {
      if (e?.name === "AbortError") return;
      console.warn("[AiChat] API lỗi:", e?.message || e);
      setError(e?.message || ERROR_FALLBACK);
      setLastFailed(text);
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setIsTyping(false);
    }
  }, []);

  const pushUserMessage = useCallback(
    (rawText) => {
      const text = (rawText || "").trim().slice(0, 2000);
      if (!text || isTyping) return;

      idRef.current += 1;
      const userMsg = {
        id: `u-${Date.now()}-${idRef.current}`,
        role: "user",
        text,
        time: nowTime(),
      };

      const historySnapshot = [...messages, userMsg]
        .filter((m) => m.id !== "welcome" && !String(m.id || "").startsWith("welcome-"))
        .slice(-10)
        .map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));

      setMessages((prev) => [...prev, userMsg]);
      sendToApi(text, historySnapshot);
    },
    [isTyping, messages, sendToApi]
  );

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault?.();
      if (!input.trim() || isTyping) return;
      pushUserMessage(input);
      setInput("");
      if (inputRef.current) inputRef.current.style.height = "auto";
    },
    [input, isTyping, pushUserMessage]
  );

  const handleReset = useCallback(() => {
    abortRef.current?.abort?.();
    abortRef.current = null;
    setIsTyping(false);
    setError("");
    setLastFailed("");
    setMessages([withTime({ ...WELCOME_MESSAGE, id: `welcome-${Date.now()}` })]);
    showToast("Đã tạo cuộc trò chuyện mới!");
  }, []);

  const handleStop = useCallback(() => {
    abortRef.current?.abort?.();
    abortRef.current = null;
    setIsTyping(false);
  }, []);

  const handleRetry = useCallback(() => {
    if (isTyping) return;
    const targetText =
      lastFailed ||
      [...messages].reverse().find((m) => m.role === "user")?.text ||
      "";
    if (!targetText) return;

    const historySnapshot = messages
      .filter(
        (m) =>
          m.id !== "welcome" &&
          !String(m.id || "").startsWith("welcome-") &&
          m.text !== targetText
      )
      .slice(-10)
      .map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));

    sendToApi(targetText, historySnapshot);
  }, [lastFailed, isTyping, messages, sendToApi]);

  const handleCopyMessage = (msgId, text) => {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(msgId);
      showToast("Đã sao chép nội dung!");
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleFeedback = (msgId, type) => {
    setFeedbacks((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? null : type,
    }));
    showToast(type === "like" ? "Cảm ơn bạn đã đánh giá tốt!" : "Đã ghi nhận phản hồi để cải thiện.");
  };

  // Lắng nghe sự kiện mở chat
  useEffect(() => {
    const handleOpen = (e) => {
      setOpen(true);
      const msg = e?.detail?.message;
      if (typeof msg === "string" && msg.trim()) {
        setTimeout(() => pushUserMessage(msg), 350);
      }
    };
    const handleToggle = () => setOpen((prev) => !prev);
    window.addEventListener("open-ai-chat", handleOpen);
    window.addEventListener("toggle-ai-chat", handleToggle);
    return () => {
      window.removeEventListener("open-ai-chat", handleOpen);
      window.removeEventListener("toggle-ai-chat", handleToggle);
    };
  }, [pushUserMessage]);

  const isMaximizedRef = useRef(false);
  useEffect(() => {
    isMaximizedRef.current = isMaximized;
  }, [isMaximized]);

  useEffect(() => () => abortRef.current?.abort?.(), []);

  // Đóng hoặc thu nhỏ bằng phím ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (isMaximizedRef.current) {
          setIsMaximized(false);
        } else {
          close();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Click ra ngoài panel để đóng (khi không ở chế độ chiếm hết màn hình)
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (isMaximizedRef.current) return;
      if (e.target?.closest?.("[data-ai-chat-toggle]")) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open, close]);

  // Tự động cuộn xuống dưới
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, error, open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleInput = (e) => {
    setInput(e.target.value);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 88)}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Kéo chuột trái lướt ngang gợi ý
  const onSuggestPointerDown = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    if (e.button !== undefined && e.button !== 0) return;
    const el = suggestRef.current;
    if (!el) return;
    dragState.current = {
      isDown: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
  };

  const onSuggestPointerMove = (e) => {
    const st = dragState.current;
    if (!st.isDown) return;
    if (e.pointerType && e.pointerType !== "mouse") return;
    const el = suggestRef.current;
    if (!el) return;
    const dx = e.clientX - st.startX;
    if (Math.abs(dx) > 5) {
      st.moved = true;
      el.scrollLeft = st.startScroll - dx;
    }
  };

  const onSuggestPointerUp = () => {
    dragState.current.isDown = false;
  };

  const onSuggestClickCapture = (e) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
      dragState.current.isDown = false;
    }
  };

  return (
    <>
      {/* Toast thông báo */}
      {toastMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-lg backdrop-blur-md animate-fade-in pointer-events-none">
          {toastMsg}
        </div>
      )}

      {/* Backdrop mờ khi mở popup ở chế độ thu nhỏ */}
      {!isMaximized && (
        <div
          onClick={close}
          aria-hidden="true"
          className={`fixed inset-0 z-[65] bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300 sm:hidden ${
            open ? "opacity-100 pointer-events-auto" : "pointer-events-none opacity-0"
          }`}
        />
      )}

      {/* Container hiển thị widget */}
      <div
        className={
          isMaximized
            ? `fixed inset-0 z-[80] w-full h-[100dvh] transition-all duration-300 ${
                open ? "pointer-events-auto" : "pointer-events-none"
              }`
            : `fixed inset-0 z-[70] flex items-center justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:contents ${
                open ? "" : "pointer-events-none"
              }`
        }
      >
        {/* Panel chat popup (Thu nhỏ ở góc phải) / Toàn màn hình (Chiếm 100% viewport) */}
        <div
          ref={panelRef}
          data-ai-chat-panel
          role="dialog"
          aria-label="Chat với DUDI SOFTWARE AI"
          aria-hidden={!open}
          style={{ backgroundColor: "#FFF8F3" }}
          className={`relative flex flex-col overflow-hidden bg-[#FFF8F3]
            transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              isMaximized
                ? "fixed inset-0 z-[80] w-full h-[100dvh] rounded-none border-none shadow-none origin-center pointer-events-auto opacity-100 translate-y-0 scale-100"
                : `border border-white/80 shadow-[0_24px_70px_-12px_rgba(0,0,0,0.35),0_0_40px_rgba(229,38,30,0.12)]
                   w-full max-w-[420px] h-[min(620px,calc(100svh-2.5rem))] rounded-[22px]
                   sm:fixed sm:z-[70] sm:right-[88px] sm:bottom-6 sm:w-[420px] sm:max-w-[calc(100vw-3rem)] sm:h-[620px] sm:max-h-[calc(100svh-110px)] sm:rounded-[24px] origin-center sm:origin-bottom-right
                   ${open ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-5 scale-[0.96] pointer-events-none"}`
            }
          `}
        >
          {/* ===== HEADER ===== */}
          <div className="relative shrink-0 bg-gradient-to-r from-[#E5261E] via-[#FF3D00] to-[#FF5722] text-white overflow-hidden shadow-sm">
            {/* Hào quang nền */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/15 blur-2xl" />
              <div className="absolute -bottom-12 -left-8 w-44 h-44 rounded-full bg-black/10 blur-2xl" />
            </div>

            <div className={`relative flex items-center justify-between gap-3 px-4 py-3 sm:px-6 ${isMaximized ? "max-w-5xl mx-auto w-full sm:py-3.5" : ""}`}>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white/95 shadow-md bg-[#FFF1E8] relative">
                    <Image
                      src="/images/ai-du-icon.webp"
                      alt="DUDI SOFTWARE AI"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  </span>
                </div>

                <div className="min-w-0">
                  <h2 className="text-[14.5px] sm:text-[15px] font-extrabold tracking-tight truncate leading-tight">
                    DUDI SOFTWARE AI
                  </h2>
                  <p className="text-[11px] font-medium text-white/90 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse shrink-0" />
                    <span className="truncate">Sẵn sàng tư vấn</span>
                  </p>
                </div>
              </div>

              {/* Nút hành động trên Header */}
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Tạo cuộc trò chuyện mới"
                  aria-label="Tạo cuộc trò chuyện mới"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 active:scale-90 transition-all flex items-center justify-center cursor-pointer text-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={toggleMaximize}
                  title={isMaximized ? "Thu nhỏ lại góc phải" : "Chiếm hết màn hình"}
                  aria-label={isMaximized ? "Thu nhỏ lại góc phải" : "Chiếm hết màn hình"}
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 active:scale-90 transition-all flex items-center justify-center cursor-pointer text-white"
                >
                  {isMaximized ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={close}
                  title="Đóng cửa sổ chat"
                  aria-label="Đóng cửa sổ chat"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 active:scale-90 transition-all flex items-center justify-center cursor-pointer text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ===== MESSAGES CONTAINER ===== */}
          <div
            ref={scrollRef}
            style={{
              backgroundColor: "#FFF8F3",
              backgroundImage: "radial-gradient(rgba(229, 38, 30, 0.055) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
            className="flex-1 min-h-0 overflow-y-auto px-3.5 sm:px-6 pt-4 pb-2"
          >
            <div className={isMaximized ? "max-w-4xl mx-auto w-full space-y-4" : "space-y-3.5"}>
              {messages.map((m, mIdx) =>
                m.role === "ai" ? (
                  <div
                    key={m.id}
                    className="flex items-start gap-2.5 animate-[chatIn_0.3s_cubic-bezier(0.16,1,0.3,1)] group"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-[#E5261E]/25 shadow-xs bg-white relative mt-0.5">
                      <Image
                        src="/images/ai-du-icon.webp"
                        alt="AI DU"
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>

                    <div className={isMaximized ? "max-w-[90%] sm:max-w-[85%] min-w-0" : "max-w-[84%] min-w-0"}>
                      <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] text-[13.5px] leading-relaxed text-slate-800 font-medium overflow-hidden">
                        {renderRichText(m.text)}
                      </div>

                      {/* Dòng công cụ tương tác: Time, Copy, Like, Dislike, Retry */}
                      <div className="mt-1 ml-1 flex items-center justify-between text-[10.5px] font-semibold text-slate-400">
                        <span>AI DU • {m.time}</span>

                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(m.id, m.text)}
                            title="Sao chép câu trả lời"
                            className="p-1 rounded-md hover:bg-slate-200/60 hover:text-slate-700 active:scale-90 transition-all cursor-pointer"
                          >
                            {copiedId === m.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleFeedback(m.id, "like")}
                            title="Thích câu trả lời"
                            className={`p-1 rounded-md hover:bg-slate-200/60 active:scale-90 transition-all cursor-pointer ${
                              feedbacks[m.id] === "like"
                                ? "text-emerald-600 bg-emerald-50"
                                : "hover:text-slate-700"
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleFeedback(m.id, "dislike")}
                            title="Không thích"
                            className={`p-1 rounded-md hover:bg-slate-200/60 active:scale-90 transition-all cursor-pointer ${
                              feedbacks[m.id] === "dislike"
                                ? "text-red-500 bg-red-50"
                                : "hover:text-slate-700"
                            }`}
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </button>

                          {mIdx === messages.length - 1 && !isTyping && (
                            <button
                              type="button"
                              onClick={handleRetry}
                              title="Tạo lại câu trả lời"
                              className="p-1 rounded-md hover:bg-slate-200/60 hover:text-slate-700 active:scale-90 transition-all cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={m.id}
                    className="flex justify-end animate-[chatIn_0.3s_cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <div className={isMaximized ? "max-w-[85%] sm:max-w-[78%]" : "max-w-[82%]"}>
                      <div className="px-4 py-3 rounded-2xl rounded-br-md bg-gradient-to-r from-[#E5261E] to-[#FF5722] text-white text-[13.5px] leading-relaxed font-medium shadow-[0_4px_14px_rgba(229,38,30,0.3)] break-words whitespace-pre-wrap">
                        {m.text}
                      </div>
                      <p className="mt-1 mr-1 text-right text-[10px] font-semibold text-slate-400">
                        Bạn • {m.time}
                      </p>
                    </div>
                  </div>
                )
              )}

              {/* Banner hiển thị lỗi */}
              {error && !isTyping && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2.5 text-[12px] font-semibold text-red-600 flex items-center justify-between gap-2 animate-[chatIn_0.25s_ease]">
                  <span className="flex-1 min-w-0">{error}</span>
                  {lastFailed && (
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="shrink-0 px-2.5 py-1 rounded-full bg-[#E5261E] text-white text-[11px] font-bold hover:bg-[#c81f16] active:scale-95 transition-all cursor-pointer"
                    >
                      Thử lại
                    </button>
                  )}
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-end gap-2 animate-[chatIn_0.25s_ease]">
                  <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-[#E5261E]/25 bg-white relative">
                    <Image
                      src="/images/ai-du-icon.webp"
                      alt="AI DU đang trả lời"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-white border border-slate-100 shadow-sm flex items-center gap-1.5">
                    <span className="text-[12px] font-semibold text-slate-400 mr-1">
                      AI DU đang soạn câu trả lời
                    </span>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#E5261E]/80 animate-bounce"
                        style={{
                          animationDelay: `${i * 0.15}s`,
                          animationDuration: "0.85s",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===== GỢI Ý CÂU HỎI NHANH (NỀN ĐỒNG BỘ 100% VỚI KHUNG CHAT PHÍA TRÊN) ===== */}
          <div
            style={{
              backgroundColor: "#FFF8F3",
              backgroundImage: "radial-gradient(rgba(229, 38, 30, 0.055) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
            className="shrink-0 px-3.5 sm:px-6 pt-1 pb-2"
          >
            <div className={isMaximized ? "max-w-4xl mx-auto w-full" : "w-full"}>
              <div
                ref={suggestRef}
                onPointerDown={onSuggestPointerDown}
                onPointerMove={onSuggestPointerMove}
                onPointerUp={onSuggestPointerUp}
                onPointerCancel={onSuggestPointerUp}
                onPointerLeave={onSuggestPointerUp}
                onClickCapture={onSuggestClickCapture}
                className={`flex items-center gap-2 overflow-x-auto py-1 cursor-grab active:cursor-grabbing select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                  isMaximized ? "justify-start sm:justify-center" : "justify-start"
                }`}
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => pushUserMessage(s)}
                    className="shrink-0 px-3 py-1 rounded-full bg-white hover:bg-[#E5261E] hover:text-white text-[#C9251C] border border-[#E5261E]/25 text-[11px] font-semibold whitespace-nowrap shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ===== FORM NHẬP TIN NHẮN (NỀN TRẮNG PHÍA DƯỚI) ===== */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 bg-white border-t border-slate-200/80 px-3.5 sm:px-6 pt-2 pb-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]"
          >
            <div className={isMaximized ? "max-w-4xl mx-auto w-full" : ""}>
              <div className="flex items-end gap-2 rounded-2xl bg-slate-100/80 focus-within:bg-slate-100 focus-within:ring-2 focus-within:ring-[#E5261E]/25 border border-transparent focus-within:border-[#E5261E]/30 pl-4 pr-1.5 py-1.5 transition-all">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  maxLength={2000}
                  placeholder="Nhập câu hỏi của bạn (Tối đa 2000 ký tự)..."
                  aria-label="Nhập tin nhắn cho AI DU"
                  className="flex-1 min-w-0 bg-transparent outline-none resize-none text-[13.5px] sm:text-[14px] font-medium text-slate-800 placeholder:text-slate-400 leading-relaxed max-h-[100px] py-1.5"
                />
                {isTyping ? (
                  <button
                    type="button"
                    onClick={handleStop}
                    aria-label="Dừng trả lời"
                    title="Dừng trả lời"
                    className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 text-white flex items-center justify-center transition-all hover:bg-slate-700 active:scale-95 cursor-pointer"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    aria-label="Gửi tin nhắn"
                    className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#E5261E] to-[#FF5722] text-white shadow-[0_4px_14px_rgba(229,38,30,0.4)] flex items-center justify-center transition-all hover:shadow-[0_6px_18px_rgba(229,38,30,0.55)] hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-35 disabled:grayscale-[0.3] disabled:pointer-events-none disabled:shadow-none"
                  >
                    <Send className="w-4 h-4 -ml-px" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between px-1 pt-2 text-[11px] font-semibold text-slate-400">
                <span className="truncate">
                  DUDI SOFTWARE AI • Hotline{" "}
                  <a href="tel:0909163821" className="text-[#D92D20] font-bold">
                    (+84) 909 163 821
                  </a>
                </span>
                <span className="shrink-0 ml-2">{input.length}/2000</span>
              </div>
            </div>
          </form>

          <style jsx>{`
            @keyframes chatIn {
              from {
                opacity: 0;
                transform: translateY(8px) scale(0.98);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>
        </div>
      </div>
    </>
  );
}
