import React from "react";

export const FillStarIcon = ({
                             width = "14",
                             height = "14",
                             fill = "#313037",
                         }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.9324 13.5003C10.8312 13.5003 10.7294 13.4767 10.6358 13.429L7.00032 11.5664L3.36353 13.429C3.14971 13.5393 2.88944 13.5207 2.69281 13.3819C2.49745 13.243 2.39945 13.0081 2.44017 12.7757L3.13444 8.83302L0.192556 6.04198C0.0188301 5.87711 -0.0435331 5.63104 0.0309209 5.40667C0.106011 5.18229 0.305191 5.01866 0.544462 4.98457L4.61143 4.40566L6.4295 0.817526C6.64396 0.394809 7.35604 0.394809 7.5705 0.817526L9.38857 4.40566L13.4555 4.98457C13.6954 5.01866 13.8946 5.18229 13.9691 5.40667C14.0435 5.63104 13.9812 5.87711 13.8074 6.04198L10.8656 8.83302L11.5598 12.7757C11.6006 13.0081 11.5026 13.243 11.3066 13.3819C11.1952 13.4606 11.0641 13.5003 10.9324 13.5003Z"
                fill={fill}
            />
        </svg>
    );
};