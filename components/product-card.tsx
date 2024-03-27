import React from "react";
import Image from "next/image";
import Link from "next/link";

//types
import { Product } from "@/types/product";

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
    <article className="relative bg-white flex flex-col justify-start align-top w-full h-72 rounded-xl ">
      <Link href={`products/${product?.id}?id=${product?.id}`}>
        {product?.stock ? (
          <>
            <Image
              className="relative w-full h-2/3 object-cover "
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
        ) : (
          <>
            <Image
              className="relative w-full h-2/3 object-cover opacity-30 "
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

        <div className="w-full h-24 pt-4 pb-2 px-3">
          {product?.stock ? (
            <>
              <h3 className=" text-lg font-medium ">{product?.name}</h3>
              {/* {
                TODO CHECK IF PRODUCT IS NEWLY ADDED TO DISPLAY "NEW" BADGE
                product.createdAt
              } */}

              <p className=" text-sm text-gray-500">{product?.category}</p>
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
