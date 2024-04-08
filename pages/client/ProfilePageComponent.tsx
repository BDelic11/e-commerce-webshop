import React from "react";

import ProductsContainer from "@/components/products-contanier";
import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "@/components/auth/logout-button";
import UpdateInfoForm from "@/components/auth/update-info";

const ProfilePageComponent = async () => {
  const user = await currentUser();

  if (!user || user === undefined) {
    return (
      <main>
        <Link
          className="w-screen h-screen flex flex-col gap-8 justify-center text-center"
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
    <main className="flex flex-col justify-center align-middle md:flex-row md:w-full md:h-full md:my-auto md:px-24">
      <aside className="flex flex-col w-full text-left md:text-center md:w-1/5 md:h-full md:m-auto md:gap-6 pt-10 px-6">
        <div>
          <h1 className=" font-light text-darkBackground  text-3xl">
            <span className=" font-bold text-accentRed text-3xl">Bok </span>
            {user?.name}!
          </h1>
          <p>Hello profile page</p>
        </div>
        <center>
          <LogoutButton>
            <Button className="hidden md:block" variant="secondary">
              Odjavi se
            </Button>
          </LogoutButton>
        </center>
      </aside>
      <section className="w-full md:w-3/4">
        <UpdateInfoForm data={user} />
      </section>
      <center>
        <LogoutButton>
          <Button className="block md:hidden" variant="secondary">
            Odjavi se
          </Button>
        </LogoutButton>
      </center>
    </main>
  );
};

export default ProfilePageComponent;
