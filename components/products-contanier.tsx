import React from "react";

//actions
import { getProducts } from "@/actions/get-products";

//components
import ProductCard from "./product-card";

const ProductsContainer = async () => {
  const products = await getProducts();

  if (!products.products) {
    return <p>Nema produkata</p>;
  }

  return (
    <section className=" bg-white grid grid-cols-2 gap-1 w-full py-6">
      {products.products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductsContainer;
