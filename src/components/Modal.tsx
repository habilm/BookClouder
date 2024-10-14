import React, { useContext, useEffect } from "react";
import { ContextData } from "../helpers/ContextApi";

function Modal() {
  const modalContext = useContext(ContextData);

  useEffect(() => {}, []);
  return (
    <div>
      <input
        className="modal-state"
        checked={modalContext.isModalOpen !== false}
        readOnly
        id="modal-2"
        type="checkbox"
      />
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 max-w-3xl">
          <button
            type="button"
            onClick={() => modalContext.setIsModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h2 className="text-xl">{modalContext.modalTitle}</h2>
          <div>{modalContext.isModalOpen}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
