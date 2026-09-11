import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/lib/resume";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Needed so the OG image resolves to an absolute URL. Set NEXT_PUBLIC_SITE_URL
 * in your host; Netlify's `URL` and Vercel's `VERCEL_URL` are picked up
 * automatically.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  "http://localhost:3000";

const title = `${profile.name} — ${profile.role}`;
const description =
  "Backend-focused full-stack developer in Malaysia. ~5 years building LLM pipelines, event-driven AWS systems and high-traffic APIs. Career shown as a distributed trace.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: profile.service,
  authors: [{ name: profile.name, url: profile.github }],
  keywords: [
    "backend developer",
    "full-stack developer",
    "Node.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "AWS",
    "Malaysia",
    "LLM",
    "Luqman Haqeem",
  ],
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: "profile",
    locale: "en_MY",
    siteName: profile.service,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phoneHref,
  url: profile.github,
  sameAs: [profile.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Selangor",
    addressRegion: "Selangor",
    addressCountry: "MY",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Selangor Islamic University",
  },
  knowsAbout: [
    "Node.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "AWS",
    "Distributed systems",
    "LLM integration",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#trace"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to career trace
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
