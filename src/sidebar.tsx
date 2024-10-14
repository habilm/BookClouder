import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import MainPage from "./components/MainPage";

import { ContextData } from "./helpers/ContextApi";
import Modal from "./components/Modal";
import Notifications from "./components/Notifications/Notifications";
import { NotificationTypes } from "./helpers/Types";

const SideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState<false | React.JSX.Element>(
    false
  );
  const [modalTitle, setModalTitle] = useState<string>("");
  const [notification, setNotification] = useState<NotificationTypes | null>(
    null
  );
  return (
    <>
      <ContextData.Provider
        value={{
          isModalOpen,
          setIsModalOpen,
          modalTitle,
          setModalTitle,
          notification,
          setNotification,
        }}
      >
        <MainPage />
        <Modal />
        <Notifications />
      </ContextData.Provider>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <SideBar />
  </React.StrictMode>
);
