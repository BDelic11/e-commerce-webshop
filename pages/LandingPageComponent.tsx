import { getProducts } from "@/actions/getProducts";
import { signOut } from "@/auth";
import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { priceTag } from "@/lib/price-tag";
import Image from "next/image";

export default async function LandingPageComponent() {
  const { products } = await getProducts();
  const user = await currentUser();

  // if (!products?.length) {
  //   return <h1>error</h1>;
  // }
  return (
    <main>
      <h1>Hello landing page</h1>
      <h2>{JSON.stringify(user)}</h2>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.name} {priceTag({ price: product.price })} {product.price}
            {/* <Image src={} alt="patuljak slika" width={30} height={30} /> */}
          </li>
        ))}
      </ul>
      <LoginButton>
        <Button variant={"outline"} size={"lg"}>
          Click me!
        </Button>
      </LoginButton>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="secondary" size="lg">
          Odjavi se
        </Button>
      </form>
    </main>
  );
}
