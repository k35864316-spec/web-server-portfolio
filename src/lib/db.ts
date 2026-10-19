import mongoose from "mongoose";

type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
const g = globalThis as unknown as { _portfolioMongoose?: Cache };
const cache: Cache = (g._portfolioMongoose ??= { conn: null, promise: null });

/** MONGODB_URI 가 없으면 에러를 던진다. (호출하는 쪽에서 잡아 기본 데이터로 대체한다) */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI 환경변수가 설정되지 않았습니다.");
  if (cache.conn) return cache.conn;
  cache.promise ??= mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 5000 });
  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null;
    throw err;
  }
  return cache.conn;
}
