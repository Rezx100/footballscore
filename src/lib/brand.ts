export const MARK_IDS = ["flap", "slot", "posts"] as const;

export type MarkId = (typeof MARK_IDS)[number];

export const DEFAULT_MARK: MarkId = "flap";

export const MARKS: readonly { id: MarkId; n: 1 | 2 | 3; name: string }[] = [
  { id: "flap", n: 1, name: "Split-flap" },
  { id: "slot", n: 2, name: "Pierced medal" },
  { id: "posts", n: 3, name: "Match posts" },
];

export function parseMark(value: string | undefined): MarkId {
  return MARK_IDS.includes(value as MarkId) ? (value as MarkId) : DEFAULT_MARK;
}

export function nextMark(id: MarkId): MarkId {
  return MARK_IDS[(MARK_IDS.indexOf(id) + 1) % MARK_IDS.length];
}
