import { updateIcon } from "./helpers/ChromFunctions";
import { Link } from "./helpers/LinksManager";
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

receiveFromWorker<Link>("onLinkCreated", async function () {
  // We won't immediately call to cloud to create. we will wait some time and call the create API. in order to avoid unnecessary API calls if user delete the link immediately.
  const users = new UserManager();
  if (await users.getCurrentUser())
    setTimeout(async function () {
      sync();
    }, 0);
});
receiveFromWorker("onLinkDeleted", function (message) {
  console.log("message received from test2", message);
});

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
