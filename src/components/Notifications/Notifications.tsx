import { CircleAlert } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { ContextData } from "../../helpers/ContextApi";

let timerId: NodeJS.Timeout;
function Notifications() {
  const notificationData = useContext(ContextData);

  useEffect(() => {
    timerId = setTimeout(() => {
      notificationData.setNotification(null);
    }, 4900);
    return () => clearTimeout(timerId);
  }, [notificationData.notification]);

  if (notificationData.notification === null) {
    return null;
  }

  return (
    <div className="notification-toast fixed top-10 w-full z-[100]">
      <div className="alert alert-error max-w-sm !w-[90%] !p-2  mx-auto">
        <CircleAlert />
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
