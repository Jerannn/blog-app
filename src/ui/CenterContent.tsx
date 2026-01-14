import React from "react";

type CenterContentProps = {
  children: React.ReactNode;
};

export default function CenterContent({ children }: CenterContentProps) {
  return (
    <div className="flex justify-center items-center min-h-dvh  ">
      {children}
    </div>
  );
}
