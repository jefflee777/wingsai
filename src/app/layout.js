import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Viewport Metadata
export const viewport = {
  themeColor: "#0058ff", // Wings AI brand blue
  colorScheme: "dark",
};

// ✅ SEO Metadata
export const metadata = {
  title: "Wings AI | Travel Smarter, Earn Smarter",
  description:
    "Wings AI is a Travel-to-Earn platform that combines AI-powered route planning with blockchain rewards. Explore destinations, verify check-ins, and earn $WINGS tokens while building your digital travel passport.",
  keywords: [
    "Wings AI",
    "Travel to Earn",
    "AI travel planner",
    "Wings token",
    "Blockchain travel rewards",
    "Telegram mini app",
    "Digital travel passport",
    "Web3 travel",
    "AI trip assistant",
    "crypto travel app",
  ],
  authors: [{ name: "Wings AI" }],
  applicationName: "Wings AI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  openGraph: {
    type: "website",
    title: "Wings AI | Travel Smarter, Earn Smarter",
    description:
      "Discover the world with AI-powered travel suggestions, verify check-ins, and earn $WINGS tokens. Build your digital passport as you explore.",
    siteName: "Wings AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wings AI - Travel Smarter, Earn Smarter",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Wings AI | Travel Smarter, Earn Smarter",
    description:
      "Plan smarter routes with AI, explore new destinations, and earn $WINGS tokens directly inside Telegram.",
    creator: "@WingsAI",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/logo.png", color: "#0058ff" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        {/* <link rel="canonical" href="https://wingsai.app" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
