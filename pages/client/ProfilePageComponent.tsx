import React from "react";

import ProductsContainer from "@/components/products-contanier";
import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "@/components/auth/logout-button";

const ProfilePageComponent = async () => {
  const user = await currentUser();

  if (!user || user === undefined) {
    return (
      <main>
        <Link
          className="w-screen h-screen  flex flex-col gap-8 justify-center text-center"
          href={"auth/login"}
          aria-label="login button"
        >
          <h1 className="text-2xl">Niste ulogirani, prijavite se</h1>
          <center>
            <Button className="w-1/2 " variant="default">
              Prijavi se
            </Button>
          </center>
        </Link>
      </main>
    );
  }

  return (
    <main>
      {user?.name}
      <p>Hello profile page</p>
      <LogoutButton>
        <Button variant="secondary">Odjavi se</Button>
      </LogoutButton>
    </main>
  );
};

export default ProfilePageComponent;
