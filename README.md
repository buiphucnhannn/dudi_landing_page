# DUDI Next.js Landing Page Starter

Dự án cấu trúc thư mục chuẩn **Next.js (App Router, JavaScript, Tailwind CSS)** được thiết kế chuyên biệt cho việc phát triển các sản phẩm **Landing Page** chuyên nghiệp, tốc độ cao và tối ưu SEO.

---

## 📁 Sơ đồ cấu trúc thư mục chuẩn

```text
d:\Career\DUDI_LandingPage/
├── public/                     # Tài nguyên tĩnh (ảnh minh họa, logo, favicon)
│   ├── images/                 # Ảnh banner, ảnh mockup sản phẩm
│   └── favicon.ico             # Biểu tượng tab trình duyệt
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Import Tailwind CSS & cấu hình giao diện
│   │   ├── layout.js           # Root layout, Fonts & OpenGraph SEO metadata
│   │   ├── page.js             # Trang Landing Page chính ráp nối các sections
│   │   ├── robots.js           # Tự động tạo robots.txt cho bot Google
│   │   └── sitemap.js          # Tự động tạo sitemap.xml
│   │
│   ├── components/             # Các thành phần giao diện (UI)
│   │   ├── sections/           # Các khối nội dung độc lập theo trang
│   │   │   ├── Navbar.js       # Thanh điều hướng sticky & blur, menu mobile
│   │   │   ├── Hero.js         # Tiêu đề chính, CTA kép, metrics & preview card
│   │   │   ├── SocialProof.js  # Đối tác & thương hiệu đồng hành
│   │   │   ├── Features.js     # Lưới 6 tính năng nổi bật kèm Lucide icons
│   │   │   ├── Pricing.js      # Bảng giá có chuyển đổi tháng / năm
│   │   │   ├── Testimonials.js # Đánh giá & phản hồi từ khách hàng (5 sao)
│   │   │   ├── FAQ.js          # Câu hỏi thường gặp với Accordion đóng/mở
│   │   │   ├── CTA.js          # Banner kêu gọi hành động cuối trang
│   │   │   └── Footer.js       # Chân trang & thông tin liên hệ
│   │   │
│   │   ├── ui/                 # Atomic UI Components tái sử dụng (shadcn style)
│   │   │   ├── Button.js       # Nút bấm đa dạng variants (primary, outline, gradient...)
│   │   │   ├── Card.js         # Khung thẻ nội dung hỗ trợ hover 3D
│   │   │   ├── Badge.js        # Nhãn tag (purple, success, default...)
│   │   │   └── Accordion.js    # Hiệu ứng đóng mở mượt mà
│   │   │
│   │   └── common/             # Layout components dùng chung
│   │       ├── Container.js    # Căn đều chiều rộng chuẩn (max-w-7xl)
│   │       └── SectionHeading.js # Tiêu đề & mô tả chuẩn hóa cho từng section
│   │
│   ├── constants/              # Tách biệt toàn bộ dữ liệu chữ (Copywriting)
│   │   ├── site-config.js      # Cấu hình website: tên, mô tả SEO, mạng xã hội
│   │   └── landing-data.js     # Dữ liệu mẫu (Hero, Tính năng, Bảng giá, FAQ...)
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   └── useScrollPosition.js # Bắt sự kiện cuộn trang cho hiệu ứng Navbar
│   │
│   └── lib/                    # Tiện ích bổ trợ (Utilities)
│       └── utils.js            # Hàm cn() kết hợp clsx & tailwind-merge an toàn
│
├── jsconfig.json               # Cấu hình path alias @/*
├── package.json                # Danh sách thư viện phụ thuộc
└── postcss.config.mjs          # Cấu hình Tailwind CSS
```

---

## 🚀 Hướng dẫn phát triển

### 1. Cài đặt và khởi chạy máy chủ thử nghiệm (Dev Server)

```bash
npm run dev
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để xem trang web.

### 2. Kiểm tra đóng gói sản phẩm (Build Production)

```bash
npm run build
npm run start
```

### 3. Tùy biến nội dung nhanh chóng
- **Chỉnh sửa chữ / tính năng / bảng giá**: Bạn chỉ cần mở file [`src/constants/landing-data.js`](file:///d:/Career/DUDI_LandingPage/src/constants/landing-data.js) và cập nhật dữ liệu JSON. Toàn bộ giao diện sẽ tự động hiển thị mới mà không cần chỉnh sửa JSX.
- **Đổi tên thương hiệu / thông tin liên hệ**: Mở file [`src/constants/site-config.js`](file:///d:/Career/DUDI_LandingPage/src/constants/site-config.js).
- **Thêm section mới**: Tạo component mới trong thư mục [`src/components/sections/`](file:///d:/Career/DUDI_LandingPage/src/components/sections/) rồi import vào [`src/app/page.js`](file:///d:/Career/DUDI_LandingPage/src/app/page.js).
