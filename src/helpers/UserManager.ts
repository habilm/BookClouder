export type userType = {
  fullName: string;
  userName: string;
  avatarUrl: string;
};

export type UserDataType = {
  token: string;
};

const eventListeners: (() => void)[] = [];

chrome.storage.onChanged.addListener((changes) => {
  if (changes["currentUser"]) {
    eventListeners.forEach((event) => {
      event();
    });
  }
});
export default class UserManager {
  async logout() {
    await chrome.storage.local.remove("currentUser");
    return true;
  }
  async getCurrentUser() {
    const user = await chrome.storage.local.get("currentUser");
    return user.currentUser;
  }

  async save(data: userType, token: string) {
    await chrome.storage.local.set({ currentUser: data, token: token });
    return true;
  }
  async getToken(): Promise<string> {
    const token = await chrome.storage.local.get("token");
    return token.token;
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

export async function getCurrentUser(): Promise<userType | false>;
export async function getCurrentUser(key: string): Promise<string | false>;
export async function getCurrentUser(
  key?: string
): Promise<userType | string | false> {
  const userManager = new UserManager();
  const user = await userManager.getCurrentUser();

  if (!user.currentUser) return false;
  if (key) {
    return user.currentUser[key as keyof userType];
  }
  return user.currentUser as userType;
}
