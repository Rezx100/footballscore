import { MoreView } from "@/components/more/more-view";
import { PageShell } from "@/components/shell/page-shell";
import { DEFAULT_MARK, parseMark } from "@/lib/brand";
import { serverPrefs } from "@/lib/server-state";

export const dynamic = "force-dynamic";

export default async function MorePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const mark = parseMark(Array.isArray(query.mark) ? query.mark[0] : query.mark) ?? DEFAULT_MARK;
  const prefs = await serverPrefs();
  return (
    <PageShell>
      <MoreView prefs={prefs} mark={mark} />
    </PageShell>
  );
}
