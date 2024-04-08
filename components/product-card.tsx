import React from "react";
import Image from "next/image";
import Link from "next/link";

//types
import { Product } from "@prisma/client";

//images
import testImage from "@/public/images/primjer patuljka jpeg.jpg";
import svf from "@/public/icons/christmasSvg.svg";

//components
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format-price";

interface ProductCardProps {
  product?: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="relative bg-white flex flex-col justify-start align-top w-full h-full rounded-xl py-4 md:hover:opacity-90  md:duration-300 ">
      <Link href={`products/${product?.id}`}>
        {product?.stock ? (
          <div className=" md:h-96">
            <Image
              className="relative w-full h-48 md:h-full object-cover "
              src={svf}
              width={28}
              height={28}
              alt="product image"
              priority
            />
            <div className="absolute top-1 right-1 ">
              {product?.onSale ? (
                <Badge
                  className="text-red-800 bg-white border-red-800"
                  variant="outline"
                >
                  On Sale
                </Badge>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <>
            <Image
              className="relative w-full  h-48 md:h-full object-cover opacity-30 "
              src={svf}
              width={28}
              height={28}
              alt="product image"
              priority
            />
            <div className="absolute top-0 right-0 ">
              {product?.onSale ? (
                <Badge
                  className="text-red-800 bg-white border-red-800"
                  variant="outline"
                >
                  On Sale
                </Badge>
              ) : (
                <></>
              )}
            </div>
          </>
        )}

        <div className="w-full h-24 pt-4 pb-2 px-2 md:px-3">
          {product?.stock ? (
            <>
              <h3 className=" text-base font-medium pb-1 ">{product?.name}</h3>
              {/* {
                TODO CHECK IF PRODUCT IS NEWLY ADDED TO DISPLAY "NEW" BADGE
                product.createdAt
              } */}

              <p className=" text-xs text-gray-500">{product?.category}</p>
              <div className="text-md font-bold py-2">
                {product?.salePrice ? (
                  <div className="flex flex-row gap-2 text-md font-bold py-2">
                    <p className="  text-red-800">
                      {formatPrice(product?.salePrice)}
                    </p>
                    <div className="relative">
                      <p className="  text-gray-400 font-normal ">
                        {formatPrice(product?.price)}
                      </p>
                      <hr className="absolute border-solid border-1 border-gray-400 top-1/2 w-full"></hr>
                    </div>
                  </div>
                ) : (
                  <p className="">{formatPrice(product?.price)}</p>
                )}
              </div>
            </>
          ) : (
            <p className="py-6">Nema vise u zalihi</p>
          )}
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
