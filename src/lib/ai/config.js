// Cấu hình AI provider cho widget AI DU (port gọn từ AI_CHATBOX/src/lib/ai/client.ts)
// Không cần thêm dependency: gọi Gemini / OpenAI qua fetch REST.

export const AI_PROVIDER = process.env.AI_PROVIDER || "gemini";

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
export const GEMINI_CHAT_MODEL = process.env.GEMINI_CHAT_MODEL || "gemini-3.6-flash";
export const GEMINI_FALLBACK_MODELS = Array.from(
  new Set(
    [
      GEMINI_CHAT_MODEL,
      ...(process.env.GEMINI_FALLBACK_MODELS
        ? process.env.GEMINI_FALLBACK_MODELS.split(",").map((m) => m.trim()).filter(Boolean)
        : ["gemini-3.6-flash", "gemini-2.5-flash"]),
    ].filter(Boolean)
  )
);

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
export const OPENAI_CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";

export const AI_MAX_HISTORY = Number(process.env.AI_MAX_HISTORY || 10);
export const AI_RATE_LIMIT_PER_MIN = Number(process.env.AI_RATE_LIMIT_PER_MIN || 20);
