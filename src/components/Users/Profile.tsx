import React, { useEffect, useState } from "react";

import UserManager, { userType } from "../../helpers/UserManager";
import Button from "../Button";
import { getLastSynced, sync } from "../../helpers/SyncManager";

export default function Profile({ currentUser }: { currentUser: userType }) {
  const user = new UserManager();

  const [lastSyncedTime, setLastSyncedTime] = useState(
    new Date(1).toISOString()
  );
  const [syncButtonLoading, setSyncButtonLoading] = useState(false);

  async function showSyncTime() {
    const lastSynced = await getLastSynced();
    setLastSyncedTime(lastSynced.toISOString());
  }

  useEffect(() => {
    showSyncTime();
  }, []);

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
            label="Sync"
            type="button"
            className="btn btn-warning mb-2"
            isLoading={syncButtonLoading}
            onClick={async () => {
              setSyncButtonLoading(true);
              const t = await sync();
              setLastSyncedTime(t.toISOString());
              setTimeout(() => {
                setSyncButtonLoading(false);
              }, 1000);
            }}
          />
          <div className="text-xs mb-4">Last Synced: {lastSyncedTime}</div>
          <Button
            label="Logout"
            type="button"
            className="btn btn-error mb-2"
            onClick={async () => await user.logout()}
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
