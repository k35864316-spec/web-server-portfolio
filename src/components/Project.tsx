import type { ProfileData } from "@/lib/profileData";
import { C, S, STACK_COLORS } from "@/lib/theme";

export default function Project({ p }: { p: ProfileData }) {
  return (
    <section id="project" style={{ ...S.block, minHeight: "60vh" }}>
      <h2 style={S.h2}>Project</h2>
      <div style={{ display: "grid", gap: 20 }}>
        {p.projects.map((pr) => (
          <article key={pr.title} style={{ ...S.panel, padding: "clamp(18px, 3vw, 28px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "6px 16px" }}>
              <h3 style={{ margin: 0, fontSize: 22 }}>{pr.title}</h3>
              <span style={{ color: C.warn, fontSize: 14, fontWeight: 600 }}>
                {pr.status} · {pr.period}
              </span>
            </div>
            <p style={S.sub}>{pr.role}</p>
            <p style={{ margin: "10px 0 14px" }}>{pr.summary}</p>
            <ul style={{ listStyle: "none", margin: "0 0 16px", padding: 0, display: "grid", gap: 4 }}>
              {pr.points.map((x) => (
                <li key={x.text} style={{ display: "flex", gap: 10, color: x.done ? C.ink : C.muted }}>
                  <span aria-hidden="true" style={{ color: x.done ? C.ok : C.muted, flex: "0 0 auto" }}>{x.done ? "✓" : "○"}</span>
                  <span>
                    {x.text}
                    {!x.done && " (구현 예정)"}
                  </span>
                </li>
              ))}
            </ul>
            <p style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "0 0 8px" }}>
              {pr.stack.map((t) => (
                <span key={t} style={S.chip}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: STACK_COLORS[t] ?? C.muted }} />
                  {t}
                </span>
              ))}
            </p>
            <p style={S.sub}>도구: {pr.tools.join(", ")}</p>
            <p style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: "16px 0 0" }}>
              {pr.demo && <a href={pr.demo} target="_blank" rel="noreferrer" style={S.btnPrimary}>배포 사이트 ↗</a>}
              {pr.repo && <a href={pr.repo} target="_blank" rel="noreferrer" style={S.btn}>저장소 ↗</a>}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
