/**
 * Utility theo dõi sự kiện tương tác không mất phí qua dataLayer
 * Phù hợp tích hợp với Google Tag Manager (GTM) hoặc GA4
 */
export function trackEvent(eventName, properties = {}) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...properties,
    });
    // Log trong console môi trường dev để dễ kiểm tra
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Tracking Event] ${eventName}:`, properties);
    }
  }
}
