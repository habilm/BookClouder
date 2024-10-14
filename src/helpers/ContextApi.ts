import { createContext } from "react";
import { NotificationTypes } from "./Types";

type modalType = {
  isModalOpen: false | React.JSX.Element;
  setIsModalOpen: (v: false | React.JSX.Element) => void;
  modalTitle?: string;
  setModalTitle: (v: string) => void;
  notification: NotificationTypes | null;
  setNotification: (v: NotificationTypes | null) => void;
};

export const ContextData = createContext<modalType>({
  isModalOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsModalOpen: (v) => {},
  modalTitle: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setModalTitle: (v: string) => {},
  notification: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNotification: (v: NotificationTypes | null) => {},
});
