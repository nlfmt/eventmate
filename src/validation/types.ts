import { z } from "zod";

export const orderBySchema = z
  .enum(["date", "title", "capacity", "participants"])
  .optional()
  .default("date");
export type OrderBySchema = z.infer<typeof orderBySchema>;