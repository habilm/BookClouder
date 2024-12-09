import React, { KeyboardEvent, useState } from "react";

import { TypeTag } from "../../helpers/TagsManager";
import SimpleTag from "../SimpleTag";

interface Props {
  tags: TypeTag[];
  onCreate?: (tag: string) => void;
}

function LinkCardTags({ tags, onCreate }: Props) {
  const [newTag, setNewTag] = useState("");

  function onInput(event: KeyboardEvent<HTMLInputElement>) {
    const element = event?.target as HTMLInputElement;
    setNewTag(element.value);
  }
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const element = event?.target as HTMLInputElement;
    if (event.key === "Enter" && element.value) {
      if (onCreate) onCreate(element.value);
      setNewTag("");
    }
  }
  return (
    <div>
      <div className="pt-2 flex flex-wrap gap-1">
        {tags &&
          tags?.map(
            (tag) =>
              tag?.id && (
                <SimpleTag key={tag.id} text={tag.name} color={tag.color} />
              )
          )}
        {onCreate && (
          <div className="simple-tag tag text-xs text-white bg-slate-950">
            <input
              className="bg-slate-950 w-full max-w-20 !outline-none"
              placeholder="Add other tag"
              value={newTag}
              onInput={onInput}
              onKeyDown={onKeyDown}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default LinkCardTags;
