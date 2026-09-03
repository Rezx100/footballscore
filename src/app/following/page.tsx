import { FollowingView } from "@/components/following/following-view";
import { PageShell } from "@/components/shell/page-shell";
import { getCatalog } from "@/lib/espn/catalog";
import { getFirstClassClubs } from "@/lib/espn/explore";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export default async function FollowingPage() {
  const [catalog, clubs] = await Promise.all([getCatalog(), getFirstClassClubs()]);
  return (
    <PageShell>
      <FollowingView catalog={catalog} clubs={clubs} />
    </PageShell>
  );
}
