import TagsManager, { TypeTag } from "./TagsManager";

export interface Link {
  url: string;
  title: string;
  icon?: string;
  tagIDs: string[];
  tags: TypeTag[] | [];
  time?: Date;
}

export default class LinksManger {
  constructor() {
    this.tagsManger = new TagsManager();
  }
  tagsManger: TagsManager;
  storageKey: string = "links";
  blackListedStrings: string[] = ["extension://", "edge://"];

  async getByURL(url: string): Promise<Link | false> {
    const links = await this.getAll();
    const link = links.find((link) => link.url === url);
    return link || false;
  }

  async getAll(): Promise<Link[] | []> {
    const storage = await chrome.storage.local.get(this.storageKey);
    if (!storage[this.storageKey]) return [];

    const allTags = await this.tagsManger.getAllIdIndexed();

    storage[this.storageKey] = storage[this.storageKey].map((links: Link) => {
      links.tags =
        links.tagIDs &&
        links.tagIDs.map((tagId) =>
          typeof tagId == "string" ? allTags[tagId] : tagId
        );
      return links;
    });

    return storage[this.storageKey];
  }

  async save(Link: Link): Promise<false | Link | string> {
    let allLinks = await this.getAll();
    allLinks = Array.isArray(allLinks) ? allLinks : [];

    if ((await this.getByURL(Link.url)) !== false) {
      return "Link already exists";
    }

    Link.time = new Date();
    Link.icon =
      Link.icon?.trim() == "" ? "/assets/fav-placeholder.jpg" : Link.icon;

    const newAllLinks = [Link, ...allLinks];
    try {
      await chrome.storage.local.set({ [this.storageKey]: newAllLinks });
      return Link;
    } catch (e) {
      console.error("Error saving LINK", e);
      return false;
    }
  }

  async addTags(url: string, tags: string[]) {
    const allLinks = await this.getAll();
    const linkIndex = allLinks.findIndex((link) => link.url === url);
    if (linkIndex === -1) return false;
    allLinks[linkIndex].tagIDs = tags;
    console.log(allLinks[linkIndex]);
    await chrome.storage.local.set({ [this.storageKey]: allLinks });
    return true;
  }

  async delete(url: string) {
    const allLinks = await this.getAll();
    const index = allLinks.findIndex((link) => link.url === url);
    if (index === -1) return false;
    allLinks.splice(index, 1);
    await chrome.storage.local.set({ [this.storageKey]: allLinks });
  }

  async onChange(callback: () => void) {
    chrome.storage.onChanged.addListener((changes) => {
      if (changes[this.storageKey]) {
        callback();
      }
    });
  }
}
