import TagsManager, { TypeTag } from "./TagsManager";

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

/**
 * This function to get all tags that have been used in the website page. eg: the tag name "foo" is available in the website page content, then the tags will be returned on callback
 * @param tabId
 * @param callback
 */
export function getTagsMentionedOnPageContent(
  tabId: number,
  callback: (tags: TypeTag[] | []) => void
) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabId },
      func: () => {
        return document.body.innerText;
      },
    },
    (result) => {
      if (result.length > 0) {
        result.forEach(async (func) => {
          const bodyText = func.result || "";

          if (!bodyText) {
            callback([]);
            return;
          }
          const tagManger = new TagsManager();
          const allTags = await tagManger.getAll();

          const matchedTags = [];
          for (let i = 0; i < allTags.length; i++) {
            const tagName = allTags[i].name.toLowerCase();
            if (matchedTags.length >= 10) break;
            if (
              tagName.length >= 4 &&
              bodyText.toLowerCase().includes(tagName)
            ) {
              matchedTags.push(allTags[i]);
            }
          }

          callback(matchedTags);
        });
      } else {
        callback([]);
      }
    }
  );
}
