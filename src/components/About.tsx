import type { ProfileData } from "@/lib/profileData";
import { C, S } from "@/lib/theme";

export default function About({ p }: { p: ProfileData }) {
  const rows = [
    { label: "이름", value: p.name },
    { label: "소속", value: p.school },
  ];
  return (
    <section id="about" style={{ ...S.block, borderBottom: 0, minHeight: "80vh" }}>
      <h2 style={S.h2}>About</h2>
      <p style={{ maxWidth: "38em", margin: "0 0 20px", fontSize: 18 }}>{p.intro}</p>
      <ul style={{ margin: "0 0 28px", paddingLeft: 20, maxWidth: "38em", color: C.muted }}>
        {p.approach.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
      <dl style={{ ...S.panel, margin: 0 }}>
        {rows.map((r) => (
          <div key={r.label} style={{ ...S.ledgerRow, borderBottom: `1px solid ${C.line}` }}>
            <dt style={{ color: C.muted }}>{r.label}</dt>
            <dd style={{ margin: 0, fontWeight: 500 }}>{r.value}</dd>
          </div>
        ))}
        <div style={S.ledgerRow}>
          <dt style={{ color: C.muted }}>링크</dt>
          <dd style={{ margin: 0, display: "flex", flexWrap: "wrap", gap: "4px 18px" }}>
            {p.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" style={S.link}>{l.label} ↗</a>
            ))}
          </dd>
        </div>
      </dl>
      <p style={{ ...S.sub, marginTop: 56 }}>Next.js · MongoDB · Vercel · 웹서버보안프로그래밍 2026</p>
    </section>
  );
}
