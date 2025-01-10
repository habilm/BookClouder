import { CheckCircle, CircleAlert } from "lucide-react";
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

  const { type } = notificationData.notification;

  const icons = {
    info: <CircleAlert />,
    success: <CheckCircle />,
    error: <CircleAlert />,
    warning: <CircleAlert />,
  };

  return (
    <div className="notification-toast fixed top-10 w-full z-[100]">
      <span className="hidden alert-info"></span>
      <span className="hidden alert-success"></span>
      <span className="hidden alert-error"></span>
      <span className="hidden alert-warning"></span>
      <div
        className={`alert alert-${notificationData.notification.type}  max-w-sm !w-[90%] !p-2  mx-auto`}
      >
        {icons[type]}
        <div className="flex w-full justify-between">
          <div className="flex gap-3 ">
            <span>{notificationData.notification?.type}</span>
            <span className="text-content2 first-letter:uppercase ">
              {notificationData.notification?.message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
