import { PlusCircle } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import TagsManager, { TypeTag } from "../helpers/TagsManager";
import Tags from "./Tags";

function TagsModal() {
  const [inputText, setInputText] = useState("");
  const [tags, setTags] = useState<TypeTag[]>([]);

  function onInput(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }
  async function addTag(tag: string) {
    const tagManager = new TagsManager();
    try {
      await tagManager.save({
        name: tag,
      });
    } catch (err) {
      console.log("Error saving tag:", err);
    }

    setInputText("");
  }
  useEffect(() => {
    (async () => {
      await getTags();
    })();
  }, [inputText]);

  async function getTags() {
    const allTags = await new TagsManager().getAll();
    setTags(allTags);
  }

  async function onTagDelete(tagsId: string) {
    const tagManager = new TagsManager();
    await tagManager.delete(tagsId);
    await getTags();
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          className="input-rounded input input-sm"
          onChange={onInput}
          value={inputText}
          placeholder="Enter new tag name"
        />
        <button
          className="btn btn-outline-secondary !rounded-full flex gap-2 btn-sm"
          onClick={async () => await addTag(inputText)}
        >
          <PlusCircle size={16} />
        </button>
      </div>
      <div>
        <div className="tags-list flex gap-4 flex-wrap">
          <Tags tags={tags} onDelete={onTagDelete} />
        </div>
      </div>
    </div>
  );
}

export default TagsModal;
