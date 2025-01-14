import { CheckCircle, CircleAlert } from "lucide-react";
import React, { useContext, useEffect, useRef } from "react";
import { ContextData } from "../../helpers/ContextApi";

let timerId: NodeJS.Timeout;
let timerId2: NodeJS.Timeout;
function Notifications() {
  const notificationData = useContext(ContextData);
  const notificationElm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notificationElm.current) {
      notificationElm.current.style.top = "40px";
    }
    timerId = setTimeout(() => {
      if (notificationElm.current) {
        notificationElm.current.style.top = "-80px";
      }
      timerId2 = setTimeout(() => {
        notificationData.setNotification(null);
      }, 300);
    }, notificationData?.notification?.notificationPopupTimeOut || 5000);
    return () => {
      clearTimeout(timerId);
      clearTimeout(timerId2);
    };
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
    <div
      ref={notificationElm}
      className="notification-toast fixed -top-20 w-full z-[100]"
    >
      <span className="hidden alert-info"></span>
      <span className="hidden alert-success"></span>
      <span className="hidden alert-error"></span>
      <span className="hidden alert-warning"></span>
      <div
        className={`alert alert-${notificationData.notification.type}  max-w-sm !w-[90%] !p-3  mx-auto`}
      >
        <div className=" w-full ">
          <div className="">
            <div className=" flex gap-1 items-center mb-3">
              {icons[type]}
              <span className="text-xl first-letter:uppercase">
                {notificationData.notification?.type}
              </span>
            </div>
            <div className="text-content2 first-letter:uppercase ">
              {notificationData.notification?.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
