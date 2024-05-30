import React from "react";

import ProductsContainer from "@/components/products-contanier";
import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "@/components/auth/logout-button";
import UpdateInfoForm from "@/components/auth/update-info";
import { getUserBalance } from "@/actions/user";
import { formatPrice } from "@/lib/format-price";

const ProfilePageComponent = async () => {
  const user = await currentUser();

  if (!user) {
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
  const { data, error } = await getUserBalance(user?.id);

  return (
    <main className="flex flex-col justify-center align-middle md:flex-row md:w-full md:h-full md:my-auto md:px-24">
      <aside className="flex flex-col w-full text-left md:text-center md:w-1/5 md:h-full md:m-auto md:gap-6 pt-10 md:pt-40 px-6">
        <div>
          <h1 className=" font-light text-darkBackground  text-3xl">
            <span className=" font-bold text-accentRed text-3xl">Bok </span>
            {user?.name}!
          </h1>

          {data?.saldo ? (
            <p className=" font-bold py-2">
              Balance:{" "}
              <span className=" font-normal"> {formatPrice(data?.saldo)}</span>
            </p>
          ) : (
            <p className=" font-light">{error}</p>
          )}
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
        <UpdateInfoForm data={user} userId={user.id} />
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
