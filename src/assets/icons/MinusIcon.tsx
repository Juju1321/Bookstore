import React from "react";

export const MinusIcon = ({
  width = "24",
  height = "24",
  fill = "#313037",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="11" width="12" height="2" rx="1" fill={fill} />
    </svg>
  );
};
