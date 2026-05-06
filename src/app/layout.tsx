import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "行业关键词分析",
  description: "输入一个行业，让AI帮你梳理100个关键词",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-white text-apple-dark antialiased">
        {children}
      </body>
    </html>
  );
}
