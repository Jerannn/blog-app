import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className: string;
  type?: "submit" | "button";
};

export default function Button({ type, className, children }: ButtonProps) {
  return (
    <button
      type={type}
      className={` text-white font-medium px-6 py-2.5 rounded-md transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
