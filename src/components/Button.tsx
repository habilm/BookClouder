import { LoaderCircle } from "lucide-react";
import React, { MouseEventHandler } from "react";

type ButtonType = {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
};

function Button(prop: ButtonType) {
  return (
    <div>
      <button
        disabled={prop.disabled}
        type={prop.type}
        onClick={prop.onClick}
        className={
          prop.className + " " + "flex gap-2 items-center justify-center"
        }
      >
        {prop.icon}
        {prop.label}
        {prop.isLoading && <LoaderCircle size={18} className=" animate-spin" />}
      </button>
    </div>
  );
}

export default Button;
