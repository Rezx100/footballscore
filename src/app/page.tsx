import { redirect } from "next/navigation";
import { tabHref } from "@/lib/hrefs";
import { serverPrefs } from "@/lib/server-state";

export default async function Home() {
  const prefs = await serverPrefs();
  redirect(tabHref(prefs.startTab));
}
