import About from "@/components/About";
import Main from "@/components/Main";
import Project from "@/components/Project";
import Sidebar from "@/components/Sidebar";
import Stack from "@/components/Stack";
import { getProfile } from "@/lib/profile";
import { S } from "@/lib/theme";

// MongoDB 의 내용을 읽으므로 요청마다 서버에서 그린다.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { data, fromDb } = await getProfile();
  // MongoDB 에서 실제로 읽어 왔을 때만 "MongoDB 연동" 항목을 완료로 표시한다.
  const p = fromDb
    ? {
        ...data,
        projects: data.projects.map((pr) => ({
          ...pr,
          points: pr.points.map((x) => (x.text === "MongoDB 연동" ? { ...x, done: true } : x)),
        })),
      }
    : data;
  return (
    <>
      <Sidebar name={p.name} />
      <main style={S.content}>
        <Main p={p} />
        <Stack p={p} />
        <Project p={p} />
        <About p={p} db={fromDb} />
      </main>
    </>
  );
}
