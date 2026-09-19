"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Loader2,
  CheckCircle,
  Phone,
  ArrowRight,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { siteConfig } from "@/constants/site-config";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ZaloIcon } from "@/components/ui/ZaloIcon";
import DudiToast from "@/components/ui/DudiToast";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

// Kiểm tra SĐT Việt Nam THẬT: chuẩn hóa (+84/84/0, bỏ ký tự thừa),
// bắt buộc mobile 10 số, đầu số đang lưu hành, loại số giả mạo.
const VN_MOBILE_PREFIXES = new Set([
  "032", "033", "034", "035", "036", "037", "038", "039", // Viettel
  "056", "058", // Vietnamobile
  "059", // Gmobile
  "070", "076", "077", "078", "079", "090", "093", "089", // Mobifone
  "081", "082", "083", "084", "085", "088", "091", "094", // Vinaphone
  "086", "096", "097", "098", // Viettel
  "092", // Vietnamobile
  "099", // Gmobile
]);

function normalizeVietnamPhone(input) {
  let d = String(input || "").replace(/[^\d+]/g, "");
  if (d.startsWith("+84")) d = "0" + d.slice(3);
  else if (d.startsWith("84") && d.length >= 11) d = "0" + d.slice(2);
  return d.replace(/\D/g, "");
}

function isValidVietnamPhone(input) {
  const d = normalizeVietnamPhone(input);
  if (!/^0\d{9}$/.test(d)) return false; // đúng 10 số, bắt đầu bằng 0
  if (!VN_MOBILE_PREFIXES.has(d.slice(0, 3))) return false; // đầu số đang lưu hành
  if (/^(\d)\1{9}$/.test(d)) return false; // 0000000000, 1111111111...
  if (d === "0123456789" || d === "9876543210") return false; // số chạy thứ tự
  return true;
}

const VIETNAM_PHONE_ERROR =
  "Số điện thoại chưa đúng. Vui lòng dùng số di động 10 số đang sử dụng (ví dụ: 0909 123 456).";

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
  const [toast, setToast] = useState(null);
  const [btnError, setBtnError] = useState("");
  const toastTimer = useRef(null);
  const btnErrorTimer = useRef(null);
  const hasTrackedStart = useRef(false);

  // Hiện thông báo lỗi NGAY TRÊN nút gửi (tự trở lại sau 4.5s)
  const flashButtonError = (msg) => {
    setBtnError(msg);
    if (btnErrorTimer.current) clearTimeout(btnErrorTimer.current);
    btnErrorTimer.current = setTimeout(() => setBtnError(""), 4500);
  };

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4500);
  };

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
    if (btnError) setBtnError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Vui lòng nhập họ và tên (tối thiểu 2 ký tự).";
    }

    if (!isValidVietnamPhone(formData.phone)) {
      newErrors.phone = VIETNAM_PHONE_ERROR;
    }

    if (formData.websiteUrl.trim()) {
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
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnError("");

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      flashButtonError(Object.values(formErrors)[0]);
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
        showToast("success", "Gửi yêu cầu thành công!", "DUDI đã nhận thông tin và sẽ liên hệ lại sớm nhất.");
        trackEvent("form_success", { lead_id: data.leadId, source: "landing_page" });
      } else {
        const msg =
          data.message ||
          "Có lỗi xảy ra khi gửi yêu cầu. Bạn vui lòng thử lại hoặc nhắn Zalo trực tiếp.";
        setSubmitResult({
          success: false,
          message: msg,
        });
        flashButtonError(msg);
        showToast("error", "Gửi chưa thành công", data.message || "Vui lòng thử lại hoặc nhắn Zalo trực tiếp.");
        trackEvent("form_error", { error_type: "api_rejected" });
      }
    } catch (err) {
      console.error("Submit error:", err);
      const msg =
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng hoặc liên hệ qua Zalo 0909 163 821.";
      setSubmitResult({
        success: false,
        message: msg,
      });
      flashButtonError(msg);
      showToast("error", "Mất kết nối máy chủ", "Vui lòng kiểm tra mạng hoặc liên hệ qua Zalo 0909 163 821.");
      trackEvent("form_error", { error_type: "network_error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form-tu-van" className="scroll-mt-[58px] sm:scroll-mt-[68px] lg:scroll-mt-[72px] pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 bg-transparent relative">
      <DudiToast toast={toast} onClose={() => setToast(null)} />
      <Container className="max-w-7xl">
        <ScrollReveal variant="fade-up" duration={900}>
          <div className="relative rounded-3xl border border-[#FFE4D6] bg-white p-3.5 sm:p-5 lg:p-6 shadow-lg shadow-orange-500/5">
            {submitResult && submitResult.success ? (
              /* Màn hình gửi thành công */
              <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 mb-5">
                  <CheckCircle className="h-10 w-10" />
                </div>

                <Badge variant="success" className="mb-3 py-1 px-3.5 bg-emerald-100 text-emerald-800 border-emerald-300">
                  Mã yêu cầu: {submitResult.leadId}
                </Badge>

                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  DUDI Đã Nhận Được Thông Tin!
                </h3>

                <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
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
                    <Button variant="outlineZalo" size="lg" className="w-full sm:w-auto text-[#0068FF] border-blue-500/50 hover:border-[#0068FF] bg-blue-50 hover:bg-blue-100 gap-2">
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
                  className="mt-8 text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Gửi thêm yêu cầu khác
                </button>
              </div>
            ) : (
              /* Layout chia 2 phần: Mascot (trái) và Form nhập liệu (phải) */
              <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-4 lg:gap-6 xl:gap-8">
                {/* Mascot Cột Trái with zoom-in reveal */}
                <ScrollReveal variant="zoom-in" delay={100} duration={850} className="w-full lg:w-[220px] xl:w-[250px] shrink-0">
                  <div className="flex flex-col items-center justify-center text-center">
                    {/* Lời nói nghệ thuật phong cách viết tay */}
                    <div className="relative mb-1 inline-flex items-center justify-center select-none animate-float">
                    {/* Nét ngoặc vẽ tay trái */}
                    <svg
                      width="18"
                      height="48"
                      viewBox="0 0 20 54"
                      fill="none"
                      className="text-[#FF6500] shrink-0 drop-shadow-[0_0_8px_rgba(255,101,0,0.35)]"
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
                    <div className="px-1 text-center -rotate-2 font-handwriting">
                      <p className="text-lg sm:text-xl font-bold text-[#FF6500] tracking-wide leading-none">
                        Gửi ngay website
                      </p>
                      <p className="text-lg sm:text-xl font-extrabold text-[#E52E20] tracking-wide leading-none mt-0.5">
                        DUDI kiểm tra giúp bạn!
                      </p>
                    </div>

                    {/* Nét ngoặc vẽ tay phải */}
                    <svg
                      width="18"
                      height="48"
                      viewBox="0 0 20 54"
                      fill="none"
                      className="text-[#FF6500] shrink-0 drop-shadow-[0_0_8px_rgba(255,101,0,0.35)]"
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

                  {/* Ảnh Linh vật HD chỉ tay lên */}
                  <div className="relative w-32 h-44 sm:w-44 sm:h-58 lg:w-48 lg:h-64 xl:w-52 xl:h-70 drop-shadow-[0_12px_25px_rgba(255,107,0,0.22)] transition-transform duration-500 hover:scale-105">
                    <Image
                      src="/dudi/dudi_mascot_pointing.webp"
                      alt="Linh vật DUDI Software chỉ tay tư vấn"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 180px, 240px"
                      priority
                    />
                  </div>
                  </div>
                </ScrollReveal>

                {/* Form Card Cột Phải with slide-left reveal */}
                <ScrollReveal variant="slide-left" delay={180} duration={850} className="flex-1 w-full">
                  {/* Tiêu đề & phụ đề form */}
                  <div className="mb-3 sm:mb-3.5 text-left">
                    <h3 className="text-[21px] sm:text-[25px] lg:text-[27px] font-black text-slate-900 tracking-tight leading-snug">
                      Gửi website để được{" "}
                      <span className="bg-gradient-to-r from-[#FF2B14] via-[#FF6800] to-[#FFA000] bg-clip-text text-transparent">
                        kiểm tra &amp; tư vấn
                      </span>
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-600">
                      Điền thông tin bên dưới, chúng tôi sẽ liên hệ trong thời gian sớm nhất.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-2.5 sm:space-y-3 text-left">
                    {/* Hàng 1: 3 cột đồng bộ hoàn hảo với Hàng 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
                      {/* 1. Họ và tên * */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
                          Họ và tên <span className="text-[#FF6500] font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Nguyễn Văn A"
                          className={cn(
                            "w-full rounded-xl bg-orange-50/30 border px-3.5 py-2.5 sm:py-2 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-1",
                            errors.fullName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-[#FFE4D6] focus:border-[#FF6500] focus:ring-[#FF6500]/40"
                          )}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      {/* 2. Số điện thoại/Zalo * */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
                          Số điện thoại/Zalo <span className="text-[#FF6500] font-bold">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="0909 000 000"
                          className={cn(
                            "w-full rounded-xl bg-orange-50/30 border px-3.5 py-2.5 sm:py-2 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-1",
                            errors.phone
                              ? "border-red-500 focus:ring-red-500"
                              : "border-[#FFE4D6] focus:border-[#FF6500] focus:ring-[#FF6500]/40"
                          )}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {/* 3. Website hiện tại (Không bắt buộc) */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
                          Website hiện tại <span className="text-[11px] font-normal text-slate-500">(nếu có)</span>
                        </label>
                        <input
                          type="url"
                          name="websiteUrl"
                          value={formData.websiteUrl}
                          onChange={handleChange}
                          placeholder="https://example.com"
                          className={cn(
                            "w-full rounded-xl bg-orange-50/30 border px-3.5 py-2.5 sm:py-2 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-1",
                            errors.websiteUrl
                              ? "border-red-500 focus:ring-red-500"
                              : "border-[#FFE4D6] focus:border-[#FF6500] focus:ring-[#FF6500]/40"
                          )}
                        />
                        {errors.websiteUrl && (
                          <p className="text-[11px] text-red-500 mt-1">{errors.websiteUrl}</p>
                        )}
                      </div>
                    </div>

                    {/* Hàng 2: 3 cột dropdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
                      {/* 5. Vấn đề đang gặp */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
                          Vấn đề đang gặp
                        </label>
                        <div className="relative">
                          <select
                            name="issue"
                            value={formData.issue}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-xl bg-orange-50/30 border border-[#FFE4D6] px-3.5 py-2.5 sm:py-2 pr-8 text-base sm:text-sm text-slate-900 transition-all focus:outline-none focus:border-[#FF6500] focus:ring-1 focus:ring-[#FF6500]/40 cursor-pointer"
                          >
                            <option value="" className="bg-white text-slate-700">Chọn vấn đề</option>
                            <option value="Web tải chậm / Giật lag" className="bg-white text-slate-800">Web tải chậm / Giật lag</option>
                            <option value="Vỡ giao diện trên điện thoại" className="bg-white text-slate-800">Vỡ giao diện trên điện thoại</option>
                            <option value="Lỗi form liên hệ / Gửi thư" className="bg-white text-slate-800">Lỗi form liên hệ / gửi thư</option>
                            <option value="Cần thay đổi nội dung & hình ảnh" className="bg-white text-slate-800">Cần thay nội dung & hình ảnh</option>
                            <option value="Website cũ muốn làm mới" className="bg-white text-slate-800">Website cũ muốn làm mới</option>
                            <option value="Vấn đề kỹ thuật khác" className="bg-white text-slate-800">Vấn đề kỹ thuật khác</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        </div>
                      </div>

                      {/* 6. Gói quan tâm */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
                          Gói quan tâm
                        </label>
                        <div className="relative">
                          <select
                            name="packageInterested"
                            value={formData.packageInterested}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-xl bg-orange-50/30 border border-[#FFE4D6] px-3.5 py-2.5 sm:py-2 pr-8 text-base sm:text-sm text-slate-900 transition-all focus:outline-none focus:border-[#FF6500] focus:ring-1 focus:ring-[#FF6500]/40 cursor-pointer"
                          >
                            <option value="Chưa rõ" className="bg-white text-slate-700">Chọn gói</option>
                            <option value="Cơ bản" className="bg-white text-slate-800">Gói Cơ Bản (500.000đ)</option>
                            <option value="Tiêu chuẩn" className="bg-white text-slate-800">Gói Tiêu Chuẩn (2.000.000đ)</option>
                            <option value="Cao cấp" className="bg-white text-slate-800">Gói Cao Cấp (5.000.000đ)</option>
                            <option value="Làm mới toàn bộ website" className="bg-white text-slate-800">Làm mới toàn bộ (Từ 10tr)</option>
                            <option value="Chưa rõ" className="bg-white text-slate-800">Chưa rõ - Cần DUDI tư vấn</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        </div>
                      </div>

                      {/* 7. Thời gian mong muốn */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
                          Thời gian mong muốn
                        </label>
                        <div className="relative">
                          <select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-xl bg-orange-50/30 border border-[#FFE4D6] px-3.5 py-2.5 sm:py-2 pr-8 text-base sm:text-sm text-slate-900 transition-all focus:outline-none focus:border-[#FF6500] focus:ring-1 focus:ring-[#FF6500]/40 cursor-pointer"
                          >
                            <option value="1 tuần" className="bg-white text-slate-700">Chọn thời gian</option>
                            <option value="Cần gấp (1–2 ngày)" className="bg-white text-slate-800">Cần gấp (1–2 ngày)</option>
                            <option value="Trong tuần này" className="bg-white text-slate-800">Trong tuần này (3–5 ngày)</option>
                            <option value="Trong 1–2 tuần" className="bg-white text-slate-800">Trong 1–2 tuần tới</option>
                            <option value="Chưa gấp" className="bg-white text-slate-800">Chưa gấp - Đang tham khảo</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3.5 mt-4 border-t border-[#FFE4D6]">
                      <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm text-slate-600">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-[#FFE4D6] bg-white text-[#FF6500] focus:ring-[#FF6500] focus:ring-offset-0 cursor-pointer accent-[#FF6500]"
                        />
                        <span>Tôi đồng ý để DUDI liên hệ tư vấn.</span>
                      </label>

                      <Button
                        type="submit"
                        variant="dudiGradient"
                        disabled={isSubmitting}
                        className={cn(
                          "w-full sm:w-auto px-7 py-3 text-sm font-bold text-white shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 rounded-xl",
                          btnError && "from-red-600 via-red-500 to-red-500 hover:from-red-600 hover:to-red-500"
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Đang gửi thông tin...</span>
                          </>
                        ) : btnError ? (
                          <>
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span className="text-left leading-snug">{btnError}</span>
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
                      <p className="text-[11px] text-red-500">{errors.consent}</p>
                    )}
                  </form>
                </ScrollReveal>
              </div>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
