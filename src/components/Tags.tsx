import React from "react";
import { TypeTag } from "../helpers/TagsManager";

import Tag from "./Tag";

type LinksProps = {
  tags: TypeTag[];
  onDelete: (tagId: string) => void;
};

export default function Tags({ tags, onDelete }: LinksProps) {
  return (
    <>
      {tags.map((tag) => (
        <Tag key={tag.id} tag={tag} onDelete={onDelete} />
      ))}
    </>
  );
}
