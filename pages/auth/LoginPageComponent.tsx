import LoginForm from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import React from "react";

const LoginPageComponent = () => {
  return (
    <main className="flex flex-col h-full items-center justify-center">
      <LoginForm />
    </main>
  );
};

export default LoginPageComponent;
