import React, { useEffect, useState } from "react";
import TagsManager, { TypeTag } from "../helpers/TagsManager";
import Tag from "./Tag";

type TypeLinkTagSelector = {
  url: string;
};

function LinkCardTagSelector({ url }: TypeLinkTagSelector) {
  const [addedTags, setAddedTags] = useState<TypeTag[] | []>([]);
  const [availableTags, setAvailableTags] = useState<TypeTag[] | []>([]);
  useEffect(() => {
    (async () => {
      const tags = new TagsManager();
      setAvailableTags(await tags.getAll());
    })();
  });
  return (
    <div className="absolute top-0 left-0 bg-secondary bg-opacity-80 backdrop-blur-sm w-full h-full flex p-2">
      <div className="h-full w-1/2 break-all">{url}</div>
      <div
        className="h-full w-1/2 grid gap-1  grid-cols-1 overflow-y-scroll ps-2"
        style={{ gridAutoRows: "min-content" }}
      >
        {availableTags.map((tag) => (
          <Tag tag={tag} key={tag.id} />
        ))}
      </div>
    </div>
  );
}

export default LinkCardTagSelector;
