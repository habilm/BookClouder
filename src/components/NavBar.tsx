import { PlusCircleIcon, Tags, UserCircleIcon } from "lucide-react";
import React, { useContext } from "react";
import { ContextData } from "../helpers/ContextApi";
import UserManager from "../helpers/UserManager";
import TagsModal from "./TagsModal";
import UserModal from "./Users/UserModal";

function NavBar() {
  const modalContext = useContext(ContextData);
  function tagModalOpen() {
    modalContext?.setIsModalOpen(<TagsModal />);
    modalContext?.setModalTitle("Mange Your tags");
  }
  async function userModalOpen() {
    const user = new UserManager();
    const loggedIn = await user.getCurrentUser();
    modalContext?.setIsModalOpen(<UserModal />);
    modalContext?.setModalTitle(loggedIn ? "Your Profile" : "Login");
  }

  return (
    <div className="flex">
      <div className="w-1/5">
        <button className="btn btn-xs" onClick={userModalOpen}>
          <UserCircleIcon />
        </button>
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
