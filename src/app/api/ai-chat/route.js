import { AI_PROVIDER, GEMINI_API_KEY, OPENAI_API_KEY, AI_MAX_HISTORY } from "@/lib/ai/config";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import {
  classifyLocalIntent,
  extractCustomerPhone,
  getBusinessDomainsResponse,
  getCompanyIntroResponse,
  getContactInfoResponse,
  getIdentityResponse,
  getOffTopicResponse,
  getPhoneReceivedHandoffResponse,
  getPricingHandoffResponse,
  getServiceOverviewResponse,
  getSmallTalkResponse,
  getWorkHoursResponse,
  getExperienceResponse,
  getProcessResponse,
  getWarrantyResponse,
  getUiUxResponse,
  getCloudDevopsResponse,
  getProjectInspiredConsultationResponse,
  getProjectExampleClarificationResponse,
  getProjectExampleScope,
  getNoProjectDataResponse,
  HOTLINE,
} from "@/lib/ai/rules";
import { searchKnowledge, extractProjects, formatProjectExamplesResponse, loadKnowledgeDocs } from "@/lib/ai/knowledge";
import { buildSystemPrompt } from "@/lib/ai/prompt";
import { generateWithGemini, generateWithOpenAI } from "@/lib/ai/llm";

export const dynamic = "force-dynamic";

function summarizeHistory(history = []) {
  return (history || [])
    .slice(-6)
    .map((m) => `${m.role === "user" ? "KhÃ¡ch" : "DU"}: ${String(m.content || "").slice(0, 200)}`)
    .join("\n");
}

function localFallbackAnswer(message, chunks) {
  const small = getSmallTalkResponse(message);
  if (small) return { reply: small, provider: "rule", model: "smalltalk" };
  if (chunks?.length) {
    const top = chunks[0];
    const snippet = top.content.replace(/^#+\s+/gm, "").slice(0, 500);
    return {
      reply: [
        `Dáº¡, vá» cÃ¢u há»i cá»§a anh/chá»‹, DUDI Software xin chia sáº» thÃ´ng tin tá»« tÃ i liá»‡u **${top.title}**:`,
        "",
        snippet,
        "",
        `Anh/chá»‹ cáº§n tÆ° váº¥n giáº£i phÃ¡p chi tiáº¿t hoáº·c bÃ¡o giÃ¡ dá»± Ã¡n, vui lÃ²ng Ä‘á»ƒ láº¡i sá»‘ Ä‘iá»‡n thoáº¡i hoáº·c liÃªn há»‡ Hotline **${HOTLINE}** Ä‘á»ƒ chuyÃªn viÃªn há»— trá»£ ngay áº¡!`,
      ].join("\n"),
      provider: "local-knowledge",
      model: "keyword-search",
    };
  }
  return {
    reply: "Dáº¡, em lÃ  DU - Trá»£ lÃ½ AI cá»§a DUDI Software. Em cÃ³ thá»ƒ há»— trá»£ anh/chá»‹ tÆ° váº¥n vá» giáº£i phÃ¡p ká»¹ thuáº­t, thiáº¿t káº¿ website, á»©ng dá»¥ng di Ä‘á»™ng, tÃ­ch há»£p API hoáº·c cung cáº¥p báº£ng giÃ¡ tham kháº£o chi tiáº¿t áº¡!",
    provider: "local-knowledge",
    model: "default",
  };
}

export async function GET() {
  const docs = loadKnowledgeDocs();
  return Response.json({
    status: "ok",
    provider: AI_PROVIDER,
    hasGeminiKey: Boolean(GEMINI_API_KEY),
    hasOpenAIKey: Boolean(OPENAI_API_KEY),
    knowledgeDocs: docs.length,
    services: 8,
  });
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const message = String(body?.message || "").trim();
    const sessionId = String(body?.sessionId || request.headers.get("x-forwarded-for") || "anon").slice(0, 80);
    const history = Array.isArray(body?.history) ? body.history.slice(-AI_MAX_HISTORY) : [];

    if (!message) return Response.json({ error: "Vui lÃ²ng nháº­p tin nháº¯n." }, { status: 400 });
    if (message.length > 2000) return Response.json({ error: "Tin nháº¯n tá»‘i Ä‘a 2000 kÃ½ tá»±." }, { status: 400 });

    const rl = checkRateLimit(sessionId || "global");
    if (!rl.allowed) {
      return Response.json(
        { error: `Báº¡n gá»­i tin nháº¯n quÃ¡ nhanh. Vui lÃ²ng thá»­ láº¡i sau ${rl.retryAfterSec}s.` },
        { status: 429 }
      );
    }

    // 1) Rule fast-path & Policies (Ä‘á»“ng bá»™ 100% theo AI_CHATBOX)
    const intent = classifyLocalIntent(message);

    if (intent.type === "pricing_phone_received" && intent.phone) {
      return Response.json({
        reply: getPhoneReceivedHandoffResponse(intent.phone),
        provider: "rule",
        model: "pricing-phone-received",
      });
    }

    if (intent.type === "off_topic") {
      return Response.json({ reply: getOffTopicResponse(message), provider: "rule", model: "off-topic" });
    }

    if (intent.type === "identity") {
      return Response.json({ reply: getIdentityResponse(), provider: "rule", model: "identity" });
    }

    if (intent.type === "contact") {
      return Response.json({ reply: getContactInfoResponse(), provider: "rule", model: "contact" });
    }

    if (intent.type === "company_intro") {
      return Response.json({ reply: getCompanyIntroResponse(), provider: "rule", model: "company-intro" });
    }

    if (intent.type === "work_hours") {
      return Response.json({ reply: getWorkHoursResponse(), provider: "rule", model: "work-hours" });
    }

    if (intent.type === "experience") {
      return Response.json({ reply: getExperienceResponse(), provider: "rule", model: "experience" });
    }

    if (intent.type === "process") {
      return Response.json({ reply: getProcessResponse(), provider: "rule", model: "process" });
    }

    if (intent.type === "warranty") {
      return Response.json({ reply: getWarrantyResponse(), provider: "rule", model: "warranty" });
    }

    if (intent.type === "ui_ux") {
      return Response.json({ reply: getUiUxResponse(), provider: "rule", model: "ui-ux" });
    }

    if (intent.type === "cloud_devops") {
      return Response.json({ reply: getCloudDevopsResponse(), provider: "rule", model: "cloud-devops" });
    }

    if (intent.type === "service_overview") {
      return Response.json({ reply: getServiceOverviewResponse(), provider: "rule", model: "service-overview" });
    }

    if (intent.type === "business_domains") {
      return Response.json({ reply: getBusinessDomainsResponse(), provider: "rule", model: "business-domains" });
    }

    if (intent.type === "platform_consultation") {
      return Response.json({
        reply: getProjectInspiredConsultationResponse(message),
        provider: "rule",
        model: "platform-consultation",
      });
    }

    if (intent.type === "pricing_general") {
      return Response.json({ reply: getPricingHandoffResponse(), provider: "rule", model: "pricing" });
    }

    const smallTalk = getSmallTalkResponse(message);
    if (smallTalk && message.length < 30) {
      return Response.json({ reply: smallTalk, provider: "rule", model: "smalltalk" });
    }

    // SÄT rá»i gá»­i vÃ o chat
    const phoneOnly = extractCustomerPhone(message);
    if (phoneOnly && message.replace(/[^\d+]/g, "").length >= 9 && message.length < 40) {
      return Response.json({
        reply: getPhoneReceivedHandoffResponse(phoneOnly),
        provider: "rule",
        model: "pricing-phone-received",
      });
    }

    // 2) Xá»­ lÃ½ yÃªu cáº§u xem dá»± Ã¡n máº«u chuáº©n theo AI_CHATBOX
    if (intent.type === "project_examples") {
      const scope = getProjectExampleScope(message);
      if (!scope) {
        // KhÃ¡ch chÆ°a nÃ³i rÃµ ngÃ nh nghá» -> Gá»­i cÃ¢u há»i Ä‘á»‹nh hÆ°á»›ng lá»c máº«u chuáº©n
        return Response.json({
          reply: getProjectExampleClarificationResponse(),
          provider: "rule",
          model: "project-example-clarification",
        });
      }

      // KhÃ¡ch Ä‘Ã£ cÃ³ ngÃ nh nghá» -> TÃ¬m kiáº¿m dá»± Ã¡n thá»±c táº¿ trong kho tri thá»©c
      const projectChunks = searchKnowledge(scope.query || message, 8);
      const projects = extractProjects(projectChunks, 5);
      if (projects.length > 0) {
        return Response.json({
          reply: formatProjectExamplesResponse(projects, scope.label),
          provider: "rule",
          model: "project-examples",
        });
      }

      return Response.json({
        reply: getNoProjectDataResponse(scope.label),
        provider: "rule",
        model: "project-examples-empty",
      });
    }

    // 3) RAG Engine: TrÃ­ch xuáº¥t tri thá»©c bÃ¡m sÃ¡t cÃ¢u há»i
    const chunks = searchKnowledge(message, 4);
    const retrievedContext = chunks
      .map((c, i) => `[TÃ i liá»‡u ${i + 1}: ${c.title} â€” ${c.category}]\n${c.content}`)
      .join("\n\n");

    const systemPrompt = buildSystemPrompt({
      retrievedContext,
      conversationSummary: summarizeHistory(history),
    });

    // 4) Gá»i LLM (Gemini / OpenAI)
    const wantProvider = AI_PROVIDER === "openai" && OPENAI_API_KEY ? "openai" : AI_PROVIDER;
    try {
      if ((wantProvider === "gemini" || !wantProvider) && GEMINI_API_KEY) {
        const out = await generateWithGemini({ systemPrompt, history, userMessage: message });
        return Response.json({ reply: out.text, provider: "gemini", model: out.model });
      }
      if (wantProvider === "openai" && OPENAI_API_KEY) {
        const out = await generateWithOpenAI({ systemPrompt, history, userMessage: message });
        return Response.json({ reply: out.text, provider: "openai", model: out.model });
      }
    } catch (e) {
      console.warn("[ai-chat] LLM chÃ­nh lá»—i, thá»­ fallback:", e?.message || e);
      try {
        if (GEMINI_API_KEY && wantProvider === "openai") {
          const out = await generateWithGemini({ systemPrompt, history, userMessage: message });
          return Response.json({ reply: out.text, provider: "gemini", model: out.model });
        }
        if (OPENAI_API_KEY && wantProvider !== "openai") {
          const out = await generateWithOpenAI({ systemPrompt, history, userMessage: message });
          return Response.json({ reply: out.text, provider: "openai", model: out.model });
        }
      } catch (e2) {
        console.warn("[ai-chat] Fallback provider cÅ©ng lá»—i:", e2?.message || e2);
      }
    }

    // 5) Local fallback náº¿u LLM khÃ´ng pháº£n há»“i
    const fb = localFallbackAnswer(message, chunks);
    return Response.json(fb);
  } catch (error) {
    console.error("[ai-chat] error:", error);
    return Response.json({ error: "Lá»—i xá»­ lÃ½, vui lÃ²ng thá»­ láº¡i sau Ã­t phÃºt." }, { status: 500 });
  }
}

