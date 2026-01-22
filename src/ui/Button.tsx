import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "button";
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function Button({
  children,
  className = "",
  type = "button",
  isDisabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={` text-white font-medium px-6 py-2.5 rounded-md transition cursor-pointer ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
