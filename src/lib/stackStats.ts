import { PROFILE } from "./profileData";

export type StackCount = { name: string; count: number; percent: number };

/**
 * 지금까지 만든 프로젝트(Project)에서 각 기술 스택이 몇 번 쓰였는지 센다.
 * 도구(Tools: GitHub, VS Code, Vercel 등)는 프로젝트의 `tools` 에만 적혀 있으므로 집계에 들어가지 않는다.
 * percent 는 전체 사용 횟수 중 그 기술이 차지하는 비율(%)이며, 모두 더하면 100 이다.
 * 많이 쓴 순서대로, 같으면 이름 순으로 돌려준다.
 */
export function countStackUsage(projects = PROFILE.projects): StackCount[] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const tech of new Set(project.stack)) {
      counts.set(tech, (counts.get(tech) ?? 0) + 1);
    }
  }
  const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, percent: (count / total) * 100 }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** 28.571… → "28.6", 50 → "50" */
export function formatPercent(v: number): string {
  return String(Math.round(v * 10) / 10);
}
