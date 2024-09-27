import { createContext } from "react";

type modalType = {
  isModalOpen: false | React.JSX.Element;
  setIsModalOpen: (v: false | React.JSX.Element) => void;
  modalTitle?: string;
  setModalTitle: (v: string) => void;
};

export const ModalOpen = createContext<modalType>({
  isModalOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsModalOpen: (v) => {},
  modalTitle: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setModalTitle: (v: string) => {},
});
