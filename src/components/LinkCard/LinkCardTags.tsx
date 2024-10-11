import React from "react";

import { TypeTag } from "../../helpers/TagsManager";
import SimpleTag from "../SimpleTag";

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
                <SimpleTag key={tag.id} text={tag.name} color={tag.color} />
              )
          )}
      </div>
    </div>
  );
}

export default LinkCardTags;
