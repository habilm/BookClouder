import React, { useState } from "react";
import { TypeTag } from "../helpers/TagsManager";
import { X } from "lucide-react";

type TagProps = {
  tag: TypeTag;
  onDelete?: (tagId: string) => void;
};

export default function Tag({ tag, onDelete }: TagProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function confirmDelete() {
    setIsDeleting(true);
    // onClick(tagId);
  }

  return (
    <>
      <div
        key={tag.id}
        className="tag text-xs min-w-20 relative"
        style={{ background: tag.color }}
      >
        <span className="tag ">{tag.name}</span>
        {onDelete && (
          <span
            className="badge-remove "
            onClick={() => {
              confirmDelete();
            }}
          >
            <X size={12} />
          </span>
        )}
        {isDeleting && (
          <>
            <div className="flex items-center justify-between gap-1 text-xs absolute left-0 top-0 w-full h-full bg-gray-800 px-3">
              <button
                onClick={() => {
                  if (onDelete) {
                    onDelete(tag.id);
                  }
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setIsDeleting(false);
                }}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
