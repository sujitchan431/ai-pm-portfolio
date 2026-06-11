import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sujit Chankhore — AI Product Manager",
  description:
    "AI Product Manager building products that turn complexity into scalable systems. 10+ years, 77K+ users impacted, production AI systems: LLM pipelines, RAG, agents, and evals.",
  keywords: [
    "AI Product Manager",
    "Sujit Chankhore",
    "Product Strategy",
    "AI Products",
    "RAG",
    "AI Agents",
    "LLM Evaluation",
    "0 to 1 Products",
  ],
  openGraph: {
    title: "Sujit Chankhore — AI Product Manager",
    description:
      "Building AI products that turn complexity into scalable systems. Case studies, AI product lab, and product leadership snapshot.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <script
          // Runs before paint: restores the saved theme, defaults to light ("day").
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
