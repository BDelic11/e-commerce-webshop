import React from "react";

//components
import ProductCard from "./product-card";
import { Product } from "@prisma/client";

interface ProductsContainerProps {
  products: Product[];
  toggleFilter: boolean;
}

const ProductsContainer = ({
  products,
  toggleFilter,
}: ProductsContainerProps) => {
  return (
    <section
      className={`${
        toggleFilter ? "lg:pl-0" : ""
      }  bg-white grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-3 w-full h-full py-6 scroll-smooth md:px-24 lg:px-40 `}
    >
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductsContainer;
