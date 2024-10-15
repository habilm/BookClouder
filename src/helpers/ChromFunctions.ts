import { TypeTag } from "./TagsManager";

export function getMetaKeywords(
  tabId: number,
  callback: (keyword: TypeTag[] | []) => void
) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabId },
      func: () => {
        const meta = document.querySelector<HTMLMetaElement>(
          'meta[name="keywords"]'
        );
        return meta ? meta.content : "";
      },
    },
    (result) => {
      if (result.length > 0) {
        result.forEach((func) => {
          const sTagsString = func.result || "";
          if (!sTagsString) {
            callback([]);
            return;
          }
          const sTags = sTagsString.split(",").map((st, id): TypeTag => {
            return {
              id: id.toString(),
              name: st.trim(),
              color: "#34495e",
            };
          });
          callback(sTags);
        });
      } else {
        callback([]);
      }
    }
  );
}
