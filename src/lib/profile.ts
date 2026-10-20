import { createHash } from "node:crypto";
import { connectDB } from "./db";
import { Profile } from "./models";
import { PROFILE, type ProfileData } from "./profileData";
import { countStackUsage, toStackCounts, type StackCount } from "./stackStats";

const HASH = createHash("sha256").update(JSON.stringify(PROFILE)).digest("hex");

/** MongoDB 의 profile 문서를 읽는다. 내용이 profileData.ts 와 다르면 갱신하고, DB 가 안 되면 기본 내용을 돌려준다. */
export async function getProfile(): Promise<{ data: ProfileData; fromDb: boolean }> {
  try {
    await connectDB();
    let doc = await Profile.findOne({ key: "main" }).lean();
    if (!doc || doc.hash !== HASH) {
      await Profile.updateOne({ key: "main" }, { $set: { hash: HASH, data: PROFILE } }, { upsert: true });
      doc = await Profile.findOne({ key: "main" }).lean();
    }
    return { data: (doc?.data as ProfileData) ?? PROFILE, fromDb: true };
  } catch {
    return { data: PROFILE, fromDb: false };
  }
}

/**
 * MongoDB 에 저장된 모든 프로젝트(projects)에서 각 기술 스택이 몇 번 쓰였는지 DB 집계(aggregate)로 센다.
 * 프로젝트마다 같은 기술이 중복돼도 한 번만 세고, 도구(tools)는 집계하지 않는다.
 * DB 를 쓸 수 없으면 화면에 넘어온 기본 데이터로 계산한다.
 */
export async function getStackUsage(fallback: ProfileData): Promise<{ usage: StackCount[]; fromDb: boolean }> {
  try {
    await connectDB();
    const rows = await Profile.aggregate<{ _id: string; count: number }>([
      { $match: { key: "main" } },
      { $unwind: "$data.projects" },
      { $project: { stack: { $setUnion: ["$data.projects.stack", []] } } },
      { $unwind: "$stack" },
      { $group: { _id: "$stack", count: { $sum: 1 } } },
    ]);
    if (rows.length === 0) throw new Error("집계 결과가 비어 있습니다.");
    return { usage: toStackCounts(new Map(rows.map((r) => [r._id, r.count]))), fromDb: true };
  } catch {
    return { usage: countStackUsage(fallback.projects), fromDb: false };
  }
}
