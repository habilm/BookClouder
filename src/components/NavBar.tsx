import { PlusCircleIcon, Tags, UserCircleIcon } from "lucide-react";
import React, { useContext } from "react";
import { ModalOpen } from "../helpers/ContextApi";
import TagsModal from "./TagsModal";

function NavBar() {
  const modalContext = useContext(ModalOpen);
  function tagModalOpen() {
    modalContext?.setIsModalOpen(<TagsModal />);
    modalContext?.setModalTitle("Mange Your tags");
  }

  return (
    <div className="flex">
      <div className="w-1/5">
        <UserCircleIcon />
      </div>
      <div className="w-3/5">
        <h1 className="text-center text-xl ">Your BookClouds</h1>
      </div>
      <div className="w-1/5 flex justify-end gap-2">
        <button className="btn btn-xs" onClick={tagModalOpen}>
          <Tags size={20} />
        </button>
        <button
          className="btn btn-xs relative"
          style={{ zIndex: 9999999 }}
          onClick={() => {
            window.location.reload();
          }}
        >
          <PlusCircleIcon size={20} />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
