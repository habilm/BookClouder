import React, { FormEvent, useContext, useState } from "react";
import { ContextData } from "../../helpers/ContextApi";
import { fetchApi, ValidationError } from "../../helpers/fetch";
import { sync } from "../../helpers/SyncManager";
import UserManager, { userType } from "../../helpers/UserManager";
import Button from "../Button";

export default function Login() {
  const contextNotify = useContext(ContextData);
  const [buttonStates, setButtonStates] = useState({
    disabled: false,
    isLoading: false,
  });
  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setButtonStates({
      isLoading: true,
      disabled: true,
    });
    const formData = new FormData(e.target as HTMLFormElement);
    const formObj = Object.fromEntries(formData.entries());

    try {
      const data = (await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify(formObj),
      })) as { token: string; data: userType };

      const user = new UserManager();
      await user.save(data.data, data.token);

      sync();
    } catch (err) {
      if (err instanceof ValidationError) {
        console.log(Object.values(err.errors)[0]);
        const errorMessage = err.errors.message;

        contextNotify.setNotification({
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
  return (
    <div>
      <form onSubmit={onLogin}>
        <div className="mb-4 w-full">
          <input
            className="input-rounded input input-sm"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={"habil2@yopmail.com"}
            onChange={() => {}}
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
                label="Login"
                type="submit"
                className="btn btn-primary"
                {...buttonStates}
              />
            </div>
            <div>
              <a href="#">Forgot password</a>
            </div>
          </div>
        </div>
        <div className="mb-4 text-center w-full">
          <a href="#" className="text-white">
            Don&apos;t have account now. <br />
            Create free account right now
          </a>
        </div>
      </form>
    </div>
  );
}
