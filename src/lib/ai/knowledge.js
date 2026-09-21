// Loader + tìm kiếm keyword trên kho tri thức markdown (thay cho Mongo vector search).
// File md có cấu trúc: "# Tiêu đề" + "- **Danh mục**:" + "---" + nội dung.
import fs from "fs";
import path from "path";
import { normalizeVi } from "./normalize.js";

const KNOWLEDGE_DIR = path.join(process.cwd(), "src", "data", "ai-knowledge");

let cache = null;

function parseMarkdownFile(filePath, fileName) {
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split("\n");
  const titleLine = lines.find((l) => l.startsWith("# ")) || "";
  const title = titleLine.replace(/^#\s*/, "").trim() || fileName;
  const catLine = lines.find((l) => l.includes("Danh mục")) || "";
  const category = (catLine.split(":")[1] || "").replace(/\*/g, "").trim() || "Kiến thức";
  const sepIdx = lines.findIndex((l) => l.trim() === "---");
  const content = (sepIdx >= 0 ? lines.slice(sepIdx + 1) : lines).join("\n").trim();
  return { id: fileName, title, category, content, raw };
}

export function loadKnowledgeDocs() {
  if (cache) return cache;
  try {
    if (!fs.existsSync(KNOWLEDGE_DIR)) return [];
    const files = fs.readdirSync(KNOWLEDGE_DIR).filter((f) => f.endsWith(".md")).sort();
    cache = files.map((f) => parseMarkdownFile(path.join(KNOWLEDGE_DIR, f), f));
    return cache;
  } catch {
    return [];
  }
}

const STOP_WORDS = new Set([
  "toi", "muon", "lam", "minh", "can", "cho", "la", "va", "co", "cua", "cac", "nhung",
  "voi", "nay", "do", "thi", "duoc", "gi", "ra", "sao", "the", "nao", "o", "trong",
  "mot", "hai", "ve", "de", "hay", "xin", "hoi"
]);

// Chấm điểm thông minh: lọc stopword, ưu tiên tiêu đề và chuyên mục, cộng điểm cụm từ
export function searchKnowledge(query = "", topK = 4) {
  const docs = loadKnowledgeDocs();
  if (!docs.length || !query.trim()) return [];
  const qNorm = normalizeVi(query);
  const rawTokens = qNorm.split(" ").filter((t) => t.length > 1);
  const qMeaningfulTokens = rawTokens.filter((t) => !STOP_WORDS.has(t));
  const qTokens = new Set(qMeaningfulTokens.length ? qMeaningfulTokens : rawTokens);
  if (!qTokens.size) return [];

  const scored = docs.map((doc) => {
    const tNorm = normalizeVi(doc.title);
    const cNorm = normalizeVi(doc.category);
    const bodyNorm = normalizeVi(doc.content.slice(0, 4000));
    
    const tTokens = new Set(tNorm.split(" ").filter(Boolean));
    const cTokens = new Set(cNorm.split(" ").filter(Boolean));
    const bTokens = new Set(bodyNorm.split(" ").filter(Boolean));

    let score = 0;
    let overlap = 0;

    for (const t of qTokens) {
      if (tTokens.has(t)) {
        score += 8;
        overlap += 1;
      }
      if (cTokens.has(t)) {
        score += 5;
        overlap += 1;
      }
      if (bTokens.has(t)) {
        score += 1;
        overlap += 1;
      }
    }

    // Bonus cụm từ nguyên văn trong tiêu đề & nội dung
    if (qNorm.length > 5) {
      if (tNorm.includes(qNorm)) score += 25;
      else if (bodyNorm.includes(qNorm)) score += 10;
    }

    // Bonus từ khóa ngành nghề trọng tâm nếu xuất hiện ở tiêu đề
    const domainKeywords = [
      "o to", "thoi trang", "thuc pham", "landing page", "thu cung", "phap luat",
      "du lich", "bat dong san", "do gia dung", "cay canh", "dich vu", "giao hang",
      "lam dep", "e learning", "logistics", "xay dung", "nha khoa", "nha hang",
      "noi that", "portfolio", "the thao", "booking", "ban hang", "giat ui",
      "media", "dien lanh", "gia cong", "tai chinh", "cong nghe", "tuyen dung",
      "khach san", "suc khoe", "bao tri", "nang cap", "seo", "white label"
    ];

    for (const kw of domainKeywords) {
      if (qNorm.includes(kw) && (tNorm.includes(kw) || cNorm.includes(kw))) {
        score += 30;
      }
    }

    return { ...doc, score, overlap };
  });

  return scored
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((d) => ({
      id: d.id,
      title: d.title,
      category: d.category,
      content: d.content.slice(0, 2200),
      score: d.score,
    }));
}

// Trích dự án "Dự án X / URL / Mô tả" từ chunk knowledge (port project-parser.ts, bản gọn).
export function extractProjects(chunks = [], limit = 5) {
  const projects = [];
  const blockRe = /Dự án\s+([^\n:]+):?\s*\n\s*-\s*URL\s*\/\s*Link:\s*([^\s\n]+)\s*\n\s*-\s*Mô tả[^:]*:\s*([^\n]+(?:\n(?!-?\s*URL|\d+\.\s*Dự án)[^\n]*)*)/g;
  for (const c of chunks) {
    const text = c.content || "";
    let m;
    // reset regex per chunk
    const re = new RegExp(blockRe.source, "g");
    while ((m = re.exec(text)) !== null && projects.length < limit * 2) {
      const title = (m[1] || "").trim().slice(0, 120);
      const url = (m[2] || "").trim();
      const desc = (m[3] || "").replace(/\s+/g, " ").trim().slice(0, 300);
      if (title && url.startsWith("http")) projects.push({ title, url, description: desc, from: c.title });
    }
  }
  // khử trùng theo url
  const seen = new Set();
  return projects.filter((p) => (seen.has(p.url) ? false : (seen.add(p.url), true))).slice(0, limit);
}

export function formatProjectExamplesResponse(projects = [], topicLabel = "") {
  const formatted = projects
    .slice(0, 5)
    .map(
      (p, idx) =>
        `📌 ${idx + 1}. Dự án ${p.title}\n🌐 Website: ${p.url}\n📝 Mô tả chi tiết: ${p.description}`
    )
    .join("\n\n");
  const header = topicLabel
    ? `Có ạ. Đây là một số dự án **${topicLabel}** phù hợp để anh/chị tham khảo:`
    : "Có ạ. Đây là một số dự án tiêu biểu phù hợp để anh/chị tham khảo:";
  return `${header}\n\n${formatted}\n\nAnh/chị thích mẫu nào nhất, hoặc muốn lấy phần nào làm hướng tham khảo: giao diện, luồng đặt hàng, quản trị hay tích hợp hệ thống ạ?`;
}
