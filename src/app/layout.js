import "./globals.css";
import Web3Provider from "@/providers/Web3Provider";

export const metadata = {
  title: "Wings — AI-Powered Travel Intelligence",
  description:
    "Explore destinations with AI-driven route planning, earn $WINGS tokens for verified travel, and unlock real-world rewards.",
  openGraph: {
    title: "Wings — Travel Smarter. Earn Smarter.",
    description: "AI-driven travel intelligence platform.",
    images: ["/og-image.png"],
    type: "website",
  },
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
