import { Lock } from "lucide-react";
import React, { FormEvent, useContext, useState } from "react";
import { ContextData } from "../../helpers/ContextApi";
import { fetchApi, ValidationError } from "../../helpers/fetch";
import Button from "../Button";
import UserModal from "./UserModal";

export default function Signup() {
  const context = useContext(ContextData);
  const [buttonStates, setButtonStates] = useState({
    disabled: false,
    isLoading: false,
  });
  async function onSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setButtonStates({
      isLoading: true,
      disabled: true,
    });
    const formData = new FormData(e.target as HTMLFormElement);
    const formObj = Object.fromEntries(formData.entries());

    try {
      const data = await fetchApi<{ message: string }>("/auth/signup", {
        method: "POST",
        body: JSON.stringify(formObj),
      });
      context.setNotification({
        type: "success",
        message: data.message,
        notificationPopupTimeOut: 20000,
      });
      onLoginLinkClick();
    } catch (err) {
      if (err instanceof ValidationError) {
        console.log(Object.values(err.errors)[0]);
        const errorMessage = err.errors.message;

        context.setNotification({
          type: "error",
          message: errorMessage || "Validation Error",
        });
      }
      console.error("Error logging in", err, e.target);
      return;
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
    <div>
      <form onSubmit={onSignup}>
        <div className="mb-4 w-full">
          <input
            className="input-rounded input input-sm"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4 w-full">
          <input
            className="input-rounded input input-sm"
            type="email"
            name="email"
            placeholder="Enter your email address"
          />
        </div>
        <div className="mb-4">
          <input
            className="input-rounded input input-sm"
            type="password"
            name="password"
            placeholder="Enter Your password"
          />
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <Button
                icon={<Lock size={18} />}
                label="Signup"
                type="submit"
                className="btn btn-primary"
                {...buttonStates}
              />
            </div>
            <div>
              <a href="#" onClick={onLoginLinkClick}>
                I have account already. Login now
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
