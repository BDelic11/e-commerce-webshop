import Image from "next/image";
import React, { cache } from "react";

//actions

//types
import { Product } from "@/types/product";

//components
import StickyCTA from "@/components/sticky-cta";

import testImage from "@/public/icons/christmasSvg.svg";
import { Button } from "@/components/ui/button";
import DescriptionAndDetailSection from "@/components/product-desc-detail-section";
import OnSalePriceDisplay from "@/components/ui/onsale-price-display";
import CheckIsNew from "@/components/ui/check-is-new";
import { notFound } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import AddToCartButton from "@/components/add-to-cart-button";

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

const getProduct = cache(async (id: string) => {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id: id,
      },
    });

    revalidatePath("/products");
    return { product };
  } catch (error) {
    return { error };
  }
});

export async function generateMetadata({
  id,
}: {
  id: string;
}): Promise<Metadata> {
  const product = await getProduct(id);
  if (!product.product) {
    return {};
  }
  return {
    title: product.product?.name + "ecommerce shop",
    description: product.product?.description,
    // openGraph: {
    //   images: {
    //     url: product.product.image,
    //   },
    // },
  };
}

const SingleProductPageComponent = async ({
  productId,
}: {
  productId: string;
}) => {
  const id = productId;

  const { product } = await getProduct(id);

  if (!product) {
    return notFound();
  }

  return (
    <main className="">
      <div className="w-full h-full md:flex md:flex-row md:w-2/3 md:h-screen md:m-auto ">
        <Image
          className="hidden object-cover w-full h-full md:w-1/2 md:h-2/3 md:flex md:mt-10 lg:mt-20 md:rounded-lg"
          src={testImage}
          alt="product image"
          width={30}
          height={30}
        />
        <div className="flex flex-col px-6 py-6 md:w-full md md:px-20 md:mt-10 lg:mt-20">
          <div className="flex flex-row justify-between">
            <h1 className=" font-normal text-3xl mb-1 ">{product.name}</h1>

            <CheckIsNew creationDate={product.createdAt} />
          </div>
          <p className="text-gray-800 text-sm">{product.category}</p>
          <OnSalePriceDisplay
            originalPrice={product.price}
            salePrice={product.salePrice}
          />

          {/* <PickColor colors /> */}

          <div className="w-full h-80 md:hidden lg:hidden mt-6 md:mt-0">
            <Image
              className="object-cover w-full h-full"
              src={testImage}
              alt="product image"
              width={30}
              height={30}
            />
          </div>
          <div className="flex flex-col justify-center align-middle gap-2 my-6 md:mt-20 w-full">
            <AddToCartButton
              productId={productId}
              price={product.price}
              color={"red"}
            />
            <Button className="m-auto w-10/12 " variant="outline">
              Dodaj u favorite
            </Button>
          </div>
          <DescriptionAndDetailSection product={product} />
        </div>
      </div>
      {/* <StickyCTA /> */}
    </main>
  );
};

export default SingleProductPageComponent;
