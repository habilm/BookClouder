import React, { useEffect, useRef, useState } from "react";
import LinksManger, { Link } from "../helpers/LinksManager";
import { Search, X } from "lucide-react";
import LinkCard from "./LinkCard/LinkCard";
import NavBar from "./NavBar";

export default function MainPage() {
  const [inputSearchText, setSearchText] = useState("");
  const [userLinks, setUserLinks] = useState<Link[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      inputRef.current?.focus();
      const linkManager = new LinksManger();
      const allLinks = await linkManager.getAll();
      setUserLinks(allLinks);
      linkManager.onChange(async function () {
        await onSearch();
      });
    })();
  }, []);

  async function onSearch() {
    setSearchText(inputRef?.current?.value || "");
    const linkManager = new LinksManger();
    const allLinks = await linkManager.getAll();
    const searchText = (inputRef?.current?.value || "").toLowerCase();
    setIsSearching(!!searchText.length);

    const filteredLinks = allLinks.filter(
      (link) =>
        link.title.toLowerCase().includes(searchText) ||
        link.url.toLowerCase().includes(searchText) ||
        link.tags?.some(
          (tag) => tag && tag.name?.toLowerCase().includes(searchText)
        )
    );
    setUserLinks(filteredLinks);
  }

  async function resetSearch() {
    setSearchText("");
    setIsSearching(false);
    inputRef.current?.focus();
    const linkManager = new LinksManger();
    const allLinks = await linkManager.getAll();
    setUserLinks(allLinks);
  }
  return (
    <div className="p-4 min-h-screen">
      <NavBar />
      <div className="py-4 text-center flex gap-4 mx-auto justify-center sticky top-0 bg-slate-2 z-30">
        <input
          className="input-rounded input input-sm"
          onChange={onSearch}
          value={inputSearchText}
          placeholder="Search"
          ref={inputRef}
        />
        <button
          className="btn btn-outline-secondary !rounded-full flex gap-2 btn-sm"
          onClick={resetSearch}
        >
          {!isSearching ? (
            <>
              Search <Search size={16} />
            </>
          ) : (
            <>
              Clear <X size={16} />
            </>
          )}
        </button>
      </div>

      <div>
        {userLinks.length
          ? userLinks.map((link) => <LinkCard key={link.url} link={link} />)
          : !isSearching && (
              <>
                <div className=" text-center text-gray-9 mt-10">
                  <h3 className="text-lg mb-3">
                    You Don&apos;t have any Links saved.
                  </h3>
                  <p className="text-gray-8">
                    Save your favorite websites, apps, and resources in your
                    BookClouds.
                    <br />
                    To Save Links, click the BookCloud extension icon.
                  </p>
                </div>
              </>
            )}
      </div>
    </div>
  );
}
