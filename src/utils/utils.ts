
/** Combines classes into a single string */
export function classes(...classNames: (string | undefined | null)[]) {
  return classNames.filter(Boolean).join(" ");
}