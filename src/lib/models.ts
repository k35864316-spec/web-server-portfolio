import mongoose, { Schema, type Model } from "mongoose";
import type { ProfileData } from "./profileData";

type ProfileDoc = { key: string; hash: string; data: ProfileData };

const profileSchema = new Schema<ProfileDoc>({
  key: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
});

export const Profile: Model<ProfileDoc> =
  (mongoose.models.Profile as Model<ProfileDoc>) ?? mongoose.model<ProfileDoc>("Profile", profileSchema);
