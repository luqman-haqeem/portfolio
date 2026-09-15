import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { profile } from "@/lib/resume";
import { siteUrl } from "@/lib/site";
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
 * Display face. Geist is Vercel's own typeface and ships in `create-next-app`,
 * so on a Next.js site it is the one thing identifiable as generated from a
 * thumbnail. Geist stays for body and mono — a sans body is nobody's tell, and
 * mono-for-tabular is correct — but the headings needed a voice.
 *
 * Instrument Serif is upright and genuinely high-contrast, and it only ships a
 * 400 weight, which is why nothing below sets `font-semibold` on a display
 * heading: the browser would synthesise a bold and smear the thin strokes that
 * are the entire reason for choosing it.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;
const description =
  "Full-stack developer in Malaysia, strongest on the backend — slow queries, millions of records, systems that stay up under load. ~5 years, now building LLM review pipelines on AWS. Career shown as a distributed trace.";

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
  url: profile.github,
  sameAs: [profile.github, profile.linkedin],
  // Country only — deliberately no locality or region.
  address: {
    "@type": "PostalAddress",
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
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
