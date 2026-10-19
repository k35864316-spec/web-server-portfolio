import type { ProfileData } from "@/lib/profileData";
import { C, S } from "@/lib/theme";

export default function Main({ p }: { p: ProfileData }) {
  return (
    <section id="main" style={{ ...S.block, paddingTop: "clamp(64px, 12vw, 120px)", minHeight: "70vh" }}>
      <h1 style={{ margin: 0, fontSize: "clamp(40px, 8vw, 68px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
        안녕하세요,
        <br />
        {p.name}입니다.
      </h1>
      <p style={{ margin: "20px 0 8px", fontSize: 20, maxWidth: "30em" }}>{p.tagline}</p>
      <p style={{ margin: "0 0 32px", color: C.muted }}>{p.school}</p>
      <p style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: 0 }}>
        <a href="#project" style={S.btnPrimary}>프로젝트 보기</a>
        <a href={p.github} target="_blank" rel="noreferrer" style={S.btn}>GitHub ↗</a>
      </p>
    </section>
  );
}
