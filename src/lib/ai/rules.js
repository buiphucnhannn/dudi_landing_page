// Tập rule phản hồi chuẩn — Đồng bộ 100% theo AI_CHATBOX:
// company-responses.ts, pricing-policy.ts, business-domains.ts, off-topic.ts, project-parser.ts
import { normalizeVi } from "./normalize.js";

export const HOTLINE = "(+84) 909 163 821";
export const HOTLINE_TEL = "tel:0909163821";
export const CONTACT_EMAIL = "contact@dudisoftware.com";
export const WEBSITE = "https://www.dudisoftware.com/";

// ---------- SĐT (pricing-policy.ts) ----------
const phonePattern = /(?:\+?84|0)(?:[\s.-]*\d){8,10}\b/;
export function extractCustomerPhone(message = "") {
  const m = String(message || "").match(phonePattern);
  return m ? m[0].replace(/[^\d+]/g, "") : null;
}

// ---------- Báo giá (pricing-policy.ts) ----------
const pricingInquiryPatterns = [
  /\bbao\s*gia\b/,
  /\bbang\s*gia\b/,
  /\bdon\s*gia\b/,
  /\bmuc\s*gia\b/,
  /(?<!danh\s)\bgia\b(?:\s+[a-z0-9]+){0,8}\s+bao\s*nhieu\b/,
  /(?<!danh\s)\bgia\s*(tien|ca|bao\s*nhieu|web|website|app|mobile|phan\s*mem|thiet\s*ke|lap\s*trinh|goi|re|cao)\b/,
  /\b(co|xin|cho|gui|nhan|can)\s*(toi\s*)?(gia|bao\s*gia)\b/,
  /\bbao\s*nhieu\s*(tien|vnd|dong|trieu|nghin|k)\b/,
  /\b(mat|ton)\s*bao\s*nhieu\b/,
  /\bchi\s*phi\b/,
  /\bkinh\s*phi\b/,
  /\bngan\s*sach\b/,
  /\b(thanh\s*toan|dat\s*coc|tra\s*gop|hoa\s*don)\b/,
  /\b(price|pricing|quote|quotation|cost|budget|payment|invoice)\b/,
];
const currencyPattern = /([$₫€])|(\d[\d.,]*\s*(vnd|vnđ|đ|dong|trieu|nghin|k)\b)/i;

const directMoneyTokens = new Set([
  "tien",
  "phi",
  "cost",
  "price",
  "pricing",
  "quote",
  "quotation",
  "budget",
  "payment",
  "invoice",
]);

function hasDirectPricingMention(n) {
  const tokens = n.split(" ").filter(Boolean);
  return tokens.some((token, i) => {
    if (directMoneyTokens.has(token)) return true;
    if (token !== "gia") return false;
    const prev = tokens[i - 1];
    const next = tokens[i + 1];
    const lookahead = tokens.slice(i + 1, i + 10).join(" ");
    if (["danh", "giam", "tham", "an"].includes(prev)) return false;
    if (["tri", "dung", "dinh", "cong", "tang"].includes(next)) return false;
    return (
      ["bao", "xin", "cho", "gui", "hoi", "can", "muon", "muc", "don", "bang", "tam"].includes(prev || "") ||
      /^(tien|ca|web|website|app|mobile|phan|thiet|lap|goi|re|cao|khoang|tam)$/.test(next || "") ||
      /\bbao\s*nhieu\b/.test(lookahead) ||
      /\bnhieu\s*tien\b/.test(lookahead)
    );
  });
}

export function isPricingOrMoneyInquiry(message = "") {
  const n = normalizeVi(message);
  if (!n) return false;
  if (/\bgia\s*(vang|chung\s*khoan|coin|do\s*la|usd|ngoai\s*te|xang|dau|dien|nuoc)\b/.test(n)) return false;
  return (
    currencyPattern.test(message) ||
    hasDirectPricingMention(n) ||
    pricingInquiryPatterns.some((p) => p.test(n))
  );
}

export function getPricingHandoffResponse() {
  return [
    "Dạ, DUDI Software xin gửi anh/chị bảng giá dịch vụ tham khảo:",
    "- **Landing Page**: Gói Cơ bản từ **1.000.000đ**, Gói Tiêu chuẩn **4.000.000đ**.",
    "- **Website Giới thiệu Doanh nghiệp**: Gói Cơ bản từ **3.000.000đ**, Gói Tiêu chuẩn **7.000.000đ**.",
    "- **Website Bán hàng/E-commerce**: Gói Cơ bản từ **5.000.000đ**, Gói Tiêu chuẩn **10.000.000đ**.",
    "- **Cập nhật & Chăm sóc Website**: Từ **500.000đ/tháng**.",
    "",
    "Mức giá trên là giá tham khảo tiêu chuẩn trước khảo sát. Giá chính xác sẽ phụ thuộc vào yêu cầu tính năng cụ thể.",
    `Anh/chị vui lòng để lại số điện thoại hoặc liên hệ Hotline **${HOTLINE}** để nhân viên DUDI Software tư vấn và báo giá chính thức theo nhu cầu ạ.`,
  ].join("\n");
}

export function getPhoneReceivedHandoffResponse(phone) {
  return [
    `Cảm ơn anh/chị, DUDI Software đã ghi nhận số điện thoại ${phone}.`,
    "Nhân viên tư vấn sẽ liên hệ anh/chị trong thời gian sớm nhất để trao đổi nhu cầu và báo giá phù hợp.",
    "",
    "Trong lúc chờ phản hồi, anh/chị có thể tham khảo một số giải pháp tiêu biểu của DUDI Software:",
    "1. Website doanh nghiệp, landing page giới thiệu thương hiệu.",
    "2. Website bán hàng, thương mại điện tử, đặt hàng và thanh toán online.",
    "3. Ứng dụng mobile iOS/Android.",
    "4. Phần mềm quản lý doanh nghiệp, CRM/ERP, booking platform.",
    "5. AI chatbot/RAG hỗ trợ tư vấn và chăm sóc khách hàng 24/7.",
  ].join("\n");
}

// ---------- Off-topic / Vi phạm chính sách (off-topic.ts) ----------
function isUnsupportedDomainInquiry(message = "") {
  const n = normalizeVi(message);
  if (!n) return false;
  const gambling = /\b(ca\s*do|ca\s*cuoc|dat\s*cuoc|co\s*bac|danh\s*bac|lo\s*de|danh\s*lo|danh\s*de|so\s*de|tai\s*xiu|nha\s*cai|casino|danh\s*bai|choi\s*bai|xoc\s*dia|xo\s*so|bong\s*88|kubet|shbet|789bet|888b|game\s*bai|game\s*doi\s*thuong|ban\s*ca\s*doi\s*thuong|da\s*ga)\b/.test(n);
  const adult = /\b(web\s*den|phim\s*nguoi\s*lon|khieu\s*dam|mai\s*dam|gai\s*goi|do\s*choi\s*tinh\s*duc|sex|porn|18\s*\+)\b/.test(n);
  const hacking = /\b(hack\s*tool|tool\s*hack|hack\s*facebook|hack\s*fb|hack\s*tai\s*khoan|ddos|botnet|ma\s*doc|keylogger|phishing|virus|trojan|ransomware|spam|script\s*ddos)\b/.test(n);
  const drugs = /\b(ma\s*tuy|can\s*sa|thuoc\s*lac|choi\s*ke|khay\s*ke|bong\s*cuoi|heroine|meth)\b/.test(n);
  const weapons = /\b(vu\s*khi|sung\s*dan|thuoc\s*no|dao\s*kiem)\b/.test(n);
  const scams = /\b(tien\s*gia|giay\s*to\s*gia|bang\s*cap\s*gia|lua\s*dao|ponzi|tin\s*dung\s*den|cho\s*vay\s*nang\s*lai)\b/.test(n);
  return gambling || adult || hacking || drugs || weapons || scams;
}

export function getUnsupportedDomainResponse() {
  return [
    "Dạ, DU - DUDI Software chỉ tư vấn các nhóm website/phần mềm chính thức:",
    "1. Website doanh nghiệp, landing page, website bán hàng/e-commerce.",
    "2. Ứng dụng di động (Mobile App iOS & Android).",
    "3. Phần mềm quản lý doanh nghiệp, CRM/ERP, booking platform.",
    "4. Chăm sóc, bảo trì, nâng cấp website & ứng dụng.",
    "5. Thuê đội kỹ thuật & White Label.",
    "6. SEO tăng trưởng bền vững & AI chatbot/RAG.",
    "",
    "DUDI không hỗ trợ các chủ đề nhạy cảm, vi phạm pháp luật (cá cược, nội dung người lớn, hack/mã độc, chất cấm, vũ khí, lừa đảo...).",
    `Nếu anh/chị cần làm website/phần mềm thuộc nhóm chính thức, vui lòng để lại SĐT hoặc gọi Hotline **${HOTLINE}** ạ.`,
  ].join("\n");
}

export function isOffTopicInquiry(message = "") {
  const n = normalizeVi(message);
  if (!n) return false;
  if (isUnsupportedDomainInquiry(message)) return true;
  if (/\b(dam|danh|dap)\s*nhau\b|\bdanh\s*lon\b|\bcombat\b/.test(n)) return true;
  if (/\bdi\s*nhau\b|\buong\s*bia\b|\buong\s*ruou\b/.test(n)) {
    if (/\b(web|website|app|dich\s*vu|bao\s*gia|du\s*an)\b/.test(n)) return false;
    return true;
  }
  if (/\b(thoi\s*tiet|nhiet\s*do|du\s*bao\s*thoi\s*tiet|gia\s*vang|tu\s*vi|boi\s*que)\b/.test(n)) {
    if (/\b(web|website|app|dich\s*vu)\b/.test(n)) return false;
    return true;
  }
  return false;
}

export function getOffTopicResponse(message = "") {
  if (isUnsupportedDomainInquiry(message)) return getUnsupportedDomainResponse();
  const n = normalizeVi(message);
  if (/\bdi\s*nhau\b|\buong\s*bia\b|\buong\s*ruou\b/.test(n)) {
    return [
      "Dạ em là DU - trợ lý AI của DUDI Software nên không đi nhậu được đâu ạ.",
      "",
      "Em ở đây để tư vấn website, app, phần mềm, UI/UX hoặc AI chatbot. Anh/chị cần hỏi tiếp về dự án thì cứ nhắn em nhé.",
    ].join("\n");
  }
  return [
    "Dạ câu này hơi ngoài phạm vi tư vấn của DU rồi ạ.",
    "",
    "Em có thể hỗ trợ tư vấn các dịch vụ website, mobile app, phần mềm doanh nghiệp, bảng giá tham khảo, quy trình triển khai hoặc các dự án mẫu DUDI đã thực hiện.",
  ].join("\n");
}

// ---------- Thông tin công ty & Dịch vụ chuẩn (company-responses.ts) ----------
export function getContactInfoResponse() {
  return [
    "Thông tin liên hệ DUDI Software:",
    `- Hotline: **${HOTLINE}**`,
    `- Email: **${CONTACT_EMAIL}**`,
    `- Website: ${WEBSITE}`,
    "- Địa chỉ 1: 232 Đường Nguyễn Thị Minh Khai, Phường Xuân Hòa, TP. Hồ Chí Minh",
    "- Địa chỉ 2: 49/2 Đường 14, Phường Thủ Đức, TP. Hồ Chí Minh",
    "- Giờ làm việc: Thứ Hai – Thứ Sáu, 9:00 AM – 6:00 PM (Hỗ trợ kỹ thuật khẩn cấp 24/7).",
    "",
    "Anh/chị cần tư vấn dịch vụ nào, em hỗ trợ thêm thông tin phù hợp ạ.",
  ].join("\n");
}

export function getIdentityResponse() {
  return [
    "Xin chào! Tôi là **DU** - Trợ lý AI tư vấn khách hàng chuyên nghiệp của **DUDI SOFTWARE**.",
    "",
    "Tôi ở đây để hỗ trợ tư vấn cho bạn các dịch vụ của DUDI Software bao gồm:",
    "- **Thiết kế Website & Landing Page tối ưu chuyển đổi**",
    "- **Ứng dụng Di Động (Mobile App)** trên iOS & Android",
    "- **Phần mềm quản lý doanh nghiệp (CRM / ERP / Booking)**",
    "- **Tích hợp API & AI Chatbot RAG 24/7**",
    "- **Bảng giá tham khảo các gói dịch vụ chuẩn**",
    "",
    `Hotline hỗ trợ: **${HOTLINE}**. Bạn cần tôi hỗ trợ thêm thông tin gì không ạ?`,
  ].join("\n");
}

export function getCompanyIntroResponse() {
  return [
    "**DUDI Software** là công ty phát triển phần mềm và giải pháp số cho doanh nghiệp.",
    "",
    "Các nhóm dịch vụ DUDI thường tư vấn gồm: website doanh nghiệp, website bán hàng/e-commerce, mobile app, phần mềm quản lý CRM/ERP/booking, UI/UX, AI chatbot/RAG, cloud/devops và bảo trì vận hành hệ thống.",
    "",
    "Nếu anh/chị đang tìm hiểu để làm dự án mới, em có thể giới thiệu các nhóm dịch vụ, hoặc anh/chị cho em biết nhu cầu để tư vấn đúng lĩnh vực hơn ạ.",
  ].join("\n");
}

export function getWorkHoursResponse() {
  return [
    "⏰ Thông tin thời gian làm việc & Kênh tư vấn DUDI Software:",
    "- 📅 Thời gian làm việc: Thứ Hai đến Thứ Sáu, từ 9:00 AM - 6:00 PM.",
    `- 📞 Hotline hỗ trợ khẩn cấp: **${HOTLINE}** (Hỗ trợ 24/7).`,
    `- ✉️ Email tiếp nhận: **${CONTACT_EMAIL}**`,
    "- 💬 Tư vấn nhanh: Trực tiếp qua Chatbot AI 24/7 hoặc quét mã QR Zalo trên website chính thức.",
  ].join("\n");
}

export function getExperienceResponse() {
  return [
    "📊 Thống kê Năng lực & Kinh nghiệm của DUDI Software:",
    "- 🌟 150+ Dự án đã hoàn thành xuất sắc.",
    "- 🤝 50+ Khách hàng doanh nghiệp tin tưởng và hài lòng.",
    "- 👥 30+ Kỹ sư & Chuyên gia công nghệ giàu kinh nghiệm.",
    "- ⏳ 5+ Năm kinh nghiệm thực chiến phát triển giải pháp phần mềm.",
    "",
    "Anh/chị cần tham khảo hồ sơ năng lực hoặc các dự án trong lĩnh vực nào ạ?",
  ].join("\n");
}

export function getProcessResponse() {
  return [
    "📋 Quy trình làm việc 6 bước chuẩn tại DUDI Software:",
    "1. 📞 Tiếp nhận yêu cầu & Tư vấn giải pháp ban đầu.",
    "2. 🔍 Phân tích chi tiết nhu cầu, khảo sát & Lập báo giá/Hợp đồng.",
    "3. 🎨 Thiết kế giao diện UI/UX chuẩn trải nghiệm người dùng.",
    "4. 💻 Lập trình & Triển khai phát triển hệ thống (Web/App/Software).",
    "5. ✅ Kiểm thử chất lượng (QA/QC), bàn giao & Đào tạo sử dụng.",
    "6. 🛡️ Bảo trì, bảo hành & Hỗ trợ kỹ thuật 24/7 sau bàn giao.",
  ].join("\n");
}

export function getWarrantyResponse() {
  return [
    "🛡️ Chính sách Bảo hành & Hỗ trợ Kỹ thuật tại DUDI Software:",
    "- 🛡️ Bảo hành & bảo trì miễn phí hệ thống, khắc phục sự cố kỹ thuật 24/7.",
    "- 👨‍💻 Đội ngũ kỹ thuật viên bảo trì hỗ trợ trực 24/7 cho các trường hợp khẩn cấp.",
    "- 🔄 Miễn phí cập nhật các bản vá lỗi và tối ưu hiệu năng định kỳ.",
    "- 📖 Hướng dẫn đào tạo quản trị và bàn giao đầy đủ mã nguồn (Source code) cho doanh nghiệp.",
  ].join("\n");
}

export function getUiUxResponse() {
  return [
    "🎨 Dịch vụ Thiết kế UI/UX Chuyên nghiệp tại DUDI Software:",
    "- ✨ Thiết kế giao diện tinh tế, hiện đại, chuẩn nhận diện thương hiệu.",
    "- 📱 Tối ưu trải nghiệm người dùng (UX) trên mobile và desktop.",
    "- 📈 Tăng tỷ lệ chuyển đổi (Conversion Rate) cho website bán hàng & ứng dụng số.",
    "- 📐 Đầy đủ Wireframe, Prototype tương tác và Design System trước khi lập trình.",
    "",
    "Anh/chị muốn thiết kế UI/UX cho website mới, app mobile hay làm mới giao diện hệ thống hiện tại ạ?",
  ].join("\n");
}

export function getCloudDevopsResponse() {
  return [
    "☁️ Dịch vụ Điện toán Đám mây & DevOps tại DUDI Software:",
    "- 🚀 Triển khai hạ tầng Cloud (AWS, Google Cloud, Docker, Microservices).",
    "- 🔒 Đảm bảo hệ thống vận hành ổn định, mở rộng linh hoạt và bảo mật cao.",
    "- ⚙️ Cấu hình CI/CD tự động hóa quy trình đóng gói và triển khai phần mềm.",
    "- 📊 Giám sát hệ thống (Monitoring) & bảo trì 24/7.",
    "",
    "Anh/chị đang cần tư vấn hạ tầng Cloud cho hệ thống mới hay nâng cấp hệ thống hiện tại ạ?",
  ].join("\n");
}

export function getServiceOverviewResponse() {
  return [
    "Được ạ. DUDI Software thường tư vấn theo 7 nhóm chính:",
    "1. **Website doanh nghiệp, landing page**, website giới thiệu thương hiệu.",
    "2. **Website bán hàng/e-commerce**, đặt hàng và thanh toán online.",
    "3. **Mobile app iOS & Android**.",
    "4. **Phần mềm quản lý doanh nghiệp**, CRM/ERP, booking platform.",
    "5. **UI/UX design** cho website, app và hệ sinh thái số.",
    "6. **AI chatbot/RAG**, tự động hóa tư vấn và chăm sóc khách hàng 24/7.",
    "7. **Cloud/devops, bảo trì, nâng cấp** và vận hành hệ thống.",
    "",
    "Anh/chị đang quan tâm nhóm nào? Chỉ cần nhắn ngắn như “web bán hàng”, “CRM/ERP”, “app mobile” hoặc mô tả nhu cầu hiện tại là được ạ.",
  ].join("\n");
}

export function getBusinessDomainsResponse() {
  return [
    "DUDI Software có kinh nghiệm thực chiến triển khai cho hơn 30+ lĩnh vực ngành nghề:",
    "- Bất động sản, xây dựng, kiến trúc & nội thất.",
    "- Ô tô, vận tải, logistics & giao nhận.",
    "- Thời trang, mỹ phẩm, làm đẹp & spa.",
    "- Thực phẩm, nhà hàng tiệc cưới, F&B.",
    "- Khách sạn, homestay, du lịch & booking.",
    "- Giáo dục, e-learning, tài chính & tuyển dụng...",
    "",
    "Anh/chị muốn xem mẫu dự án thuộc ngành nào, cứ nhắn tên ngành để em gửi danh sách dự án tham khảo nhé.",
  ].join("\n");
}

// ---------- Tư vấn theo nền tảng mẫu (Shopify, Haravan, Abitmes, Marketplace...) ----------
export function getProjectInspiredConsultationResponse(message = "") {
  const n = normalizeVi(message);
  const isShopifyRef = /\b(shopify|haravan)\b/.test(n);
  const isAbitmesRef = /\b(abitmes|upos|tendoo|pancake)\b/.test(n);
  const isMarketplaceRef = /\b(tiki|shopee|lazada|tiktok\s*shop)\b/.test(n);
  const isSalesManagement = isShopifyRef || isAbitmesRef || isMarketplaceRef || /\b(quan\s*ly\s*ban\s*hang|ban\s*hang\s*da\s*kenh|chat\s*da\s*kenh)\b/.test(n);

  if (isSalesManagement) {
    const platformName = isShopifyRef
      ? (n.includes("shopify") ? "Shopify" : "Haravan")
      : isMarketplaceRef
        ? (n.includes("tiki") ? "Tiki" : n.includes("lazada") ? "Lazada" : n.includes("tiktok") ? "TikTok Shop" : "Shopee")
        : (n.includes("pancake") ? "Pancake" : "Abitmes");
    return [
      `Dạ, em hiểu anh/chị muốn tư vấn một hệ thống bán hàng đa kênh tương tự nền tảng ${platformName}.`,
      "Với hướng này, DUDI Software có thể tư vấn các nhóm chức năng chính:",
      "1. Giao diện gian hàng online, tối ưu trải nghiệm xem sản phẩm và đặt hàng.",
      "2. Quản lý đồng bộ đơn hàng, tồn kho và sản phẩm đa kênh tập trung.",
      "3. Tích hợp cổng thanh toán online, đơn vị vận chuyển và tự động tính phí ship.",
      "4. Quản lý khách hàng (CRM), tích hợp mã giảm giá, voucher và chăm sóc tự động.",
      "5. Phân quyền nhân viên, báo cáo doanh thu chi tiết và mở rộng qua API.",
      "",
      `Anh/chị muốn xây dựng website bán hàng độc lập chuẩn như ${platformName} hay hệ thống quản lý bán hàng đa kênh tập trung ạ?`,
    ].join("\n");
  }

  return [
    "Dạ, em hiểu anh/chị muốn tư vấn một website/hệ thống theo mẫu tham khảo vừa gửi.",
    "DUDI Software có thể phân tích mẫu đó thành các phần như giao diện, luồng người dùng, chức năng quản trị, tích hợp dữ liệu và các module cần phát triển.",
    "",
    "Anh/chị cho em biết phần nào của mẫu là quan trọng nhất: giao diện, chức năng bán hàng, quản lý khách hàng, đặt hàng/thanh toán hay phần quản trị nội bộ ạ?",
  ].join("\n");
}

// ---------- Dự án mẫu: hỏi lại lĩnh vực khi chưa rõ (project-parser.ts) ----------
export function getProjectExampleClarificationResponse() {
  return [
    "Được ạ. Anh/chị muốn xem mẫu theo lĩnh vực nào?",
    "Một số nhóm phổ biến: website bán hàng/e-commerce, bất động sản, du lịch/booking, giáo dục/e-learning, nha khoa/sức khỏe, thời trang, thực phẩm, phần mềm CRM/ERP hoặc booking platform.",
    "",
    "Anh/chị chỉ cần nhắn ngành hàng hoặc loại hệ thống, em sẽ lọc mẫu đúng nhóm hơn.",
  ].join("\n");
}

export function getNoProjectDataResponse(topicLabel = "") {
  const topic = topicLabel || "nhóm dự án này";
  return [
    `Dạ, hiện em chưa có dữ liệu mẫu/link dự án đủ sát với **${topic}** trong kho tham khảo.`,
    "",
    "Em xin phép không gửi mẫu ngành khác để tránh làm anh/chị tham khảo sai hướng.",
    "",
    "Anh/chị có thể cho em một nhóm gần hơn để lọc lại, hoặc mình chuyển sang phần tư vấn tính năng/giao diện cho nhu cầu này ạ?",
  ].join("\n");
}

export function getNoMoreProjectExamplesResponse(topicLabel = "") {
  const topic = topicLabel || "nhóm dự án này";
  return [
    `Dạ, các mẫu **${topic}** hiện có trong kho tham khảo em vừa gửi ở trên rồi ạ.`,
    "",
    "Hiện em chưa có thêm mẫu khác cùng nhóm để gửi tiếp, nên em xin phép không lặp lại danh sách cũ.",
    "",
    "Anh/chị muốn em chuyển sang nhóm mẫu gần giống hơn như website đăng tin, marketplace, landing page dự án, hay mình đi tiếp phần tính năng/quản trị cho website này ạ?",
  ].join("\n");
}

// Lọc scope của dự án từ tin nhắn
export function getProjectExampleScope(message = "") {
  const n = normalizeVi(message);
  const hasTerm = (pattern) => pattern.test(n);

  if (hasTerm(/\babitmes\b|\bquan\s*ly\s*ban\s*hang\b|\bban\s*hang\s*da\s*kenh\b/)) {
    return {
      label: "hệ thống quản lý bán hàng đa kênh",
      query: "dự án quản lý bán hàng đa kênh chat đơn hàng chăm sóc khách hàng",
      categories: ["Kho Dự Án - Bán hàng đa kênh"],
    };
  }
  if (hasTerm(/\bthuc\s*pham\b|\bthuc\s*pham\s*sach\b|\bdo\s*an\b|\bf\s*b\b|\bnha\s*hang\b/)) {
    return {
      label: "website thực phẩm/F&B",
      query: "dự án website thực phẩm sạch hữu cơ rau củ trái cây hải sản đồ ăn nhà hàng F&B đặt hàng online",
      categories: ["Kho Dự Án - Thực phẩm", "Kho Dự Án - F&B", "Kho Dự Án - Nhà hàng & Tiệc cưới"],
    };
  }
  if (hasTerm(/\bloyalty\b|\btich\s*diem\b|\bdoi\s*qua\b|\bthanh\s*vien\b|\brewards\b/)) {
    return {
      label: "app loyalty/tích điểm",
      query: "dự án app loyalty tích điểm đổi quà thành viên rewards chăm sóc khách hàng",
      categories: ["Kho Dự Án - Khách sạn & Homestay", "Kho Dự Án - Điện lạnh", "Kho Dự Án - Bán hàng đa kênh"],
    };
  }
  if (hasTerm(/\bban\s*hang\b|\be\s*commerce\b|\bthuong\s*mai\s*dien\s*tu\b/)) {
    return {
      label: "website bán hàng/e-commerce",
      query: "dự án website bán hàng thương mại điện tử mua sắm online sản phẩm đặt hàng thanh toán",
      categories: [
        "Kho Dự Án - Thời trang",
        "Kho Dự Án - Thực phẩm",
        "Kho Dự Án - Đồ gia dụng",
        "Kho Dự Án - Sức khỏe",
        "Kho Dự Án - Làm đẹp",
        "Kho Dự Án - Nội thất & Decord",
        "Kho Dự Án - F&B",
        "Kho Dự Án - Bán hàng đa kênh",
      ],
    };
  }
  if (hasTerm(/\blanding\s*page\b|\blanding\b/)) {
    return {
      label: "website landing page",
      query: "dự án website landing page giới thiệu sản phẩm tối ưu chuyển đổi thu lead",
      categories: ["Kho Dự Án - Landing Page"],
    };
  }
  if (hasTerm(/\bwebsite\s*doanh\s*nghiep\b|\bweb\s*doanh\s*nghiep\b|\bgioi\s*thieu\s*doanh\s*nghiep\b/)) {
    return {
      label: "website giới thiệu doanh nghiệp",
      query: "dự án website giới thiệu doanh nghiệp công ty giới thiệu năng lực",
      categories: ["Kho Dự Án - Xây dựng", "Kho Dự Án - Dịch vụ", "Kho Dự Án - Logistics", "Kho Dự Án - Công nghệ"],
    };
  }
  if (hasTerm(/\bbat\s*dong\s*san\b|\bbds\b/)) {
    return {
      label: "website bất động sản",
      query: "dự án website bất động sản căn hộ khu đô thị nhà phố đất nền mua bán cho thuê",
      categories: ["Kho Dự Án - Bất động sản"],
    };
  }
  if (hasTerm(/\btham\s*my\b|\blam\s*dep\b|\bspa\b|\bmy\s*pham\b|\bskincare\b/)) {
    return {
      label: "website thẩm mỹ/spa/làm đẹp",
      query: "dự án website thẩm mỹ viện spa làm đẹp phòng khám chăm sóc da đặt lịch tư vấn",
      categories: ["Kho Dự Án - Làm đẹp", "Kho Dự Án - Sức khỏe"],
    };
  }
  if (hasTerm(/\bnha\s*khoa\b/)) {
    return {
      label: "website nha khoa",
      query: "dự án website nha khoa phòng khám răng miệng đặt lịch tư vấn",
      categories: ["Kho Dự Án - Nha khoa"],
    };
  }
  if (hasTerm(/\bgiao\s*duc\b|\bngoai\s*ngu\b|\btieng\s*anh\b|\be\s*learning\b|\belearning\b|\blms\b/)) {
    return {
      label: "website giáo dục/e-learning",
      query: "dự án website giáo dục trung tâm ngoại ngữ tiếng Anh e-learning LMS học trực tuyến",
      categories: ["Kho Dự Án - E-Learning", "Kho Dự Án - Giáo dục"],
    };
  }
  if (hasTerm(/\bdu\s*lich\b|\btour\b|\bbooking\b/)) {
    return {
      label: "website du lịch/booking",
      query: "dự án website du lịch tour đặt vé khách sạn booking trực tuyến",
      categories: ["Kho Dự Án - Du lịch", "Kho Dự Án - Booking", "Kho Dự Án - Khách sạn & Homestay"],
    };
  }
  if (hasTerm(/\bthoi\s*trang\b|\bquan\s*ao\b/)) {
    return {
      label: "website thời trang",
      query: "dự án website thời trang quần áo phụ kiện mua sắm online",
      categories: ["Kho Dự Án - Thời trang"],
    };
  }
  if (hasTerm(/\bo\s*to\b|\boto\b|\bxe\b/)) {
    return {
      label: "website ô tô/showroom",
      query: "dự án website ô tô showroom xe đăng ký lái thử đại lý",
      categories: ["Kho Dự Án - Ô tô"],
    };
  }
  if (hasTerm(/\bsuc\s*khoe\b|\bphong\s*kham\b/)) {
    return {
      label: "website sức khỏe/phòng khám",
      query: "dự án website sức khỏe phòng khám đặt lịch tư vấn",
      categories: ["Kho Dự Án - Sức khỏe", "Kho Dự Án - Nha khoa"],
    };
  }
  if (hasTerm(/\bxay\s*dung\b|\bnoi\s*that\b|\bdecor\b|\bkien\s*truc\b/)) {
    return {
      label: "website xây dựng/nội thất",
      query: "dự án website xây dựng công trình thiết kế nội thất kiến trúc",
      categories: ["Kho Dự Án - Xây dựng", "Kho Dự Án - Nội thất & Decord"],
    };
  }
  if (hasTerm(/\blogistics\b|\bvan\s*chuyen\b|\bvan\s*tai\b/)) {
    return {
      label: "website logistics/vận tải",
      query: "dự án website logistics vận tải giao hàng kho bãi tra cứu vận đơn",
      categories: ["Kho Dự Án - Logistics"],
    };
  }
  if (hasTerm(/\btai\s*chinh\b|\bngan\s*hang\b|\bbao\s*hiem\b/)) {
    return {
      label: "website tài chính/bảo hiểm",
      query: "dự án website tài chính bảo hiểm đầu tư chứng khoán ngân hàng",
      categories: ["Kho Dự Án - Tài chính"],
    };
  }
  if (hasTerm(/\btuyen\s*dung\b|\bviec\s*lam\b/)) {
    return {
      label: "website tuyển dụng/việc làm",
      query: "dự án website tuyển dụng việc làm người tìm việc nhà tuyển dụng",
      categories: ["Kho Dự Án - Dịch vụ"],
    };
  }
  if (hasTerm(/\bpet\b|\bthu\s*cung\b/)) {
    return {
      label: "website thú cưng/pet shop",
      query: "dự án website thú cưng pet shop chăm sóc chó mèo",
      categories: ["Kho Dự Án - Sức khỏe", "Kho Dự Án - Thời trang"],
    };
  }
  return null;
}

// ---------- Router phân loại câu hỏi (Intent Router chuẩn AI_CHATBOX) ----------
export function classifyLocalIntent(message = "") {
  const n = normalizeVi(message);
  if (!n) return { type: "unknown" };

  const phone = extractCustomerPhone(message);
  if (phone && (isPricingOrMoneyInquiry(message) || n.length <= 35 || /\b(sdt|so\s*dien\s*thoai|lien\s*he|bao\s*gia)\b/.test(n))) {
    return { type: "pricing_phone_received", phone };
  }

  if (isUnsupportedDomainInquiry(message) || isOffTopicInquiry(message)) return { type: "off_topic" };

  // Nền tảng tham khảo (Shopify, Haravan, Abitmes, Shopee, Tiki, Pancake...)
  if (/\b(shopify|haravan|abitmes|pancake|upos|tiki|shopee|lazada|tiktok\s*shop)\b/.test(n)) {
    return { type: "platform_consultation" };
  }

  // Giá cả
  if (isPricingOrMoneyInquiry(message)) {
    const hasSpecificDomain = /\b(oto|thoi\s*trang|thuc\s*pham|f&b|nha\s*hang|khach\s*san|du\s*lich|bat\s*dong\s*san|bds|do\s*gia\s*dung|thu\s*cung|cay\s*canh|hoa|luat|phap\s*ly|giao\s*hang|ship|lam\s*dep|spa|e\s*learning|khoa\s*hoc|logistics|xay\s*dung|nha\s*khoa|phong\s*kham|noi\s*that|portfolio|the\s*thao|gym|yoga|booking|giat\s*ui|media|studio|dien\s*lanh|gia\s*cong|tai\s*chinh|cong\s*nghe|tuyen\s*dung|homestay|suc\s*khoe)\b/.test(n);
    if (!hasSpecificDomain && n.length < 40) {
      return { type: "pricing_general" };
    }
    return { type: "pricing_detailed" };
  }

  // Danh tính & Công ty
  if (/\b(ban\s*la\s*ai|bot\s*la\s*ai|ten\s*gi|who\s*are\s*you|gioi\s*thieu\s*ban)\b/.test(n)) return { type: "identity" };
  if (/\b(lien\s*he|dia\s*chi|hotline|so\s*dien\s*thoai|email|o\s*dau|tru\s*so)\b/.test(n)) return { type: "contact" };
  if (/\b(gioi\s*thieu\s*(cong\s*ty|dudi)|ve\s*dudi|dudi\s*(la\s*ai|la\s*gi))\b/.test(n)) return { type: "company_intro" };
  if (/\b(gio\s*lam\s*viec|thoi\s*gian\s*lam\s*viec|mo\s*cua|truc\s*dem)\b/.test(n)) return { type: "work_hours" };
  if (/\b(kinh\s*nghiem|nang\s*luc|da\s*lam\s*duoc\s*gi|bao\s*nhieu\s*nam)\b/.test(n)) return { type: "experience" };
  if (/\b(quy\s*trinh|cac\s*buoc\s*lam\s*viec|quy\s*trinh\s*trien\s*khai)\b/.test(n)) return { type: "process" };
  if (/\b(bao\s*hanh|bao\s*tri|ho\s*tro\s*ky\s*thuat)\b/.test(n)) return { type: "warranty" };
  if (/\b(thiet\s*ke\s*ui\s*ux|ui\s*ux|wireframe|prototype)\b/.test(n)) return { type: "ui_ux" };
  if (/\b(cloud|devops|aws|docker|microservices|ha\s*tang)\b/.test(n)) return { type: "cloud_devops" };

  // Dịch vụ & Lĩnh vực
  if (/\b(cac|nhung)\s*(dich\s*vu|nganh|linh\s*vuc)\b|\b(dich\s*vu\s*nao|lam\s*nhung\s*gi|co\s*nhung\s*gi|tu\s*van\s*dich\s*vu)\b/.test(n)) {
    return { type: "service_overview" };
  }
  if (/\b(nganh|linh\s*vuc)\s*(nao|gi)\b/.test(n)) return { type: "business_domains" };

  // Mẫu dự án
  if (/\b(mau|du\s*an|portfolio|vi\s*du|tham\s*khao|case\s*study|link|xem\s*mau)\b/.test(n)) {
    return { type: "project_examples" };
  }

  return { type: "unknown" };
}

// ---------- Câu chào / cảm ơn (Small talk) ----------
export function getSmallTalkResponse(message = "") {
  const n = normalizeVi(message);
  if (/^(chao|hello|hi|hey|xin\s*chao)\b/.test(n) && n.length < 20) {
    return "Xin chào! Em là **DU** - Trợ lý AI của DUDI Software. Em có thể hỗ trợ anh/chị tìm hiểu dịch vụ, dự án mẫu hoặc bảng giá giải pháp phần mềm ạ?";
  }
  if (/\bcam\s*on\b|\bthanks?\b|\bthank\s*you\b/.test(n) && n.length < 25) {
    return "Dạ không có gì ạ! DU rất vui được hỗ trợ. Nếu cần tư vấn thêm về giải pháp hay báo giá dự án, anh/chị cứ nhắn em nhé!";
  }
  if (/\btam\s*biet\b|\bbye\b/.test(n) && n.length < 20) {
    return "Tạm biệt anh/chị! Chúc anh/chị một ngày làm việc hiệu quả. DUDI Software luôn sẵn sàng đồng hành cùng anh/chị!";
  }
  return null;
}
