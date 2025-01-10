import TagsManager, { TypeTag } from "./TagsManager";
import { sendToWorker } from "./WorkerCommunication";

export interface Link {
  url: string;
  title: string;
  icon?: string;
  tagIDs: string[];
  tags: TypeTag[] | [];
  /**
   * createdAt Date String ISO 8601
   */
  createdAt: string;
  /**
   * updatedAt Date String ISO 8601
   */
  updatedAt: string;
  isDeleted?: boolean;
}

const eventListeners: (() => void)[] = [];

chrome.storage.onChanged.addListener((changes) => {
  if (changes["links"]) {
    eventListeners.forEach((event) => {
      event();
    });
  }
});

export default class LinksManger {
  constructor() {
    this.tagsManger = new TagsManager();
  }
  tagsManger: TagsManager;
  storageKey: string = "links";
  /**
   * If those string are contain any URL we will not save and will not show the save option in PopupMenu
   */
  blackListedStrings: string[] = ["extension://", "edge://"];

  async getByURL(url: string): Promise<Link | false> {
    const links = await this.getAll();
    const link = links.find((link) => link.url === url);
    return link || false;
  }

  async getAll(
    date?: Date | null | undefined,
    includeSoftDeleted: boolean = false
  ): Promise<Link[] | []> {
    const storage = await chrome.storage.local.get(this.storageKey);
    if (!storage[this.storageKey]) return [];

    const allTags = await this.tagsManger.getAllIdIndexed();

    storage[this.storageKey] = storage[this.storageKey].map(
      (link: Link & { _id?: string }) => {
        link.tags =
          link.tagIDs &&
          link.tagIDs.map((tagId) =>
            typeof tagId == "string" ? allTags[tagId] : tagId
          );

        delete link._id;

        return link;
      }
    );

    storage[this.storageKey] = storage[this.storageKey].filter(
      (theLink: Link) => {
        // deleted will be ignored
        if (theLink.isDeleted === true && !includeSoftDeleted) return false;

        // only take after the given date
        if (date) {
          const linkDate = new Date(theLink.updatedAt);
          // console.log(
          //   theLink.updatedAt,
          //   linkDate.getTime(),
          //   date.toISOString(),
          //   date.getTime(),
          //   linkDate.getTime() >= date.getTime()
          // );
          return linkDate.getTime() >= date.getTime();
        }
        return true;
      }
    );

    return storage[this.storageKey];
  }

  async save(
    Link: Omit<Link, "createdAt" | "updatedAt"> &
      Partial<Pick<Link, "createdAt" | "updatedAt">>,
    tagsNames: string[] = [],
    doSync: boolean = true
  ): Promise<false | Link | string> {
    let allLinks = await this.getAll();
    allLinks = Array.isArray(allLinks) ? allLinks : [];

    if ((await this.getByURL(Link.url)) !== false) {
      return "Link already exists";
    }

    if ((await Array.isArray(tagsNames)) && tagsNames.length) {
      Link.tagIDs = [];
      tagsNames = [...new Set(tagsNames)];
      for (let i = 0; i < tagsNames.length; i++) {
        const tag = await this.tagsManger.save({ name: tagsNames[i] }, false);
        if (tag !== false) {
          Link.tagIDs.push(tag.id);
        }
      }
    }

    if (!Link.createdAt) {
      Link.createdAt = new Date().toISOString();
    }
    if (!Link.updatedAt) {
      Link.updatedAt = new Date().toISOString();
    }
    Link.icon =
      Link.icon?.trim() == "" ? "/assets/fav-placeholder.jpg" : Link.icon;
    Link.isDeleted = false;
    const newAllLinks = [Link, ...allLinks];
    try {
      await chrome.storage.local.set({ [this.storageKey]: newAllLinks });
      if (doSync) sendToWorker("onLinkCreated", Link);
      return Link as Link;
    } catch (e) {
      console.error("Error saving LINK", e);
      return false;
    }
  }

  async addTags(url: string, tags: string[]) {
    const allLinks = await this.getAll();
    const linkIndex = allLinks.findIndex((link) => link.url === url);
    if (linkIndex === -1) return false;

    allLinks[linkIndex].updatedAt = new Date().toISOString();
    allLinks[linkIndex].tagIDs = tags;

    await chrome.storage.local.set({ [this.storageKey]: allLinks });
    return true;
  }
  async update(url: string, data: Partial<Link>, doSync: boolean = true) {
    const allLinks = await this.getAll();
    const linkIndex = allLinks.findIndex((link) => link.url === url);
    if (linkIndex === -1) return false;

    allLinks[linkIndex] = { ...allLinks[linkIndex], ...data };
    allLinks[linkIndex].updatedAt = new Date().toISOString();

    if (doSync) sendToWorker("onLinkUpdated", allLinks[linkIndex]);

    await chrome.storage.local.set({ [this.storageKey]: allLinks });
    return true;
  }

  async delete(
    url: string,
    softDelete: boolean = true,
    doSync: boolean = true
  ) {
    if (softDelete === true) {
      console.log("doing soft delete");
      const deleted = await this.update(url, { isDeleted: true });
      return deleted;
    }

    const allLinks = await this.getAll(null, true);
    const index = allLinks.findIndex((link) => link.url === url);
    if (index === -1) return false;
    allLinks.splice(index, 1);

    if (doSync) sendToWorker("onLinkDeleted", {});
    console.log("doing hard delete");
    await chrome.storage.local.set({ [this.storageKey]: allLinks });
  }

  async onChange(callback: () => void) {
    if (eventListeners.indexOf(callback) !== -1) return;
    eventListeners.push(callback);
  }
  removeEvent(callback: () => void) {
    const index = eventListeners.indexOf(callback);
    if (index !== -1) {
      eventListeners.splice(index, 1);
    }
  }
}
