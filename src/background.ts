import { getCurrentUser } from "./helpers/storage";

function polling() {
  // console.log("polling");
  setTimeout(polling, 1000 * 30);
}

polling();

chrome.action.onClicked.addListener(async function (e) {
  console.error("User not found");
  const user = await getCurrentUser();
  if (user) {
    chrome.sidePanel.setPanelBehavior({});
  } else {
    chrome.tabs.create({ url: "https://bookclouder.com/profile/" + "off" });
  }
})
