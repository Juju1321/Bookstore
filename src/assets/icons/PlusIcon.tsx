import React from "react";

export const PlusIcon = ({ width = "24", height = "24", fill = "#313037" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 11H13V5C13 4.448 12.552 4 12 4C11.448 4 11 4.448 11 5V11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13H11V19C11 19.553 11.448 20 12 20C12.552 20 13 19.553 13 19V13H19C19.553 13 20 12.552 20 12C20 11.448 19.553 11 19 11Z"
        fill={fill}
      />
    </svg>
  );
};
