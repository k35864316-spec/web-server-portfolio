"use client";

import { useEffect, useState } from "react";
import { C, NAV_HEIGHT } from "@/lib/theme";

const ITEMS = [
  { id: "main", label: "Main" },
  { id: "stack", label: "Stack" },
  { id: "project", label: "Project" },
  { id: "about", label: "About" },
];

/** 페이지 맨 위에 고정되는 메뉴. 버튼을 누르면 해당 내용으로 이동한다. */
export default function Sidebar({ name }: { name: string }) {
  const [active, setActive] = useState("main");
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    // 화면 위쪽 35% 지점을 지난 마지막 섹션을 현재 위치로 본다.
    function update() {
      const line = window.innerHeight * 0.35;
      let cur = ITEMS[0].id;
      for (const i of ITEMS) {
        const el = document.getElementById(i.id);
        if (el && el.getBoundingClientRect().top <= line) cur = i.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        cur = ITEMS[ITEMS.length - 1].id;
      }
      setActive(cur);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: NAV_HEIGHT,
        background: "rgba(10,15,28,.88)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${C.line}`,
        color: C.muted,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "0 clamp(12px, 3vw, 32px)",
        overflowX: "auto",
      }}
    >
      <strong style={{ color: C.ink, fontSize: 18, whiteSpace: "nowrap" }}>{name}</strong>
      <nav aria-label="페이지 이동" style={{ display: "flex", gap: 4 }}>
        {ITEMS.map((i) => {
          const on = active === i.id;
          return (
            <button
              key={i.id}
              type="button"
              onClick={() => go(i.id)}
              onMouseEnter={() => setHover(i.id)}
              onMouseLeave={() => setHover(null)}
              aria-current={on ? "true" : undefined}
              style={{
                appearance: "none",
                border: 0,
                borderBottom: `3px solid ${on ? C.accent : "transparent"}`,
                borderRadius: "6px 6px 0 0",
                background: on || hover === i.id ? "rgba(255,255,255,.07)" : "transparent",
                color: on ? C.ink : "inherit",
                fontFamily: "inherit",
                fontSize: 16,
                fontWeight: on ? 600 : 400,
                whiteSpace: "nowrap",
                padding: "8px 14px",
                cursor: "pointer",
              }}
            >
              {i.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
