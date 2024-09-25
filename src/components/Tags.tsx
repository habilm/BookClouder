import React from "react";

function Tags() {
  return (
    <div>
      <input className="modal-state" id="modal-2" type="checkbox" />
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 max-w-3xl">
          <label
            htmlFor="modal-2"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Modal title 2</h2>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            dolorum voluptate ratione dicta. Maxime cupiditate, est commodi
            consectetur earum iure, optio, obcaecati in nulla saepe maiores
            nobis iste quasi alias!
          </span>
          <div className="flex gap-3">
            <button className="btn btn-error btn-block">Delete</button>
            <button className="btn btn-block">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tags;
