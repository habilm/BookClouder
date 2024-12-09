import { LoaderCircle } from "lucide-react";
import React from "react";

type ButtonType = {
  label: string;
  onClick?: () => void;
  className?: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
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
        {prop.label}
        {prop.isLoading && <LoaderCircle size={18} className=" animate-spin" />}
      </button>
    </div>
  );
}

export default Button;
