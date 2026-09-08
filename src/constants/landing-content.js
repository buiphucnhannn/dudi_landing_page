/**
 * Dữ liệu nội dung chuẩn 100% theo đặc tả DUDI_LANDING_PAGE_SPEC.md
 * Bao gồm toàn bộ 13 Section, các điều khoản, giá gói, case study, FAQ
 */

// S02 - Hero Section
export const heroContent = {
  h1: "Website cũ, chậm hoặc khó ra khách? DUDI giúp cập nhật đúng phần cần thiết.",
  description:
    "Kiểm tra website thực tế, báo rõ phạm vi trước khi làm, chi phí minh bạch trọn gói từ 500.000đ/gói.",
  priceTag: "Chỉ từ 500.000đ/gói — Thanh toán 1 lần",
  primaryCta: {
    label: "Liên hệ",
    target: "#form-tu-van",
  },
  secondaryCta: {
    label: "Nhắn Zalo",
    target: "https://zalo.me/2871243904030074512",
  },
  hotlineCta: {
    label: "Gọi 0909 163 821",
    tel: "tel:0909163821",
  },
  trustPoints: [
    "Báo giá trước — Không phát sinh phí",
    "Bảo hành lỗi kỹ thuật 30 ngày",
    "Bảo mật và sao lưu dữ liệu 100%",
  ],
};

// S03 - 6 Dấu hiệu cần nâng cấp (Icon, Tiêu đề 3-6 từ, Mô tả <= 18 từ)
export const problemsContent = [
  {
    id: "speed",
    icon: "Gauge",
    title: "Tốc độ tải chậm",
    description: "Khách thoát trang trước khi xem được thông tin sản phẩm và dịch vụ của bạn.",
  },
  {
    id: "mobile",
    icon: "Smartphone",
    title: "Vỡ giao diện mobile",
    description: "Chữ bé, nút khó bấm, menu bị lỗi khi xem trên các dòng điện thoại.",
  },
  {
    id: "outdated",
    icon: "LayoutDashboard",
    title: "Thiết kế lỗi thời",
    description: "Giao diện cũ kỹ làm giảm uy tín thương hiệu trong mắt đối tác và khách.",
  },
  {
    id: "cms",
    icon: "FileEdit",
    title: "Khó cập nhật bài viết",
    description: "Mỗi lần thay đổi hình ảnh, số điện thoại hay giá cả đều mất rất nhiều công sức.",
  },
  {
    id: "form",
    icon: "MailWarning",
    title: "Form liên hệ bị lỗi",
    description: "Khách điền thông tin nhưng doanh nghiệp không nhận được email thông báo để kịp gọi lại.",
  },
  {
    id: "conversion",
    icon: "TrendingDown",
    title: "Không phát sinh khách hàng",
    description: "Có người truy cập nhưng không thấy ai gọi điện thoại hay nhắn tin qua Zalo.",
  },
];

// S04 - 8 Giải pháp DUDI (Mô tả kết quả bàn giao thực tế)
export const solutionsContent = [
  {
    id: "content",
    icon: "FileText",
    title: "Cập nhật nội dung & hình ảnh",
    description:
      "Thay mới toàn bộ câu chữ giới thiệu, bảng giá, banner và hình ảnh sắc nét, căn chỉnh chuẩn bố cục.",
  },
  {
    id: "ui",
    icon: "Layers",
    title: "Chỉnh sửa giao diện UI",
    description:
      "Tối ưu lại bố cục trang chủ, trang sản phẩm, màu sắc hiện đại và khoảng cách thoáng đãng, dễ đọc.",
  },
  {
    id: "responsive",
    icon: "SmartphoneCheck",
    title: "Tối ưu Mobile Responsive",
    description:
      "Sửa triệt để các lỗi tràn khung ngang, nút bấm to rõ, menu mobile mượt mà trên iPhone và Android.",
  },
  {
    id: "performance",
    icon: "Zap",
    title: "Cải thiện tốc độ tải trang",
    description:
      "Nén ảnh chuẩn thế hệ mới, dọn dẹp mã nguồn thừa và bộ nhớ đệm giúp web mở nhanh hơn rõ rệt.",
  },
  {
    id: "seo",
    icon: "SearchCheck",
    title: "Tối ưu SEO On-page cơ bản",
    description:
      "Chuẩn hóa thẻ Title, Meta Description, cấu trúc Heading H1-H3 để Google dễ dàng quét và lập chỉ mục.",
  },
  {
    id: "lead-form",
    icon: "Send",
    title: "Cải tiến Form & luồng nhận lead",
    description:
      "Sửa lỗi gửi thư, bổ sung thông báo tự động và chuyển hướng khách sang Zalo/Hotline tiện lợi.",
  },
  {
    id: "features",
    icon: "Puzzle",
    title: "Bổ sung tính năng nhỏ",
    description:
      "Gắn nút gọi nhanh, biểu tượng chat Zalo rung lắc, tích hợp bản đồ Google Maps và bảng so sánh dịch vụ.",
  },
  {
    id: "audit",
    icon: "CheckSquare",
    title: "Kiểm tra & rà soát lỗi toàn diện",
    description:
      "Quét sạch các liên kết gãy 404, lỗi console và rà soát trải nghiệm bấm trên đa trình duyệt.",
  },
];

// S05 - 2 Case thực tế trung thực (Tuân thủ nghiêm ngặt quy tắc trung thực)
export const caseStudiesContent = [
  {
    id: "packaging",
    client: "Doanh nghiệp Bao Bì Công Nghiệp",
    budget: "11.500.000đ",
    tag: "Dự án đã hoàn thành",
    summary:
      "Nâng cấp cấu trúc danh mục sản phẩm, cải thiện hiển thị trên thiết bị di động và tối ưu giao diện nhận yêu cầu báo giá.",
    statusDetail:
      "Website đã hoàn thành nghiệm thu, đang hoạt động ổn định trên internet. Phía khách hàng đang chuẩn bị thêm tư liệu nội dung để cập nhật giai đoạn tiếp theo.",
    deliverables: [
      "Tái cấu trúc 8 trang danh mục sản phẩm",
      "Sửa lỗi tràn layout trên 100% màn hình di động",
      "Form yêu cầu báo giá đính kèm file mẫu",
      "Bàn giao kèm tài liệu hướng dẫn cập nhật",
    ],
  },
  {
    id: "travel",
    client: "Đơn vị Cung Ứng Dịch Vụ Du Lịch",
    budget: "3.500.000đ",
    tag: "Đã hoàn thành & thanh toán",
    summary:
      "Tối ưu tốc độ mở trang tour, sửa lỗi form đặt phòng và làm mới thanh menu điều hướng giúp khách hàng dễ chọn tour hơn.",
    statusDetail:
      "Website đã hoàn thành đúng tiến độ cam kết, khách hàng đã thanh toán 100%, trang web vận hành mượt mà (hạng mục SEO chuyên sâu do đối tác riêng của khách thực hiện).",
    deliverables: [
      "Tối ưu kích thước ảnh và bộ nhớ đệm trang tour",
      "Tích hợp nút gọi hotline và chat Zalo trực tiếp",
      "Chuẩn hóa form gửi thông tin tour",
      "Bảo hành khắc phục sự cố 30 ngày",
    ],
  },
];

// S06 - Quy trình 6 bước
export const processStepsContent = [
  {
    step: "01",
    title: "Gửi website",
    subtitle: "Khách cung cấp link",
    description:
      "Khách gửi đường dẫn website hiện tại kèm mô tả sơ bộ lỗi hoặc phần muốn thay đổi qua form tư vấn hoặc Zalo.",
  },
  {
    step: "02",
    title: "Đánh giá sơ bộ",
    subtitle: "DUDI kiểm tra miễn phí",
    description:
      "Kỹ thuật viên DUDI truy cập trực tiếp kiểm tra mã nguồn, tốc độ tải, hiển thị mobile và các điểm nghẽn chuyển đổi.",
  },
  {
    step: "03",
    title: "Chốt phạm vi & Báo giá",
    subtitle: "Minh bạch trước khi làm",
    description:
      "Thống nhất danh sách hạng mục cần sửa, số ngày hoàn thiện và báo mức giá trọn gói cố định. Không phát sinh chi phí.",
  },
  {
    step: "04",
    title: "Triển khai kỹ thuật",
    subtitle: "Thực hiện an toàn",
    description:
      "Sao lưu dữ liệu trước khi làm. Tiến hành sửa lỗi và tối ưu trên môi trường kiểm thử hoặc trực tiếp theo thỏa thuận.",
  },
  {
    step: "05",
    title: "Nghiệm thu đối chiếu",
    subtitle: "Kiểm tra theo cam kết",
    description:
      "Khách hàng cùng DUDI rà soát từng mục đã bàn giao trong danh sách chốt ở Bước 3 và chỉnh sửa nếu chưa đạt.",
  },
  {
    step: "06",
    title: "Bàn giao & Bảo hành",
    subtitle: "Bảo hành 30 ngày",
    description:
      "Bàn giao toàn bộ quyền truy cập, tài liệu hướng dẫn và đồng hành hỗ trợ bảo hành lỗi kỹ thuật trong suốt 30 ngày.",
  },
];

// S07 - Bảng giá 3 gói chuẩn (BẮT BUỘC nhãn "GIÁ/GÓI")
export const pricingPlans = [
  {
    id: "coban",
    name: "Cơ Bản",
    price: "500.000đ",
    priceNote: "Giá/gói — Thanh toán 1 lần",
    badge: "Sửa nhanh & Tiết kiệm",
    target: "Web đang hoạt động ổn định, chỉ cần chỉnh sửa nhẹ một vài lỗi nhỏ.",
    popular: false,
    ctaLabel: "Chọn gói Cơ bản — 500.000đ",
    packageValue: "Cơ bản",
    deliveryTime: "1–3 ngày làm việc",
    revisions: "1 vòng chỉnh sửa",
    features: [
      "Áp dụng tối đa 3 trang",
      "Thay nội dung do khách cung cấp",
      "Chỉnh sửa giao diện nhẹ",
      "Sửa lỗi hiển thị mobile cơ bản",
      "Sửa lỗi form liên hệ hiện có",
      "Kiểm tra các phần đã chỉnh",
      "Thời gian: 1–3 ngày làm việc",
      "Bảo hành lỗi kỹ thuật 30 ngày",
    ],
    limitations: "Không thêm chức năng mới, không tối ưu tốc độ sâu, không SEO.",
  },
  {
    id: "tieuchuan",
    name: "Tiêu Chuẩn",
    price: "2.000.000đ",
    priceNote: "Giá/gói — Thanh toán 1 lần",
    badge: "Khuyên Dùng — Phổ Biến Nhất",
    target: "Web cũ, hiển thị chưa tốt, cần cải thiện giao diện và trải nghiệm khách hàng.",
    popular: true,
    ctaLabel: "Chọn gói Tiêu chuẩn — 2.000.000đ",
    packageValue: "Tiêu chuẩn",
    deliveryTime: "3–7 ngày làm việc",
    revisions: "2 vòng chỉnh sửa",
    features: [
      "Áp dụng tối đa 5 trang",
      "Viết lại nhẹ câu chữ + chỉnh bố cục",
      "Sửa layout từng trang hiện có",
      "Tối ưu hiển thị chuẩn trên mọi mobile",
      "Cải thiện tốc độ tải trang cơ bản",
      "Tối ưu SEO: Title, Meta, Heading",
      "Cải tiến form thu nhận lead hiện có",
      "Thêm tối đa 2 chức năng nhỏ (Zalo, Maps...)",
      "Kiểm tra toàn bộ các trang trong phạm vi",
      "Thời gian: 3–7 ngày làm việc",
      "Bảo hành lỗi kỹ thuật 30 ngày",
    ],
    limitations: "Không bao gồm thiết kế lại giao diện từ đầu.",
  },
  {
    id: "caocap",
    name: "Cao Cấp",
    price: "5.000.000đ",
    priceNote: "Giá/gói — Thanh toán 1 lần",
    badge: "Nâng Cấp Toàn Diện",
    target: "Web yếu, trải nghiệm kém, cần nâng cấp mạnh mẽ để tăng tỷ lệ chuyển đổi.",
    popular: false,
    ctaLabel: "Chọn gói Cao cấp — 5.000.000đ",
    packageValue: "Cao cấp",
    deliveryTime: "7–14 ngày làm việc",
    revisions: "3 vòng chỉnh sửa",
    features: [
      "Áp dụng tối đa 10 trang",
      "Tối ưu nội dung theo chuyển đổi",
      "Thiết kế lại các trang chính trong phạm vi",
      "Tối ưu trải nghiệm mobile chuyên sâu",
      "Tối ưu kỹ thuật tốc độ sâu",
      "Audit & SEO on-page tối đa 10 trang",
      "Thiết kế lại form & luồng thu lead",
      "Thêm 1 chức năng vừa hoặc 3 chức năng nhỏ",
      "Rà soát toàn bộ khu vực nâng cấp",
      "Thời gian: 7–14 ngày làm việc",
      "Bảo hành lỗi kỹ thuật 30 ngày",
    ],
    limitations: "Không cam kết điểm PageSpeed tuyệt đối 100.",
  },
];

// S08 - Khối Làm Mới Toàn Bộ (Rebuild từ 10 triệu)
export const rebuildBannerContent = {
  badge: "Giải pháp nâng cao",
  title: "Website quá cũ hoặc cần làm lại toàn bộ giao diện & tính năng?",
  description:
    "Nếu mã nguồn cũ quá phân mảnh, công nghệ quá lạc hậu hoặc bạn muốn lột xác hoàn toàn thương hiệu, DUDI cung cấp gói xây dựng website mới theo yêu cầu riêng từ 10.000.000đ.",
  ctaLabel: "Yêu cầu đánh giá làm lại toàn bộ",
  packageValue: "Làm mới toàn bộ",
};

// S09 - Vì sao chọn DUDI
export const whyUsContent = [
  {
    title: "Phạm vi công việc rõ ràng",
    desc: "Thống nhất cụ thể từng đầu việc làm và không làm trước khi nhận cọc. Tuyệt đối không mập mờ.",
  },
  {
    title: "Kiểm tra trước — Báo giá trước",
    desc: "Được kỹ thuật xem trước trang web, giải thích nguyên nhân lỗi và báo giá trọn gói không phát sinh.",
  },
  {
    title: "Bảo hành lỗi kỹ thuật 30 ngày",
    desc: "Cam kết xử lý miễn phí mọi lỗi phát sinh từ các hạng mục do DUDI thực hiện trong vòng 30 ngày.",
  },
  {
    title: "Kỹ thuật viên phụ trách cụ thể",
    desc: "Làm việc trực tiếp với kỹ thuật viên am hiểu mã nguồn, không qua các khâu trung gian phiền phức.",
  },
];

// S10 - 8 FAQ chuẩn
export const faqContent = [
  {
    question: "Giá 500k / 2tr / 5tr là thanh toán một lần hay đóng theo tháng?",
    answer:
      "Đây là mức chi phí thanh toán trọn gói 1 lần cho toàn bộ hạng mục công việc trong gói đã chốt, hoàn toàn KHÔNG PHẢI phí duy trì định kỳ theo tháng.",
  },
  {
    question: "Thời gian triển khai cho mỗi gói là bao lâu?",
    answer:
      "Gói Cơ bản từ 1–3 ngày làm việc; gói Tiêu chuẩn từ 3–7 ngày làm việc; gói Cao cấp từ 7–14 ngày làm việc (tính từ thời điểm DUDI nhận đủ dữ liệu và quyền truy cập cần thiết).",
  },
  {
    question: "Tôi có cần cung cấp tài khoản hosting hoặc quản trị web không?",
    answer:
      "Có, để sửa lỗi và tối ưu trực tiếp, DUDI cần tài khoản quản trị website (WordPress, CMS...) hoặc thông tin hosting/FTP. Mọi thông tin bảo mật được cam kết bảo vệ an toàn 100%.",
  },
  {
    question: "Nâng cấp website có làm mất dữ liệu hoặc hình ảnh cũ không?",
    answer:
      "DUDI luôn tiến hành sao lưu (backup) toàn bộ mã nguồn và cơ sở dữ liệu nguyên trạng trước khi thao tác, đảm bảo tuyệt đối không làm mất bài viết, hình ảnh hay thông tin sẵn có.",
  },
  {
    question: "Sau khi nâng cấp, thứ hạng từ khóa trên Google có bị ảnh hưởng không?",
    answer:
      "Không. DUDI giữ nguyên cấu trúc liên kết URL hiện có và chuẩn hóa lại các thẻ SEO (Title, Meta, Heading) giúp website thân thiện và dễ lên top Google hơn.",
  },
  {
    question: "Chính sách bảo hành 30 ngày áp dụng như thế nào?",
    answer:
      "Trong vòng 30 ngày kể từ lúc bàn giao nghiệm thu, nếu có bất kỳ lỗi kỹ thuật nào phát sinh liên quan đến các hạng mục DUDI đã chỉnh sửa, chúng tôi sẽ kiểm tra và khắc phục hoàn toàn miễn phí.",
  },
  {
    question: "Nếu tôi muốn làm thêm tính năng ngoài phạm vi gói thì sao?",
    answer:
      "DUDI sẽ trao đổi cụ thể tính năng bạn mong muốn và gửi báo giá riêng từng hạng mục trước khi thực hiện. Chỉ khi bạn đồng ý mới tiến hành triển khai.",
  },
  {
    question: "Công ty DUDI có xuất hóa đơn VAT không?",
    answer:
      "Có. DUDI là pháp nhân doanh nghiệp hợp pháp (Công ty TNHH Giải Pháp Phần Mềm DUDI - MST 0319641544), sẵn sàng xuất hóa đơn GTGT đầy đủ cho quý công ty.",
  },
];

// S12 - CTA chốt cuối trang
export const bottomCtaContent = {
  badge: "Hành động ngay hôm nay",
  title: "Đừng để website cũ làm mất khách hàng tiềm năng mỗi ngày",
  description:
    "Gửi link website ngay bây giờ để kỹ thuật DUDI kiểm tra miễn phí và đưa ra phương án xử lý nhanh nhất.",
  primaryButtonLabel: "Gửi website để DUDI kiểm tra",
  hotlineButtonLabel: "Gọi Hotline: 0909 163 821",
  zaloButtonLabel: "Nhắn tin Zalo ngay",
};
