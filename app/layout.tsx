import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
// Import client component directly; layout is a server component but can render client components.
import ThreeUI from "../components/three-ui"
import "./globals.css";

const ThreeUI = dynamic(() => import("../components/three-ui"), { ssr: false });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aman Bhuiyan - SQA Engineer & Cybersecurity Enthusiast",
  description:
    "SQA Engineer, Security Researcher, and Bug Bounty Hunter. Specialized in manual testing, penetration testing, and vulnerability assessment.",
  generator: "v0.app",
  keywords:
    "SQA, Quality Assurance, Cybersecurity, Bug Bounty, Penetration Testing, Security Research",
  openGraph: {
    title: "Aman Bhuiyan - SQA Engineer & Cybersecurity Enthusiast",
    description:
      "Ensuring quality, security, and performance through modern testing and ethical security research.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="IiQewZPiI63v2y5FHzmAoDjCPGh2eHveWQT2iGV8LdY"
        />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0f172a"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        {/* Global Three.js UI overlay for buttons and micro-interactions */}
        <ThreeUI />
        <Analytics />
      </body>
    </html>
  );
}
