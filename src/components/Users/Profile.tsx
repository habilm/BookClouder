import React from "react";

import UserManager, { userType } from "../../helpers/UserManager";
import Button from "../Button";
import { sync } from "../../helpers/SyncManager";

export default function Profile({ currentUser }: { currentUser: userType }) {
  const user = new UserManager();

  return (
    <div>
      <div>
        <img
          src="/user-placeholder.webp"
          className="w-20 h-20 rounded-full mx-auto"
        />
      </div>
      <div className="text-center">
        <h2 className="mb-10">{currentUser.fullName}</h2>
        <div className="">
          <Button
            label="Logout"
            type="button"
            className="btn btn-error mb-2"
            onClick={async () => await user.logout()}
          />
          <Button
            label="Sync"
            type="button"
            className="btn btn-error mb-2"
            onClick={() => sync()}
          />
          <p>
            Your cloud sync will pause when you log out. Any links you&apos;ve
            saved to this browser will remain accessible.
          </p>
        </div>
      </div>
    </div>
  );
}
