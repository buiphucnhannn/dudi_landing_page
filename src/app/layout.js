import { Geist, Geist_Mono, Caveat } from "next/font/google";
import { siteConfig } from "@/constants/site-config";
import { faqContent } from "@/constants/landing-content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://dudisoftware.com"),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "sửa website cũ",
    "nâng cấp website doanh nghiệp",
    "cập nhật website",
    "tối ưu tốc độ website",
    "sửa lỗi mobile website",
    "DUDI Software",
  ],
  authors: [{ name: siteConfig.companyName, url: "https://dudisoftware.com" }],
  creator: siteConfig.companyName,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "https://dudisoftware.com",
    siteName: siteConfig.companyName,
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/dudi/dudisoftware1.webp",
        width: 1200,
        height: 630,
        alt: "DUDI Software - Dịch vụ sửa & nâng cấp website cũ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/dudi/dudisoftware1.webp"],
  },
  icons: {
    icon: "/dudi/dudisoftware1.webp",
    apple: "/dudi/dudisoftware1.webp",
  },
};

export default function RootLayout({ children }) {
  // Schema JSON-LD cho Organization, Service và FAQPage (SEO-05)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://dudisoftware.com/#organization",
        name: siteConfig.companyName,
        url: "https://dudisoftware.com",
        logo: "https://dudisoftware.com/dudi/dudisoftware1.webp",
        taxID: siteConfig.taxId,
        telephone: siteConfig.hotline,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "49/2 Đường 14",
          addressLocality: "Thủ Đức",
          addressRegion: "Hồ Chí Minh",
          addressCountry: "VN",
        },
      },
      {
        "@type": "Service",
        "@id": "https://dudisoftware.com/#service",
        name: "Dịch vụ cập nhật & nâng cấp website doanh nghiệp",
        provider: { "@id": "https://dudisoftware.com/#organization" },
        description: siteConfig.description,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "VND",
          lowPrice: "500000",
          highPrice: "5000000",
          offerCount: "3",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://dudisoftware.com/#faq",
        mainEntity: faqContent.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
