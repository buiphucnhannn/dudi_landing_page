// Gọi LLM qua REST fetch (không cần SDK): ưu tiên Gemini, fallback OpenAI.
// Port luồng provider từ AI_CHATBOX/src/lib/ai/client.ts + messages/route.ts (bản gọn, non-stream).
import {
  GEMINI_API_KEY,
  GEMINI_CHAT_MODEL,
  GEMINI_FALLBACK_MODELS,
  OPENAI_API_KEY,
  OPENAI_CHAT_MODEL,
} from "./config.js";

function toGeminiContents(history = [], userMessage = "") {
  const contents = [];
  for (const m of history) {
    if (m.role !== "user" && m.role !== "assistant") continue;
    const role = m.role === "user" ? "user" : "model";
    const text = String(m.content || "").slice(0, 4000);
    if (!text.trim()) continue;
    if (contents.length && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += "\n" + text;
    } else {
      contents.push({ role, parts: [{ text }] });
    }
  }
  const lastUser = String(userMessage || "").slice(0, 4000);
  if (!contents.length || contents[contents.length - 1].role !== "user") {
    contents.push({ role: "user", parts: [{ text: lastUser }] });
  }
  if (contents.length && contents[0].role === "model") contents.shift();
  return contents;
}

async function callGeminiModel(model, systemPrompt, contents, timeoutMs = 30000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 4096,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
        signal: controller.signal,
      }
    );
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Gemini ${model} HTTP ${res.status}: ${errText.slice(0, 300)}`);
    }
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
    if (!text.trim()) throw new Error(`Gemini ${model} trả về rỗng`);
    return { text: text.trim(), model };
  } finally {
    clearTimeout(t);
  }
}

export async function generateWithGemini({ systemPrompt, history, userMessage }) {
  if (!GEMINI_API_KEY) throw new Error("Thiếu GEMINI_API_KEY");
  const contents = toGeminiContents(history, userMessage);
  let lastErr = null;
  for (const model of GEMINI_FALLBACK_MODELS.length ? GEMINI_FALLBACK_MODELS : [GEMINI_CHAT_MODEL]) {
    try {
      return await callGeminiModel(model, systemPrompt, contents);
    } catch (e) {
      console.warn(`[ai-chat] Gemini model ${model} lỗi:`, e.message);
      lastErr = e;
    }
  }
  throw lastErr || new Error("Gemini thất bại");
}

export async function generateWithOpenAI({ systemPrompt, history, userMessage, timeoutMs = 30000 }) {
  if (!OPENAI_API_KEY) throw new Error("Thiếu OPENAI_API_KEY");
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const messages = [{ role: "system", content: systemPrompt }];
    for (const m of (history || []).slice(-10)) {
      if (m.role === "user" || m.role === "assistant") {
        messages.push({ role: m.role === "user" ? "user" : "assistant", content: String(m.content || "").slice(0, 4000) });
      }
    }
    messages.push({ role: "user", content: String(userMessage || "").slice(0, 4000) });
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_API_KEY}` },
      body: JSON.stringify({ model: OPENAI_CHAT_MODEL, messages, temperature: 0.4, max_tokens: 1024 }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`OpenAI HTTP ${res.status}: ${errText.slice(0, 300)}`);
    }
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "";
    if (!text.trim()) throw new Error("OpenAI trả về rỗng");
    return { text: text.trim(), model: OPENAI_CHAT_MODEL };
  } finally {
    clearTimeout(t);
  }
}
