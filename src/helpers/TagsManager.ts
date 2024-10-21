import { getRandomColor, getRandomString } from "./utitlity";

export type TypeTag = {
  id: string;
  /**
   * Tag name. should be unique.
   */
  name: string;
  color?: string;
  time?: Date;
  pin?: boolean;
  usedCount?: number;
};

const eventListeners: (() => void)[] = [];
chrome.storage.onChanged.addListener((changes) => {
  if (changes["tags"]) {
    console.log(eventListeners, "events tags");
    eventListeners.forEach((event) => {
      event();
    });
  }
});
type GetAllOptions = {
  sort?: boolean;
};

export default class TagsManager {
  storageKey: string = "tags";

  async getByID(id: string): Promise<TypeTag | false> {
    const tags = await this.getAll();
    const tag = tags.find((tag) => tag.id === id);
    return tag || false;
  }

  async getByName(name: string): Promise<TypeTag | false> {
    const tags = await this.getAll();
    const tag = tags.find((tag) => tag.name === name);
    return tag || false;
  }

  async getAll(options: GetAllOptions = {}): Promise<TypeTag[] | []> {
    const storage = await chrome.storage.local.get(this.storageKey);
    if (!storage[this.storageKey]) return [];

    if (options.sort) {
      storage[this.storageKey] = storage[this.storageKey].sort(
        (a: TypeTag, b: TypeTag) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          return 0;
        }
      );
    }

    return storage[this.storageKey] as TypeTag[];
  }
  async getAllIdIndexed(): Promise<Record<string, TypeTag>> {
    const storage = await chrome.storage.local.get(this.storageKey);
    if (!storage[this.storageKey]) return {};

    const allTags = storage[this.storageKey];
    const idIndexedTags: Record<string, TypeTag> = {};
    allTags.forEach((tag: TypeTag) => {
      idIndexedTags[tag.id] = tag;
    });

    return idIndexedTags;
  }

  /**
   *
   * @param tag TypeTag - The tag object to save
   * @param errorIfExist Boolean - if it true then function will throw error: default is true
   * @returns The tag object
   */
  async save(
    tag: Omit<TypeTag, "id"> & Partial<Pick<TypeTag, "id">>,
    errorIfExist: boolean = true
  ): Promise<false | TypeTag> {
    let allTags = await this.getAll();

    if (tag.name.trim() === "") {
      throw new Error("Tag name can't be empty " + tag.id);
    }

    const exists = await this.getByName(tag.name);
    if (!tag.id && exists !== false) {
      if (errorIfExist) {
        throw new Error(`Tag name '${tag.name}' is already exists`);
      }
      return exists;
    }

    if (tag.id) {
      const existsIndex = allTags.findIndex((t) => t.id === tag.id);
      if (existsIndex) {
        allTags[existsIndex] = {
          ...(tag as TypeTag),
        };
      } else {
        throw new Error("Could not find tag with id " + tag.id);
      }
    } else {
      tag.id = getRandomString();
      tag.color = tag.color || getRandomColor();
      allTags = [tag as TypeTag, ...allTags];
    }

    try {
      await chrome.storage.local.set({ [this.storageKey]: allTags });
      return tag as TypeTag;
    } catch (e) {
      console.error("Error saving Tag", e);
      return false;
    }
  }

  async delete(id: string) {
    const allTags = await this.getAll();
    const index = allTags.findIndex((tag) => tag.id === id);
    if (index === -1) return false;
    allTags.splice(index, 1);
    await chrome.storage.local.set({ [this.storageKey]: allTags });
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
