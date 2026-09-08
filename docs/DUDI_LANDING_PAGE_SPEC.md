# ĐẶC TẢ KỸ THUẬT & KẾ HOẠCH TRIỂN KHAI LANDING PAGE DUDI
> **Nguồn tài liệu gốc:** `docs/DUDI_LandingPage.docx` (Phiên bản 1.0 — 08/09/2026)  
> **Đơn vị chủ quản:** Công ty TNHH Giải Pháp Phần Mềm DUDI  
> **Dịch vụ trọng tâm:** Cập nhật, sửa chữa & nâng cấp website doanh nghiệp cũ  
> **Mục tiêu tài liệu:** Tổng hợp đầy đủ, chi tiết 100% yêu cầu để AI Agent và Dev chỉ cần đọc file này là có thể triển khai chính xác tuyệt đối mà không cần mở lại file docx.

---

## PHẦN 1: THÔNG TIN DỰ ÁN & NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

### 1.1. Thông tin pháp nhân & liên hệ bắt buộc (Strict Legal Info)
- **Tên pháp nhân:** Công ty TNHH Giải Pháp Phần Mềm DUDI
- **Mã số thuế (MST):** `0319641544`
- **Hotline:** `0909 163 821` (Gắn link `tel:0909163821`)
- **Zalo:** `https://zalo.me/0909163821` (Mở đúng trang chat Zalo chính thức)
- **Email:** `contact@dudisoftware.com` (Gắn link `mailto:contact@dudisoftware.com`)
- **Địa chỉ:** 49/2 Đường 14, Phường Thủ Đức, TP. Hồ Chí Minh

### 1.2. Các nguyên tắc "sống còn" (Must-Follow Rules)
1. **Hành động chuyển đổi duy nhất (Primary CTA):** 
   - Landing page chỉ tập trung vào **01 hành động chính**: Khách hàng gửi đường dẫn (URL) website hiện tại để DUDI kiểm tra và tư vấn gói phù hợp.
   - Hành động phụ: Nhắn tin qua Zalo hoặc gọi Hotline.
2. **Quy tắc hiển thị bảng giá (Pricing Rule):**
   - Phải ghi nhãn rõ ràng là **"GIÁ/GÓI"** (thanh toán 1 lần theo gói công việc).
   - **TUYỆT ĐỐI KHÔNG GHI "GIÁ/THÁNG"** hay tạo cảm giác thuê bao định kỳ.
   - 3 mức giá cố định: **500.000đ** (Cơ bản) | **2.000.000đ** (Tiêu chuẩn) | **5.000.000đ** (Cao cấp).
   - Gói làm mới toàn bộ (Redesign/Rebuild): Báo giá riêng từ **10.000.000đ** (không gộp vào gói 5 triệu).
3. **Trung thực trong nội dung (No Fake Numbers):**
   - **TUYỆT ĐỐI KHÔNG** dùng các số liệu phóng đại, ảo tưởng chưa chứng minh (ví dụ: cấm dùng "150+ dự án", "50+ khách hàng", "30+ nhân sự", "5+ năm kinh nghiệm").
   - **Không hứa hẹn tuyệt đối:** Tránh các câu cam kết "chắc chắn tăng doanh thu 100%" hoặc "đạt 100 điểm PageSpeed".
4. **Quy định về Case Study:**
   - Chỉ dùng dữ liệu thật, có thể xác minh được:
     - **Case 1: Khách hàng Bao bì (Hợp đồng 11,5 triệu)** — Website đã hoàn thành, đang hoạt động, phía khách chưa cung cấp đủ dữ liệu để cập nhật tiếp.
     - **Case 2: Khách hàng Du lịch (Hợp đồng 3,5 triệu)** — Website đã hoàn thành, đã thanh toán, vẫn hoạt động bình thường, phần SEO do đơn vị khác thực hiện.
5. **Màu sắc thương hiệu & Trải nghiệm:**
   - **Màu chủ đạo:** Đỏ DUDI (Brand Red, ví dụ: `#DC2626` / `#E11D48` / Tailwind `red-600`), kết hợp nền Trắng và chữ đậm có độ tương phản đạt chuẩn WCAG AA.
   - Tối ưu Mobile First, font chữ body tối thiểu 16px để tránh bị tự động phóng to (zoom) trên iOS Safari.
6. **Chi phí & Công cụ:**
   - Ưu tiên công cụ và hạ tầng miễn phí có sẵn, không tự ý thêm dịch vụ hoặc plugin trả phí.

---

## PHẦN 2: MỤC TIÊU ĐO LƯỜNG (METRICS M1 - M4)

| Mã | Mục tiêu | Điều kiện nghiệm thu thành công |
|---|---|---|
| **M1** | Khách hiểu dịch vụ | Trong **10 giây đầu tiên**, khách hàng nhận diện được DUDI chuyên sửa/nâng cấp website cũ và nhìn thấy mức giá khởi điểm (từ 500.000đ). |
| **M2** | Tạo lead chất lượng | Form gửi thành công; dữ liệu thu về có nguồn truy cập, UTM tags, thông tin vấn đề và gói khách quan tâm. |
| **M3** | Tạo niềm tin vững chắc | Có case study thật, quy trình minh bạch, phạm vi rõ ràng, pháp nhân DUDI và chính sách bảo hành lỗi 30 ngày. |
| **M4** | Không phát sinh chi phí | Sử dụng tối đa công cụ miễn phí (Honeypot chống spam, event tracking qua dataLayer, Google Sheets/Telegram/Email lưu lead). |

---

## PHẦN 3: KIẾN TRÚC 13 SECTION BẮT BUỘC (S01 -> S13)

### S01. Header (Thanh điều hướng & Liên hệ nhanh)
- **Mục đích:** Nhận diện thương hiệu DUDI và liên hệ tức thời.
- **Bố cục Desktop:** Logo DUDI (bên trái); Hotline & Zalo + Nút CTA "Gửi website cần kiểm tra" (bên phải).
- **Bố cục Mobile:** Logo + Nút CTA gọn gàng; menu rút gọn (hamburger).
- **Hành vi:**
  - Nút CTA cuộn mượt (smooth scroll) thẳng xuống `#form-tu-van`.
  - Hotline gắn link `tel:0909163821`.
  - Nút Zalo mở trực tiếp trang chat Zalo `https://zalo.me/0909163821`.

### S02. Hero Section (Nói rõ vấn đề & Lời hứa cốt lõi)
- **Mục đích:** Định vị dịch vụ ngay trong màn hình đầu tiên (Above the fold).
- **Nội dung bắt buộc:**
  - **H1 duy nhất của trang:** `Website cũ, chậm hoặc khó ra khách? DUDI giúp cập nhật đúng phần cần thiết.`
  - **Mô tả (2 dòng):** Kiểm tra website thực tế, báo rõ phạm vi trước khi làm, chi phí minh bạch trọn gói từ 500.000đ/gói.
  - **Giá mồi:** Làm nổi bật mức giá "Chỉ từ 500.000đ/gói — Thanh toán 1 lần".
  - **CTA chính:** Nút `Gửi website để DUDI kiểm tra` (cuộn xuống form).
  - **CTA phụ:** Nút `Nhắn Zalo` (mở Zalo chat tư vấn trực tiếp).
  - Đảm bảo CTA nhìn thấy ngay trên màn hình đầu tiên của cả Desktop và Mobile.

### S03. Dấu hiệu cần nâng cấp (6 Vấn đề thực tế)
- **Mục đích:** Giúp khách hàng tự soi thấy website của mình đang gặp vấn đề gì.
- **Cấu trúc hiển thị:** Lưới 3 cột trên Desktop, 1 cột trên Mobile. Toàn bộ nội dung đọc được trực tiếp, không bắt người dùng phải hover.
- **Yêu cầu nội dung:** Mỗi thẻ gồm 1 Icon nhất quán, Tiêu đề từ 3–6 từ, Mô tả tối đa 18 từ.
- **6 Vấn đề chi tiết:**
  1. **Tốc độ tải chậm:** Khách thoát trang trước khi xem được sản phẩm/dịch vụ.
  2. **Vỡ giao diện mobile:** Chữ bé, nút khó bấm, menu bị lỗi khi xem trên điện thoại.
  3. **Thiết kế lỗi thời:** Giao diện cũ kỹ làm giảm uy tín thương hiệu trong mắt đối tác.
  4. **Khó cập nhật bài viết:** Mỗi lần thay đổi hình ảnh, số điện thoại hay giá đều phải chờ đợi lâu.
  5. **Form liên hệ bị lỗi:** Khách điền thông tin nhưng doanh nghiệp không nhận được email thông báo.
  6. **Không phát sinh khách hàng:** Lượng truy cập có nhưng không chuyển đổi thành đơn gọi hay tin nhắn.

### S04. Giải pháp DUDI (8 Hạng mục nâng cấp)
- **Mục đích:** Chuyển hóa các vấn đề thành các đầu việc kỹ thuật cụ thể mà DUDI sẽ bàn giao.
- **Yêu cầu:** Mô tả rõ kết quả bàn giao thực tế, không chỉ nói thuật ngữ suông; có link điều hướng tới bảng giá.
- **8 Hạng mục:**
  1. **Cập nhật nội dung & hình ảnh:** Thay mới thông tin, hình ảnh sắc nét, chuẩn bố cục.
  2. **Chỉnh sửa giao diện (UI):** Tối ưu layout các khối trang chủ, sản phẩm, dịch vụ.
  3. **Tối ưu Mobile Responsive:** Hiển thị mượt mà trên mọi dòng smartphone hiện nay.
  4. **Cải thiện tốc độ tải trang:** Nén tài nguyên, dọn dẹp mã thừa, tải nhanh hơn.
  5. **Tối ưu SEO On-page cơ bản:** Chuẩn hóa thẻ Title, Meta Description, Heading H1-H3.
  6. **Cải tiến Form & Luồng nhận Lead:** Khắc phục lỗi gửi mail, tích hợp thông báo tức thì.
  7. **Bổ sung tính năng nhỏ:** Nút gọi nhanh, chat Zalo, bản đồ Google Maps, bảng giá.
  8. **Kiểm tra & Rà soát lỗi toàn diện:** Kiểm tra liên kết gãy, lỗi console và trải nghiệm người dùng.

### S05. Case thực tế (Chứng minh năng lực trung thực)
- **Mục đích:** Tạo niềm tin bằng các dự án thật đã nghiệm thu thanh toán.
- **Quy tắc:** Chỉ dùng thông tin đã xác minh, không nói quá kết quả kinh doanh.
- **2 Case bắt buộc:**
  - **Case 1 (Bao bì - 11.500.000đ):** Website doanh nghiệp bao bì đã hoàn thành, đang hoạt động ổn định trên môi trường internet, phía khách hàng đang chuẩn bị thêm dữ liệu để cập nhật tiếp.
  - **Case 2 (Du lịch - 3.500.000đ):** Website dịch vụ du lịch đã hoàn thiện đúng tiến độ, khách hàng đã thanh toán 100%, web đang chạy mượt mà, hạng mục SEO chuyên sâu do đối tác thứ ba của khách triển khai.

### S06. Quy trình 6 bước rõ ràng
- **Mục đích:** Giảm thiểu rủi ro tâm lý mua hàng, khách biết rõ từng bước diễn ra như thế nào.
- **Cấu trúc 6 bước:**
  1. **Bước 1: Gửi website** — Khách gửi link web và mô tả sơ bộ vấn đề cần khắc phục qua form hoặc Zalo.
  2. **Bước 2: Đánh giá sơ bộ** — DUDI kiểm tra trực tiếp giao diện, tốc độ, mobile và các lỗi hiện có.
  3. **Bước 3: Chốt phạm vi & Báo giá** — Hai bên thống nhất đầu việc cụ thể và mức giá trọn gói trước khi làm (không phát sinh phí).
  4. **Bước 4: Triển khai kỹ thuật** — DUDI tiến hành sửa lỗi, nâng cấp trực tiếp trên môi trường kiểm thử hoặc website.
  5. **Bước 5: Nghiệm thu đối chiếu** — Khách hàng kiểm tra từng hạng mục theo đúng danh sách đã chốt ở Bước 3.
  6. **Bước 6: Bàn giao & Bảo hành 30 ngày** — Bàn giao quyền quản trị, hướng dẫn sử dụng và hỗ trợ bảo hành lỗi kỹ thuật trong 30 ngày.

### S07. Bảng giá 3 gói dịch vụ (Trọng tâm chuyển đổi)
- **Mục đích:** Khách hàng tự so sánh và chọn gói phù hợp với nhu cầu.
- **Yêu cầu hiển thị:**
  - Nhãn hiển thị bắt buộc: **GIÁ/GÓI** (Thanh toán 1 lần).
  - Làm nổi bật gói **Tiêu chuẩn (2.000.000đ)** là gói phổ biến nhất.
  - Dưới bảng giá có ghi chú điều kiện chung và các chi phí ngoài phạm vi rõ ràng.
  - Mỗi nút bấm CTA ở từng gói khi bấm sẽ: Cuộn xuống `#form-tu-van` và **tự động điền/chọn sẵn gói đó** trong trường "Gói quan tâm".
- **Chi tiết 3 gói:** (Xem chi tiết tại PHẦN 4).

### S08. Khối "Làm mới toàn bộ" (Redesign/Rebuild)
- **Mục đích:** Chặn hiểu nhầm kỳ vọng đối với các website quá cũ nát mà khách muốn viết lại từ đầu.
- **Vị trí:** Đặt ngay bên dưới Bảng giá.
- **Nội dung:** 
  - Tiêu đề: `Website quá cũ hoặc cần làm lại toàn bộ giao diện & tính năng?`
  - Nội dung: DUDI cung cấp giải pháp thiết kế mới toàn diện với báo giá riêng **từ 10.000.000đ** (quy trình khảo sát, wireframe, thiết kế UI độc quyền và lập trình từ đầu).
  - CTA riêng: `Yêu cầu đánh giá làm lại toàn bộ` (cuộn tới form, tự chọn gói "Làm mới toàn bộ" hoặc ghi chú).

### S09. Vì sao chọn DUDI (Cam kết uy tín)
- **Mục đích:** Xóa bỏ sự ngần ngại, gia tăng độ tin cậy.
- **Nội dung bắt buộc:**
  - **Phạm vi công việc minh bạch:** Chốt rõ làm gì, không làm gì trước khi nhận cọc/thực hiện.
  - **Kiểm tra trước - Báo giá trước:** Không bao giờ có tình trạng "làm rồi phát sinh thêm tiền".
  - **Bảo hành lỗi kỹ thuật 30 ngày:** Đối với các hạng mục do DUDI thực hiện.
  - **Người phụ trách cụ thể:** Có nhân sự kỹ thuật đồng hành trao đổi trực tiếp, không qua trung gian lòng vòng.

### S10. FAQ (8–10 Câu hỏi thường gặp dạng Accordion)
- **Mục đích:** Giải tỏa mọi thắc mắc và phản đối phổ biến của khách hàng.
- **Yêu cầu kỹ thuật:** Accordion hỗ trợ bàn phím, chuẩn thuộc tính `aria-expanded`, nội dung phải render sẵn trong HTML (tốt cho bot tìm kiếm SEO).
- **Danh sách câu hỏi & câu trả lời chuẩn:**
  1. *Giá 500k / 2tr / 5tr là thanh toán một lần hay đóng theo tháng?*  
     -> Đây là chi phí thanh toán trọn gói 1 lần cho toàn bộ hạng mục công việc trong gói đã chốt, hoàn toàn không phải phí duy trì hàng tháng.
  2. *Thời gian triển khai cho mỗi gói là bao lâu?*  
     -> Gói Cơ bản từ 1–3 ngày; Tiêu chuẩn từ 3–7 ngày; Cao cấp từ 7–14 ngày làm việc (tính từ khi nhận đủ dữ liệu và quyền truy cập).
  3. *Tôi có cần cung cấp tài khoản hosting / quản trị website không?*  
     -> Có, để sửa lỗi và cập nhật trực tiếp, DUDI cần tài khoản quản trị website (WordPress, CMS...) hoặc thông tin hosting/FTP. Mọi thông tin đều được bảo mật tuyệt đối.
  4. *Nâng cấp website có làm mất dữ liệu hoặc ảnh cũ không?*  
     -> DUDI luôn thực hiện sao lưu (backup) dữ liệu nguyên trạng trước khi thao tác, đảm bảo 100% an toàn dữ liệu hiện có của bạn.
  5. *Website sửa xong có bị ảnh hưởng thứ hạng SEO không?*  
     -> Không. DUDI giữ nguyên cấu trúc đường dẫn (URL) hiện có và chuẩn hóa lại các thẻ meta, heading giúp website thân thiện hơn với Google.
  6. *Chính sách bảo hành 30 ngày áp dụng như thế nào?*  
     -> Trong vòng 30 ngày sau bàn giao, nếu phát sinh lỗi kỹ thuật liên quan đến các hạng mục DUDI đã chỉnh sửa, chúng tôi sẽ kiểm tra và khắc phục hoàn toàn miễn phí.
  7. *Nếu tôi muốn thêm tính năng mới ngoài gói thì tính phí ra sao?*  
     -> Hai bên sẽ trao đổi cụ thể tính năng bạn muốn; DUDI sẽ báo chi phí riêng trước khi làm, chỉ triển khai khi bạn đồng ý.
  8. *DUDI có xuất hóa đơn VAT cho công ty không?*  
     -> Có. DUDI là pháp nhân doanh nghiệp (Công ty TNHH Giải Pháp Phần Mềm DUDI - MST 0319641544), sẵn sàng xuất hóa đơn VAT đầy đủ theo quy định.

### S11. Form nhận yêu cầu (Thu Lead chuẩn)
- **Mục đích:** Thu thập thông tin khách hàng đầy đủ để kỹ thuật viên kiểm tra website trước khi gọi tư vấn.
- **Chi tiết form:** (Xem chi tiết tại PHẦN 5).

### S12. CTA cuối trang (Chốt hành động)
- **Nội dung:** Lặp lại thông điệp lợi ích: "Đừng để website cũ làm mất khách hàng tiềm năng mỗi ngày".
- **CTA:** Nút `Gửi website để DUDI kiểm tra` + Nút liên hệ `Gọi Hotline 0909 163 821` / `Nhắn Zalo`.

### S13. Footer (Pháp lý & Bản quyền)
- **Nội dung:**
  - Tên công ty: Công ty TNHH Giải Pháp Phần Mềm DUDI
  - MST: 0319641544
  - Địa chỉ: 49/2 Đường 14, Phường Thủ Đức, TP. Hồ Chí Minh
  - Hotline: 0909 163 821 | Email: contact@dudisoftware.com
  - Liên kết chính sách bảo mật, điều khoản dịch vụ (mở modal hoặc trang tương ứng).

---

## PHẦN 4: NGUYÊN BẢN PHẠM VI 3 GÓI DỊCH VỤ (PRICING MATRIX)

| Tiêu chí | GÓI CƠ BẢN | GÓI TIÊU CHUẨN *(Khuyên dùng)* | GÓI CAO CẤP |
|---|---|---|---|
| **Giá/gói** | **500.000đ** | **2.000.000đ** | **5.000.000đ** |
| **Mục tiêu** | Sửa nhanh, cập nhật nội dung | Cải thiện giao diện & trải nghiệm | Nâng cấp toàn diện trong phạm vi |
| **Phù hợp** | Web đang ổn, cần chỉnh nhẹ | Web cũ, hiển thị chưa tốt | Web yếu, trải nghiệm/chuyển đổi kém |
| **Số trang áp dụng** | Tối đa **3 trang** | Tối đa **5 trang** | Tối đa **10 trang** |
| **Nội dung** | Thay nội dung khách cung cấp | Viết lại nhẹ + chỉnh bố cục | Tối ưu nội dung theo chuyển đổi trong phạm vi |
| **Giao diện** | Chỉnh nhẹ | Sửa layout từng trang hiện có | Thiết kế lại các trang chính trong phạm vi |
| **Mobile** | Fix lỗi cơ bản | Tối ưu hiển thị | Tối ưu trải nghiệm trong phạm vi |
| **Tốc độ** | Không | Cải thiện cơ bản | Tối ưu kỹ thuật sâu (không cam kết điểm tuyệt đối) |
| **SEO On-page** | Không | Title, meta, heading cơ bản | Audit + SEO on-page tối đa 10 trang |
| **Form liên hệ** | Sửa form hiện có | Cải tiến form hiện có | Thiết kế lại form / luồng thu lead |
| **Chức năng thêm** | Không thêm | Tối đa **2 chức năng nhỏ** | **1 chức năng vừa** hoặc **3 chức năng nhỏ** |
| **Kiểm tra lỗi** | Phần đã chỉnh | Các trang trong phạm vi | Toàn bộ khu vực nâng cấp |
| **Số vòng sửa** | **1 vòng** | **2 vòng** | **3 vòng** |
| **Thời gian làm việc**| **1–3 ngày làm việc** | **3–7 ngày làm việc** | **7–14 ngày làm việc** |
| **Hành động CTA** | `Chọn gói Cơ bản — 500.000đ` | `Chọn gói Tiêu chuẩn — 2.000.000đ` | `Chọn gói Cao cấp — 5.000.000đ` |

> **Điều kiện chung & Ngoại trừ:**  
> - Thời gian tính từ lúc nhận đủ nội dung, quyền truy cập và xác nhận phạm vi.  
> - Bảo hành 30 ngày đối với lỗi phát sinh từ phần DUDI đã chỉnh sửa.  
> - **Không bao gồm:** Phí gia hạn tên miền (domain), lưu trữ hosting, bản quyền plugin/theme có phí, chụp ảnh sản phẩm, viết lại toàn bộ nội dung website, nhập liệu số lượng lớn và chức năng nghiệp vụ phức tạp.

---

## PHẦN 5: ĐẶC TẢ FORM NHẬN YÊU CẦU & XỬ LÝ LEAD (FORM SPEC)

### 5.1. Danh sách các trường dữ liệu (Form Fields)

| STT | Tên trường | Tên biến (name) | Kiểu (type) | Bắt buộc | Điều kiện kiểm tra (Validation) | Placeholder / Gợi ý |
|---|---|---|---|---|---|---|
| 1 | Họ và tên | `fullName` | `text` | **Có** | 2 – 80 ký tự | "Nguyễn Văn A" |
| 2 | Số điện thoại / Zalo | `phone` | `tel` | **Có** | 9 – 12 chữ số sau khi lọc bỏ khoảng trắng; chấp nhận đầu số `+84` hoặc `0` | "0909 000 000" |
| 3 | Tên doanh nghiệp | `company` | `text` | **Có** | 2 – 120 ký tự | "Công ty ABC / Shop thời trang..." |
| 4 | Website hiện tại | `websiteUrl` | `url` | *Không* | Nếu nhập phải là URL hợp lệ; code tự bổ sung `https://` nếu khách gõ thiếu | "https://example.com" |
| 5 | Vấn đề đang gặp | `issue` | `textarea`| **Có** | 10 – 1.000 ký tự | "Web tải rất chậm và bị vỡ giao diện trên điện thoại..." |
| 6 | Gói quan tâm | `packageInterested` | `select` | **Có** | 1 trong 4 giá trị: `Cơ bản` \| `Tiêu chuẩn` \| `Cao cấp` \| `Chưa rõ` | Mặc định chọn "Chưa rõ" (hoặc tự chọn khi bấm từ bảng giá) |
| 7 | Thời gian mong muốn | `timeline` | `select` | *Không* | `Trong 3 ngày` \| `1 tuần` \| `2 tuần` \| `Chưa gấp` | Mặc định chọn "1 tuần" |
| 8 | Đồng ý liên hệ | `consent` | `checkbox`| **Có** | Phải được `checked = true` mới cho submit | "Tôi đồng ý để DUDI liên hệ tư vấn kiểm tra website" |
| 9 | Honeypot (chống spam)| `hp_company_fax` | `text` | *Ẩn* | Trường ẩn (display: none). Nếu bot điền giá trị -> Hủy request | Để trống |

### 5.2. Hành vi tương tác của Form (Form UX & Logic)
1. **Chống Double Submit:** Nút `Gửi website để DUDI kiểm tra` bị vô hiệu hóa (disabled), hiển thị biểu tượng loading (spinner) trong suốt quá trình API đang gửi dữ liệu.
2. **Xử lý lỗi Client:**
   - Hiển thị thông báo lỗi bằng tiếng Việt rõ ràng ngay phía dưới ô nhập liệu tương ứng.
   - Tự động cuộn và focus vào trường bị lỗi đầu tiên.
3. **Khi gửi thất bại:**
   - Giữ nguyên toàn bộ dữ liệu người dùng đã nhập trong form (không làm mất công điền lại).
   - Hiển thị thông báo thân thiện: *"Có lỗi xảy ra trong quá trình gửi. Bạn vui lòng thử lại hoặc bấm vào nút Zalo bên dưới để nhắn tin trực tiếp."* (Không hiển thị lỗi kỹ thuật nhạy cảm).
4. **Khi gửi thành công:**
   - Hiển thị màn hình/khối thành công với nội dung chuẩn:
     > *"DUDI đã nhận thông tin. Bên mình sẽ kiểm tra website và liên hệ lại qua số điện thoại/Zalo bạn cung cấp trong vòng 1–2 giờ làm việc."*
   - Cung cấp sẵn 2 nút hành động nhanh:
     - Nút `Nhắn tin Zalo ngay` (`https://zalo.me/0909163821`)
     - Nút `Gọi Hotline: 0909 163 821` (`tel:0909163821`)
5. **Thu thập Metadata tự động kèm lead:**
   - Timestamp thời điểm gửi (ISO string).
   - Đường dẫn trang (`page_path`, `referrer`).
   - Các tham số chiến dịch tiếp thị UTM: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`.

---

## PHẦN 6: YÊU CẦU KỸ THUẬT & CHỨC NĂNG (F01 - F07)

- **F01 (Điều hướng Anchor):** Tất cả các nút bấm CTA trên Top Header, Hero, giữa trang và Footer khi click đều cuộn mượt đến đúng vị trí form `#form-tu-van` mà không bị thanh header che khuất (dùng `scroll-mt-24`).
- **F02 (Liên kết liên hệ thực):** Nút gọi dùng `tel:0909163821`, nút Zalo mở đúng link chat chính thức `https://zalo.me/0909163821`, email dùng `mailto:contact@dudisoftware.com`. Tuyệt đối không để link rỗng `#` hoặc link lỗi.
- **F03 (Tự động điền gói từ Bảng giá):** Bấm nút chọn gói ở bất kỳ card giá nào trong section S07 sẽ vừa cuộn xuống form, vừa tự động gán giá trị gói đó vào ô `packageInterested`.
- **F04 (Accordion FAQ thân thiện SEO & A11y):** Đóng mở mượt mà, hỗ trợ phím Tab/Enter, `aria-expanded` cập nhật đúng, nội dung text nằm sẵn trong mã nguồn HTML.
- **F05 (API Xử lý Lead an toàn):** Tạo route Next.js API `/api/lead` nhận POST request, validate dữ liệu đầu vào phía server, sanitize chuỗi tránh XSS/SQL Injection, lưu log lead vào file JSON/Database hoặc gửi Webhook.
- **F06 (Tracking sự kiện không tốn phí):** Tích hợp hàm đẩy event vào `window.dataLayer` cho các sự kiện: `cta_click`, `zalo_click`, `phone_click`, `package_select`, `form_start`, `form_submit`, `form_success`, `form_error`.
- **F07 (Bảo mật & Performance):** Chạy trên HTTPS, không để lộ API key hay secret trong client code, tối ưu Core Web Vitals (LCP <= 2.5s, CLS <= 0.1, INP <= 200ms).

---

## PHẦN 7: BẢN ĐỒ CẤU TRÚC CODE & CÁC FILE CẦN THIẾT LẬP

Để triển khai chuẩn mực cho dự án Next.js hiện tại, các file sẽ được tổ chức như sau:

```text
d:\Career\DUDI_LandingPage/
├── docs/
│   ├── DUDI_LandingPage.docx       # Tài liệu gốc
│   └── DUDI_LANDING_PAGE_SPEC.md   # [FILE NÀY] Đặc tả tổng hợp toàn diện
├── public/
│   ├── images/
│   │   ├── logo-dudi.svg           # Logo thương hiệu DUDI
│   │   └── og-banner.png           # Ảnh chia sẻ mạng xã hội (1200x630)
│   ├── favicon.ico
│   └── robots.txt / sitemap.xml
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── lead/
│   │   │       └── route.js        # API xử lý nhận lead, validate, chống spam & lưu trữ
│   │   ├── globals.css             # Tailwind v4, biến màu Đỏ DUDI, typography
│   │   ├── layout.js               # Root layout, chuẩn hóa SEO, OG, Schema JSON-LD
│   │   └── page.js                 # Ghép nối đầy đủ 13 Section S01 -> S13
│   ├── components/
│   │   ├── sections/
│   │   │   ├── S01_Navbar.js       # Header logo, hotline, Zalo, CTA
│   │   │   ├── S02_Hero.js         # H1, giá từ 500k, CTA kép, preview
│   │   │   ├── S03_Problems.js     # 6 dấu hiệu cần nâng cấp
│   │   │   ├── S04_Solutions.js    # 8 giải pháp của DUDI
│   │   │   ├── S05_CaseStudies.js  # 2 case thực tế: Bao bì (11.5tr) & Du lịch (3.5tr)
│   │   │   ├── S06_Process.js      # Quy trình 6 bước rõ ràng
│   │   │   ├── S07_Pricing.js      # 3 gói 500k / 2tr / 5tr (Nhãn GIÁ/GÓI)
│   │   │   ├── S08_RebuildBanner.js# Khối làm mới toàn bộ từ 10 triệu
│   │   │   ├── S09_WhyUs.js        # Cam kết minh bạch, bảo hành 30 ngày
│   │   │   ├── S10_FAQ.js          # 8 câu hỏi accordion
│   │   │   ├── S11_LeadForm.js     # Form nhận yêu cầu đầy đủ logic & validation
│   │   │   ├── S12_BottomCTA.js    # Khối kêu gọi hành động cuối trang
│   │   │   └── S13_Footer.js       # Thông tin pháp nhân DUDI, MST, liên hệ
│   │   ├── ui/                     # Button, Card, Badge, Accordion, Input, Select...
│   │   └── common/                 # Container, SectionHeading
│   ├── constants/
│   │   ├── site-config.js          # Thông tin pháp lý DUDI, MST, Hotline, Zalo, Email
│   │   └── landing-content.js      # Toàn bộ text copy chuẩn 100% theo đặc tả
│   ├── hooks/
│   │   └── useScrollPosition.js    # Hook hỗ trợ sticky navbar
│   └── lib/
│       ├── utils.js                # Helper gộp class Tailwind (cn)
│       └── tracking.js             # Tiện ích phát sự kiện dataLayer tracking miễn phí
```

---

## PHẦN 8: CHECKLIST KIỂM THỬ ĐẦU RA (DEFINITION OF DONE - DoD)

Mỗi khi thực hiện xong, kiểm tra theo checklist 8 điểm:
- [ ] **Đủ 13 section:** Không thiếu bất kỳ khu vực nào từ S01 đến S13.
- [ ] **Bảng giá chuẩn:** Bắt buộc ghi "GIÁ/GÓI", không có chữ "giá/tháng", gói Tiêu chuẩn nổi bật nhất, nút chọn gói tự điền vào Form.
- [ ] **Khối làm mới riêng:** Có khối báo giá riêng từ 10 triệu cho nhu cầu làm lại toàn bộ.
- [ ] **Số liệu thật:** Tuyệt đối không dùng số liệu ảo (150+, 50+...). Đúng 2 case study: Bao bì 11,5tr và Du lịch 3,5tr.
- [ ] **Form hoạt động hoàn hảo:** Validate đủ các trường, không mất dữ liệu khi lỗi, chống click đúp, chống spam, có thông báo thành công và hỗ trợ liên hệ Zalo/Hotline ngay.
- [ ] **Liên kết hoạt động:** Bấm gọi đúng số `0909163821`, mở Zalo đúng chat, email đúng `contact@dudisoftware.com`.
- [ ] **Chuẩn pháp lý:** Tên công ty: Công ty TNHH Giải Pháp Phần Mềm DUDI, MST: 0319641544, địa chỉ Thủ Đức.
- [ ] **Build thành công:** `npm run build` không phát sinh bất kỳ lỗi nào.
