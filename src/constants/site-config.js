/**
 * Cấu hình thông tin pháp lý và liên hệ chính thức của DUDI
 * Theo đúng tài liệu đặc tả DUDI_LANDING_PAGE_SPEC.md
 */
export const siteConfig = {
  name: "DUDI Software",
  companyName: "Công ty TNHH Giải Pháp Phần Mềm DUDI",
  taxId: "0319641544",
  hotline: "0909 163 821",
  hotlineTel: "tel:0909163821",
  zaloUrl: "https://zalo.me/2871243904030074512",
  // TODO: thay bằng URL chatbot trợ lý AI DU thật khi có (hiện placeholder "#")
  aiChatUrl: "#",
  email: "contact@dudisoftware.com",
  emailMailto: "mailto:contact@dudisoftware.com",
  address: "49/2 Đường 14, Phường Thủ Đức, TP. Hồ Chí Minh",
  title: "DUDI Software | Cập nhật & Nâng cấp website doanh nghiệp",
  description:
    "Chuyên sửa lỗi, tăng tốc độ và nâng cấp giao diện website cũ cho doanh nghiệp. Khảo sát kiểm tra miễn phí, báo giá trước rõ ràng chỉ từ 500.000đ/gói.",
  logoUrl: "/dudi/dudisoftware1.webp",
  navItems: [
    { label: "Về chúng tôi", href: "https://dudisoftware.com", isExternal: true },
    { label: "Giải pháp", href: "#giai-phap" },
    { label: "Case thực tế", href: "#case-thuc-te" },
    { label: "Quy trình", href: "#quy-trinh" },
    { label: "Bảng giá", href: "#bang-gia" },
  ],
};

export const ECOSYSTEM_SERVICES = [
  {
    id: 1,
    title: "Cập nhật & Nâng cấp Website Doanh Nghiệp",
    description: "Làm mới giao diện, tối ưu tốc độ & chức năng",
    href: "https://dudi-landing-page-rouge.vercel.app/",
    icon: "RotateCw",
  },
  {
    id: 2,
    title: "Thiết kế Website Giới Thiệu Doanh Nghiệp",
    description: "Website chuẩn nhận diện thương hiệu",
    href: "https://dudi-landing-page-2.vercel.app/",
    icon: "Globe",
  },
  {
    id: 3,
    title: "Chăm sóc & Vận hành Website Theo Tháng",
    description: "Quản trị nội dung, bảo mật & sao lưu định kỳ",
    href: "https://dudi-landing-page-3.vercel.app/",
    icon: "ShieldCheck",
  },
  {
    id: 4,
    title: "Thuê Đội Kỹ Thuật & Hợp Tác White Label",
    description: "Cung ứng nhân sự IT & gia công trọn gói",
    href: "https://dudi-landing-page-4.vercel.app/",
    icon: "Users",
  },
  {
    id: 5,
    title: "Thiết kế Landing Page",
    description: "Tối ưu tỷ lệ chuyển đổi cho chiến dịch ads",
    href: "https://dudi-landing-page-5.vercel.app/",
    icon: "Rocket",
  },
  {
    id: 6,
    title: "Thiết kế Website Bán Hàng",
    description: "Tích hợp giỏ hàng, thanh toán & chốt đơn",
    href: "https://dudi-landing-page-6.vercel.app/",
    icon: "ShoppingCart",
  },
  {
    id: 7,
    title: "Dịch vụ SEO Website",
    description: "Đẩy top Google bền vững, bứt phá traffic",
    href: "https://dudisoftware-seo.vercel.app/",
    icon: "Search",
  },
  {
    id: 8,
    title: "Bảo trì Ứng Dụng",
    description: "Sửa lỗi, nâng cấp & hỗ trợ kỹ thuật 24/7",
    href: "https://dudi-landing-page-8.vercel.app/",
    icon: "Wrench",
  },
];
