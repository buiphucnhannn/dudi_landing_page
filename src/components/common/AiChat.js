"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RotateCcw, Send, X } from "lucide-react";

const SUGGESTIONS = [
  "Báo giá thiết kế website",
  "Tư vấn dịch vụ phù hợp",
  "Bảo trì website giá bao nhiêu?",
  "Liên hệ chuyên viên",
];

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "ai",
  text: "Xin chào! Mình là trợ lý AI DU của DUDI Software. Mình có thể giúp bạn tìm hiểu dịch vụ, ước tính báo giá và chọn giải pháp phù hợp nhất. Bạn cần hỗ trợ gì hôm nay?",
  time: "",
};

const DEMO_REPLY =
  "Cảm ơn bạn! Đây mới là bản demo giao diện — tính năng trả lời tự động của AI DU đang được hoàn thiện và sẽ sớm ra mắt. Bạn cứ để lại câu hỏi, đội ngũ DUDI sẽ liên hệ hỗ trợ ngay!";

function nowTime() {
  const d = new Date();
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function withTime(msg) {
  return { ...msg, time: msg.time || nowTime() };
}

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [withTime(WELCOME_MESSAGE)]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const suggestRef = useRef(null);
  const dragState = useRef({ isDown: false, startX: 0, startScroll: 0, moved: false });
  const typingTimer = useRef(null);
  const idRef = useRef(0);

  const close = useCallback(() => setOpen(false), []);

  const pushUserMessage = useCallback((rawText) => {
    const text = (rawText || "").trim();
    if (!text) return;
    idRef.current += 1;
    const userMsg = {
      id: `u-${Date.now()}-${idRef.current}`,
      role: "user",
      text,
      time: nowTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // DEMO giao diện: giả lập AI đang trả lời, API thật sẽ thay vào đây sau
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      idRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}-${idRef.current}`,
          role: "ai",
          text: DEMO_REPLY,
          time: nowTime(),
        },
      ]);
      setIsTyping(false);
    }, 1400);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault?.();
      if (!input.trim() || isTyping) return;
      pushUserMessage(input);
      setInput("");
      // Reset chiều cao textarea sau khi gửi
      if (inputRef.current) inputRef.current.style.height = "auto";
    },
    [input, isTyping, pushUserMessage]
  );

  const handleReset = useCallback(() => {
    clearTimeout(typingTimer.current);
    setIsTyping(false);
    setMessages([withTime({ ...WELCOME_MESSAGE, id: `welcome-${Date.now()}` })]);
  }, []);

  // Lắng nghe sự kiện mở chat từ widget AI + khung chat dưới carousel
  useEffect(() => {
    const handleOpen = (e) => {
      setOpen(true);
      const msg = e?.detail?.message;
      if (typeof msg === "string" && msg.trim()) {
        // Đợi panel mở xong rồi mới đẩy tin nhắn vào cho mượt
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

  useEffect(() => () => clearTimeout(typingTimer.current), []);

  // Đóng bằng ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Bấm ra ngoài panel để tắt (cả mobile + desktop).
  // Bỏ qua nút toggle AI (data-ai-chat-toggle) để không xung đột với sự kiện toggle.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
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

  // Auto scroll xuống cuối + focus input khi mở
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [open ]);

  const handleInput = (e) => {
    setInput(e.target.value);
    // Auto-grow tối đa ~3 dòng
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 84)}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Kéo chuột trái / trackpad để lướt ngang dải gợi ý (mobile vẫn vuốt chạm native)
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

  // Nếu vừa kéo (drag) thì chặn click để không gửi nhầm gợi ý
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
      {/* Backdrop mờ trên mobile */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-[65] bg-slate-900/35 backdrop-blur-[2px] transition-opacity duration-300 sm:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Lớp căn giữa trên mobile: flex center toàn màn hình.
          Desktop dùng display:contents để panel tự neo góc phải (không ảnh hưởng layout). */}
      <div
        className={`fixed inset-0 z-[70] flex items-center justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:contents ${
          open ? "" : "pointer-events-none"
        }`}
      >
      {/* Panel chat — mobile: modal căn giữa màn hình; desktop: neo góc phải cạnh cụm widget */}
      <div
        ref={panelRef}
        data-ai-chat-panel
        role="dialog"
        aria-label="Chat với trợ lý AI DU"
        aria-hidden={!open}
        className={`flex flex-col overflow-hidden bg-white border border-white shadow-[0_24px_70px_-12px_rgba(0,0,0,0.35),0_0_40px_rgba(229,38,30,0.12)]
          w-full max-w-[400px] h-[min(600px,calc(100svh-2.5rem))] rounded-[20px]
          sm:fixed sm:z-[70] sm:right-[88px] sm:bottom-6 sm:w-[388px] sm:max-w-[calc(100vw-3rem)] sm:h-[600px] sm:max-h-[calc(100svh-120px)] sm:rounded-[24px]
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center sm:origin-bottom-right
          ${
            open
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-5 scale-[0.96] pointer-events-none"
          }`}
      >
        {/* ===== HEADER ===== */}
        <div className="relative shrink-0 bg-gradient-to-r from-[#E5261E] via-[#FF3D00] to-[#FF5722] px-4 pt-4 pb-3.5 text-white overflow-hidden">
          {/* Họa tiết trang trí */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute -bottom-12 -left-8 w-40 h-40 rounded-full bg-black/10 blur-2xl" />
            <div className="absolute top-2 right-16 w-16 h-16 rounded-full border border-white/20" />
            <div className="absolute bottom-0 right-32 w-8 h-8 rounded-full bg-white/10" />
          </div>

          <div className="relative flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/90 shadow-lg bg-[#FFF1E8] relative">
                <Image
                  src="/images/ai-du-icon.webp"
                  alt="Trợ lý AI DU"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-[15px] font-extrabold tracking-tight truncate">
                Trợ lý AI DU
              </h2>
              <p className="text-[11.5px] font-medium text-white/90 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Đang hoạt động • Trả lời ngay
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleReset}
                title="Bắt đầu hội thoại mới"
                aria-label="Bắt đầu hội thoại mới"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={close}
                title="Đóng chat"
                aria-label="Đóng chat"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== MESSAGES ===== */}
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto px-3.5 sm:px-4 py-4 space-y-3.5 bg-[#FFF8F3] [background-image:radial-gradient(rgba(229,38,30,0.055)_1px,transparent_1px)] [background-size:16px_16px]"
        >
          {messages.map((m) =>
            m.role === "ai" ? (
              <div key={m.id} className="flex items-end gap-2 animate-[chatIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
                <div className="shrink-0 w-7 h-7 rounded-full overflow-hidden border border-[#E5261E]/20 shadow-sm bg-white relative">
                  <Image
                    src="/images/ai-du-icon.webp"
                    alt="AI DU"
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
                <div className="max-w-[80%]">
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-md bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] text-[13px] leading-relaxed text-slate-800 font-medium">
                    {m.text}
                  </div>
                  <p className="mt-1 ml-1 text-[10px] font-semibold text-slate-400">
                    AI DU • {m.time}
                  </p>
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-end animate-[chatIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
                <div className="max-w-[82%]">
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-br-md bg-gradient-to-r from-[#E5261E] to-[#FF5722] text-white text-[13px] leading-relaxed font-medium shadow-[0_4px_14px_rgba(229,38,30,0.3)] break-words">
                    {m.text}
                  </div>
                  <p className="mt-1 mr-1 text-right text-[10px] font-semibold text-slate-400">
                    Bạn • {m.time}
                  </p>
                </div>
              </div>
            )
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 animate-[chatIn_0.25s_ease]">
              <div className="shrink-0 w-7 h-7 rounded-full overflow-hidden border border-[#E5261E]/20 bg-white relative">
                <Image
                  src="/images/ai-du-icon.webp"
                  alt="AI DU đang nhập"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-white border border-slate-100 shadow-sm flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#E5261E]/70 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===== GỢI Ý NHANH ===== */}
        <div className="shrink-0 bg-[#FFF8F3] px-3.5 sm:px-4 pb-2">
          <div
            ref={suggestRef}
            onPointerDown={onSuggestPointerDown}
            onPointerMove={onSuggestPointerMove}
            onPointerUp={onSuggestPointerUp}
            onPointerCancel={onSuggestPointerUp}
            onPointerLeave={onSuggestPointerUp}
            onClickCapture={onSuggestClickCapture}
            className="flex gap-1.5 overflow-x-auto pb-1 cursor-grab active:cursor-grabbing select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => pushUserMessage(s)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-white border border-[#E5261E]/25 text-[#D92D20] text-[11.5px] font-bold whitespace-nowrap shadow-sm hover:bg-[#E5261E] hover:text-white hover:border-[#E5261E] active:scale-95 transition-all cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ===== INPUT ===== */}
        <form
          onSubmit={handleSubmit}
          className="shrink-0 bg-white border-t border-slate-100 px-3 pt-3 pb-3"
        >
          <div className="flex items-end gap-2 rounded-2xl bg-slate-100/80 focus-within:bg-slate-100 focus-within:ring-2 focus-within:ring-[#E5261E]/25 border border-transparent focus-within:border-[#E5261E]/30 pl-3.5 pr-1.5 py-1.5 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Nhập tin nhắn cho AI DU..."
              aria-label="Nhập tin nhắn cho AI DU"
              className="flex-1 min-w-0 bg-transparent outline-none resize-none text-[13.5px] font-medium text-slate-800 placeholder:text-slate-400 placeholder:font-medium leading-relaxed max-h-[84px] py-2"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Gửi tin nhắn"
              className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-r from-[#E5261E] to-[#FF5722] text-white shadow-[0_4px_14px_rgba(229,38,30,0.4)] flex items-center justify-center transition-all hover:shadow-[0_6px_18px_rgba(229,38,30,0.55)] hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-35 disabled:grayscale-[0.3] disabled:pointer-events-none disabled:shadow-none"
            >
              <Send className="w-4 h-4 -ml-px" />
            </button>
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
