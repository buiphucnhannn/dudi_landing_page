// Chuẩn hoá tiếng Việt để so khớp rule / tìm kiếm knowledge (port từ off-topic.ts, pricing-policy.ts)

export function normalizeVi(input = "") {
  return String(input || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}$₫€]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenizeVi(input = "") {
  return normalizeVi(input).split(" ").filter(Boolean);
}
