import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://zavarihaus.com");

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-editorial",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Zavari Haus | Premium Serviced Apartments in Bahria Town Lahore",
  description:
    "Book premium serviced apartments in Bahria Town Lahore with private furnished spaces, warm interiors, hotel-level comfort, and effortless short-term stays.",
  keywords: [
    "serviced apartments Bahria Town Lahore",
    "short term rental Lahore",
    "Airbnb Bahria Town Lahore",
    "furnished apartments Lahore",
    "Zavari Haus",
    "premium apartments Lahore",
  ],
  authors: [{ name: "Zavari Haus" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zavari Haus | Premium Serviced Apartments in Bahria Town Lahore",
    description:
      "Private furnished stays with hotel-level comfort, warm interiors, and effortless booking in Bahria Town Lahore.",
    type: "website",
    locale: "en_US",
    siteName: "Zavari Haus",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Zavari Haus | Premium Serviced Apartments in Bahria Town Lahore",
    description:
      "Private furnished stays with hotel-level comfort and effortless booking in Bahria Town Lahore.",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  applicationName: "Zavari Haus",
  category: "hospitality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable}`}>{children}</body>
    </html>
  );
}
