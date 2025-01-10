import React, { MouseEvent, useContext, useState } from "react";
import { ContextData } from "../../helpers/ContextApi";
import { fetchApi, ValidationError } from "../../helpers/fetch";
import Button from "../Button";
import UserModal from "./UserModal";
import { ArrowBigLeft, Send } from "lucide-react";

export default function VerifyEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const context = useContext(ContextData);
  const [buttonStates, setButtonStates] = useState({
    disabled: false,
    isLoading: false,
  });
  async function onResendVerifyEmail(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setButtonStates({
      isLoading: true,
      disabled: true,
    });
    try {
      type VerifyEmailType = {
        status: string;
        message: string;
      };

      const res = await fetchApi<VerifyEmailType>("/auth/login/resend", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      context.setNotification({
        type: "success",
        message: res.message,
      });

      context?.setIsModalOpen(<UserModal />);
      context?.setModalTitle("Login");
    } catch (err) {
      if (err instanceof ValidationError) {
        const errorMessage = err.errors.message;

        context.setNotification({
          type: "error",
          message: errorMessage || "Validation Error",
        });

        if (err.errors.error == "EMAIL_ALREADY_VERIFIED") {
          context.setNotification({
            type: "info",
            message: "Email already verified",
          });
          context?.setIsModalOpen(<UserModal />);
          context?.setModalTitle("Login");
        }
      }
    } finally {
      setButtonStates({
        isLoading: false,
        disabled: false,
      });
    }
  }

  const onLoginLinkClick = () => {
    context?.setIsModalOpen(<UserModal />);
    context?.setModalTitle("Login");
  };

  return (
    <div className="flex justify-center flex-wrap gap-3">
      <Button
        icon={<Send size={18} />}
        label="Resend Verify Email"
        type="button"
        className="btn btn-primary"
        {...buttonStates}
        onClick={onResendVerifyEmail}
      />
      <Button
        icon={<ArrowBigLeft size={18} />}
        label="Back to login"
        type="button"
        className="btn btn-secondary"
        onClick={onLoginLinkClick}
      />
    </div>
  );
}
