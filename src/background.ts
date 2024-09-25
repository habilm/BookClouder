chrome.commands.onCommand.addListener(async (command) => {
  if (command === "open-side-panel") {
    // Open the side panel programmatically
    const thisWindow = await chrome.windows.getCurrent({ populate: true });
    chrome.sidePanel.open({
      windowId: thisWindow.id || 0,
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  console.log("messageage");
});
