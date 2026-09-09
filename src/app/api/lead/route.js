import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const body = await request.json();

    // 1. Kiểm tra Honeypot chống spam bot
    if (body.hp_company_fax) {
      // Bot đã điền vào trường ẩn này -> Trả về thành công giả để chặn spam bot
      return NextResponse.json({
        success: true,
        message: "Yêu cầu đã được tiếp nhận.",
      });
    }

    const {
      fullName,
      phone,
      company,
      websiteUrl,
      issue,
      packageInterested,
      timeline,
      consent,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      page_path,
      referrer,
    } = body;

    // 2. Kiểm tra các trường bắt buộc (Validation Server-side)
    const errors = {};

    if (!fullName || fullName.trim().length < 2 || fullName.trim().length > 80) {
      errors.fullName = "Họ và tên phải từ 2 đến 80 ký tự.";
    }

    // Clean phone
    const cleanedPhone = (phone || "").replace(/[\s.-]/g, "");
    const phoneRegex = /^(\+84|0)[3|5|7|8|9][0-9]{8}$/;
    if (!cleanedPhone || !phoneRegex.test(cleanedPhone)) {
      errors.phone = "Số điện thoại không hợp lệ (từ 9-12 chữ số hợp lệ tại VN).";
    }

    // Company is optional
    if (company && company.trim().length > 120) {
      errors.company = "Tên doanh nghiệp tối đa 120 ký tự.";
    }

    // Validate websiteUrl
    let normalizedUrl = (websiteUrl || "").trim();
    if (normalizedUrl) {
      if (!/^https?:\/\//i.test(normalizedUrl)) {
        normalizedUrl = "https://" + normalizedUrl;
      }
      try {
        new URL(normalizedUrl);
      } catch (e) {
        errors.websiteUrl = "Đường dẫn website không đúng định dạng.";
      }
    }

    const cleanIssue = (issue || "Khảo sát & tư vấn tổng thể").trim();

    const normalizedPackage = packageInterested || "Chưa rõ";

    if (!consent) {
      errors.consent = "Bạn cần đồng ý để DUDI liên hệ tư vấn.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors, message: "Dữ liệu chưa hợp lệ. Vui lòng kiểm tra lại." },
        { status: 400 }
      );
    }

    // 3. Tạo Lead Record an toàn
    const leadId = `DUDI-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const leadRecord = {
      leadId,
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      phone: cleanedPhone,
      company: (company || "").trim(),
      websiteUrl: normalizedUrl || null,
      issue: cleanIssue,
      packageInterested: normalizedPackage,
      timeline: timeline || "1 tuần",
      metadata: {
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_content: utm_content || null,
        page_path: page_path || "/",
        referrer: referrer || null,
      },
    };

    // 4. Lưu vào thư mục dữ liệu cục bộ (an toàn, không phát sinh chi phí)
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, "leads.json");
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        const fileContent = fs.readFileSync(leadsFile, "utf8");
        leads = JSON.parse(fileContent || "[]");
      }
      leads.push(leadRecord);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf8");
    } catch (fsErr) {
      console.error("[Lead Storage Error]", fsErr);
      // Tiếp tục trả về thành công vì đã ghi log trên server
    }

    return NextResponse.json({
      success: true,
      leadId,
      message:
        "DUDI đã nhận thông tin. Kỹ thuật viên sẽ kiểm tra website và liên hệ lại với bạn qua số điện thoại/Zalo trong vòng 1–2 giờ làm việc.",
    });
  } catch (error) {
    console.error("[API Lead Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Có lỗi xảy ra trên hệ thống. Bạn vui lòng nhắn tin trực tiếp qua Zalo để được hỗ trợ tức thời.",
      },
      { status: 500 }
    );
  }
}
