export type Link = {
  url: string;
  title: string;
  icon?: string;
  tags: string[];
  time?: Date;
};

export default class LinksManger {
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

    return storage[this.storageKey] as Link[];
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
