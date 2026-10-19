import type { CSSProperties } from "react";

/** 색과 공통 스타일. CSS 파일 대신 TypeScript 객체로 관리한다. */
export const C = {
  bg: "#0a0f1c",
  panel: "#121a2e",
  panel2: "#18223b",
  ink: "#e8edf7",
  muted: "#8d9ab6",
  line: "#243050",
  accent: "#5b8cff",
  ok: "#3ddc97",
  warn: "#ffb454",
} as const;

/** 기술별 대표 색 (그래프 막대·점). 어두운 배경에서 보이는 색을 쓴다. */
export const STACK_COLORS: Record<string, string> = {
  "Next.js": "#EDEDED",
  React: "#61DAFB",
  TypeScript: "#3178C6",
  MongoDB: "#47A248",
  HTML: "#E34F26",
  CSS: "#1572B6",
  JS: "#F7DF1E",
  Python: "#3776AB",
  C: "#7C8CF0",
};

export const FONT =
  'system-ui, -apple-system, "Segoe UI", "Malgun Gothic", "Noto Sans KR", sans-serif';

export const NAV_HEIGHT = 60;

export const S: Record<string, CSSProperties> = {
  body: { margin: 0, background: C.bg, color: C.ink, fontFamily: FONT, lineHeight: 1.7 },
  content: { maxWidth: 960, margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)" },
  block: { scrollMarginTop: NAV_HEIGHT, padding: "clamp(56px, 9vw, 88px) 0 clamp(40px, 6vw, 64px)", borderBottom: `1px solid ${C.line}` },
  h2: { margin: "0 0 28px", fontSize: 30, letterSpacing: "-0.01em" },
  panel: { background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14 },
  ledgerRow: { display: "grid", gridTemplateColumns: "minmax(84px, 130px) minmax(0, 1fr)", gap: 16, padding: "14px 20px" },
  sub: { color: C.muted, fontSize: 14, margin: "6px 0" },
  link: { color: C.accent, fontWeight: 600 },
  chip: { display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 999, background: C.panel2, border: `1px solid ${C.line}`, fontSize: 14 },
  btn: { display: "inline-block", padding: "10px 18px", borderRadius: 10, border: `1px solid ${C.line}`, background: C.panel, color: C.ink, textDecoration: "none", fontWeight: 600, fontSize: 15 },
  btnPrimary: { display: "inline-block", padding: "10px 18px", borderRadius: 10, border: `1px solid ${C.accent}`, background: C.accent, color: "#07101f", textDecoration: "none", fontWeight: 700, fontSize: 15 },
};
