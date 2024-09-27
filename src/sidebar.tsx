import React, { createContext, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import MainPage from "./components/MainPage";

import { ModalOpen } from "./helpers/ContextApi";
import Modal from "./components/Modal";

const SideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState<false | React.JSX.Element>(
    false
  );
  const [modalTitle, setModalTitle] = useState<string>("");
  return (
    <>
      <ModalOpen.Provider
        value={{ isModalOpen, setIsModalOpen, modalTitle, setModalTitle }}
      >
        <MainPage />
        <Modal />
      </ModalOpen.Provider>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <SideBar />
  </React.StrictMode>
);
