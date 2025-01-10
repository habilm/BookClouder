import { updateIcon } from "./helpers/ChromFunctions";
import LinksManger, { Link } from "./helpers/LinksManager";
import { sync } from "./helpers/SyncManager";
import UserManager from "./helpers/UserManager";
import { receiveFromWorker } from "./helpers/WorkerCommunication";

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "open-side-panel") {
    // Open the side panel programmatically
    const thisWindow = await chrome.windows.getCurrent({ populate: true });
    chrome.sidePanel.open({
      windowId: thisWindow.id || 0,
    });
  }
});

let setTimeoutId: NodeJS.Timeout | number = 0;

const doSyncLink = async function () {
  // We won't immediately call to cloud to create. we will wait some time and call the create API. in order to avoid unnecessary API calls if user delete the link immediately.
  clearTimeout(setTimeoutId);
  const users = new UserManager();
  if (await users.getCurrentUser())
    setTimeoutId = setTimeout(async function () {
      sync();
      const links = new LinksManger();
      console.log(await links.getAll());
    }, 1000);
};

receiveFromWorker<Link>("onLinkCreated", doSyncLink);
receiveFromWorker("onLinkDeleted", doSyncLink);
receiveFromWorker("onLinkUpdated", doSyncLink);

/**
 * Change the Icon when the user already bookmarked.
 */

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the tab has a valid URL
  if (tab.url && changeInfo.status === "complete") {
    updateIcon(tab.url, tabId);
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url) {
      updateIcon(tab.url, activeInfo.tabId);
    }
  });
});
