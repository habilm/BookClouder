import React from "react";
import Tag from "../Tag";
import { TypeTag } from "../../helpers/TagsManager";

interface Props {
  tags: TypeTag[];
}

function LinkCardTags({ tags }: Props) {
  return (
    <div>
      <div className="pt-2 flex flex-wrap gap-1">
        {tags &&
          tags?.map(
            (tag) =>
              tag?.id && (
                <Tag
                  key={tag.id}
                  tag={tag}
                  className={"cursor-pointer justify-center "}
                />
              )
          )}
      </div>
    </div>
  );
}

export default LinkCardTags;
