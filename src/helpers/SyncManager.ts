import { fetchApi } from "./fetch";
import LinksManger, { Link } from "./LinksManager";
import { TypeTag } from "./TagsManager";

/**
 * Sync B/W cloud
 */
export async function sync() {
  const lastSynced: Date = await getLastSynced();
  const linksManger = new LinksManger();

  const links = await linksManger.getAll(lastSynced);

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

  if (Array.isArray(res) && res.length > 0) {
    // res.forEach((link) => {
    //   const tags = link.tags.map((t: { name: string }) => t.name);
    //   if (link) {
    //     delete link._id;
    //     delete link.tags;
    //     linksManger.save(link, tags || [], false);
    //   }
    // });
  }

  await setLastSynced(new Date());
}

export async function getLastSynced() {
  const lastSynced = await chrome.storage.local.get("lastSynced");
  console.log(lastSynced.lastSynced, "<<<LasS");
  const date =
    typeof lastSynced["lastSynced"] === "string" ? lastSynced["lastSynced"] : 1;
  return new Date(date);
}

export async function setLastSynced(date: Date) {
  await chrome.storage.local.set({ lastSynced: date.toISOString() });
}
