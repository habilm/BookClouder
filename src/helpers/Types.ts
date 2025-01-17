export type NotificationTypes = {
  type: "error" | "warning" | "info" | "success";
  message: string;
  notificationPopupTimeOut?: number;
};

export enum API_RESPONSE_TYPE {
  EMAIL_ALREADY_EXISTS = "EMIL_ALREADY_EXISTS",
  ERROR_CREATING_USER = "ERROR_CREATING_USER",
  INVALID_EMAIL_OR_PASSWORD = "INVALID_EMAIL_OR_PASSWORD",
  EMAIL_ALREADY_VERIFIED = "EMAIL_ALREADY_VERIFIED",
  EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  USER_ERROR = "USER_ERROR", // If the user got blocked
}
