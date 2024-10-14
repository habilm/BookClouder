import { OctagonX } from "lucide-react";
import React, { useContext } from "react";
import { ContextData } from "../../helpers/ContextApi";

function Notifications() {
  const notificationData = useContext(ContextData);

  if (notificationData.notification === null) {
    return null;
  }

  return (
    <div className="fixed top-10 w-full z-[100]">
      <div className="alert alert-error max-w-sm !w-[90%] !p-2  mx-auto ">
        <OctagonX />
        <div className="flex w-full justify-between">
          <div className="flex gap-3">
            <span>{notificationData.notification?.type}</span>
            <span className="text-content2">
              {notificationData.notification?.message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
