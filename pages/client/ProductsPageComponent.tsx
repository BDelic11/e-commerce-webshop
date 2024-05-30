"use client";
import React, { useEffect, useState } from "react";

//actions

import { getProducts } from "@/actions/get-products";
import { getProductsByFilter } from "@/actions/get-products";

//components
import AboveProductsClientContainer from "@/components/client-above-products";
import ProductsContainer from "@/components/products-contanier";
import FilterAccordions from "@/components/filter-accordions";
// import CustomDraver from "@/components/ui/custom-drawer";
import CustomDialog from "@/components/ui/custom-dialog";
import ChooseFilters from "@/components/chose-filters";

//data
import { filters } from "@/data/filters";
import filter from "@/public/icons/settings vertical.svg";
import { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsPageComponent: React.FC = () => {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { products } = await getProducts();
      if (!products) {
        return <p>Nema produkata</p>;
      }
      setProducts(products);
      setLoadingProducts(false);
    };
    fetchProducts();
  }, [setProducts]);
  if (loadingProducts) {
    return (
      // TODO: CHANGE LOADING ANIMATION
      <div className="flex flex-col h-full w-full md:px-24 md:pt-12  space-x-4">
        <Skeleton className=" h-10 w-44 rounded-sm bg-gradient-to-r from-gray-100 to-gray-200  animate-pulse" />

        <div className="flex flex-row md:gap-6 md:mt-10 ">
          <Skeleton className=" h-96 w-96 bg-gradient-to-r from-gray-100 to-gray-200 rounded-sm animate-pulse" />
          <Skeleton className="h-96 w-96 bg-gradient-to-r from-gray-100 to-gray-200 rounded-sm animate-pulse" />
          <Skeleton className="h-96 w-96 bg-gradient-to-r from-gray-100 to-gray-200 rounded-sm animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* TODO FILTER CONTAINER (LEFT ON DESKTOP FROM PRODUCTS SHOW/UNSHOW) */}
      <div className="flex flex-row">
        {toggleFilter && (
          <aside className="hidden lg:px-10 lg:block file:filters md:px-4 md:pt-10 md:w-1/4 transition-all duration-300">
            <FilterAccordions
              action={(filters) => getProductsByFilter}
              filters={filters}
              setProducts={setProducts}
            />
          </aside>
        )}
        <div className="flex flex-col">
          <div className="flex flex-row justify-between align-end  ">
            <AboveProductsClientContainer
              toggleFilter={toggleFilter}
              setToggleFilter={setToggleFilter}
              lenght={products.length}
            />
            <CustomDialog
              classname="block md:hidden align-bottom pt-6 px-6 md:pt-10 md:px-24"
              header="Filteri"
              trigger="Filteri"
              triggerIcon={filter}
              action={setProducts}
              actionLabel="Spremi"
            >
              <ChooseFilters setProducts={setProducts} filters={filters} />
            </CustomDialog>
          </div>
          <ProductsContainer toggleFilter={toggleFilter} products={products} />
        </div>
      </div>
    </main>
  );
};

export default ProductsPageComponent;
