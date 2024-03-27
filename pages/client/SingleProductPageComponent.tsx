"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

//actions
import { getProduct } from "@/actions/get-product";

//types
import { Product } from "@/types/product";

//components
import StickyCTA from "@/components/sticky-cta";

import testImage from "@/public/icons/christmasSvg.svg";
import { Button } from "@/components/ui/button";
import DescriptionAndDetailSection from "@/components/product-desc-detail-section";
import OnSalePriceDisplay from "@/components/ui/onsale-price-display";
import CheckIsNew from "@/components/ui/check-is-new";

// PROMINI INITIAL PRODUCT prema prominjenoj bazi
const initialProduct = {
  id: 0,
  description: "",
  imageUrl: "",
  stock: 0,
  price: 0,
  onSale: false,
  salePrice: 0,
  name: "",
  createdAt: new Date(),
  updateAt: new Date(),
};

const SingleProductPageComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const [product, setProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
    async function fetchProduct(productId: string) {
      const data = await getProduct(productId);
      if (data.product !== null && data.product !== undefined) {
        setProduct(data.product);
      }
    }
  }, [id]);

  return (
    <main>
      <div className="flex flex-col  px-6 py-6">
        <div className="flex flex-row justify-between">
          <h1 className=" font-normal text-3xl mb-1 ">{product.name}</h1>

          <CheckIsNew creationDate={product.createdAt} />
        </div>
        <p className="text-gray-800 text-sm">{product.category}</p>
        <OnSalePriceDisplay
          originalPrice={product.price}
          salePrice={product.salePrice}
        />
      </div>

      <div className="w-full h-80 ">
        <Image
          className="object-cover w-full h-full"
          src={testImage}
          alt="product image"
          width={30}
          height={30}
        />
      </div>
      <div className="flex flex-col justify-center align-middle gap-2 my-6 w-full">
        <Button className="m-auto w-10/12" variant="default">
          Dodaj u košaricu
        </Button>
        <Button className="m-auto w-10/12" variant="outline">
          Dodaj u favorite
        </Button>
      </div>
      <DescriptionAndDetailSection product={product} />

      {/* <StickyCTA /> */}
    </main>
  );
};

export default SingleProductPageComponent;
