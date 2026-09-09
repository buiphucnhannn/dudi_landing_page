"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Loader2,
  CheckCircle,
  Phone,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { siteConfig } from "@/constants/site-config";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ZaloIcon } from "@/components/ui/ZaloIcon";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

export function LeadForm({ selectedPackage = "Chưa rõ" }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    company: "",
    websiteUrl: "",
    issue: "",
    packageInterested: selectedPackage,
    timeline: "1 tuần",
    consent: true,
    hp_company_fax: "", // Honeypot field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null); // { success: boolean, message: string, leadId?: string }
  const hasTrackedStart = useRef(false);

  // Khi selectedPackage thay đổi từ bảng giá, cập nhật vào form
  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({ ...prev, packageInterested: selectedPackage }));
    }
  }, [selectedPackage]);

  // Tracking khi người dùng bắt đầu tương tác với form
  const handleFirstInteraction = (fieldName) => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackEvent("form_start", { first_field: fieldName, source: "landing_page" });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    handleFirstInteraction(name);
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Xóa lỗi của trường đó khi người dùng đang sửa
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Vui lòng nhập họ và tên (tối thiểu 2 ký tự).";
    }

    const cleanPhone = formData.phone.replace(/[\s.-]/g, "");
    const phoneRegex = /^(\+84|0)[3|5|7|8|9][0-9]{8}$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Số điện thoại chưa hợp lệ (ví dụ: 0909 123 456).";
    }

    if (!formData.websiteUrl.trim()) {
      newErrors.websiteUrl = "Vui lòng nhập đường dẫn website hiện tại.";
    } else {
      let testUrl = formData.websiteUrl.trim();
      if (!/^https?:\/\//i.test(testUrl)) {
        testUrl = "https://" + testUrl;
      }
      try {
        new URL(testUrl);
      } catch {
        newErrors.websiteUrl = "Đường dẫn website chưa đúng định dạng.";
      }
    }

    if (!formData.consent) {
      newErrors.consent = "Bạn cần tích chọn đồng ý để DUDI liên hệ hỗ trợ.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      trackEvent("form_error", { error_type: "client_validation_failed" });
      return;
    }

    setIsSubmitting(true);
    trackEvent("form_submit", {
      package_name: formData.packageInterested,
      has_website_url: !!formData.websiteUrl.trim(),
    });

    try {
      // Đọc UTM parameters từ URL hiện tại
      const urlParams = new URLSearchParams(window.location.search);

      const payload = {
        ...formData,
        utm_source: urlParams.get("utm_source"),
        utm_medium: urlParams.get("utm_medium"),
        utm_campaign: urlParams.get("utm_campaign"),
        utm_content: urlParams.get("utm_content"),
        page_path: window.location.pathname,
        referrer: document.referrer || null,
      };

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitResult({
          success: true,
          message: data.message,
          leadId: data.leadId,
        });
        trackEvent("form_success", { lead_id: data.leadId, source: "landing_page" });
      } else {
        setSubmitResult({
          success: false,
          message:
            data.message ||
            "Có lỗi xảy ra khi gửi yêu cầu. Bạn vui lòng thử lại hoặc nhắn Zalo trực tiếp.",
        });
        trackEvent("form_error", { error_type: "api_rejected" });
      }
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitResult({
        success: false,
        message:
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng hoặc liên hệ qua Zalo 0909 163 821.",
      });
      trackEvent("form_error", { error_type: "network_error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form-tu-van" className="pt-10 pb-10 sm:pt-12 sm:pb-12 bg-transparent relative scroll-mt-6 sm:scroll-mt-8">
      <Container className="max-w-7xl">
        <RevealOnScroll duration={1200}>
          <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-700/60 bg-white dark:bg-[#0D1527]/90 p-5 sm:p-7 lg:p-9 shadow-xl shadow-slate-200/50 dark:shadow-2xl backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 dark:shadow-black/40">
            {/* Ambient Red Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-red-600/10 dark:bg-red-600/15 blur-3xl"
            />

            {submitResult && submitResult.success ? (
              /* Màn hình gửi thành công */
              <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 mb-5">
                  <CheckCircle className="h-10 w-10" />
                </div>

                <Badge variant="success" className="mb-3 py-1 px-3.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700">
                  Mã yêu cầu: {submitResult.leadId}
                </Badge>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                  DUDI Đã Nhận Được Thông Tin!
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed mb-8">
                  {submitResult.message}
                </p>

                {/* 2 Fast contact buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={siteConfig.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button variant="outlineZalo" size="lg" className="w-full sm:w-auto text-[#0068FF] dark:text-blue-400 border-blue-500/50 hover:border-[#0068FF] bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 gap-2">
                      <ZaloIcon className="h-5 w-5" />
                      <span>Nhắn tin Zalo ngay</span>
                    </Button>
                  </a>
                  <a href={siteConfig.hotlineTel} className="w-full sm:w-auto">
                    <Button variant="dudiGradient" size="lg" className="w-full sm:w-auto gap-2">
                      <Phone className="h-4 w-4" />
                      <span>Gọi Hotline: {siteConfig.hotline}</span>
                    </Button>
                  </a>
                </div>

                <button
                  onClick={() => setSubmitResult(null)}
                  className="mt-8 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
                >
                  Gửi thêm yêu cầu khác
                </button>
              </div>
            ) : (
              /* Layout chia 2 phần: Mascot (trái) và Form nhập liệu (phải) */
              <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 lg:gap-8 xl:gap-10">
                {/* Mascot Cột Trái */}
                <div className="w-full lg:w-[260px] xl:w-[290px] shrink-0 flex flex-col items-center justify-center text-center">
                  {/* Lời nói nghệ thuật phong cách viết tay & nét vẽ tay (Artistic Hand-drawn Speech) */}
                  <div className="relative mb-2 inline-flex items-center justify-center select-none animate-float">
                    {/* Nét ngoặc vẽ tay trái */}
                    <svg
                      width="20"
                      height="54"
                      viewBox="0 0 20 54"
                      fill="none"
                      className="text-red-500/90 shrink-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.35)]"
                    >
                      <path
                        d="M16 4 C7 15, 3 27, 6 41 C7 47, 11 50, 14 51"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {/* Chữ viết tay nghệ thuật */}
                    <div className="px-1.5 text-center -rotate-3 font-handwriting">
                      <p className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400 tracking-wide leading-none">
                        Gửi ngay website
                      </p>
                      <p className="text-xl sm:text-2xl font-extrabold text-red-700 dark:text-red-500 tracking-wide leading-none mt-1">
                        DUDI kiểm tra giúp bạn!
                      </p>
                    </div>

                    {/* Nét ngoặc vẽ tay phải */}
                    <svg
                      width="20"
                      height="54"
                      viewBox="0 0 20 54"
                      fill="none"
                      className="text-red-500/90 shrink-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.35)]"
                    >
                      <path
                        d="M4 4 C13 15, 17 27, 14 41 C13 47, 9 50, 6 51"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Ảnh Linh vật HD chỉ tay lên (Chuẩn mẫu linh vật DUDI 100%, Đã tách nền trong suốt) */}
                  <div className="relative w-36 h-48 sm:w-52 sm:h-72 lg:w-64 lg:h-84 xl:w-72 xl:h-92 drop-shadow-[0_15px_30px_rgba(220,38,38,0.25)] dark:drop-shadow-[0_20px_35px_rgba(220,38,38,0.35)] transition-transform duration-500 hover:scale-105">
                    <Image
                      src="/images/dudi-mascot-pointing-v3.webp"
                      alt="Linh vật DUDI Software chỉ tay tư vấn"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 200px, 300px"
                      priority
                    />
                  </div>
                </div>

                {/* Form Card Cột Phải */}
                <div className="flex-1 w-full">
                  {/* Tiêu đề & phụ đề form */}
                  <div className="mb-4 sm:mb-6 text-left">
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                      Gửi website để được kiểm tra và tư vấn
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      Điền thông tin bên dưới, chúng tôi sẽ liên hệ trong thời gian sớm nhất.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-4 text-left">
                    {/* Hàng 1: 4 cột trên desktop, 2 cột trên tablet/mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-3.5">
                      {/* 1. Họ và tên * */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 sm:mb-1.5">
                          Họ và tên <span className="text-red-600 dark:text-red-400 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Nguyễn Văn A"
                          className={cn(
                            "w-full rounded-xl bg-slate-50 dark:bg-slate-950/80 border px-3.5 py-2.5 sm:py-2 text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all focus:outline-none focus:ring-1",
                            errors.fullName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-200 dark:border-slate-700/80 focus:border-red-500/80 focus:ring-red-500/40"
                          )}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      {/* 2. Số điện thoại/Zalo * */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 sm:mb-1.5">
                          Số điện thoại/Zalo <span className="text-red-600 dark:text-red-400 font-bold">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="0909 000 000"
                          className={cn(
                            "w-full rounded-xl bg-slate-50 dark:bg-slate-950/80 border px-3.5 py-2.5 sm:py-2 text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all focus:outline-none focus:ring-1",
                            errors.phone
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-200 dark:border-slate-700/80 focus:border-red-500/80 focus:ring-red-500/40"
                          )}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {/* 3. Tên doanh nghiệp */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 sm:mb-1.5">
                          Tên doanh nghiệp
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Công ty ABC"
                          className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700/80 px-3.5 py-2.5 sm:py-2 text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/40"
                        />
                      </div>

                      {/* 4. Website hiện tại * */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 sm:mb-1.5">
                          Website hiện tại <span className="text-red-600 dark:text-red-400 font-bold">*</span>
                        </label>
                        <input
                          type="url"
                          name="websiteUrl"
                          value={formData.websiteUrl}
                          onChange={handleChange}
                          placeholder="https://example.com"
                          className={cn(
                            "w-full rounded-xl bg-slate-50 dark:bg-slate-950/80 border px-3.5 py-2.5 sm:py-2 text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all focus:outline-none focus:ring-1",
                            errors.websiteUrl
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-200 dark:border-slate-700/80 focus:border-red-500/80 focus:ring-red-500/40"
                          )}
                        />
                        {errors.websiteUrl && (
                          <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">{errors.websiteUrl}</p>
                        )}
                      </div>
                    </div>

                    {/* Hàng 2: 3 cột dropdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
                      {/* 5. Vấn đề đang gặp */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 sm:mb-1.5">
                          Vấn đề đang gặp
                        </label>
                        <div className="relative">
                          <select
                            name="issue"
                            value={formData.issue}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700/80 px-3.5 py-2.5 sm:py-2 pr-8 text-base sm:text-sm text-slate-900 dark:text-white transition-all focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/40 cursor-pointer"
                          >
                            <option value="" className="bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-400">Chọn vấn đề</option>
                            <option value="Web tải chậm / Giật lag" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Web tải chậm / Giật lag</option>
                            <option value="Vỡ giao diện trên điện thoại" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Vỡ giao diện trên điện thoại</option>
                            <option value="Lỗi form liên hệ / Gửi thư" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Lỗi form liên hệ / gửi thư</option>
                            <option value="Cần thay đổi nội dung & hình ảnh" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Cần thay nội dung & hình ảnh</option>
                            <option value="Website cũ muốn làm mới" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Website cũ muốn làm mới</option>
                            <option value="Vấn đề kỹ thuật khác" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Vấn đề kỹ thuật khác</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </div>
                      </div>

                      {/* 6. Gói quan tâm */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 sm:mb-1.5">
                          Gói quan tâm
                        </label>
                        <div className="relative">
                          <select
                            name="packageInterested"
                            value={formData.packageInterested}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700/80 px-3.5 py-2.5 sm:py-2 pr-8 text-base sm:text-sm text-slate-900 dark:text-white transition-all focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/40 cursor-pointer"
                          >
                            <option value="Chưa rõ" className="bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-400">Chọn gói</option>
                            <option value="Cơ bản" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Gói Cơ Bản (500.000đ)</option>
                            <option value="Tiêu chuẩn" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Gói Tiêu Chuẩn (2.000.000đ)</option>
                            <option value="Cao cấp" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Gói Cao Cấp (5.000.000đ)</option>
                            <option value="Làm mới toàn bộ website" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Làm mới toàn bộ (Từ 10tr)</option>
                            <option value="Chưa rõ" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Chưa rõ - Cần DUDI tư vấn</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </div>
                      </div>

                      {/* 7. Thời gian mong muốn */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 sm:mb-1.5">
                          Thời gian mong muốn
                        </label>
                        <div className="relative">
                          <select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700/80 px-3.5 py-2.5 sm:py-2 pr-8 text-base sm:text-sm text-slate-900 dark:text-white transition-all focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/40 cursor-pointer"
                          >
                            <option value="1 tuần" className="bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-400">Chọn thời gian</option>
                            <option value="Cần gấp (1–2 ngày)" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Cần gấp (1–2 ngày)</option>
                            <option value="Trong tuần này" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Trong tuần này (3–5 ngày)</option>
                            <option value="Trong 1–2 tuần" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Trong 1–2 tuần tới</option>
                            <option value="Chưa gấp" className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">Chưa gấp - Đang tham khảo</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {/* Honeypot field (hidden) */}
                    <input
                      type="text"
                      name="hp_company_fax"
                      value={formData.hp_company_fax}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                    />

                    {/* Hàng 3: Checkbox đồng ý & Nút Gửi yêu cầu ngay */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3.5 mt-4 border-t border-slate-200 dark:border-slate-800/80">
                      <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-red-600 focus:ring-red-500 focus:ring-offset-0 cursor-pointer accent-red-600"
                        />
                        <span>Tôi đồng ý để DUDI liên hệ tư vấn.</span>
                      </label>

                      <Button
                        type="submit"
                        variant="dudiGradient"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-white shadow-xl glow-red hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 rounded-xl"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Đang gửi thông tin...</span>
                          </>
                        ) : (
                          <>
                            <span>Gửi yêu cầu ngay</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                    {errors.consent && (
                      <p className="text-[11px] text-red-400">{errors.consent}</p>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
