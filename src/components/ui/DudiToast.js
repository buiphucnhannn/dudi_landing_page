"use client";

import { CheckCircle2, AlertCircle, X } from "lucide-react";

// Toast thông báo gửi form — màu đồng bộ theo loại: xanh lá khi thành công, đỏ khi lỗi.
// Props: toast = { type: "success" | "error", title, message } | null
export default function DudiToast({ toast, onClose }) {
  if (!toast) return null;
  const isSuccess = toast.type !== "error";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;
  return (
    <>
      <style>{`@keyframes dudi-toast-in{from{opacity:0;transform:translateY(-12px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
      <div
        role="status"
        style={{ animation: "dudi-toast-in .28s ease-out" }}
        className={`fixed right-4 top-4 z-[100] w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border bg-white shadow-2xl ${
          isSuccess
            ? "border-emerald-200 shadow-emerald-500/20"
            : "border-red-200 shadow-red-500/20"
        }`}
      >
        <div
          className={`h-1.5 w-full ${
            isSuccess
              ? "bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400"
              : "bg-gradient-to-r from-red-600 via-red-500 to-rose-400"
          }`}
        />
        <div className="flex items-start gap-2.5 p-3.5">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              isSuccess ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
            }`}
          >
            <Icon size={19} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold text-slate-900">{toast.title}</p>
            {toast.message ? (
              <p className="mt-0.5 text-xs font-medium leading-relaxed text-slate-600">{toast.message}</p>
            ) : null}
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng thông báo"
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </>
  );
}
