import { createHash } from "node:crypto";
import { connectDB } from "./db";
import { Profile } from "./models";
import { PROFILE, type ProfileData } from "./profileData";

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
