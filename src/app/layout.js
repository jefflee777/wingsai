import "./globals.css";

export const metadata = {
  title: "Wings — AI-Powered Travel Intelligence Platform",
  description:
    "Explore destinations with AI-driven route planning, earn $WINGS tokens for verified travel, and unlock real-world rewards. Web3 native, verifiable, value-generating.",
  keywords: [
    "travel",
    "AI",
    "Web3",
    "blockchain",
    "rewards",
    "GPS verification",
    "travel intelligence",
  ],
  openGraph: {
    title: "Wings — Travel Smarter. Earn Smarter.",
    description:
      "AI-driven travel intelligence platform. Explore, verify, and earn rewards for real-world travel.",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wings — AI-Powered Travel Intelligence",
    description:
      "Explore destinations with AI, earn tokens, unlock rewards.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
