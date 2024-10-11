import React from "react";

export type SimpleTagProps = {
  text: string;
  color?: string;
};
function SimpleTag({ text, color }: SimpleTagProps) {
  return (
    <div
      className="simple-tag tag text-xs text-white"
      style={{ background: color }}
    >
      {text}
    </div>
  );
}

export default SimpleTag;
