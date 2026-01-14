import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className: string;
  type?: "submit" | "button";
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  type,
  className,
  isDisabled,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={` text-white font-medium px-6 py-2.5 rounded-md transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
