"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { ButtonProps } from "../ui/button";

interface LoginButtonProps extends ButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton = ({
  children,
  mode = "redirect", // deafault mode
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
    console.log("login but clicked");
  };

  if (mode === "modal") {
    return <span>Todo implement modal</span>;
  }

  return (
    <span onClick={onClick} className=" cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
