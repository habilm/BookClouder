import { LoaderCircle } from "lucide-react";
import React from "react";

type ButtonType = {
  label: string;
  onClick?: () => void;
  className?: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
};

function Button(prop: ButtonType) {
  return (
    <div>
      <button
        {...prop}
        className={
          prop.className + " " + "flex gap-2 items-center justify-center"
        }
      >
        {prop.label}
        {prop.loading && <LoaderCircle size={18} className=" animate-spin" />}
      </button>
    </div>
  );
}

export default Button;
