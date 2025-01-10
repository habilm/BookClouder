import { fetchApi } from "./fetch";
import LinksManger, { Link } from "./LinksManager";
import { TypeTag } from "./TagsManager";

/**
 * Sync B/W cloud
 */
export async function sync() {
  const lastSynced: Date = await getLastSynced();
  const linksManger = new LinksManger();

  const links = await linksManger.getAll(lastSynced, true);

  const linksTagAsString = links.map(function (link: Link) {
    if (link.tags) {
      link.tags = link.tags.filter((t) => t?.name);
      link.tags = link.tags.map((t) => t?.name) as unknown as TypeTag[];
    }
    return link;
  });
  const res = await fetchApi("/links?date=" + lastSynced, {
    method: "PATCH",
    body: JSON.stringify(linksTagAsString),
  });

  // Save the links the cloud has
  if (Array.isArray(res) && res.length > 0) {
    for (let i = 0; i < res.length; i++) {
      if (res[i]) {
        const tags: string[] = res[i].tags.map((t: { name: string }) => t.name);
        delete res[i]._id;
        delete res[i].tags;
        await linksManger.save(res[i], tags || [], false);
      }
    }
  }

  // We will hard delete the links if they are soft deleted
  if (linksTagAsString.length > 0) {
    for (let i = 0; i < linksTagAsString.length; i++) {
      if (!linksTagAsString[i].isDeleted) continue;
      await linksManger.delete(linksTagAsString[i].url, false, false);
      console.log("link Hard deleted : ", linksManger);
    }
  }

  const time = new Date();
  await setLastSynced(time);
  return time;
}

export async function getLastSynced(): Promise<Date> {
  const lastSynced = await chrome.storage.local.get("lastSynced");
  const date =
    typeof lastSynced["lastSynced"] === "string" ? lastSynced["lastSynced"] : 1;
  return new Date(date);
}

export async function setLastSynced(date: Date) {
  await chrome.storage.local.set({ lastSynced: date.toISOString() });
}
