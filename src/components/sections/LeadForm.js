"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Send,
  Loader2,
  CheckCircle,
  MessageCircle,
  Phone,
  AlertCircle,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/constants/site-config";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { trackEvent } from "@/lib/tracking";

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
      newErrors.phone = "Số điện thoại chưa hợp lệ (gồm 9–12 số, ví dụ: 0909 123 456).";
    }

    if (!formData.company.trim() || formData.company.trim().length < 2) {
      newErrors.company = "Vui lòng nhập tên doanh nghiệp hoặc tên shop của bạn.";
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

    if (!formData.issue.trim() || formData.issue.trim().length < 10) {
      newErrors.issue = "Vui lòng mô tả sơ bộ vấn đề bạn đang gặp (tối thiểu 10 ký tự).";
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
    <section id="form-tu-van" className="py-12 sm:py-16 bg-transparent relative scroll-mt-20">
      <Container className="max-w-4xl">
        <RevealOnScroll duration={1200}>
          <SectionHeading
            title="Gửi Website Cần Kiểm Tra — Nhận Đánh Giá Trong 2 Giờ"
            description="Kỹ thuật viên DUDI sẽ rà soát thực tế website của bạn, chỉ ra đúng nguyên nhân lỗi và tư vấn phương án khắc phục tiết kiệm nhất."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={150} duration={1300}>
          <div className="relative rounded-3xl border border-slate-700/60 bg-[#0D1527]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10 shadow-black/40 card-glow-hover text-white">
          {submitResult && submitResult.success ? (
            /* Màn hình gửi thành công */
            <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 mb-5">
                <CheckCircle className="h-10 w-10" />
              </div>

              <Badge variant="success" className="mb-3 py-1 px-3.5 bg-emerald-950/80 text-emerald-300 border-emerald-700">
                Mã yêu cầu: {submitResult.leadId}
              </Badge>

              <h3 className="text-2xl font-black text-white mb-3">
                DUDI Đã Nhận Được Thông Tin!
              </h3>

              <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed mb-8">
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
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-blue-400 border-blue-500/40 bg-blue-950/20 hover:bg-blue-900/40 gap-2">
                    <MessageCircle className="h-5 w-5 fill-blue-500 text-white" />
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
                className="mt-8 text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
              >
                Gửi thêm yêu cầu khác
              </button>
            </div>
          ) : (
            /* Form nhập liệu */
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Specialist Live Status with 3D Robot Mascot */}
              <div className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 mb-4">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-slate-700/60 shrink-0 bg-slate-900 shadow-md">
                  <Image
                    src="/images/robot-mascot.jpg"
                    alt="DUDI Robot Specialist"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="text-left text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-bold text-white text-xs sm:text-sm">Kỹ thuật viên DUDI đang trực tuyến</span>
                    <span className="text-[10px] text-red-300 bg-red-950/80 px-2 py-0.5 rounded-md border border-red-800/60 font-medium">
                      Đánh giá trong 2 giờ
                    </span>
                  </div>
                  <p className="text-slate-400 mt-0.5 text-[11px] sm:text-xs">
                    Điền thông tin bên dưới để kỹ thuật viên rà soát trực tiếp và tư vấn phương án tiết kiệm nhất.
                  </p>
                </div>
              </div>

              {/* Honeypot hidden input */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="hp_company_fax"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.hp_company_fax}
                  onChange={handleChange}
                />
              </div>

              {submitResult && !submitResult.success && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-800/80 text-rose-300 text-sm flex items-start gap-2.5">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>{submitResult.message}</span>
                </div>
              )}

              {/* Row 1: Họ tên & Số điện thoại */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors ${
                      errors.fullName
                        ? "border-red-500 bg-red-950/30"
                        : "border-slate-700 bg-slate-950/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-400 font-medium">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                    Số điện thoại / Zalo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0909 000 000"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors ${
                      errors.phone
                        ? "border-red-500 bg-red-950/30"
                        : "border-slate-700 bg-slate-950/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-rose-400 font-medium">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Doanh nghiệp & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                    Tên doanh nghiệp / Đơn vị <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Công ty TNHH ABC..."
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors ${
                      errors.company
                        ? "border-red-500 bg-red-950/30"
                        : "border-slate-700 bg-slate-950/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                    }`}
                  />
                  {errors.company && (
                    <p className="mt-1 text-xs text-rose-400 font-medium">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                    Đường dẫn website hiện tại <span className="text-slate-400 font-normal">(nếu có)</span>
                  </label>
                  <input
                    type="url"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors ${
                      errors.websiteUrl
                        ? "border-red-500 bg-red-950/30"
                        : "border-slate-700 bg-slate-950/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                    }`}
                  />
                  {errors.websiteUrl && (
                    <p className="mt-1 text-xs text-rose-400 font-medium">{errors.websiteUrl}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Vấn đề đang gặp */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                  Vấn đề hoặc phần bạn muốn sửa <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="issue"
                  rows={3}
                  value={formData.issue}
                  onChange={handleChange}
                  placeholder="Ví dụ: Website tải rất chậm trên điện thoại, form liên hệ gửi bị lỗi, cần thay mới bảng giá và bố cục trang chủ..."
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors ${
                    errors.issue
                      ? "border-red-500 bg-red-950/30"
                      : "border-slate-700 bg-slate-950/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                  }`}
                />
                {errors.issue && (
                  <p className="mt-1 text-xs text-rose-400 font-medium">{errors.issue}</p>
                )}
              </div>

              {/* Row 4: Gói quan tâm & Thời gian mong muốn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                    Gói dịch vụ quan tâm <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="packageInterested"
                    value={formData.packageInterested}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-red-500 cursor-pointer"
                  >
                    <option value="Chưa rõ" className="bg-slate-900 text-white">Chưa rõ (Cần DUDI kiểm tra tư vấn)</option>
                    <option value="Cơ bản" className="bg-slate-900 text-white">Gói Cơ bản (500.000đ/gói)</option>
                    <option value="Tiêu chuẩn" className="bg-slate-900 text-white">Gói Tiêu chuẩn (2.000.000đ/gói - Khuyên dùng)</option>
                    <option value="Cao cấp" className="bg-slate-900 text-white">Gói Cao cấp (5.000.000đ/gói)</option>
                    <option value="Làm mới toàn bộ" className="bg-slate-900 text-white">Gói Làm mới toàn bộ (từ 10.000.000đ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                    Thời gian mong muốn hoàn thành
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-red-500 cursor-pointer"
                  >
                    <option value="Trong 3 ngày" className="bg-slate-900 text-white">Trong 3 ngày (Gấp)</option>
                    <option value="1 tuần" className="bg-slate-900 text-white">Khoảng 1 tuần</option>
                    <option value="2 tuần" className="bg-slate-900 text-white">Khoảng 2 tuần</option>
                    <option value="Chưa gấp" className="bg-slate-900 text-white">Chưa gấp / Linh hoạt</option>
                  </select>
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-950 text-red-600 focus:ring-red-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-300 leading-normal select-none">
                    Tôi đồng ý để chuyên viên kỹ thuật của DUDI liên hệ hỗ trợ khảo sát website qua điện thoại hoặc Zalo. DUDI cam kết bảo mật thông tin 100%.
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-xs text-rose-400 font-medium">{errors.consent}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="dudiGradient"
                  size="lg"
                  className="w-full py-4 text-base font-bold shadow-lg glow-red cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      <span>Đang gửi thông tin...</span>
                    </>
                  ) : (
                    <>
                      <span>Gửi website để DUDI kiểm tra</span>
                      <Send className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Kiểm tra miễn phí — Báo giá trước — Không phát sinh chi phí</span>
              </div>
            </form>
          )}
        </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
