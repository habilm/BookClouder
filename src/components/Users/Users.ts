export type userType = {
  fullName: string;
};

const eventListeners: (() => void)[] = [];

chrome.storage.onChanged.addListener((changes) => {
  if (changes["currentUser"]) {
    eventListeners.forEach((event) => {
      event();
    });
  }
});
export default class User {
  async logout() {
    await chrome.storage.local.remove("currentUser");
    return true;
  }
  async getCurrentUser() {
    const user = await chrome.storage.local.get("currentUser");
    return user.currentUser;
  }

  async saveUser(data: userType, token: string) {
    await chrome.storage.local.set({ currentUser: data, token: token });
    return true;
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
