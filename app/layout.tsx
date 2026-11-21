import type { Metadata, Viewport } from "next";
import { Archivo, Barlow_Condensed } from "next/font/google";
import { careerYears, education, profile } from "@/lib/resume";
import { siteUrl } from "@/lib/site";
import "./globals.css";

/**
 * Self-hosted at build time by next/font, so the page makes no request to a
 * font CDN. Archivo is variable on width as well as weight: the statement is
 * stretched wide on that axis rather than tracked out. Barlow Condensed sets
 * every reading (dates, counts, levels) so figures stack in narrow columns.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;
const description = `Full-stack developer in Malaysia, strongest on the backend — slow queries, millions of records, systems that stay up under load. ~${careerYears} years, now building LLM review pipelines on AWS. Career, languages and builds, each with the dates and counts behind it.`;

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
  themeColor: "#f6f7f4",
  colorScheme: "light",
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
    name: education.school,
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
      className={`${archivo.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-enamel"
        >
          Skip to content
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
