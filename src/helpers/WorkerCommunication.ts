export type messageNames = "onLinkCreated" | "onLinkUpdated" | "onLinkDeleted";

export function sendToWorker(name: messageNames, data: string | [] | object) {
  chrome.runtime.sendMessage({ name, data });
}
export function receiveFromWorker<T>(
  name: messageNames,
  callback: (data: T) => void
): void {
  chrome.runtime.onMessage.addListener((message) => {
    if (name == message.name) {
      callback(message.data);
    }
  });
}
