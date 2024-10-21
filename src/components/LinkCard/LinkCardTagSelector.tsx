import React, { useEffect, useState } from "react";
import TagsManager, { TypeTag } from "../../helpers/TagsManager";
import Tag from "../Tag";
import { XCircle } from "lucide-react";
import LinksManger from "../../helpers/LinksManager";

type TypeLinkTagSelector = {
  url: string;
  onClose: () => void;
  savedTagIds: string[];
  onUpdate: () => void;
};

function LinkCardTagSelector({
  url,
  onClose,
  savedTagIds,
  onUpdate,
}: TypeLinkTagSelector) {
  const [addedTags, setAddedTags] = useState<TypeTag[] | []>([]);
  const [availableTags, setAvailableTags] = useState<TypeTag[] | []>([]);
  const [addedTagsIds, setAddedTagsIds] = useState<string[]>([]);
  const tags = new TagsManager();

  useEffect(() => {
    (async () => {
      const allTags = await tags.getAll({ sort: true });
      allTags.sort();
      setAvailableTags(allTags);

      onUpdate();
    })();
  }, [addedTagsIds]);

  useEffect(() => {
    setAddedTagsIds(savedTagIds || []);
  }, []);

  async function toggleAdd(tag: TypeTag) {
    setAddedTags([...addedTags, tag]);
    const LM = await new LinksManger();
    setAddedTagsIds((added) => {
      let newList: string[] = [];
      if (addedTagsIds.includes(tag.id)) {
        newList = added.filter((tagId) => tagId !== tag.id);
      } else {
        newList = [...addedTagsIds, tag.id];
      }
      LM.addTags(url, newList);
      return newList;
    });
  }

  (async () => {
    const allTags = await tags.getAll({ sort: true });

    setAvailableTags(allTags);
  })();
  availableTags.sort((a, b) => {
    if (addedTagsIds.includes(a.id) && !addedTagsIds.includes(b.id)) {
      return -1;
    }
    if (!addedTagsIds.includes(a.id) && addedTagsIds.includes(b.id)) {
      return 1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    return 0;
  });
  return (
    <div className="absolute top-0 left-0 bg-secondary bg-opacity-80 backdrop-blur-sm w-full h-full flex p-2">
      <div className="h-full w-full  overflow-y-scroll  flex gap-1 flex-wrap content-start p-1">
        {availableTags.length ? (
          availableTags.map((tag) => (
            <Tag
              key={tag.id}
              tag={tag}
              className={
                "cursor-pointer justify-center " +
                (addedTagsIds.includes(tag.id) ? " selected" : "")
              }
              onClick={toggleAdd}
            />
          ))
        ) : (
          <h4 className="text-center">No Tags Found</h4>
        )}
      </div>
      <XCircle
        className="absolute end-2 top-2 text-white z-50 cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
}

export default LinkCardTagSelector;
