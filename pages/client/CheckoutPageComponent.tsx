import Link from "next/link";

// actions
import { getCart } from "@/actions/cart";

// components
import { Button } from "@/components/ui/button";
import CheckoutContainer from "@/components/ui/checkout-container";
import { currentUser } from "@/lib/auth";
import { formatPrice } from "@/lib/format-price";
import CartEntry from "@/components/cart-entry";
import CreateOrderButton from "@/components/create-purchase-button";
import CheckoutAddressForm from "@/components/checkout-address-form";
import CustomDialog from "@/components/ui/custom-dialog";
import { getExtendedUser } from "@/actions/user";
import LoginButton from "@/components/auth/login-button";

const CheckoutPageComponent = async () => {
  const cart = await getCart();
  const user = await currentUser();
  const { data: extendedUser, error } = await getExtendedUser(user?.id);

  // THIS DELIVERY IS FOR SIMPLIFICATION, FOR MY FACULTY PURPOSES
  const delivery = 200;

  if (!cart) {
    return <p>Nije pronađena košarica.</p>;
  }
  if (!user || user === undefined) {
    return (
      <main className="flex flex-col gap-6 items-center pb-10 md:pb-20 justify-center align-middle w-full h-full">
        <h1 className="text-2xl text-gray-900">Niste ulogirani.</h1>
        <LoginButton variant="default" size="default">
          <Button>Prijavi se</Button>
        </LoginButton>
      </main>
    );
  }

  if (
    !extendedUser?.address ||
    extendedUser.address === "" ||
    !extendedUser.city ||
    !extendedUser.country ||
    !extendedUser.phoneNumber ||
    !extendedUser.postalCode
  ) {
    <p className=" text-red-500">Korisnik nema jos ove informacije.</p>;
  }

  if (!extendedUser) {
    return <p>Korisnik nema dodatne informacije.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="flex md:flex-row md:w-full md:justify-evenly md:m-auto md:pt-6 bg-gray-50">
      <div className="flex md:flex-col md:gap-6 md:w-1/2">
        <CheckoutContainer
          title="ADRESA"
          userId={user?.id}
          action={CheckoutAddressForm}
          FormSent
        >
          <div>
            <p>{extendedUser?.address}</p>
            <p>{extendedUser?.city}</p>
            <p>{extendedUser?.country}</p>
            <p>{extendedUser?.phoneNumber}</p>
            <p>{extendedUser?.postalCode}</p>
            {/* TODO: add user details like "name, surname, address , city, postal code, country, phone number, email" */}
          </div>
        </CheckoutContainer>
        <CheckoutContainer title="DOSTAVA">
          <div>
            <p>Dostava: {formatPrice(delivery)}</p>
            {/* TODO: add user details like "name, surname, address , city, postal code, country, phone number, email" */}
          </div>
        </CheckoutContainer>
        <CheckoutContainer title="ADRESA DOSTAVE">
          <div>
            <p>{user?.email}</p>
            <p>{user?.name}</p>
            {/* TODO: add user details like "name, surname, address , city, postal code, country, phone number, email" */}
          </div>
        </CheckoutContainer>
      </div>
      <div className="md:w-1/3 ">
        <CheckoutContainer
          title="PREDMET"
          classname="h-full md:h-5/6 justify-between"
        >
          <div className="flex flex-col justify-end md:gap-1 md:w-full md:h-full  ">
            <div className="flex flex-col relative overflow-y">
              {cart?.items.map((cartItem) => (
                <CartEntry
                  classname=" w-32 md:w-80 lg:w-full md:h-32 "
                  cartItem={cartItem}
                  key={cartItem.id}
                  cartId={cart.id}
                  itemId={cartItem.id}
                />
              ))}
            </div>

            <div className="w-full flex flex-row md:px-3 justify-between ">
              <p>Produkti:</p>
              <p>{formatPrice(cart.subtotal)}</p>
            </div>
            <div className="w-full flex flex-row md:px-3 justify-between ">
              <p>Dostava:</p>
              <p> {formatPrice(delivery)}</p>
            </div>
            <hr className="md:w-full"></hr>
            <div className="w-full flex flex-row md:px-3 justify-between  font-semibold">
              <p>Ukupno:</p>
              <p> {formatPrice(cart.subtotal + delivery)}</p>
            </div>

            {/* <p>{cart.size}</p>
          <p>{cart.status}</p> */}

            <CreateOrderButton
              className=" md:w-full md:my-2"
              userId={user.id}
              totalPrice={cart.subtotal}
              delivery={delivery}
              orderItems={cart.items.map((item) => ({
                id: item.id,
                productId: item.product.id,
                quantity: item.quantity,
                priceAtPurchase: item.price,
              }))}
            />
          </div>
        </CheckoutContainer>
      </div>
    </main>
  );
};

export default CheckoutPageComponent;
