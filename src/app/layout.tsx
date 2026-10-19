import type { Metadata } from "next";
import { S } from "@/lib/theme";

export const metadata: Metadata = {
  title: "김명준 · 포트폴리오",
  description: "정보보호학과 학생의 개인 포트폴리오 (Next.js + MongoDB)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={S.body}>{children}</body>
    </html>
  );
}
