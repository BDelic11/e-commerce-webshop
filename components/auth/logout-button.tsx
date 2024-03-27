import { signOut } from "@/auth";
import React from "react";

const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      {children}
    </form>
  );
};

export default LogoutButton;
