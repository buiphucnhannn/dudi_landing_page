/**
 * Dữ liệu nội dung tách rời cho toàn bộ Landing Page
 * Giúp người quản trị hoặc copywriter dễ dàng cập nhật mà không cần can thiệp vào code giao diện JSX
 */

export const heroData = {
  badge: "✨ Phiên bản 2.0 đã chính thức ra mắt",
  headline: "Xây Dựng Giao Diện Đỉnh Cao, Tăng Trưởng Doanh Số Vượt Bậc",
  subheadline:
    "Bộ công cụ & giải pháp thiết kế số hiện đại giúp doanh nghiệp tối ưu trải nghiệm khách hàng, rút ngắn 70% thời gian triển khai và tăng gấp đôi tỷ lệ chuyển đổi.",
  primaryCta: {
    label: "Bắt đầu miễn phí",
    href: "#pricing",
  },
  secondaryCta: {
    label: "Xem bản Demo trực tiếp",
    href: "#features",
  },
  metrics: [
    { value: "10K+", label: "Người dùng tin cậy" },
    { value: "99.9%", label: "Thời gian uptime" },
    { value: "3.5x", label: "Tăng trưởng chuyển đổi" },
    { value: "4.9/5", label: "Đánh giá hài lòng" },
  ],
};

export const partnersData = [
  { name: "TechCorp", logoText: "TECHCORP" },
  { name: "VinaPay", logoText: "VINAPAY" },
  { name: "AlphaGlobal", logoText: "ALPHA" },
  { name: "NextGen Media", logoText: "NEXTGEN" },
  { name: "InnovateX", logoText: "INNOVATEX" },
];

export const featuresData = [
  {
    id: "speed",
    icon: "Zap",
    badge: "Tối Ưu Tốc Độ",
    title: "Hiệu năng tải trang thần tốc",
    description:
      "Tối ưu Core Web Vitals với Next.js App Router, nén ảnh tự động và Server Components giúp trang tải dưới 0.8 giây.",
  },
  {
    id: "design",
    icon: "Palette",
    badge: "Giao Diện Đẹp Mắt",
    title: "Thiết kế chuẩn UI/UX quốc tế",
    description:
      "Hệ thống Design System đồng bộ, thẩm mỹ hiện đại với hiệu ứng mượt mà và tương thích hoàn hảo mọi kích thước màn hình.",
  },
  {
    id: "seo",
    icon: "Search",
    badge: "SEO Sẵn Sàng",
    title: "Tối ưu hóa công cụ tìm kiếm",
    description:
      "Tích hợp sẵn thẻ OpenGraph, JSON-LD Schema, robots.txt và tự động sinh sitemap giúp bài viết lên top Google nhanh chóng.",
  },
  {
    id: "security",
    icon: "ShieldCheck",
    badge: "Bảo Mật Cao",
    title: "An toàn dữ liệu tuyệt đối",
    description:
      "Tuân thủ các tiêu chuẩn bảo mật khắt khe, mã hóa đầu cuối và ngăn chặn các nguy cơ tấn công mạng phổ biến.",
  },
  {
    id: "analytics",
    icon: "BarChart3",
    badge: "Đo Lường Chuẩn Xác",
    title: "Phân tích hành vi chuyên sâu",
    description:
      "Theo dõi lượt click, tỷ lệ cuộn trang và bản đồ nhiệt (heatmap) để liên tục tối ưu hóa hành trình khách hàng.",
  },
  {
    id: "support",
    icon: "Headphones",
    badge: "Hỗ Trợ 24/7",
    title: "Đội ngũ kỹ thuật đồng hành",
    description:
      "Hỗ trợ trực tiếp qua Slack/Zalo, giải quyết sự cố tức thời và cập nhật tính năng mới định kỳ hàng tháng.",
  },
];

export const pricingPlans = [
  {
    id: "starter",
    name: "Khởi Nghiệp (Starter)",
    description: "Phù hợp cho cá nhân hoặc startup đang thử nghiệm thị trường.",
    priceMonthly: "490.000đ",
    priceYearly: "390.000đ",
    popular: false,
    ctaText: "Bắt đầu trải nghiệm",
    features: [
      "1 Landing Page tiêu chuẩn",
      "Giao diện Responsive mọi thiết bị",
      "Tối ưu SEO cơ bản",
      "Hỗ trợ kỹ thuật qua Email",
      "Băng thông 10GB/tháng",
    ],
  },
  {
    id: "pro",
    name: "Chuyên Nghiệp (Pro)",
    description: "Dành cho doanh nghiệp muốn bứt phá doanh thu và quy mô.",
    priceMonthly: "1.290.000đ",
    priceYearly: "990.000đ",
    popular: true,
    ctaText: "Đăng ký gói Pro",
    features: [
      "Tối đa 5 Landing Pages cao cấp",
      "Tích hợp CRM & Email Automation",
      "Tối ưu SEO nâng cao & Schema Markup",
      "A/B Testing tối ưu tỷ lệ chuyển đổi",
      "Băng thông không giới hạn",
      "Hỗ trợ ưu tiên 24/7 qua Hotline/Zalo",
    ],
  },
  {
    id: "enterprise",
    name: "Doanh Nghiệp (Enterprise)",
    description: "Giải pháp thiết kế và hạ tầng may đo cho thương hiệu lớn.",
    priceMonthly: "Liên hệ",
    priceYearly: "Liên hệ",
    popular: false,
    ctaText: "Liên hệ tư vấn VIP",
    features: [
      "Không giới hạn số lượng trang",
      "Thiết kế độc quyền Custom Design System",
      "Tích hợp API và hệ thống nội bộ riêng",
      "Cam kết Uptime SLA 99.99%",
      "Chuyên gia cố vấn 1-1 tận nơi",
    ],
  },
];

export const testimonialsData = [
  {
    quote:
      "Từ khi chuyển sang Landing Page mới của DUDI, tỷ lệ điền form đăng ký khóa học của chúng tôi đã tăng hơn 180% chỉ sau 3 tuần ra mắt!",
    author: "Nguyễn Minh Tuấn",
    role: "Giám đốc Marketing, EdTech Alpha",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    quote:
      "Tốc độ tải trang cực kỳ nhanh, giao diện sang trọng đúng chuẩn gu quốc tế. Khách hàng đối tác của chúng tôi liên tục khen ngợi trang web mới.",
    author: "Trần Mai Phương",
    role: "Nhà sáng lập, EcoLiving Vietnam",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    quote:
      "Cấu trúc thư mục mã nguồn rất gọn gàng và chuẩn chỉnh. Đội ngũ dev của chúng tôi tiếp quản và tích hợp vào hệ thống backend rất dễ dàng.",
    author: "Lê Hoàng Nam",
    role: "CTO, FinFlow Solutions",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

export const faqData = [
  {
    question: "Tôi có thể tự chỉnh sửa nội dung sau khi trang hoàn thiện không?",
    answer:
      "Hoàn toàn có thể. Nhờ cấu trúc tách biệt trong thư mục `src/constants/landing-data.js`, bạn hoặc bất kỳ ai trong nhóm có thể dễ dàng thay đổi văn bản, hình ảnh, bảng giá mà không sợ làm hỏng giao diện.",
  },
  {
    question: "Trang landing page này có tương thích tốt với điện thoại không?",
    answer:
      "Có, giao diện được phát triển theo triết lý Mobile-First với Tailwind CSS, đảm bảo hiển thị hoàn hảo và trực quan trên mọi kích thước màn hình từ iPhone, iPad cho đến Desktop 4K.",
  },
  {
    question: "Thời gian để tôi triển khai sản phẩm thực tế mất bao lâu?",
    answer:
      "Với bộ khung chuẩn đã được scaffold sẵn đầy đủ các thành phần, bạn chỉ mất từ 1 đến 3 ngày để thay nội dung, hình ảnh và gắn tên miền riêng là có thể chính thức đưa vào sử dụng.",
  },
  {
    question: "Trang web có hỗ trợ kết nối với Google Analytics, Facebook Pixel không?",
    answer:
      "Có sẵn, bạn chỉ cần chèn Tracking ID vào file layout hoặc tích hợp qua Google Tag Manager rất nhanh gọn và an toàn.",
  },
];

export const ctaData = {
  title: "Sẵn Sàng Nâng Tầm Sản Phẩm Của Bạn?",
  description:
    "Gia nhập cùng hơn 1.000+ doanh nghiệp hàng đầu đang tăng tốc doanh số mỗi ngày với giải pháp của chúng tôi.",
  buttonLabel: "Đăng ký nhận tư vấn miễn phí",
  buttonHref: "#pricing",
  secondaryButtonLabel: "Xem tài liệu hướng dẫn",
  secondaryButtonHref: "#features",
};
