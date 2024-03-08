import { getProducts } from "@/app/actions/getProducts";
import { Button } from "@/components/ui/button";
import { priceTag } from "@/lib/price-tag";
import Image from "next/image";

export default async function LandingPageComponent() {
  const { products } = await getProducts();
  if (!products) {
    return <h1>error</h1>;
  }
  return (
    <main>
      <h1>Hello landing page</h1>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.name} {priceTag({ price: product.price })} {product.price}
          </li>
        ))}
      </ul>
      <Button variant={"outline"} size={"lg"}>
        Click me!
      </Button>
    </main>
  );
}
