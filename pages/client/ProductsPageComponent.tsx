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

const ProductsPageComponent = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  /* TODO ONLOADING BUG FIRST SHOWS PROIZVOD NULA KAD IH TEK UCITA TEK ONDA IH ISPISE  */
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
    return <p>Loading...</p>;
  }

  return (
    <main>
      {/* TODO FILTER CONTAINER (LEFT ON DESKTOP FROM PRODUCTS SHOW/UNSHOW) */}
      <div className="flex flex-row">
        {toggleFilter && (
          <>
            <aside className="hidden lg:block file:filters md:px-4 md:pt-10 md:w-1/4 transition-all duration-300">
              <FilterAccordions
                action={(filters) => getProductsByFilter}
                filters={filters}
                setProducts={setProducts}
              />
            </aside>
          </>
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
