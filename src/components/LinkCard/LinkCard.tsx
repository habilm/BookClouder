import React, { useState } from "react";
import LinksManger, { Link } from "../../helpers/LinksManager";
import { Copy, CopyCheck, Tags, Trash2 } from "lucide-react";
import LinkCardTagSelector from "./LinkCardTagSelector";

import LinkCardTags from "./LinkCardTags";

export default function LinkCard({
  link,
  showActions = true,
}: {
  link: Link;
  showActions?: boolean;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isAddingTags, setIsAddingTags] = useState(false);
  const [theLink, setTheLink] = useState(link);
  function deleteLink(link: string) {
    const linkManger = new LinksManger();
    linkManger.delete(link);
    setIsDeleted(true);
  }

  if (isDeleted) {
    return null;
  }

  async function refreshCard() {
    const linkManger = new LinksManger();
    const updatedLink = await linkManger.getByURL(link.url);
    if (!updatedLink === false) {
      setTheLink(updatedLink);
    }
  }

  return (
    <>
      <div
        className={`link-card relative overflow-hidden ${
          isDeleting && "delete-box-active"
        }`}
      >
        <a href={theLink.url} target="_blank" className="" rel="noreferrer">
          <div className="w-full flex min-h-[70px]">
            <div className="w-10">
              <img
                src={theLink.icon}
                alt="icon"
                className="w-10 h-10 rounded-lg"
              />
            </div>
            <div className="link-title-box ps-4">
              <h3 className=" text-md font-bold">{theLink.title}</h3>
              <p className=" text-xs " style={{ lineBreak: "anywhere" }}>
                {theLink.url.length > 200
                  ? theLink.url.slice(0, 200) + "..."
                  : theLink.url}
              </p>
            </div>
            {showActions && (
              <div className="w-10 flex items-center justify-center gap-2 flex-col">
                <div
                  className="group"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDeleting(true);
                  }}
                >
                  <Trash2
                    className="text-red-500 action-icons group-hover:text-red-800"
                    size={16}
                  />
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard
                      .writeText(theLink.url)
                      .then(() => {
                        setIsCopied(true);
                        setTimeout(() => {
                          setIsCopied(false);
                        }, 2000);
                      })
                      .catch((e) => {
                        console.error("Failed to copy URL", e);
                      });
                  }}
                >
                  {isCopied ? (
                    <CopyCheck
                      size={16}
                      className="text-green-600 action-icons"
                    />
                  ) : (
                    <Copy className="text-blue-600  action-icons" size={16} />
                  )}
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAddingTags(true);
                  }}
                >
                  <Tags className="text-blue-600  action-icons" size={16} />
                </div>
              </div>
            )}
          </div>
        </a>
        <LinkCardTags tags={link.tags} />
        {isDeleting && (
          <>
            <div className="absolute left-0 top-0 w-full h-full bg-red-7 bg-opacity-90">
              <div className="delete-box h-full text-center flex items-center justify-center flex-col gap-2 p-2">
                <h3 className="font-bold text-sm text-white ">
                  Are you sure you want to delete this link?
                </h3>
                <div className="delete-btns flex gap-4 ">
                  <button
                    className="btn btn-block btn-xs"
                    onClick={() => setIsDeleting(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn  btn-error  btn-block  btn-xs"
                    onClick={() => {
                      deleteLink(theLink.url);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {isAddingTags && (
          <LinkCardTagSelector
            onUpdate={refreshCard}
            onClose={() => {
              setIsAddingTags(false);
            }}
            savedTagIds={theLink.tagIDs}
            url={theLink.url}
          />
        )}
      </div>
    </>
  );
}
