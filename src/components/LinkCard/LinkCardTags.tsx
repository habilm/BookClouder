import { Tags } from "lucide-react";
import React, { MouseEvent } from "react";
import Tag from "../Tag";
import { TypeTag } from "../../helpers/TagsManager";

interface Props {
  tags: TypeTag[];
  onClickManage: () => void;
}

function LinkCardTags({ tags, onClickManage }: Props) {
  function onClickManageBtn(e: MouseEvent) {
    e.preventDefault();
    onClickManage();
  }
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
        <button
          className="tag text-white bg-primary"
          onClick={onClickManageBtn}
        >
          Manage Tags <Tags size={14} />
        </button>
      </div>
    </div>
  );
}

export default LinkCardTags;
