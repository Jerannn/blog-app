import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className: string;
};

export default function Button({ className, children }: ButtonProps) {
  return (
    <button
      type="button"
      className={` text-white font-medium px-6 py-2.5 rounded-md transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
