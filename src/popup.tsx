import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import LinksManger, { Link } from "./helpers/LinksManager";
import LinkCard from "./components/LinkCard/LinkCard";

const Popup = () => {
  const [link, setLink] = useState<Link | false>(false);
  const [linkAdded, setLinkAdded] = useState<boolean>(false);
  const [addedMessage, setAddedMessage] = useState("");
  const [linkExists, SetLinkExists] = useState(false);

  useEffect(() => {}, [linkAdded]);

  useEffect(() => {
    (async () => {
      const linkManager = new LinksManger();
      const thisWindow = await chrome.windows.getCurrent();
      const tab = await chrome.tabs.query({
        active: true,
        windowId: thisWindow.id,
      });
      if (tab.length) {
        const savedLink = await linkManager.getByURL(tab[0].url || "");
        SetLinkExists(savedLink !== false);
        const toSave = {
          title: tab[0].title || "unknown",
          url: tab[0].url || "/#unknown",
          icon: tab[0].favIconUrl || "",
          tagIDs: savedLink !== false ? savedLink.tagIDs : [],
          tags: savedLink !== false ? savedLink.tags : [],
        };

        setLink(toSave);
      } else {
        // Need to add error handler
      }
    })();
  }, []);

  const saveLink = async () => {
    const tab = await chrome.tabs.query({ active: true });
    if (tab.length && link) {
      const linkManager = new LinksManger();

      const saved = await linkManager.save(link);

      if (typeof saved === "string") {
        setAddedMessage(saved);
      } else {
        setAddedMessage("Link Saved Successfully 🎉");
        setLink(saved);
        setLinkAdded(true);
        SetLinkExists(true);
      }
    }
  };
  async function openSideBar() {
    const thisWindow = await chrome.windows.getCurrent({ populate: true });
    // const thisWindow = chrome.
    chrome.sidePanel.open({
      windowId: thisWindow.id || 0,
    });
  }

  return (
    <>
      <div className="min-w-96 pb-4">
        {linkAdded && (
          <div className="text-center">
            <h1 className="bg-green-600 text-white text-xl py-2">
              {addedMessage}
            </h1>
          </div>
        )}
        {link ? (
          <>
            <div className="m-4">
              <LinkCard link={link} showActions={linkExists} />
            </div>
          </>
        ) : null}

        <div className="mt-3 text-center flex flex-col justify-center items-center gap-5">
          {!linkExists && (
            <button
              type="button"
              className="btn btn-success "
              onClick={saveLink}
            >
              Save
            </button>
          )}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={openSideBar}
          >
            View All
          </button>
        </div>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
