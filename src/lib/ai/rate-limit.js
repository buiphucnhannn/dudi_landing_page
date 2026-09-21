// Rate limit nhẹ trong bộ nhớ: 15 req/phút cho mỗi sessionId/IP (port từ AI_CHATBOX rate-limit.ts).
import { AI_RATE_LIMIT_PER_MIN } from "./config.js";

const buckets = new Map(); // key -> number[] timestamps

export function checkRateLimit(key = "global") {
  const now = Date.now();
  const windowMs = 60_000;
  const limit = AI_RATE_LIMIT_PER_MIN;
  const arr = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) {
    const retryAfterSec = Math.ceil((arr[0] + windowMs - now) / 1000);
    return { allowed: false, retryAfterSec };
  }
  arr.push(now);
  buckets.set(key, arr);
  return { allowed: true };
}
