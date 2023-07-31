import { type User } from "@prisma/client"
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

/** Combines classes into a single string */
export function classes(...classNames: (string | undefined | null)[]) {
  return classNames.filter(Boolean).join(" ");
}

export const UserFilter = {
  id: true,
  username: true,
  email: true,
  bio: true,
  createdAt: true,
  image: true,
} as const;

export type FilteredUser = Pick<User, keyof typeof UserFilter>;


/** Formats a duration in milliseconds to a human readable format */
export function formatDuration(duration: number) {
  const d = dayjs.duration(duration);
  const hours = d.hours();
  const minutes = d.minutes();
  const seconds = d.seconds();

  return `${hours ? `${hours}h ` : ""}${minutes ? `${minutes}m ` : ""}${seconds ? `${seconds}s` : ""}`;
}